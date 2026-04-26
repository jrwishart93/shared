"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, Pause, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export type HomeSlide = {
  src: string;
  alt: string;
};

type HomeSlideshowProps = {
  slides: HomeSlide[];
};

export function HomeSlideshow({ slides }: HomeSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const activeSlide = slides[activeIndex];
  const visibleThumbs = useMemo(() => slides.slice(0, 10), [slides]);

  useEffect(() => {
    if (!isPlaying || slides.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isPlaying, slides.length]);

  function previousSlide() {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  }

  function nextSlide() {
    setActiveIndex((current) => (current + 1) % slides.length);
  }

  if (!activeSlide) {
    return null;
  }

  return (
    <div className="liquid-panel overflow-hidden rounded-[2rem] p-3">
      <div className="relative h-[30rem] overflow-hidden rounded-[1.5rem] sm:h-[38rem] lg:h-[42rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.src}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              priority={activeIndex === 0}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/10 to-transparent" />

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
          <div className="liquid-glass inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white">
            <Images className="h-4 w-4" />
            {activeIndex + 1} / {slides.length}
          </div>
          <button
            type="button"
            onClick={() => setIsPlaying((current) => !current)}
            className="liquid-glass grid h-11 w-11 place-items-center rounded-full text-white transition hover:-translate-y-0.5"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 items-center justify-between">
          <button
            type="button"
            onClick={previousSlide}
            className="liquid-glass grid h-12 w-12 place-items-center rounded-full text-white transition hover:-translate-x-0.5"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="liquid-glass grid h-12 w-12 place-items-center rounded-full text-white transition hover:translate-x-0.5"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="absolute inset-x-4 bottom-4">
          <div className="liquid-glass rounded-2xl p-3">
            <p className="text-sm font-medium text-white/82">Family preview</p>
            <p className="mt-1 line-clamp-1 text-lg font-semibold text-white">
              {activeSlide.alt}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-10">
        {visibleThumbs.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => {
              setActiveIndex(index);
              setIsPlaying(false);
            }}
            className={`relative h-16 overflow-hidden rounded-2xl border transition sm:h-20 ${
              activeIndex === index
                ? "border-app-accent opacity-100 ring-2 ring-app-accent/30"
                : "border-app-border opacity-72 hover:opacity-100"
            }`}
            aria-label={`Show ${slide.alt}`}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
