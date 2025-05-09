
import { useState } from 'react';
import { cn } from '@/lib/utils';
import EmotionParticles from './EmotionParticles';

interface TimelineStage {
  id: number;
  title: string;
  description: string;
  emotion: 'love' | 'joy' | 'nostalgia' | 'gratitude' | 'serenity';
}

interface JourneyTimelineProps {
  className?: string;
}

const JourneyTimeline = ({ className }: JourneyTimelineProps) => {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [emotionIntensity, setEmotionIntensity] = useState(0.5);

  const stages: TimelineStage[] = [
    {
      id: 1,
      title: "Childhood",
      description: "The nurturing embrace that shaped our earliest memories. A mother's gentle hands guiding first steps.",
      emotion: "love"
    },
    {
      id: 2,
      title: "Adolescence",
      description: "The patient presence during our most transformative years. Wisdom shared through moments of change.",
      emotion: "nostalgia"
    },
    {
      id: 3,
      title: "Adulthood",
      description: "The unbreakable bond that evolves through life's journey. From mentor to friend, always present.",
      emotion: "gratitude"
    },
    {
      id: 4,
      title: "Reflection",
      description: "The eternal connection that transcends time and space. A mother's love becomes our inner guidance.",
      emotion: "serenity"
    }
  ];

  const handleStageHover = (stage: TimelineStage) => {
    setActiveStage(stage.id);
    setEmotionIntensity(0.7);
  };

  return (
    <div className={cn("relative p-6", className)}>
      <h2 className="text-3xl font-display text-white mb-8 text-center glow-text">
        The Journey of Motherhood
      </h2>

      <div className="timeline-container relative">
        <div className="absolute h-1 bg-white/30 left-0 right-0 top-24 md:top-28 z-0"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={cn(
                "journey-card p-5 text-center transition-all duration-500",
                activeStage === stage.id && "border-white/40"
              )}
              onMouseEnter={() => handleStageHover(stage)}
              onFocus={() => handleStageHover(stage)}
            >
              <div className="relative mb-4 h-12">
                <div 
                  className={cn(
                    "w-12 h-12 rounded-full mx-auto relative z-10 border-2",
                    activeStage === stage.id 
                      ? "bg-gradient-to-r from-love-300 to-love-500 border-white" 
                      : "bg-white/20 border-white/50"
                  )}
                >
                  <span className="flex items-center justify-center h-full text-white font-bold">
                    {stage.id}
                  </span>
                </div>
                <div className={cn(
                  "absolute inset-0 rounded-full blur-md transition-opacity duration-500",
                  activeStage === stage.id ? "opacity-50 bg-love-500" : "opacity-0"
                )}></div>
              </div>

              <h3 className="text-xl font-display text-white mb-2">{stage.title}</h3>
              
              <p className={cn(
                "text-sm transition-opacity duration-500",
                activeStage === stage.id ? "text-white" : "text-white/60"
              )}>
                {stage.description}
              </p>
              
              <div className="glow-effect"></div>
              
              {activeStage === stage.id && (
                <EmotionParticles 
                  emotion={stage.emotion} 
                  intensity={emotionIntensity} 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JourneyTimeline;
