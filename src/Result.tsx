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
      <div className="border-gray-600  text-5xl font-bold w-fit bg-white p-10 border-4 rounded-md text-center">
        Nein! <br />
        (Wochenende)
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 border-red-600  text-5xl font-bold w-fit bg-white p-10 border-4 rounded-md">
        {error}
      </div>
    );
  }
  return <Animation result={text} days={days} />;
};

export default Result;
