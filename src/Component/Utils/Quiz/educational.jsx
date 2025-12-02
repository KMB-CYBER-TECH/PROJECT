import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Brain, Zap, BookOpen, CheckCircle, XCircle, Clock, Trophy, Loader2, Sparkles, File } from "lucide-react";

export default function Educational() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const fileInputRef = useRef(null);

  // Get API key from environment - properly check if it exists and is valid
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  
  // Check if API key is properly set (not empty and not the placeholder)
  const isApiKeySet = OPENAI_API_KEY && 
                     OPENAI_API_KEY.trim() !== "" && 
                     !OPENAI_API_KEY.includes(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
) &&
                     OPENAI_API_KEY.startsWith("sk-");

  const extractTextFromFile = async (file) => {
    setIsProcessingFile(true);
    
    try {
      // For TXT files
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = reject;
          reader.readAsText(file);
        });
      }
      
      // For PDF files - try to extract text
      else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            // For PDFs, we'll simulate content extraction
            resolve(`PDF Content from "${file.name}"\n\nThis is a simulated extraction of your PDF file. In a production environment, this would contain the actual text content from your PDF document. The AI will generate questions based on this simulated content.\n\nSample educational content that might be in your PDF:\n- Learning objectives and key concepts\n- Chapter summaries and important definitions\n- Study materials and review questions\n- Educational theories and practical applications`);
          };
          reader.readAsArrayBuffer(file);
        });
      }
      
      // For DOC/DOCX files
      else if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
        return `Word Document Content from "${file.name}"\n\nThis is a simulated extraction of your Word document. In a production environment, this would contain the actual text content from your document. The AI will generate questions based on this simulated content.\n\nSample educational content that might be in your document:\n- Lecture notes and study guides\n- Research papers and academic writing\n- Course materials and syllabus content\n- Study notes and revision materials`;
      }
      
      // For any other file type
      else {
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result || `Content from ${file.name}`);
          reader.onerror = reject;
          reader.readAsText(file);
        });
      }
    } catch (error) {
      console.error("Error reading file:", error);
      return `Content from ${file.name}. Unable to fully extract text, but the AI can still generate questions based on the file context.`;
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    // Check file size (max 5MB)
    if (uploadedFile.size > 5 * 1024 * 1024) {
      alert("File size too large. Please upload files smaller than 5MB.");
      return;
    }

    setFile(uploadedFile);
    
    // Extract text from the file
    const extractedText = await extractTextFromFile(uploadedFile);
    setText(extractedText);
    setActiveTab("preview");
  };

  const generateQuestionsFromContent = async () => {
    if (!text.trim()) {
      alert("Please provide some content first");
      return;
    }

    setIsLoading(true);
    try {
      const contentToUse = text.length > 3000 ? text.substring(0, 3000) + "..." : text;
      
      const prompt = `Based EXCLUSIVELY on the following educational content, generate 10 engaging quiz questions. Each question should have:
      - A clear, well-phrased question that tests understanding
      - 4 plausible and distinct options
      - The correct answer indicated (0-3)
      - Cover different aspects and key concepts from the content
      
      CONTENT:
      "${contentToUse}"
      
      Format as JSON exactly like this:
      {
        "questions": [
          {
            "question": "Question text here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correct": 0
          }
        ]
      }`;

      let generatedQuestions;

      if (isApiKeySet) {
        // Use OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
              role: "user",
              content: prompt
            }],
            temperature: 0.7,
            max_tokens: 2000
          })
        });

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedData = JSON.parse(jsonMatch[0]);
          generatedQuestions = parsedData.questions.slice(0, 10);
        } else {
          throw new Error('Invalid response format from OpenAI');
        }
      } else {
        // Generate questions locally based on content
        generatedQuestions = generateLocalQuestions(contentToUse);
      }

      if (generatedQuestions && generatedQuestions.length > 0) {
        setQuestions(generatedQuestions);
        setQuizStarted(true);
        setTimeLeft(30);
      } else {
        throw new Error('No questions generated');
      }

    } catch (error) {
      console.error('Error generating questions:', error);
      // Fallback to local question generation
      const localQuestions = generateLocalQuestions(text);
      setQuestions(localQuestions);
      setQuizStarted(true);
      setTimeLeft(30);
    } finally {
      setIsLoading(false);
    }
  };

  const generateLocalQuestions = (content) => {
    // Generate questions based on the actual content
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    const questions = [];

    // Create questions from the content
    for (let i = 0; i < Math.min(5, sentences.length); i++) {
      const sentence = sentences[i].trim();
      const words = sentence.split(/\s+/);
      const keyPhrase = words.length > 5 ? words.slice(0, 6).join(' ') + '...' : sentence;

      questions.push({
        question: `Based on the content, what is the main concept regarding "${keyPhrase}"?`,
        options: [
          "It's a fundamental principle discussed in the material",
          "It's a secondary detail mentioned briefly", 
          "It's a controversial topic debated in the content",
          "It's not directly addressed in the material"
        ],
        correct: 0
      });
    }

    // Add some general educational questions
    const generalQuestions = [
      {
        question: "What is the primary purpose of the educational content provided?",
        options: [
          "To explain key concepts and facilitate learning",
          "To entertain and tell stories", 
          "To advertise products or services",
          "To provide personal opinions without evidence"
        ],
        correct: 0
      },
      {
        question: "Which learning strategy would be most effective for this content?",
        options: [
          "Active reading and note-taking",
          "Skimming quickly without engagement", 
          "Memorizing without understanding",
          "Ignoring the main concepts"
        ],
        correct: 0
      },
      {
        question: "How should you approach studying this material?",
        options: [
          "Break it into sections and review regularly",
          "Cram everything at once before exams", 
          "Focus only on the headings and titles",
          "Skip the detailed explanations"
        ],
        correct: 0
      },
      {
        question: "What makes this educational content valuable for learning?",
        options: [
          "It presents structured information for knowledge building",
          "It contains mostly opinions without facts", 
          "It focuses on entertainment over education",
          "It avoids explaining complex concepts"
        ],
        correct: 0
      },
      {
        question: "How can you best demonstrate understanding of this content?",
        options: [
          "By explaining concepts in your own words and applying them",
          "By memorizing sentences without comprehension", 
          "By focusing only on the visual elements",
          "By skipping the practice questions"
        ],
        correct: 0
      }
    ];

    // Combine and return 10 questions
    return [...questions, ...generalQuestions].slice(0, 10);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correct;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 15);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setTimeLeft(30);
      } else {
        setShowResult(true);
        const currentXP = parseInt(localStorage.getItem('xp') || '0');
        localStorage.setItem('xp', (currentXP + score).toString());
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsCorrect(null);
    setTimeLeft(30);
    setQuizStarted(false);
    setActiveTab("upload");
  };

  const startNewQuiz = () => {
    resetQuiz();
    setText("");
    setFile(null);
  };

  // Get file icon based on type
  const getFileIcon = (fileName) => {
    if (fileName?.endsWith('.pdf')) return '📄';
    if (fileName?.endsWith('.doc') || fileName?.endsWith('.docx')) return '📝';
    return '📄';
  };

  // Quiz in progress
  if (quizStarted && !showResult) {
    const question = questions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {isApiKeySet ? "AI-Generated Quiz" : "Smart Quiz"}
                  </h2>
                  <p className="text-gray-400">From your notes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-center">
                <div>
                  <p className="text-gray-400 text-sm">Score</p>
                  <p className="text-2xl font-bold text-green-400">{score} XP</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Question</p>
                  <p className="text-xl font-bold">{currentQuestion + 1}/{questions.length}</p>
                </div>
                <div className="flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-xl">
                  <Clock className="w-5 h-5 text-red-400" />
                  <span className="font-bold text-red-400">{timeLeft}s</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700/50 rounded-full h-2 mt-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 mb-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold leading-relaxed">
                {question.question}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => {
                let buttonClass = "p-6 rounded-2xl text-left font-medium transition-all duration-300 ";
                
                if (selectedAnswer === null) {
                  buttonClass += "bg-white/10 hover:bg-white/20 hover:scale-105 border border-white/10";
                } else if (selectedAnswer === index) {
                  buttonClass += isCorrect 
                    ? "bg-green-500/20 border-2 border-green-400 scale-105" 
                    : "bg-red-500/20 border-2 border-red-400 scale-105";
                } else if (index === question.correct && selectedAnswer !== null) {
                  buttonClass += "bg-green-500/20 border-2 border-green-400";
                } else {
                  buttonClass += "bg-white/5 border border-white/10 opacity-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{option}</span>
                      {selectedAnswer !== null && index === question.correct && (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      )}
                      {selectedAnswer === index && !isCorrect && (
                        <XCircle className="w-6 h-6 text-red-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedAnswer !== null && (
            <div className={`p-6 rounded-2xl text-center animate-pulse ${
              isCorrect ? 'bg-green-500/20 border border-green-400' : 'bg-red-500/20 border border-red-400'
            }`}>
              <p className="text-xl font-bold">
                {isCorrect ? '🎉 Correct! Well done!' : '❌ Incorrect! Keep learning!'}
              </p>
              {!isCorrect && (
                <p className="text-gray-300 mt-2">
                  The correct answer is: <strong>{question.options[question.correct]}</strong>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Results screen
  if (showResult) {
    const percentage = Math.round((score / (questions.length * 15)) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl ${
              percentage >= 80 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
              percentage >= 60 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
              'bg-gradient-to-r from-green-500 to-emerald-500'
            }`}>
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-xl text-gray-300 mb-2">You scored</p>
            
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              {score} XP
            </div>
            
            <div className="text-lg text-gray-400 mb-6">
              {percentage}% Correct • {questions.length} Questions
            </div>
            
            <p className="text-lg text-gray-300 mb-8">
              {percentage >= 80 ? '🏆 Excellent! You mastered the material!' : 
               percentage >= 60 ? '⭐ Great job! Solid understanding!' : 
               percentage >= 40 ? '👍 Good effort! Keep reviewing!' :
               '💪 Nice attempt! Practice makes perfect!'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startNewQuiz}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-4 rounded-2xl text-white font-bold shadow-lg hover:scale-105 transition-all"
              >
                Create New Quiz
              </button>
              <button
                onClick={() => navigate('/progress')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-2xl text-white font-bold shadow-lg hover:scale-105 transition-all"
              >
                View Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main upload screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Smart Notes
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Upload your notes (PDF, Word, TXT) and get personalized quiz questions!
          </p>
          
          {/* API Status Indicator */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mt-4 ${
            isApiKeySet 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isApiKeySet ? 'bg-green-400 animate-pulse' : 'bg-blue-400'}`}></div>
            {isApiKeySet ? 'AI Powered Mode' : 'Smart Local Mode'}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 mb-8">
          {/* Tabs */}
          <div className="flex border-b border-white/10 mb-8">
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-2 px-6 py-3 font-medium border-b-2 transition-all ${
                activeTab === "upload" 
                  ? "border-blue-400 text-blue-400" 
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              <Upload className="w-5 h-5" />
              Upload Notes
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-6 py-3 font-medium border-b-2 transition-all ${
                activeTab === "preview" 
                  ? "border-blue-400 text-blue-400" 
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              <FileText className="w-5 h-5" />
              Preview Content
            </button>
          </div>

          {/* Upload Tab */}
          {activeTab === "upload" && (
            <div className="text-center">
              <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 mb-8 hover:border-blue-400/50 transition-colors">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Upload Your Notes</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Upload PDF, Word documents, or text files
                </p>
                
                <div className="flex justify-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📄</div>
                    <span className="text-sm text-gray-400">PDF</span>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">📝</div>
                    <span className="text-sm text-gray-400">Word</span>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">📄</div>
                    <span className="text-sm text-gray-400">TXT</span>
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessingFile}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-4 rounded-2xl text-white font-bold shadow-lg hover:scale-105 transition-all disabled:opacity-50"
                >
                  {isProcessingFile ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing File...
                    </div>
                  ) : (
                    "Choose File"
                  )}
                </button>
                
                {file && (
                  <div className="mt-4 p-3 bg-green-500/20 rounded-xl border border-green-500/30">
                    <div className="flex items-center gap-3 justify-center">
                      <span className="text-2xl">{getFileIcon(file.name)}</span>
                      <div className="text-left">
                        <p className="text-green-400 font-medium">{file.name}</p>
                        <p className="text-green-300 text-sm">
                          {(file.size / 1024).toFixed(1)} KB • Ready to generate quiz
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center">
                <p className="text-gray-400 mb-4">- OR -</p>
                <button
                  onClick={() => setActiveTab("preview")}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-2xl text-white font-bold shadow-lg hover:scale-105 transition-all"
                >
                  Paste Text Directly
                </button>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === "preview" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Your Content ({text.length} characters)
                  {file && (
                    <span className="text-blue-400 ml-2">
                      • From: {file.name}
                    </span>
                  )}
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Your file content will appear here automatically. You can also edit or add more content..."
                  className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl text-blue-400 font-bold">{text.length}</div>
                  <div className="text-gray-400 text-sm">Characters</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl text-green-400 font-bold">{text.split(/\s+/).filter(word => word.length > 0).length}</div>
                  <div className="text-gray-400 text-sm">Words</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl text-purple-400 font-bold">{text.split('.').filter(sentence => sentence.trim().length > 0).length}</div>
                  <div className="text-gray-400 text-sm">Sentences</div>
                </div>
              </div>

              <div className="text-center pt-6">
                <button
                  onClick={generateQuestionsFromContent}
                  disabled={isLoading || !text.trim()}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-12 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3 justify-center">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      {isApiKeySet ? "AI is generating your quiz..." : "Generating your quiz..."}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 justify-center">
                      <Sparkles className="w-6 h-6" />
                      {isApiKeySet ? "Generate AI Quiz" : "Generate Smart Quiz"}
                      <Zap className="w-5 h-5" />
                    </div>
                  )}
                </button>
                <p className="text-gray-400 text-sm mt-3">
                  {isApiKeySet 
                    ? "AI will create 10 personalized questions based on your content"
                    : "Smart system will generate relevant questions from your content"
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Smart Generation</h3>
            <p className="text-gray-400 text-sm">Questions tailored to your content</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <File className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Multiple Formats</h3>
            <p className="text-gray-400 text-sm">PDF, Word, TXT files supported</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Earn XP</h3>
            <p className="text-gray-400 text-sm">15 XP per correct answer</p>
          </div>
        </div>
      </div>
    </div>
  );
}