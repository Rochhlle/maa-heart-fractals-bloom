
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface EmotionParticlesProps {
  emotion: 'love' | 'joy' | 'nostalgia' | 'gratitude' | 'serenity';
  intensity: number;
  className?: string;
}

const EmotionParticles = ({ emotion, intensity, className }: EmotionParticlesProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  const emotionColors = {
    love: 'bg-love-400',
    joy: 'bg-warmth-400',
    nostalgia: 'bg-purple-400',
    gratitude: 'bg-green-400',
    serenity: 'bg-serenity-400',
  };

  const emotionShapes = {
    love: 'rounded-full', // circles
    joy: 'rotate-45 rounded-sm', // stars (simplified)
    nostalgia: 'rounded-full', // circles
    gratitude: 'rounded-full', // circles
    serenity: 'rounded-full', // circles
  };

  useEffect(() => {
    // Generate particles based on emotion intensity
    const particleCount = Math.floor(intensity * 30);
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 3,
      delay: Math.random() * 2,
    }));
    
    setParticles(newParticles);
  }, [emotion, intensity]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={cn(
            "emotion-particle absolute opacity-70",
            emotionColors[emotion],
            emotionShapes[emotion]
          )}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default EmotionParticles;
