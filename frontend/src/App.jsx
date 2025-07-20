import React from "react";
//rafce
import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar"; // Make sure the path is correct

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import {Toaster,toast} from "react-hot-toast";

const App = () => {
  const [theme, setTheme] = useState("sunset"); // default theme

  
  return (
    <div
      data-theme={theme}
      className="relative min-h-screen w-full overflow-x-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>
      <Navbar theme={theme} setTheme={setTheme} />
      <Toaster /> {/* ✅ Required for toasts to appear */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
