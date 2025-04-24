import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MediaSlider({ urls, styles }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const length = urls?.length;

  // Auto-slide logic
  useEffect(() => {
    if (isHover) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex, isHover, length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  return (
    <div className="relative w-full mx-auto border-2 border-blue-100 shadow-lg p-1 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          {urls[currentIndex]?.endsWith(".mp4") ? (
            <video
              onMouseEnter={() => {
                setIsHover(true);
              }}
              onMouseLeave={() => {
                setIsHover(false);
              }}
              src={urls[currentIndex]}
              controls
              muted
              id="video"
              className={`${styles}`}
            />
          ) : (
            <img
              onMouseEnter={() => {
                setIsHover(true);
              }}
              onMouseLeave={() => {
                setIsHover(false);
              }}
              id="image"
              src={urls[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className={`${styles}`}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
