import LandingPage from "./components/landingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GalleryPage from "./components/landingPage/GalleryPage";
import { createContext, useContext, useState } from "react";

export const UnsplashContext = createContext("peace");


function App() {
  return (
    <div className="">
      <UnsplashContext.Provider value="peace">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </Router>
      </UnsplashContext.Provider>
    </div>
  );
}

export default App;
