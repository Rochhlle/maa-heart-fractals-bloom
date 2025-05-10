
import { useState, useEffect, useRef } from 'react';
import MotherTitle from '@/components/MotherTitle';
import HolographicPoetry from '@/components/HolographicPoetry';
import JourneyTimeline from '@/components/JourneyTimeline';
import EmotionSelector from '@/components/EmotionSelector';
import EmotionParticles from '@/components/EmotionParticles';
import PersonalLetter from '@/components/PersonalLetter';
import FractalHeart from '@/components/FractalHeart';
import HandwritingText from '@/components/HandwritingText';
import MemoryTimeline from '@/components/MemoryTimeline';

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeEmotion, setActiveEmotion] = useState<'love' | 'joy' | 'nostalgia' | 'gratitude' | 'serenity'>('love');
  const [emotionIntensity, setEmotionIntensity] = useState(0.3);
  const [showContent, setShowContent] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);
  
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

  // Show content after intro animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);
    return () => clearTimeout(timer);
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
      
      {/* Intro Section with Fractal Heart */}
      <section 
        ref={introRef} 
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-glow-core opacity-20 blur-3xl" 
          style={{
            transform: `translateY(${scrollPosition * 0.2}px)`,
          }}></div>
        
        <FractalHeart className="mb-12 w-64 h-64 md:w-96 md:h-96" />
        
        <div className="text-center z-10 max-w-4xl mx-auto animate-fade-in">
          <MotherTitle className="mb-8" />
          
          <h2 className="text-2xl md:text-3xl text-white/90 font-hindi mb-8 animate-float">
            माँ — मेरी दुनिया की शुरुआत
          </h2>
          
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-hindi">
            हर माँ की कहानी, हर बेटे का प्यार, एक ऐसी यात्रा जो कभी खत्म नहीं होती।
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
          <h2 className="text-3xl font-hindi text-white mb-8 text-center glow-text">
            भावनाओं का सफर
          </h2>
          <EmotionSelector onEmotionChange={handleEmotionChange} />
        </div>
      </section>
      
      {/* Memory Timeline Section with Floating Petals */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-hindi text-white mb-8 text-center glow-text">
            यादों की डोरी
          </h2>
          <MemoryTimeline />
        </div>
      </section>
      
      {/* Journey Timeline Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-hindi text-white mb-8 text-center glow-text">
            मातृत्व की यात्रा
          </h2>
          <JourneyTimeline />
        </div>
      </section>
      
      {/* Holographic Poetry Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-hindi text-white mb-8 text-center glow-text">
            माँ के लिए कविता
          </h2>
          <HolographicPoetry />
        </div>
      </section>

      {/* Personal Letter Section with Handwriting Animation */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-hindi text-white mb-8 text-center glow-text">
            मेरा व्यक्तिगत पत्र
          </h2>
          <HandwritingText className="mb-8">
            माँ, आपको ये पत्र लिखते हुए मेरा दिल भर आया है।
          </HandwritingText>
          <PersonalLetter />
        </div>
      </section>
      
      {/* Final Message Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-hindi text-white mb-6 glow-text">
            आपके लिए एक श्रद्धांजलि
          </h2>
          
          <p className="text-white/80 mb-12 leading-relaxed font-hindi">
            यह अनुभव उस प्यार, त्याग और अटूट समर्थन के लिए समर्पित है
            जो आप हमारे जीवन भर प्रदान करती हैं। आपका प्यार वह आधार है
            जिस पर हम अपनी यात्रा का निर्माण करते हैं।
          </p>
          
          <div className="inline-block animate-float">
            <HandwritingText className="text-3xl font-hindi text-yellow-300">
              मैं बोलता नहीं, पर जो करता हूँ, सब आपके लिए करता हूँ… और ये मेरा वादा है
            </HandwritingText>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
