
import { useState, useEffect } from 'react';
import MotherTitle from '@/components/MotherTitle';
import HolographicPoetry from '@/components/HolographicPoetry';
import JourneyTimeline from '@/components/JourneyTimeline';
import EmotionSelector from '@/components/EmotionSelector';
import EmotionParticles from '@/components/EmotionParticles';
import PersonalLetter from '@/components/PersonalLetter';

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeEmotion, setActiveEmotion] = useState<'love' | 'joy' | 'nostalgia' | 'gratitude' | 'serenity'>('love');
  const [emotionIntensity, setEmotionIntensity] = useState(0.3);
  
  // Update scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Map emotion names to types
  const handleEmotionChange = (emotion: string) => {
    setActiveEmotion(emotion as 'love' | 'joy' | 'nostalgia' | 'gratitude' | 'serenity');
    setEmotionIntensity(0.6); // Increase intensity on change
    
    // Gradually decrease intensity
    setTimeout(() => setEmotionIntensity(0.3), 5000);
  };

  // Background gradients for different emotions
  const emotionBackgrounds = {
    love: 'from-[#4A0054] via-[#251431] to-[#000B37]',
    joy: 'from-[#FF8C00] via-[#6B2D5C] to-[#000B37]',
    nostalgia: 'from-[#5E3F96] via-[#251431] to-[#000B37]',
    gratitude: 'from-[#165B33] via-[#251431] to-[#000B37]',
    serenity: 'from-[#0A4D68] via-[#251431] to-[#000B37]',
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${emotionBackgrounds[activeEmotion]} transition-colors duration-1000`}>
      <EmotionParticles emotion={activeEmotion} intensity={emotionIntensity} className="fixed inset-0 z-0" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-glow-core opacity-20 blur-3xl" 
          style={{
            transform: `translateY(${scrollPosition * 0.2}px)`,
          }}></div>
        
        <div className="text-center z-10 max-w-4xl mx-auto">
          <MotherTitle className="mb-8" />
          
          <h2 className="text-2xl md:text-3xl text-white/90 font-light mb-8 animate-float">
            एक अद्भुत यात्रा
          </h2>
          
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Explore the emotional journey of motherhood through an interactive experience 
            that celebrates the eternal bond between mother and child.
          </p>
          
          <div className="animate-pulse-glow">
            <svg 
              className="w-8 h-8 mx-auto text-white opacity-70" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Emotion Selector Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <EmotionSelector onEmotionChange={handleEmotionChange} />
        </div>
      </section>
      
      {/* Journey Timeline Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <JourneyTimeline />
        </div>
      </section>
      
      {/* Holographic Poetry Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <HolographicPoetry />
        </div>
      </section>

      {/* Personal Letter Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <PersonalLetter />
        </div>
      </section>
      
      {/* Final Message Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display text-white mb-6 glow-text">
            A Tribute to You
          </h2>
          
          <p className="text-white/80 mb-12 leading-relaxed">
            This experience is dedicated to the love, sacrifice, and unwavering support 
            that you provide throughout our lives. Your love is the foundation upon 
            which we build our journey.
          </p>
          
          <div className="inline-block animate-float">
            <MotherTitle interactive={false} className="text-4xl" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
