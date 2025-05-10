
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface HandwritingTextProps {
  children: string;
  className?: string;
  duration?: number; // Duration in milliseconds
  delay?: number; // Delay before starting animation
}

const HandwritingText = ({ 
  children, 
  className, 
  duration = 3000,
  delay = 500
}: HandwritingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isWritten, setIsWritten] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setTimeout(() => {
      setIsWritten(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [isVisible, delay]);
  
  const getLetterStyle = (index: number) => {
    if (!isVisible) return {};
    
    const totalChars = children.length;
    const charDuration = duration / totalChars;
    const charDelay = index * charDuration;
    
    return {
      animationDelay: `${delay + charDelay}ms`,
      animationDuration: `${charDuration * 2}ms`,
    };
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        className
      )}
    >
      <div className="relative z-10">
        {children.split('').map((char, index) => (
          <span
            key={index}
            className={cn(
              "inline-block opacity-0",
              isWritten ? "animate-handwriting" : ""
            )}
            style={getLetterStyle(index)}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HandwritingText;
