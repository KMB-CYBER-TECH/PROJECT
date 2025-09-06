export default function Question(text, numQuestions = 5) {
  if (!text || text.trim().length === 0) {
    return [];
  }

  // Split text into sentences
  const sentences = text
    .replace(/\s+/g, " ")
    .split(/[.?!]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);

  let questions = [];

  for (let i = 0; i < Math.min(numQuestions, sentences.length); i++) {
    const sentence = sentences[i];

    const type = ["mcq", "truefalse", "fill"][Math.floor(Math.random() * 3)];

    if (type === "mcq") {
      const words = sentence.split(" ");
      if (words.length > 5) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const answer = words[randomIndex];
        words[randomIndex] = "_____";
        questions.push({
          type: "mcq",
          question: `Fill in the blank: ${words.join(" ")}`,
          options: shuffleArray([answer, "Option1", "Option2", "Option3"]),
          answer,
        });
      }
    } else if (type === "truefalse") {
      questions.push({
        type: "truefalse",
        question: `True or False: ${sentence}`,
        answer: "True",
      });
    } else if (type === "fill") {
      const words = sentence.split(" ");
      if (words.length > 5) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const answer = words[randomIndex];
        words[randomIndex] = "_____";
        questions.push({
          type: "fill",
          question: `Complete: ${words.join(" ")}`,
          answer,
        });
      }
    }
  }

  return questions;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
