'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { Loader2, ChevronDown } from 'lucide-react';

interface RaptorScrollSequenceProps {
  smoothProgress: MotionValue<number>;
  canvasOpacity?: MotionValue<number>;
}

const FRAME_COUNT = 168;

export default function RaptorScrollSequence({ smoothProgress, canvasOpacity }: RaptorScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastDrawnIndexRef = useRef<number>(-1);
  const canvasDimensionsRef = useRef<{ width: number; height: number; dpr: number }>({
    width: 0,
    height: 0,
    dpr: 1
  });

  // Calculate the current frame index (0 to FRAME_COUNT - 1)
  const currentFrameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload images progressively with bulletproof fallback
  useEffect(() => {
    let isMounted = true;
    let loaded = 0;
    const imgArray: HTMLImageElement[] = [];

    const handleLoaded = () => {
      if (!isMounted) return;
      loaded++;
      setLoadedCount(loaded);
      
      // Unlock experience as soon as initial batch is ready (20% or 35 frames)
      // or when all frames finish
      if (loaded >= Math.min(30, FRAME_COUNT)) {
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = handleLoaded;
      img.onerror = handleLoaded; // Treat errors as loaded so it never blocks
      img.src = `/sequence/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;

      // If already cached by browser
      if (img.complete && img.naturalWidth > 0) {
        handleLoaded();
      }

      imgArray.push(img);
    }

    setImages(imgArray);

    // Hard fallback timer: Never keep user stuck for more than 1.5s
    const safetyTimer = setTimeout(() => {
      if (isMounted) {
        setIsLoaded(true);
      }
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
    };
  }, []);

  // Optimized draw frame function with fallback to nearest loaded frame
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));
    let img = images[clampedIndex];

    // If target frame is not yet loaded, use closest loaded frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Search backwards
      for (let k = clampedIndex - 1; k >= 0; k--) {
        if (images[k]?.complete && images[k].naturalWidth > 0) {
          img = images[k];
          break;
        }
      }
      // Search forwards if still not found
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let k = clampedIndex + 1; k < images.length; k++) {
          if (images[k]?.complete && images[k].naturalWidth > 0) {
            img = images[k];
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { width, height } = canvasDimensionsRef.current;
    if (width === 0 || height === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Contain fit logic
    const imgAspect = img.width / img.height;
    const canvasAspect = width / height;
    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

    if (canvasAspect > imgAspect) {
      drawHeight = height;
      drawWidth = height * imgAspect;
      offsetY = 0;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawWidth = width;
      drawHeight = width / imgAspect;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    }

    // Multiply by devicePixelRatio for crisp high-DPI rendering
    const dpr = canvasDimensionsRef.current.dpr;
    ctx.drawImage(
      img,
      offsetX * dpr,
      offsetY * dpr,
      drawWidth * dpr,
      drawHeight * dpr
    );

    lastDrawnIndexRef.current = clampedIndex;
  }, [images]);

  // Handle Resize & HiDPI resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance

      canvasDimensionsRef.current = {
        width: rect.width,
        height: rect.height,
        dpr
      };

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      // Force immediate redraw after resize
      if (lastDrawnIndexRef.current >= 0) {
        drawFrame(lastDrawnIndexRef.current);
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(canvas);
    window.addEventListener('resize', updateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, [drawFrame]);

  // Continuous smooth animation loop synchronized with framer-motion spring
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    let animationFrameId: number;

    const renderLoop = () => {
      const currentIdx = currentFrameIndex.get();
      // Redraw whenever the fractional frame changes enough to pick a new frame
      if (Math.round(currentIdx) !== lastDrawnIndexRef.current) {
        drawFrame(currentIdx);
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Initial draw
    drawFrame(currentFrameIndex.get());
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, images, currentFrameIndex, drawFrame]);

  // Scroll to Explore indicator fade out (visible at start, smoothly fades out by 8%)
  const indicatorOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const indicatorY = useTransform(smoothProgress, [0, 0.08], [0, 15]);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
          <div className="relative flex flex-col items-center gap-6">
            <Loader2 className="w-10 h-10 text-white/60 animate-spin" />
            <div className="text-white/70 text-xs tracking-[0.3em] uppercase font-semibold">
              Calibrating Systems
            </div>
            {/* HUD style progress bar */}
            <div className="w-60 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/40 via-white to-white/40 transition-all duration-200 ease-out"
                style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }}
              />
            </div>
            <div className="text-white/40 text-xs tracking-widest font-mono">
              {Math.round((loadedCount / FRAME_COUNT) * 100)}%
            </div>
          </div>
        </div>
      )}

      <motion.canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none will-change-transform"
        style={{
          opacity: canvasOpacity || (isLoaded ? 1 : 0),
        }}
      />

      {isLoaded && (
        <motion.div
          style={{ opacity: indicatorOpacity, y: indicatorY }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none will-change-transform"
        >
          <span className="text-white/50 text-[11px] tracking-[0.25em] uppercase font-medium">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-white/40" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

