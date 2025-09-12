import { BUILD_DATE } from "./build-info";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-gray-300 py-2">
      <div className="flex items-center justify-center gap-4">
        <span>Aktualisiert: {BUILD_DATE}</span>
        <a
          href="https://github.com/LuisErhardt/gibt-es-heute-pommes"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <img src="github-mark-white.svg" alt="GitHub Repository" className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
