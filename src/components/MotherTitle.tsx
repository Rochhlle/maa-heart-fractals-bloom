
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MotherTitleProps {
  className?: string;
  interactive?: boolean;
}

const MotherTitle = ({ className, interactive = true }: MotherTitleProps) => {
  const [isGlowing, setIsGlowing] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!interactive) return;
    
    // Pulse animation effect
    const interval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, [interactive]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    
    // Calculate rotation based on mouse position relative to element center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Max rotation of 10 degrees
    const rotationX = ((mouseY - centerY) / (rect.height / 2)) * -5;
    const rotationY = ((mouseX - centerX) / (rect.width / 2)) * 5;
    
    setRotation(rotationY);
    
    // Add glow effect on hover
    setIsGlowing(true);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setRotation(0);
    setIsGlowing(false);
  };

  return (
    <div 
      className={cn(
        "relative transition-all duration-300 inline-block transform",
        interactive && "cursor-pointer",
        className
      )}
      style={{ transform: `perspective(1000px) rotateY(${rotation}deg)` }}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
    >
      <h1 
        className={cn(
          "mother-title z-10 relative",
          isGlowing && "animate-text-glow"
        )}
      >
        माँ
      </h1>
      {isGlowing && (
        <div className="absolute inset-0 opacity-60 blur-md -z-10 bg-glow-core rounded-full"></div>
      )}
    </div>
  );
};

export default MotherTitle;
