import { BUILD_DATE } from "./build-info";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-gray-300 py-2">
      <div className="text-center">Aktualisiert: {BUILD_DATE}</div>
    </footer>
  );
};

export default Footer;
