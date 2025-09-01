'use client';

import React, { useState, useRef, useEffect } from 'react';

const ProjectsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Home button animation state
  const [homeVisible, setHomeVisible] = useState(false);
  


  const cards = [
    { id: 1, image: '/project1.png' },
    { id: 2, image: '/project2.png' },
    { id: 3, image: '/project3.png' },
    { id: 4, image: '/project4.png' },
    { id: 5, image: '/project5.png' },
    { id: 6, image: '/project6.png' },
    { id: 7, image: '/project7.png' },
  ];

  // Handle card click
  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  // Handle manual scrolling to update active index
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const cardWidth = 80; // 80vw
      const cardTotalWidth = cardWidth * (window.innerWidth / 100);
      
      // Calculate which card is currently centered
      const newActiveIndex = Math.round(scrollLeft / cardTotalWidth);
      
      // Handle looping: if we're past the last card, loop to first
      if (newActiveIndex >= cards.length) {
        setActiveIndex(0);
        // Instantly reset scroll position to first card
        scrollContainerRef.current.scrollLeft = 0;
      } else if (newActiveIndex < 0) {
        setActiveIndex(cards.length - 1);
        // Instantly reset scroll position to last card
        scrollContainerRef.current.scrollLeft = (cards.length - 1) * cardTotalWidth;
      } else {
        setActiveIndex(newActiveIndex);
      }
    }
  };

  // Debounced scroll handler
  const debouncedScrollHandler = useRef<NodeJS.Timeout | null>(null);
  
  const handleSmoothScroll = () => {
    if (debouncedScrollHandler.current) {
      clearTimeout(debouncedScrollHandler.current);
    }
    
    debouncedScrollHandler.current = setTimeout(() => {
      handleScroll();
    }, 150);
  };

  // Scroll to active card when activeIndex changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth = 80; // 80vw
      const scrollPosition = activeIndex * cardWidth;
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition * (window.innerWidth / 100),
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);



  // Initial page load animation for HOME button
  useEffect(() => {
    // Fade in the HOME button after a brief delay
    setTimeout(() => setHomeVisible(true), 500);
  }, []);

  // Auto-advance slides every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [cards.length]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debouncedScrollHandler.current) {
        clearTimeout(debouncedScrollHandler.current);
      }
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="h-screen flex flex-col bg-[#BDB8B5] relative">
        {/* Carousel Section */}
        <section className="mb-0">
                  <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scroll-smooth hide-scrollbar h-full"
          style={{
            scrollSnapType: 'x proximity',
            scrollSnapAlign: 'center',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          onScroll={handleSmoothScroll}
        >
            {cards.map((card, index) => {
              const isActive = index === activeIndex;
              
              return (
                <div
                  key={card.id}
                  className={`
                    w-[80vw] h-[70vh] flex-shrink-0 cursor-pointer
                    transition-all duration-700 scroll-snap-center overflow-hidden
                    ${isActive ? 'opacity-100' : 'opacity-40'}
                  `}
                  onClick={() => handleCardClick(index)}
                  style={{ 
                    scrollSnapAlign: 'center',
                    aspectRatio: '16/10',
                    minHeight: '70vh'
                  }}
                >
                  <img 
                    src={card.image} 
                    alt={`Project ${card.id}`}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out"
                    style={{
                      transform: isActive 
                        ? `translateX(${(index - activeIndex) * 15}px) scale(1.05)`
                        : 'translateX(0) scale(1)'
                    }}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* Full-width Black Box */}
        <section className="flex-1">
          <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(to left, #7997AE, #BBB3B0)' }}>
            <div className="text-white text-center">
              <h2 className="text-4xl font-bold mb-4">Featured Section</h2>
              <p className="text-xl text-gray-300">This is your full-width black section</p>
            </div>
          </div>
        </section>
        
        {/* Navigation bar at bottom right - same as home page */}
        <nav className="fixed bottom-8 right-16 z-[9999] pointer-events-auto">
                    <ul className="flex flex-row space-x-8 text-white">
            <li className={`transition-all duration-1000 ease-in-out ${homeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <a href="/" className="hover:text-[#7C96AD] transition-colors duration-200 cursor-pointer uppercase">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-[#7C96AD] transition-colors duration-200 cursor-pointer uppercase">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[#7C96AD] transition-colors duration-200 cursor-pointer uppercase">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      <section className="h-full">
          <div className="w-full h-screen flex items-center bg-white"></div>
      </section>
    </>
  );
};

export default ProjectsPage;
