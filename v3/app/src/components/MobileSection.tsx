"use client";

import React, { forwardRef } from "react";

interface MobileSectionProps {
  children?: React.ReactNode;
  className?: string;
}

const MobileSection = forwardRef<HTMLDivElement, MobileSectionProps>(
  ({ children, className = "" }, ref) => {
    return (
      <div 
        ref={ref}
        className={`flex p-4 ${className} w-full`}
      >
        {children}
      </div>
    );
  }
);

MobileSection.displayName = "MobileSection";

export default MobileSection;
