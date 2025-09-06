import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import mammoth from "mammoth";
import Question from "../../Utils/Question/Question.jsx";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function UploadNotes() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const ext = file.name.split(".").pop().toLowerCase();
      let text = "";

      if (ext === "txt") text = await readTxt(file);
      else if (ext === "pdf") text = await readPdf(file);
      else if (ext === "docx") text = await readDocx(file);
      else {
        alert("Unsupported file type. Please upload TXT, PDF, or DOCX.");
        return;
      }

      // Use generator function
      const questions = Question(text);

      // Pass questions via React Router
      navigate("/quiz", { state: { questions } });
    } catch (err) {
      console.error("File processing error:", err);
      alert("Error processing file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-800 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Your Notes</h1>
      <input
        type="file"
        accept=".txt,.pdf,.docx"
        onChange={handleFileUpload}
        className="mb-4 p-2 bg-white text-black rounded-lg"
      />
      {loading && <p className="mt-2">⏳ Processing file...</p>}
    </div>
  );
}
