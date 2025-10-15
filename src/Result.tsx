import React, { useEffect, useState } from "react";
import Animation from "./Animation";

const Result: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(null);

  const isWeekend = () => {
    const today = new Date();
    const day = today.getDay();
    return day === 0 || day === 6;
  };

  useEffect(() => {
    const loadFile = async () => {
      try {
        const response = await fetch("result.json");
        const data = await response.json();
        setText(data.result);
        setDays(data.days);
      } catch (err) {
        setError("Keine Infos zu Pommes gefunden :(");
        console.error(err);
      }
    };

    if (!isWeekend()) loadFile();
  }, []);

  if (isWeekend()) {
    return (
      <div className="w-fit text-center">
        <div className="text-8xl font-bold mb-3 text-red-600">Nein!</div>
        <div className="text-4xl">Am Wochenende hat die Mensa zu.</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-5xl font-bold w-fit">{error}</div>;
  }
  return <Animation result={text} days={days} />;
};

export default Result;
