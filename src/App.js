import LandingPage from "./components/landingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GalleryPage from "./components/landingPage/GalleryPage";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  return (
    <div className="">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LandingPage text={text} setText={setText} />}
          />
          <Route
            path="/gallery"
            element={<GalleryPage text={text} setText={setText} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
