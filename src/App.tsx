import Footer from "./Footer";
import Heatmap from "./Heatmap";
import Interaction from "./Interaction";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="mx-auto max-w-xl mt-20 h-full">
        <Routes>
          <Route path="/" element={<Interaction />} />
          <Route path="/Statistik" element={<Heatmap />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
