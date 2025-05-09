
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Emotion {
  name: string;
  label: string;
  description: string;
  color: string;
  gradient: string;
}

interface EmotionSelectorProps {
  onEmotionChange: (emotion: string) => void;
  className?: string;
}

const EmotionSelector = ({ onEmotionChange, className }: EmotionSelectorProps) => {
  const [selectedEmotion, setSelectedEmotion] = useState('love');
  
  const emotions: Emotion[] = [
    {
      name: 'love',
      label: 'Love',
      description: 'Unconditional acceptance and care',
      color: 'bg-love-500',
      gradient: 'from-love-300 to-love-600'
    },
    {
      name: 'joy',
      label: 'Joy',
      description: 'Moments of shared happiness',
      color: 'bg-warmth-500',
      gradient: 'from-warmth-300 to-warmth-600'
    },
    {
      name: 'nostalgia',
      label: 'Nostalgia',
      description: 'Cherished memories of the past',
      color: 'bg-purple-500',
      gradient: 'from-purple-300 to-purple-600'
    },
    {
      name: 'gratitude',
      label: 'Gratitude',
      description: 'Appreciation for all she gives',
      color: 'bg-green-500',
      gradient: 'from-green-300 to-green-600'
    },
    {
      name: 'serenity',
      label: 'Serenity',
      description: 'Peaceful comfort of her presence',
      color: 'bg-serenity-500',
      gradient: 'from-serenity-300 to-serenity-600'
    },
  ];

  useEffect(() => {
    onEmotionChange(selectedEmotion);
  }, [selectedEmotion, onEmotionChange]);

  return (
    <div className={cn("p-6 glassmorphism rounded-xl", className)}>
      <h3 className="text-2xl font-display mb-4 text-white glow-text">Choose Your Emotion</h3>
      
      <p className="text-white/70 mb-6">
        Select the emotion that best represents your feelings about motherhood
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        {emotions.map((emotion) => (
          <button
            key={emotion.name}
            onClick={() => setSelectedEmotion(emotion.name)}
            className={cn(
              "relative py-2 px-4 rounded-full transition-all duration-300",
              "hover:scale-105 hover:shadow-lg",
              selectedEmotion === emotion.name
                ? `bg-gradient-to-r ${emotion.gradient} text-white shadow-md`
                : "bg-white/10 text-white/80 border border-white/20"
            )}
          >
            <span className="relative z-10">{emotion.label}</span>
            {selectedEmotion === emotion.name && (
              <span className="absolute inset-0 opacity-20 blur-sm rounded-full bg-white"></span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center text-white/80">
        {emotions.find(e => e.name === selectedEmotion)?.description}
      </div>
    </div>
  );
};

export default EmotionSelector;
