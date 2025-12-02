import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Clock, Star, Target, Zap, ChevronRight, Shield, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function Ball() {
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
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const generateQuestionsWithOpenAI = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate 10 ${difficulty} difficulty football/soccer quiz questions. Each question should have:
      - A clear question about football/soccer
      - 4 plausible options (a, b, c, d)
      - The correct answer indicated
      - Topics can include: World Cup, Champions League, famous players, rules, history, records, etc.
      
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
    // Enhanced fallback questions
    const fallbackQuestions = [
      {
        question: "Which country won the 2018 FIFA World Cup?",
        options: ["Brazil", "Germany", "France", "Argentina"],
        correct: 2,
        difficulty: "easy"
      },
      {
        question: "Which player has won the most Ballon d'Or awards?",
        options: ["Cristiano Ronaldo", "Lionel Messi", "Michel Platini", "Johan Cruyff"],
        correct: 1,
        difficulty: "medium"
      },
      {
        question: "Which club has won the most UEFA Champions League titles?",
        options: ["Bayern Munich", "AC Milan", "Real Madrid", "Barcelona"],
        correct: 2,
        difficulty: "medium"
      },
      {
        question: "Who scored the 'Hand of God' goal?",
        options: ["Diego Maradona", "Pele", "Zinedine Zidane", "Ronaldo Nazario"],
        correct: 0,
        difficulty: "easy"
      },
      {
        question: "In which year was the Premier League founded?",
        options: ["1990", "1992", "1995", "1988"],
        correct: 1,
        difficulty: "hard"
      },
      {
        question: "Which nation has won the most Copa America titles?",
        options: ["Brazil", "Argentina", "Uruguay", "Chile"],
        correct: 2,
        difficulty: "hard"
      },
      {
        question: "What is the maximum number of players allowed on a soccer team during a match?",
        options: ["11", "12", "10", "9"],
        correct: 0,
        difficulty: "easy"
      },
      {
        question: "Which player holds the record for most goals in a single Premier League season?",
        options: ["Alan Shearer", "Mohamed Salah", "Erling Haaland", "Thierry Henry"],
        correct: 2,
        difficulty: "medium"
      },
      {
        question: "Which country hosted the 2014 FIFA World Cup?",
        options: ["Russia", "South Africa", "Brazil", "Germany"],
        correct: 2,
        difficulty: "easy"
      },
      {
        question: "What is the nickname of Italian club Juventus?",
        options: ["The Blues", "The Old Lady", "The Vikings", "The Eagles"],
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Football Quiz
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              AI-powered football trivia! Get 10 unique questions each time you play. Test your knowledge and climb the leaderboard!
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
                    {diff === 'easy' && 'Perfect for beginners'}
                    {diff === 'medium' && 'Challenge your knowledge'}
                    {diff === 'hard' && 'Expert level questions'}
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
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-sm text-gray-300">Earn XP & Level Up</p>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={generateQuestionsWithOpenAI}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 px-12 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-3 justify-center">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  AI is generating your quiz...
                </div>
              ) : (
                <div className="flex items-center gap-3 justify-center">
                  <Zap className="w-6 h-6" />
                  Start Football Quiz
                  <ChevronRight className="w-5 h-5" />
                </div>
              )}
            </button>
            <p className="text-gray-400 text-sm mt-3">
              Powered by OpenAI - New questions every time!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / (difficulty === 'easy' ? 100 : difficulty === 'medium' ? 200 : 300)) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl ${
              percentage >= 80 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
              percentage >= 60 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
              'bg-gradient-to-r from-blue-500 to-cyan-500'
            }`}>
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-xl text-gray-300 mb-2">You scored</p>
            
            <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
              {score} XP
            </div>
            
            <div className="text-lg text-gray-400 mb-6">
              {percentage}% Correct • {difficulty} Difficulty
            </div>
            
            <p className="text-lg text-gray-300 mb-8">
              {percentage >= 80 ? '🏆 Football Genius! Outstanding performance!' : 
               percentage >= 60 ? '⭐ Great job! You know your football!' : 
               percentage >= 40 ? '👍 Good effort! Keep learning about the beautiful game!' :
               '💪 Nice try! Practice makes perfect!'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startNewQuiz}
                className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 px-8 py-4 rounded-2xl text-white font-bold shadow-lg hover:scale-105 transition-all"
              >
                New Quiz
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">AI is generating your questions...</p>
          <p className="text-gray-400 text-sm mt-2">Creating 10 unique football questions</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getDifficultyColor(difficulty)} flex items-center justify-center`}>
                {getDifficultyIcon(difficulty)}
              </div>
              <div>
                <h2 className="text-xl font-bold">Football Quiz</h2>
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
              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-500"
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
              {isCorrect ? '🎉 Correct! Well done!' : '❌ Incorrect! Better luck next time!'}
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