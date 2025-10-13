import { useState } from "react";
import Result from "./Result";
import { BarLoader } from "react-spinners";

function Interaction() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);
    setTimeout(() => {
      setButtonClicked(true);
      setLoading(false);
    }, 4000);
  };

  return (
    <div className="border-gray-600 text-2xl max-w-xl w-fit bg-white p-10 border-4 rounded-md text-center mx-4 h-3/4">
      {buttonClicked ? (
        <div className="flex justify-center">
          <Result />
        </div>
      ) : (
        <>
          <div className="font-bold">Du willst wissen, ob es heute in der Mensa am Campus Duisburg Pommes gibt?</div>
          {!loading ? (
            <>
              <div className="mt-5">Klicke, um es herausfinden:</div>
              <div className="flex justify-center my-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-10"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
              </div>
              <button
                className="mt-3 text-blue-500 underline hover:text-blue-700 hover:cursor-pointer"
                onClick={() => onClick()}
              >
                <img src="lupe.png" className="h-20" />
              </button>
            </>
          ) : (
            <div className="flex justify-center mt-8">
              <BarLoader color="#2563eb" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Interaction;
