"use client";

import { useState } from "react";

const Educational = () => {
  const [noteText, setNoteText] = useState("");
  const [fileName, setFileName] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Dummy quiz generation
  const generateQuiz = () => {
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      const dummyQuiz = [
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          answer: "Paris",
        },
        {
          question: "Who wrote 'Romeo and Juliet'?",
          options: ["Shakespeare", "Hemingway", "Tolstoy", "Dickens"],
          answer: "Shakespeare",
        },
      ];
      setQuiz(dummyQuiz);
      setIsGenerating(false);
    }, 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setNoteText(reader.result);
    };
    reader.readAsText(file);
  };

  const handleAnswerChange = (index, selectedOption) => {
    setAnswers({ ...answers, [index]: selectedOption });
  };

  const calculateResults = () => {
    setShowResults(true);
  };

  const getScore = () => {
    let score = 0;
    quiz.forEach((q, idx) => {
      if (answers[idx] === q.answer) score++;
    });
    return score;
  };

  const resetQuiz = () => {
    setQuiz([]);
    setAnswers({});
    setShowResults(false);
    setNoteText("");
    setFileName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-4">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-300 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-green-300 rounded-full opacity-25 animate-bounce"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black text-white mb-4 drop-shadow-lg">
            QUIZ
            <span className="text-yellow-300">MASTER</span>
          </h1>
          <p className="text-xl text-white/90 font-medium">
            Transform your notes into engaging quizzes instantly
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
          {!quiz.length && !showResults && (
            <>
              {/* Upload Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  Upload Your Notes
                </h2>

                <div className="relative">
                  <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-3 border-dashed border-purple-300 rounded-2xl p-8 text-center hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 cursor-pointer">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      Drop your file here or click to browse
                    </p>
                    <p className="text-gray-500">Supports .txt files</p>
                  </div>
                </div>

                {fileName && (
                  <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-xl flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-green-800 font-medium">
                      Uploaded: {fileName}
                    </span>
                  </div>
                )}
              </div>

              {/* Text Area Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  Or Paste Your Notes
                </h3>
                <textarea
                  rows="6"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl resize-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 text-lg"
                  placeholder="Paste your educational notes here and we'll create an amazing quiz for you..."
                />
              </div>

              {/* Generate Quiz Button */}
              {noteText && (
                <div className="text-center">
                  <button
                    onClick={generateQuiz}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-2xl text-xl font-bold hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Generating Quiz...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-6 h-6 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Generate Quiz
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Quiz Section */}
          {quiz.length > 0 && !showResults && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
                  QUIZ TIME!
                </h2>
                <p className="text-gray-600 text-lg">
                  Test your knowledge with these questions
                </p>
              </div>

              <div className="space-y-6">
                {quiz.map((q, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300"
                  >
                    <div className="flex items-start mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold text-lg">
                          {idx + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 leading-tight">
                        {q.question}
                      </h3>
                    </div>

                    <div className="ml-14 space-y-3">
                      {q.options.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center p-3 rounded-xl hover:bg-white cursor-pointer transition-all duration-200 group"
                        >
                          <input
                            type="radio"
                            name={`question-${idx}`}
                            value={opt}
                            checked={answers[idx] === opt}
                            onChange={() => handleAnswerChange(idx, opt)}
                            className="w-5 h-5 text-purple-600 mr-4"
                          />
                          <span className="text-gray-700 font-medium group-hover:text-purple-700 transition-colors duration-200">
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={calculateResults}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-4 rounded-2xl text-xl font-bold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center mx-auto"
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Submit Answers
                </button>
              </div>
            </div>
          )}

          {/* Results Section */}
          {showResults && (
            <div>
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600 mb-2">
                  RESULTS
                </h2>
                <div className="text-6xl font-black text-gray-800 mb-2">
                  {getScore()} / {quiz.length}
                </div>
                <p className="text-xl text-gray-600">
                  {getScore() === quiz.length
                    ? "Perfect Score! 🎉"
                    : getScore() >= quiz.length / 2
                    ? "Great Job! 👏"
                    : "Keep Learning! 📚"}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {quiz.map((q, idx) => {
                  const isCorrect = answers[idx] === q.answer;
                  return (
                    <div
                      key={idx}
                      className={`p-6 rounded-2xl border-2 ${
                        isCorrect
                          ? "bg-green-50 border-green-300"
                          : "bg-red-50 border-red-300"
                      }`}
                    >
                      <div className="flex items-start mb-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            isCorrect ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {isCorrect ? (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {q.question}
                        </h3>
                      </div>
                      <div className="ml-11">
                        <p className="mb-1">
                          <span className="font-semibold text-gray-700">
                            Your Answer:{" "}
                          </span>
                          <span
                            className={
                              isCorrect
                                ? "text-green-700 font-bold"
                                : "text-red-700 font-bold"
                            }
                          >
                            {answers[idx] || "No answer"}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-700">
                            Correct Answer:{" "}
                          </span>
                          <span className="text-green-700 font-bold">
                            {q.answer}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center">
                <button
                  onClick={resetQuiz}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-12 py-4 rounded-2xl text-xl font-bold hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center mx-auto"
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Create New Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Educational;
