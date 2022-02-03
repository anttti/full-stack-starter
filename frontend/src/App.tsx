import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { About } from "./pages/About";

const App = () => {
  return (
    <div className="flex justify-center">
      <h1 className="text-2xl font-bold text-blue-900">
        React and Tailwind with Vitejs!
      </h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
