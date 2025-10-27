'use client';

import { useRef } from 'react';
//import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './components/Container';
import ParallaxSection1 from './components/ParallaxSection1';
import ContentSection1 from './components/ContentSection1';
import HeroTitle from './components/HeroTitle';

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  // Layer configuration for ParallaxSection1
  const parallaxLayers = [
    {
      id: 'layer-1',
      depth: 0, // No movement - regular scroll
      image: '/scene1-layer1.webp'
    },
    {
      id: 'layer-2', 
      depth: -0.1, // Slight movement
      image: '/scene1-layer2.webp'
    },
    {
      id: 'layer-3',
      depth: -0.2, // Medium movement
      image: '/scene1-layer3.webp'
    },
    {
      id: 'layer-4',
      depth: -0.3, // Most movement
      image: '/scene1-layer4.webp'
    }
  ];

  return (
    <div className="w-full h-auto flex flex-col items-center bg-[#CDC5A8]">
      <Container>
        <div ref={parallaxRef} className="relative">
          <ParallaxSection1 layers={parallaxLayers} />
          <HeroTitle triggerRef={parallaxRef} opacities={[0.25, 1]} />
        </div>
        <ContentSection1 
          title="then Jesus told them..."
          body="Suppose one of you has a hundred sheep and loses one of them. Doesn’t he leave the ninety-nine in the open country and go after the lost sheep until he finds it?"
        />
        <ContentSection1 
          title=""
          body=""
        />
      </Container>
    </div>
  );
}
