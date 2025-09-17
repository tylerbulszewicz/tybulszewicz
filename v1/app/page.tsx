"use client";

import React, { useState, useEffect } from "react";
import Navigation from "./src/components/Navigation";
import NameDisplay from "./src/components/NameDisplay";

const words = ["Developer",  "Software Engineer", "UX/UI Designer", "Creative"];

export default function Home() {
  const [nameVisible, setNameVisible] = useState(false);
  const [developerVisible, setDeveloperVisible] = useState(false);
  const [leaf1Visible, setLeaf1Visible] = useState(false);
  const [leaf2Visible, setLeaf2Visible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  // Initial page load animations
  useEffect(() => {
    // Staggered fade-in sequence
    setTimeout(() => setNameVisible(true), 200);
    setTimeout(() => setDeveloperVisible(true), 700);
    setTimeout(() => setServicesVisible(true), 1200);
    setTimeout(() => setProjectsVisible(true), 1400);
    setTimeout(() => setContactVisible(true), 1600);
  }, []);



  return (
    <main className="flex items-center justify-end h-screen relative overflow-hidden select-none pr-48">
      <NameDisplay 
        name="tyler bulszewicz"
        words={words}
        nameVisible={nameVisible}
        developerVisible={developerVisible}
      />
      
      {/* Navigation */}
      <Navigation variant="home" />
    </main>
  );
}
