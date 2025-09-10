import React, { useEffect, useState } from "react";

const Result: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFile = async () => {
      try {
        const response = await fetch("/result.txt");
        const data = await response.text();
        if (data.startsWith("<!DOCTYPE html>")) {
          throw new Error("Datei nicht gefunden (Fallback geladen)");
        }
        setText(data);
      } catch (err) {
        setError("Keine Infos zu Pommes gefunden :(");
        console.error(err);
      }
    };

    loadFile();
  }, []);

  if (error) {
    return <div className="text-red-500 font-bold">{error}</div>;
  }
  return <div className="text-8xl font-bold w-fit bg-white p-10 border-5 border-blue-500 rounded-md">{text}!</div>;
};

export default Result;
