"use client";

import Image from "next/image";

interface LeafDecorationsProps {
  selectedRole?: string;
}

export default function LeafDecorations({ selectedRole }: LeafDecorationsProps) {
  // Function to get leaf color based on selected role
  const getLeafColor = (role?: string) => {
    switch (role) {
      case 'Developer':
        return 'turq';
      case 'Creative':
        return 'purple';
      case 'UX/UI Designer':
        return 'orange';
      case 'All Projects':
        return 'black'; // Black for light mode, will be overridden for dark mode
      default:
        return 'black';
    }
  };

  const leafColor = getLeafColor(selectedRole);

  // Common translations for leaves
  const leftTranslations = "w-128 h-screen -translate-x-1/3 translate-y-1/3 md:translate-y-48 opacity-90";
  const rightTranslations = "w-128 h-screen translate-x-1/3 -translate-y-1/2 md:-translate-y-48 opacity-90";

  const LeafImage = ({ side, variant, className }: { side: 'left' | 'right', variant: string, className: string }) => (
    <Image 
      src={`/leaf-${side}-${variant}.svg`}
      alt="Decorative leaf"
      width={1200}
      height={1200}
      className={className}
      unoptimized
      key={`${side}-${variant}`}
    />
  );

  return (
    <>
      {/* Left side leaf - covers entire screen */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none overflow-hidden">
        {selectedRole !== 'All Projects' && (
          <>
            <LeafImage 
              side="left"
              variant={`${leafColor}-dark`}
              className={`${leftTranslations} dark:hidden`}
            />
            <LeafImage 
              side="left"
              variant={`${leafColor}-light`}
              className={`${leftTranslations} hidden dark:block`}
            />
          </>
        )}
        
        {selectedRole === 'All Projects' && (
          <>
            <LeafImage 
              side="left"
              variant="black"
              className={`${leftTranslations} dark:hidden`}
            />
            <LeafImage 
              side="left"
              variant="white"
              className={`${leftTranslations} hidden dark:block`}
            />
          </>
        )}
      </div>
      
      {/* Right side leaf - covers entire screen */}
      <div className="absolute right-0 top-0 z-0 pointer-events-none overflow-hidden">
        {selectedRole !== 'All Projects' && (
          <>
            <LeafImage 
              side="right"
              variant={`${leafColor}-dark`}
              className={`${rightTranslations} dark:hidden`}
            />
            <LeafImage 
              side="right"
              variant={`${leafColor}-light`}
              className={`${rightTranslations} hidden dark:block`}
            />
          </>
        )}
        
        {selectedRole === 'All Projects' && (
          <>
            <LeafImage 
              side="right"
              variant="black"
              className={`${rightTranslations} dark:hidden`}
            />
            <LeafImage 
              side="right"
              variant="white"
              className={`${rightTranslations} hidden dark:block`}
            />
          </>
        )}
      </div>
    </>
  );
}
