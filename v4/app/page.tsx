"use client";

import React, { useState, useEffect } from "react";
import Navigation from "./src/components/Navigation";
import NameDisplay from "./src/components/NameDisplay";

const words = ["Developer", "Software Engineer", "UX/UI Designer", "Creative"];

export default function Home() {
  const [nameVisible, setNameVisible] = useState(false);
  const [developerVisible, setDeveloperVisible] = useState(false);

  // Initial page load animations
  useEffect(() => {
    setTimeout(() => setNameVisible(true), 200);
    setTimeout(() => setDeveloperVisible(true), 700);
  }, []);

  return (
    <main className="md:flex md:items-center md:justify-center h-screen relative overflow-hidden p-4">
      <NameDisplay 
        name="tyler bulszewicz"
        words={words}
        nameVisible={nameVisible}
        developerVisible={developerVisible}
      />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Decorative leafs at bottom left */}
      <div className="absolute flex flex-row bottom-[-265px] left-[-265px] pointer-events-none z-10">
        <img  src="/leafs-3.svg" alt="Decorative leaves 3" className="w-128 h-auto opacity-85 -translate-x-4 translate-y-8"/>
        <img  src="/leafs-4.svg" alt="Decorative leaves 4" className="w-128 h-auto opacity-85 -translate-x-16 translate-y-28"/>
      </div>
      
      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/100 to-transparent pointer-events-none z-20"></div>
    </main>
  );
}
