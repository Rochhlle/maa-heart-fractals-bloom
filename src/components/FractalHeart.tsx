
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FractalHeartProps {
  className?: string;
}

const FractalHeart = ({ className }: FractalHeartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const size = Math.min(window.innerWidth * 0.8, 600);
      canvas.width = size;
      canvas.height = size;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation variables
    let time = 0;
    let animationFrameId: number;
    let heartSize = 0;
    
    // Draw fractal heart
    const drawHeart = (x: number, y: number, size: number, iteration: number, hue: number) => {
      if (iteration <= 0 || size < 1) return;
      
      // Heart shape coordinates
      const drawHeartPath = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
        const topCurveHeight = size * 0.3;
        ctx.beginPath();
        ctx.moveTo(x, y + topCurveHeight);
        
        // Left curve
        ctx.bezierCurveTo(
          x - size / 2, y - size / 4,
          x - size, y + topCurveHeight,
          x, y + size
        );
        
        // Right curve
        ctx.bezierCurveTo(
          x + size, y + topCurveHeight,
          x + size / 2, y - size / 4,
          x, y + topCurveHeight
        );
        
        ctx.closePath();
      };
      
      ctx.save();
      
      // Color based on depth and time
      const color = `hsla(${(hue + time * 20) % 360}, 100%, 70%, ${0.7 + 0.3 * Math.sin(time + iteration)})`;
      ctx.fillStyle = color;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = size * 0.05;
      
      // Draw main heart
      drawHeartPath(ctx, x, y, size);
      ctx.fill();
      ctx.stroke();
      
      // Draw smaller hearts
      if (iteration > 1) {
        // Top heart
        drawHeart(x, y - size * 0.3, size * 0.4, iteration - 1, hue + 30);
        
        // Bottom heart
        drawHeart(x, y + size * 0.5, size * 0.4, iteration - 1, hue + 60);
        
        // Left heart
        drawHeart(x - size * 0.4, y + size * 0.2, size * 0.3, iteration - 1, hue + 90);
        
        // Right heart
        drawHeart(x + size * 0.4, y + size * 0.2, size * 0.3, iteration - 1, hue + 120);
      }
      
      ctx.restore();
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Grow heart to full size
      if (heartSize < 1) {
        heartSize += 0.01;
      }
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxSize = canvas.width * 0.4 * heartSize;
      
      drawHeart(centerX, centerY, maxSize, 4, time * 10);
      
      time += 0.01;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <div className={cn("relative", className)}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full animate-grow-fade"
      />
      <div className="absolute inset-0 bg-glow-core opacity-20 filter blur-xl"></div>
    </div>
  );
};

export default FractalHeart;
