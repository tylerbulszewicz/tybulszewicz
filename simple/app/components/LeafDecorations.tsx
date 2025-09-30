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
      default:
        return 'black';
    }
  };

  const leafColor = getLeafColor(selectedRole);

  // Helper function to get the correct image variant
  const getImageVariant = (color: string, isDark: boolean) => {
    if (color === 'black') {
      // All Projects: keep original logic (black in light mode, white in dark mode)
      return isDark ? 'white' : 'black';
    }
    // Other colors: flipped logic (dark variant in light mode, light variant in dark mode)
    return isDark ? `${color}-light` : `${color}-dark`;
  };

  // Common translations for leaves
  const leftTranslations = "w-128 h-screen -translate-x-1/3 translate-y-1/3 md:translate-y-48";
  const rightTranslations = "w-128 h-screen translate-x-1/3 -translate-y-1/2 md:-translate-y-48";

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
        <LeafImage 
          side="left"
          variant={getImageVariant(leafColor, false)}
          className={`${leftTranslations} dark:hidden`}
        />
        <LeafImage 
          side="left"
          variant={getImageVariant(leafColor, true)}
          className={`${leftTranslations} hidden dark:block`}
        />
      </div>
      
      {/* Right side leaf - covers entire screen */}
      <div className="absolute right-0 top-0 z-0 pointer-events-none overflow-hidden">
        <LeafImage 
          side="right"
          variant={getImageVariant(leafColor, false)}
          className={`${rightTranslations} dark:hidden`}
        />
        <LeafImage 
          side="right"
          variant={getImageVariant(leafColor, true)}
          className={`${rightTranslations} hidden dark:block`}
        />
      </div>
    </>
  );
}