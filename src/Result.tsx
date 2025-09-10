import React, { useEffect, useState } from "react";

const Result: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFile = async () => {
      try {
        setLoading(true);
        const response = await fetch("result.txt");
        const data = await response.text();
        if (data.startsWith("<!DOCTYPE html>")) {
          throw new Error("Datei nicht gefunden (Fallback geladen)");
        }
        setLoading(false);
        setText(data);
      } catch (err) {
        setLoading(false);
        setError("Keine Infos zu Pommes gefunden :(");
        console.error(err);
      }
    };

    loadFile();
  }, []);

  if (error) {
    return (
      <div className="text-red-500 border-red-600  text-5xl font-bold w-fit bg-white p-10 border-4 rounded-md">
        {error}
      </div>
    );
  }

  if (loading) {
    return <></>;
  }
  return (
    <div
      className={`${
        text === "Ja" ? "border-green-500 " : "border-red-600"
      } text-8xl font-bold w-fit bg-white p-10 border-4  rounded-md`}
    >
      {text}!
    </div>
  );
};

export default Result;
