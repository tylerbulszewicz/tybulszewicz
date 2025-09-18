"use client";

import React from "react";

interface SpacerProps {
  variant?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

export default function Spacer({ 
  variant = 'md', 
  className = "",
  style
}: SpacerProps) {
  const getHeightClass = () => {
    switch (variant) {
      case 'xs':
        return 'min-h-[25vh]'; // Quarter screen height
      case 'sm':
        return 'min-h-[50vh]'; // Half screen height
      case 'md':
        return 'min-h-screen'; // Full screen height
      case 'lg':
        return 'min-h-[150vh]'; // 1.5x screen height
      default:
        return 'min-h-screen';
    }
  };

  return (
    <div className={`${getHeightClass()} w-full ${className}`} style={style} />
  );
}
