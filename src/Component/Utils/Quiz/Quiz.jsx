import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Quiz() {
  const location = useLocation();
  const questions = location.state?.questions || [];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (questionIndex, selectedAnswer) => {
    if (answered) return;
    setAnswered(true);

    setAnswers({ ...answers, [questionIndex]: selectedAnswer });

    if (questions[questionIndex].answer === selectedAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (questionIndex + 1 < questions.length) {
        setCurrent(questionIndex + 1);
      } else {
        setFinished(true);
      }
      setAnswered(false);
    }, 1000);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="p-6 text-center text-white">
        <h2>No questions generated yet. Upload notes first!</h2>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-blue-600 text-white p-6">
        <h1 className="text-3xl font-bold mb-4">🎉 Quiz Completed!</h1>
        <p className="text-xl mb-6">
          You scored {score} out of {questions.length}
        </p>
        <button
          onClick={() => {
            setCurrent(0);
            setScore(0);
            setAnswers({});
            setFinished(false);
          }}
          className="bg-white text-blue-600 px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition"
        >
          Play Again
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-blue-800 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">
        Question {current + 1} of {questions.length}
      </h1>

      {/* Progress bar */}
      <div className="w-full max-w-lg bg-gray-300 rounded-full h-2 mb-6">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-white text-black p-6 rounded-xl shadow-xl w-full max-w-lg">
        <p className="text-lg mb-4">{q.question}</p>

        {q.type === "mcq" &&
          q.options.map((opt, idx) => {
            const isSelected = answers[current] === opt;
            const isCorrect = q.answer === opt;

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(current, opt)}
                disabled={answered}
                className={`block w-full text-left px-4 py-2 mb-2 rounded-lg transition
                  ${
                    isSelected
                      ? isCorrect
                        ? "bg-green-400 text-white"
                        : "bg-red-400 text-white"
                      : "bg-blue-100 hover:bg-blue-300"
                  }`}
              >
                {opt}
              </button>
            );
          })}

        {q.type === "truefalse" && (
          <div className="flex gap-4">
            {["True", "False"].map((opt) => {
              const isSelected = answers[current] === opt;
              const isCorrect = q.answer === opt;

              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(current, opt)}
                  disabled={answered}
                  className={`flex-1 px-4 py-2 rounded-lg transition
                    ${
                      isSelected
                        ? isCorrect
                          ? "bg-green-400 text-white"
                          : "bg-red-400 text-white"
                        : opt === "True"
                        ? "bg-green-200 hover:bg-green-400"
                        : "bg-red-200 hover:bg-red-400"
                    }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {q.type === "fill" && (
          <FillInBlank
            question={q}
            onSubmit={(ans) => handleAnswer(current, ans)}
            disabled={answered}
            userAnswer={answers[current]}
          />
        )}
      </div>
    </div>
  );
}

function FillInBlank({ question, onSubmit, disabled, userAnswer }) {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Your answer"
        className="px-3 py-2 border rounded-lg w-full"
        disabled={disabled}
      />
      <button
        onClick={() => {
          if (input.trim() !== "") {
            onSubmit(input.trim());
            setInput("");
          }
        }}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg text-white ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        Submit
      </button>

      {userAnswer && (
        <p
          className={`mt-2 font-semibold ${
            userAnswer.toLowerCase() === question.answer.toLowerCase()
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {userAnswer.toLowerCase() === question.answer.toLowerCase()
            ? "✅ Correct!"
            : `❌ Correct answer: ${question.answer}`}
        </p>
      )}
    </div>
  );
}
