
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import EmotionParticles from './EmotionParticles';

interface Memory {
  id: number;
  title: string;
  description: string;
  year: string;
  emotion: 'love' | 'joy' | 'nostalgia' | 'gratitude' | 'serenity';
}

interface MemoryTimelineProps {
  className?: string;
}

const MemoryTimeline = ({ className }: MemoryTimelineProps) => {
  const [activeMemory, setActiveMemory] = useState<number>(1);
  const [emotionIntensity, setEmotionIntensity] = useState(0.4);
  const containerRef = useRef<HTMLDivElement>(null);
  const [petals, setPetals] = useState<Array<{id: number, x: number, y: number, size: number, rotation: number}>>([]);
  
  const memories: Memory[] = [
    {
      id: 1,
      title: "बचपन की यादें",
      description: "जब माँ मुझे पहली बार स्कूल छोड़ने गईं, उनकी आँखों में मेरे लिए प्रेम और चिंता थी।",
      year: "2000",
      emotion: "nostalgia"
    },
    {
      id: 2,
      title: "पहला पुरस्कार",
      description: "जब मैंने पहला पुरस्कार जीता, माँ की आँखों में खुशी के आंसू थे।",
      year: "2005",
      emotion: "joy"
    },
    {
      id: 3,
      title: "बीमारी का समय",
      description: "जब मैं बीमार था, माँ रात भर जागकर मेरी देखभाल करती थीं।",
      year: "2010",
      emotion: "gratitude"
    },
    {
      id: 4,
      title: "गृह प्रवेश",
      description: "जब मैंने पहली बार अपना घर खरीदा, माँ ने मुझे आशीर्वाद दिया।",
      year: "2020",
      emotion: "serenity"
    }
  ];

  // Generate floating petals
  useEffect(() => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    
    // Create initial petals
    const initialPetals = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: 15 + Math.random() * 30,
      rotation: Math.random() * 360
    }));
    
    setPetals(initialPetals);
    
    // Animation frame for petal movement
    let animationId: number;
    let lastTime = 0;
    
    const animatePetals = (time: number) => {
      if (!containerRef.current) return;
      
      const deltaTime = time - lastTime;
      lastTime = time;
      
      setPetals(prev => prev.map(petal => {
        // Apply gentle floating motion
        const newY = petal.y - 0.2 * (deltaTime / 16); // Move upward slowly
        const newX = petal.x + Math.sin(time * 0.001 + petal.id) * 0.2; // Gentle side-to-side motion
        const newRotation = petal.rotation + 0.05 * (deltaTime / 16); // Slow rotation
        
        // Reset petal position if it goes off screen
        if (newY < -50) {
          return {
            ...petal,
            y: height + 50,
            x: Math.random() * width,
          };
        }
        
        return {
          ...petal,
          y: newY,
          x: newX,
          rotation: newRotation
        };
      }));
      
      animationId = requestAnimationFrame(animatePetals);
    };
    
    animationId = requestAnimationFrame(animatePetals);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleMemoryClick = (memory: Memory) => {
    setActiveMemory(memory.id);
    setEmotionIntensity(0.7);
    
    // Gradually decrease intensity
    setTimeout(() => setEmotionIntensity(0.4), 3000);
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative p-6 min-h-[60vh] overflow-hidden", className)}
    >
      {/* Floating Petals */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute pointer-events-none"
          style={{
            left: `${petal.x}px`,
            top: `${petal.y}px`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            transform: `rotate(${petal.rotation}deg)`,
            opacity: 0.7 + Math.random() * 0.3,
            zIndex: 1
          }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 0C50 0 65 35 95 40C65 45 50 100 50 100C50 100 35 45 5 40C35 35 50 0 50 0Z"
              fill={`rgba(255, 200, 220, ${0.6 + Math.random() * 0.4})`}
            />
          </svg>
        </div>
      ))}
      
      <div className="relative z-10">
        <div className="memory-timeline grid grid-cols-1 md:grid-cols-4 gap-8">
          {memories.map((memory) => (
            <div
              key={memory.id}
              className={cn(
                "memory-card p-4 rounded-xl backdrop-blur-md transition-all duration-500 cursor-pointer",
                activeMemory === memory.id 
                  ? "bg-white/20 border-2 border-white/50 scale-105"
                  : "bg-white/10 border border-white/20"
              )}
              onClick={() => handleMemoryClick(memory)}
            >
              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-hindi bg-white/20 mb-3">
                  {memory.year}
                </span>
                <h3 className="text-xl font-hindi text-white mb-2">{memory.title}</h3>
                <p className={cn(
                  "text-sm font-hindi transition-opacity duration-500",
                  activeMemory === memory.id ? "text-white" : "text-white/60"
                )}>
                  {memory.description}
                </p>
                
                {activeMemory === memory.id && (
                  <EmotionParticles 
                    emotion={memory.emotion}
                    intensity={emotionIntensity}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryTimeline;
