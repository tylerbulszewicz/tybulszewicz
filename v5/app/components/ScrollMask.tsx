'use client';

interface ScrollMaskProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollMask({ children, className = '' }: ScrollMaskProps) {
  return (
    <div className={`relative ${className} pt-[50px] md:pt-0`}>
      <div className="md:mt-0 -mt-[50px]">
        {children}
      </div>
      {/* Invisible overlay that captures scroll events */}
      <div className="fixed inset-0 pointer-events-auto z-50 bg-transparent" />
    </div>
  );
}
