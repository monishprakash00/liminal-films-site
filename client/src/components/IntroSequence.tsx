import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import introVideo from "@/assets/videos/intro.mp4";

interface IntroSequenceProps {
  onComplete: () => void;
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setIsVisible(false);
    setTimeout(onComplete, 2000); // Wait for the fade out animation to finish
  };

  // Fallback in case video fails to load or play
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current && videoRef.current.readyState < 3) {
        handleVideoEnd();
      }
    }, 5000); // 5 seconds fallback

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src={introVideo}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}