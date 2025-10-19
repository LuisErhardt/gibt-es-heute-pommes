import * as motion from "motion/react-client";
import ShakingFries from "./ShakingFries";

type PropsType = {
  result: string;
  days: number | null;
};

export default function Animation(props: PropsType) {
  const result = props.result;
  return (
    <motion.div
      className="min-h-fit flex justify-center flex-wrap"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className={`mb-3 text-8xl font-bold ${result === "Ja" ? "text-green-600 " : "text-red-600"}`}>{result}!</div>
      {result === "Ja" ? (
        <div className="text-4xl w-full">
          Greife zu:{" "}
          <button>
            <ShakingFries />
          </button>
        </div>
      ) : (
        <div className="text-4xl">Das ist der {props.days}. Tag in Folge ohne Pommes. </div>
      )}
    </motion.div>
  );
}
