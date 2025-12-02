import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Clock, Star, Target, Zap, ChevronRight, Shield, CheckCircle, XCircle, Loader2, Book } from "lucide-react";

export default function History() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("medium");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Put your OpenAI API key here or use environment variable
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "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";

  const generateQuestionsWithOpenAI = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate 10 ${difficulty} difficulty world history quiz questions. Each question should have:
      - A clear question about world history (ancient, medieval, modern, etc.)
      - 4 plausible options (a, b, c, d)
      - The correct answer indicated (0-3)
      - Topics can include: ancient civilizations, wars, revolutions, famous leaders, inventions, discoveries, cultural movements, etc.
      
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
          temperature: 0.8, // More creative questions
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        setQuestions(parsedData.questions.slice(0, 10)); // Ensure exactly 10 questions
      } else {
        throw new Error('Invalid response format from OpenAI');
      }

    } catch (error) {
      console.error('Error generating questions:', error);
      // Fallback to local questions if API fails
      await generateFallbackQuestions();
    } finally {
      setIsLoading(false);
      setQuizStarted(true);
      setTimeLeft(30);
    }
  };

  const generateFallbackQuestions = async () => {
    // Enhanced fallback history questions
    const fallbackQuestions = [
      {
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correct: 1,
        difficulty: "easy"
      },
      {
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
        correct: 2,
        difficulty: "easy"
      },
      {
        question: "Which ancient civilization built the Machu Picchu?",
        options: ["Aztec", "Maya", "Inca", "Olmec"],
        correct: 2,
        difficulty: "medium"
      },
      {
        question: "The Renaissance began in which country?",
        options: ["France", "England", "Italy", "Germany"],
        correct: 2,
        difficulty: "medium"
      },
      {
        question: "Who was the Egyptian queen known for her relationships with Roman leaders?",
        options: ["Nefertiti", "Cleopatra", "Hatshepsut", "Ankhesenamun"],
        correct: 1,
        difficulty: "medium"
      },
      {
        question: "The Treaty of Versailles was signed after which war?",
        options: ["World War I", "World War II", "Napoleonic Wars", "Franco-Prussian War"],
        correct: 0,
        difficulty: "hard"
      },
      {
        question: "Which empire was ruled by Genghis Khan?",
        options: ["Ottoman Empire", "Mongol Empire", "Persian Empire", "Byzantine Empire"],
        correct: 1,
        difficulty: "medium"
      },
      {
        question: "The Industrial Revolution began in which country?",
        options: ["United States", "France", "Germany", "Great Britain"],
        correct: 3,
        difficulty: "medium"
      },
      {
        question: "Who wrote 'The Communist Manifesto'?",
        options: ["Vladimir Lenin", "Karl Marx and Friedrich Engels", "Joseph Stalin", "Leon Trotsky"],
        correct: 1,
        difficulty: "hard"
      },
      {
        question: "The ancient city of Troy was located in modern-day which country?",
        options: ["Greece", "Italy", "Turkey", "Egypt"],
        correct: 2,
        difficulty: "hard"
      },
      {
        question: "Which civilization invented writing?",
        options: ["Egyptians", "Chinese", "Sumerians", "Indus Valley"],
        correct: 2,
        difficulty: "hard"
      },
      {
        question: "The French Revolution began in which year?",
        options: ["1776", "1789", "1799", "1812"],
        correct: 1,
        difficulty: "medium"
      }
    ];

    // Filter by difficulty and shuffle
    const filtered = fallbackQuestions.filter(q => q.difficulty === difficulty);
    const shuffled = [...filtered, ...fallbackQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    
    setQuestions(shuffled);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correct;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30));
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setTimeLeft(30);
      } else {
        setShowResult(true);
        // Save score to localStorage
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
  };

  const startNewQuiz = () => {
    resetQuiz();
    generateQuestionsWithOpenAI();
  };

  useEffect(() => {
    if (quizStarted && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setTimeLeft(30);
        } else {
          setShowResult(true);
        }
      }, 1000);
    }
  }, [timeLeft, quizStarted, showResult, currentQuestion, questions.length]);

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'easy': return 'from-green-500 to-emerald-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'hard': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyIcon = (diff) => {
    switch (diff) {
      case 'easy': return <Shield className="w-5 h-5" />;
      case 'medium': return <Target className="w-5 h-5" />;
      case 'hard': return <Zap className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Book className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
              History Quiz
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Journey through time! AI-powered history trivia with 10 unique questions each play. Test your knowledge of civilizations, wars, and great leaders!
            </p>
          </div>

          {/* Difficulty Selection */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-center mb-8">Select Difficulty</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['easy', 'medium', 'hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    difficulty === diff 
                      ? `bg-gradient-to-r ${getDifficultyColor(diff)} border-transparent shadow-2xl` 
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl mb-4 mx-auto ${
                    difficulty === diff ? 'bg-white/20' : 'bg-white/10'
                  }`}>
                    {getDifficultyIcon(diff)}
                  </div>
                  <h3 className="text-xl font-bold text-center capitalize mb-2">{diff}</h3>
                  <p className="text-gray-300 text-center text-sm">
                    {diff === 'easy' && 'Ancient to Modern basics'}
                    {diff === 'medium' && 'Challenging historical facts'}
                    {diff === 'hard' && 'Expert historian level'}
                  </p>
                  <div className="text-center mt-4">
                    <span className="text-lg font-bold">
                      {diff === 'easy' && '10 XP per question'}
                      {diff === 'medium' && '20 XP per question'}
                      {diff === 'hard' && '30 XP per question'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Historical Eras Info */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-center mb-6">Explore Historical Eras</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-amber-500/20 rounded-xl p-4">
                <div className="text-2xl mb-2">🏛️</div>
                <p className="text-sm font-medium">Ancient Civilizations</p>
              </div>
              <div className="bg-purple-500/20 rounded-xl p-4">
                <div className="text-2xl mb-2">⚔️</div>
                <p className="text-sm font-medium">Medieval Times</p>
              </div>
              <div className="bg-blue-500/20 rounded-xl p-4">
                <div className="text-2xl mb-2">🎨</div>
                <p className="text-sm font-medium">Renaissance</p>
              </div>
              <div className="bg-red-500/20 rounded-xl p-4">
                <div className="text-2xl mb-2">💥</div>
                <p className="text-sm font-medium">Modern History</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-sm text-gray-300">AI-Generated Questions</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Target className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-sm text-gray-300">10 New Questions Each Time</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-sm text-gray-300">Earn XP & Level Up</p>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={generateQuestionsWithOpenAI}
              disabled={isLoading}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-12 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-3 justify-center">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  AI is generating your history quiz...
                </div>
              ) : (
                <div className="flex items-center gap-3 justify-center">
                  <Book className="w-6 h-6" />
                  Start History Quiz
                  <ChevronRight className="w-5 h-5" />
                </div>
              )}
            </button>
            <p className="text-gray-400 text-sm mt-3">
              Powered by OpenAI - Journey through different historical eras!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / (difficulty === 'easy' ? 100 : difficulty === 'medium' ? 200 : 300)) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 text-white p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl ${
              percentage >= 80 ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
              percentage >= 60 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
              'bg-gradient-to-r from-blue-500 to-cyan-500'
            }`}>
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-xl text-gray-300 mb-2">You scored</p>
            
            <div className="text-6xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">
              {score} XP
            </div>
            
            <div className="text-lg text-gray-400 mb-6">
              {percentage}% Correct • {difficulty} Difficulty
            </div>
            
            <p className="text-lg text-gray-300 mb-8">
              {percentage >= 80 ? '🏆 History Master! Your knowledge is truly impressive!' : 
               percentage >= 60 ? '⭐ Great work! You have solid historical knowledge!' : 
               percentage >= 40 ? '👍 Good effort! History is full of fascinating stories!' :
               '💪 Nice attempt! Every great historian started somewhere!'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startNewQuiz}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-8 py-4 rounded-2xl text-white font-bold shadow-lg hover:scale-105 transition-all"
              >
                New History Quiz
              </button>
              <button
                onClick={() => navigate('/progress')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-2xl text-white font-bold shadow-lg hover:scale-105 transition-all"
              >
                View Progress
              </button>
              <button
                onClick={() => navigate('/leaderboard')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-2xl text-white font-bold shadow-lg hover:scale-105 transition-all"
              >
                Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0 || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">AI is generating your history questions...</p>
          <p className="text-gray-400 text-sm mt-2">Creating 10 unique questions from different eras</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getDifficultyColor(difficulty)} flex items-center justify-center`}>
                {getDifficultyIcon(difficulty)}
              </div>
              <div>
                <h2 className="text-xl font-bold">History Quiz</h2>
                <p className="text-gray-400 capitalize">{difficulty} Level • AI-Generated</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-center">
              <div>
                <p className="text-gray-400 text-sm">Score</p>
                <p className="text-2xl font-bold text-green-400">{score} XP</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Question</p>
                <p className="text-xl font-bold">{currentQuestion + 1}/10</p>
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
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
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

          {/* Options Grid */}
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

        {/* Feedback */}
        {selectedAnswer !== null && (
          <div className={`p-6 rounded-2xl text-center animate-pulse ${
            isCorrect ? 'bg-green-500/20 border border-green-400' : 'bg-red-500/20 border border-red-400'
          }`}>
            <p className="text-xl font-bold">
              {isCorrect ? '🎉 Correct! Well done historian!' : '❌ Incorrect! History can be tricky!'}
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