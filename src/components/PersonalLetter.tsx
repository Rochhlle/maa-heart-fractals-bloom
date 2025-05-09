
import { cn } from '@/lib/utils';
import { useState } from 'react';
import EmotionParticles from './EmotionParticles';

interface PersonalLetterProps {
  className?: string;
}

const PersonalLetter = ({ className }: PersonalLetterProps) => {
  const [emotionIntensity, setEmotionIntensity] = useState(0.3);

  // Increase emotion intensity on hover
  const handleMouseEnter = () => {
    setEmotionIntensity(0.7);
  };

  // Decrease emotion intensity on leave
  const handleMouseLeave = () => {
    setEmotionIntensity(0.3);
  };

  return (
    <div 
      className={cn("relative p-8 max-w-3xl mx-auto glassmorphism rounded-2xl", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <EmotionParticles emotion="love" intensity={emotionIntensity} />
      
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-display text-white mb-8 text-center glow-text">
          मेरा व्यक्तिगत पत्र
        </h2>
        
        <div className="text-white space-y-6 text-center">
          <p className="text-xl md:text-2xl font-hindi">
            माँ – सिर्फ जन्म नहीं देती, <br />
            वो आत्मा बनकर साथ रहती है।
          </p>
          
          <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
            <p className="font-hindi mb-4">माते,</p>
            <p className="font-hindi mb-4">
              मैं बोलता नहीं... <br />
              लेकिन मेरी हर कोशिश – सिर्फ आपके लिए है। <br />
              जो भी हूँ, आपकी वजह से हूँ। <br />
              आपका आशीर्वाद – मेरी सबसे बड़ी ताकत है।
            </p>
            
            <p className="font-hindi mb-4">
              मैं बोलता नहीं <br />
              पर जो करता हूँ, <br />
              वो सब आपके लिए है।
            </p>
            
            <p className="font-hindi mb-4">
              मेरी हर चीज़ – सिर्फ आपके लिए।
            </p>
            
            <p className="font-hindi mb-4">
              ये सब कुछ, <br />
              आपको सब कुछ देने की कोशिश है।
            </p>
            
            <p className="font-hindi">
              और ये मेरा वादा है – <br />
              <span className="font-bold text-yellow-400">ये ज़रूर होगा।</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLetter;
