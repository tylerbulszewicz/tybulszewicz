'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedGreenGridProps {
  columns?: number;
  rows?: number;
  gapPx?: number;
}

const AnimatedGreenGrid = ({
  columns = 28,
  rows = 4,
  gapPx = 10,
}: AnimatedGreenGridProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlaysRef = useRef<(HTMLDivElement | null)[]>([]);

  const seededRandom = (seed: number) => {
    let t = seed + 0x6d2b79f5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const activeMap = useMemo(() => {
    const total = columns * rows;
    const minProbability = 0.07;
    const maxProbability = 0.5;

    return Array.from({ length: total }, (_, index) => {
      const column = index % columns;
      const columnProgress = columns > 1 ? column / (columns - 1) : 1;
      const activeProbability =
        minProbability + (maxProbability - minProbability) * columnProgress;
      const seededValue = seededRandom(
        index * 374761393 + columns * 668265263 + rows * 2147483647
      );

      return seededValue < activeProbability;
    });
  }, [columns, rows]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const activeOverlays = overlaysRef.current.filter(
      (overlay): overlay is HTMLDivElement => overlay !== null
    );

    if (activeOverlays.length === 0) return;

    gsap.set(activeOverlays, { opacity: 0 });

    const overlaysByColumn = Array.from({ length: columns }, () => [] as HTMLDivElement[]);
    activeOverlays.forEach((overlay) => {
      const column = Number(overlay.dataset.column ?? '0');
      overlaysByColumn[column]?.push(overlay);
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 82%',
        end: '+=50%',
        scrub: 1,
      },
    });

    overlaysByColumn.forEach((columnOverlays, columnIndex) => {
      if (columnOverlays.length === 0) return;

      timeline.to(
        columnOverlays,
        {
          opacity: 1,
          duration: 0.2,
          stagger: 0.03,
          ease: 'none',
        },
        columnIndex * 0.09
      );
    });

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [columns, activeMap]);

  return (
    <div
      ref={sectionRef}
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gapPx}px`,
      }}
    >
      {activeMap.map((isActive, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const columnProgress = columns > 1 ? column / (columns - 1) : 1;
        const hue = 132 - columnProgress * 6;
        const saturation = 52 - columnProgress * 8;
        const lightness = 22 + columnProgress * 38;

        return (
          <div key={index} className="relative aspect-square w-full overflow-hidden rounded-[3px] bg-[#121212]">
            {isActive ? (
              <div
                ref={(element) => {
                  overlaysRef.current[index] = element;
                }}
                data-column={column}
                data-row={row}
                className="absolute inset-0"
                style={{ backgroundColor: `hsl(${hue} ${saturation}% ${lightness}%)` }}
                aria-hidden="true"
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedGreenGrid;
