
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface HolographicPoetryProps {
  className?: string;
}

const HolographicPoetry = ({ className }: HolographicPoetryProps) => {
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [poetry, setPoetry] = useState<string[]>([]);
  const [emotionIntensity, setEmotionIntensity] = useState(0.5);
  const { toast } = useToast();

  // Mock poetry generation based on input
  const generatePoem = () => {
    if (!userInput.trim()) {
      toast({
        title: "Input needed",
        description: "Please share a memory or thought first",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation with setTimeout
    setTimeout(() => {
      const poems: {[key: string]: string[]} = {
        love: [
          "In her eyes, a universe of love resides,",
          "Hands that heal, a heart that guides.",
          "Mother's love, an eternal flame,",
          "Beyond all words, beyond all fame."
        ],
        childhood: [
          "Tiny footprints across the floor,",
          "Gentle whispers, stories galore.",
          "In her arms, the world feels right,",
          "My mother's love, my guiding light."
        ],
        gratitude: [
          "For every tear you've wiped away,",
          "For silent prayers at break of day.",
          "For endless love that knows no bound,",
          "In your embrace, my peace is found."
        ],
        time: [
          "Through seasons changing, years unfolding,",
          "Your love remains, forever holding.",
          "Time may weather, but never part,",
          "The sacred bond of mother's heart."
        ],
      };

      // Very simple keyword matching
      let selectedPoem: string[] = [];
      if (userInput.match(/love|care|heart|embrace/i)) {
        selectedPoem = poems.love;
      } else if (userInput.match(/child|young|play|grow/i)) {
        selectedPoem = poems.childhood;
      } else if (userInput.match(/thank|grateful|appreciate/i)) {
        selectedPoem = poems.gratitude;
      } else if (userInput.match(/time|year|remember|memory/i)) {
        selectedPoem = poems.time;
      } else {
        // Default poem if no keywords match
        selectedPoem = poems.love;
      }

      // Set emotion intensity based on input length and sentiment
      const newIntensity = Math.min(0.3 + (userInput.length / 100), 1);
      setEmotionIntensity(newIntensity);
      
      // Set the poem with a line-by-line reveal effect
      setPoetry([]);
      selectedPoem.forEach((line, index) => {
        setTimeout(() => {
          setPoetry(prev => [...prev, line]);
        }, index * 800);
      });
      
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className={cn("relative p-6 glassmorphism rounded-xl", className)}>
      <h3 className="text-2xl font-display mb-4 text-white glow-text">Holographic Poetry</h3>
      
      <div className="mb-6">
        <p className="text-white/70 mb-2">Share a memory or thought about your mother</p>
        <div className="flex space-x-2">
          <Input 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Her smile always reminded me of sunshine..."
            className="bg-white/10 text-white border-white/20 placeholder:text-white/40"
          />
          <Button 
            onClick={generatePoem} 
            disabled={isGenerating} 
            className="bg-love-500 hover:bg-love-600 text-white"
          >
            {isGenerating ? "Creating..." : "Generate"}
          </Button>
        </div>
      </div>
      
      <div className="relative min-h-[200px] flex items-center justify-center">
        {poetry.length > 0 ? (
          <div className="poetry-container relative">
            <div className="absolute inset-0 bg-glow-core opacity-30 blur-md"></div>
            <div className="relative z-10">
              {poetry.map((line, index) => (
                <p 
                  key={index}
                  className="poetry-text text-white text-center my-2 animate-grow-fade"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-white/40 text-center italic">
            {isGenerating ? 
              "Crafting your personalized poetry..." : 
              "Your AI-generated poetry will appear here"}
          </div>
        )}
      </div>
    </div>
  );
};

export default HolographicPoetry;
