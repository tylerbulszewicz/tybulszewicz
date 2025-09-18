"use client";

import React from "react";
import { useScroll } from "../hooks/useScroll";

interface MobileBackgroundOnlyProps {
  className?: string;
  children?: React.ReactNode;
}

export default function MobileBackgroundOnly({ className = "", children }: MobileBackgroundOnlyProps) {
  const { gradientPosition } = useScroll();
  return (
    <main 
      className={`min-h-screen w-full relative overflow-hidden flex items-center justify-center ${className}`}
      style={{
        backgroundImage: "url('/tyler_background_mobile.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll"
      }}
    >
      {/* Dynamic gradient overlay that moves with scroll */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top, rgba(115,145,171,1) ${0 + gradientPosition}%, rgba(115,145,171,0) ${50 + gradientPosition}%, transparent 100%)`
        }}
      />
      {children}
    </main>
  );
}
