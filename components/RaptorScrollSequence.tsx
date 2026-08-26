'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Loader2, ChevronDown } from 'lucide-react';

interface RaptorScrollSequenceProps {
  scrollYProgress: MotionValue<number>;
}

const FRAME_COUNT = 168;

export default function RaptorScrollSequence({ scrollYProgress }: RaptorScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Smooth the scroll progress to avoid jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate the current frame index (0 to 119)
  const currentFrameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const imgArray: HTMLImageElement[] = [];

    const onLoad = () => {
      loaded++;
      setLoadedCount(loaded);
      if (loaded === FRAME_COUNT) {
        setIsLoaded(true);
      }
    };

    const onError = (e: any) => {
      console.error('Failed to load image', e.target.src);
      // Still count it as loaded to prevent infinite loading state
      onLoad();
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onError;
      img.src = `/sequence/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
      imgArray.push(img);
    }

    setImages(imgArray);
  }, []);

  // Draw function
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const frameIndex = Math.floor(currentFrameIndex.get());
      const img = images[frameIndex];

      if (img && img.complete) {
        // Set canvas dimensions to match display size for crisp rendering
        const { clientWidth, clientHeight } = canvas;
        if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
          canvas.width = clientWidth;
          canvas.height = clientHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // "contain" fit logic
        const imgAspect = img.width / img.height;
        const canvasAspect = canvas.width / canvas.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
          // Canvas is wider than image aspect ratio
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgAspect;
          offsetY = 0;
          offsetX = (canvas.width - drawWidth) / 2;
        } else {
          // Canvas is taller than image aspect ratio
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgAspect;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, images, currentFrameIndex]);

  // Scroll to Explore indicator fade out (visible at 0%, fades out by 10%)
  const indicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
          <div className="relative flex flex-col items-center gap-6">
            <Loader2 className="w-12 h-12 text-white/50 animate-spin" />
            <div className="text-white/60 text-sm tracking-widest uppercase font-semibold">
              Initializing Experience
            </div>
            {/* HUD style progress bar */}
            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <div 
                className="absolute top-0 left-0 h-full bg-white/80 transition-all duration-300 ease-out"
                style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }}
              />
            </div>
            <div className="text-white/40 text-xs tracking-widest font-mono">
              {Math.round((loadedCount / FRAME_COUNT) * 100)}%
            </div>
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in' }}
      />

      {isLoaded && (
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        >
          <span className="text-white/60 text-xs tracking-widest uppercase">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-white/40" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
