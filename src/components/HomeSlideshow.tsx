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
    <div className="liquid-panel min-w-0 overflow-hidden rounded-[1.75rem] p-2 sm:rounded-[2rem] sm:p-3">
      <div className="relative h-[17.5rem] overflow-hidden rounded-[1.35rem] sm:h-[21rem] md:h-[34rem] md:rounded-[1.5rem] lg:h-[42rem]">
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

        <div className="absolute top-0 inset-x-0 h-0.5 z-10 bg-white/15">
          <motion.div
            key={`progress-${activeIndex}-${isPlaying}`}
            className="h-full bg-white/75"
            initial={{ scaleX: 0 }}
            animate={isPlaying ? { scaleX: 1 } : { scaleX: 0 }}
            transition={isPlaying ? { duration: 4.5, ease: "linear" } : { duration: 0 }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-3 sm:left-4 sm:right-4 sm:top-4">
          <div className="liquid-glass inline-flex max-w-[calc(100%-3.25rem)] items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-white sm:text-sm">
            <Images className="h-4 w-4 flex-none" />
            {activeIndex + 1} / {slides.length}
          </div>
          <button
            type="button"
            onClick={() => setIsPlaying((current) => !current)}
            className="liquid-glass grid h-10 w-10 place-items-center rounded-full text-white transition hover:-translate-y-0.5 sm:h-11 sm:w-11"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="absolute inset-x-2 top-1/2 flex -translate-y-1/2 items-center justify-between sm:inset-x-4">
          <button
            type="button"
            onClick={previousSlide}
            className="liquid-glass grid h-10 w-10 place-items-center rounded-full text-white transition hover:-translate-x-0.5 sm:h-12 sm:w-12"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="liquid-glass grid h-10 w-10 place-items-center rounded-full text-white transition hover:translate-x-0.5 sm:h-12 sm:w-12"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
          <div className="liquid-glass min-w-0 rounded-2xl p-3">
            <p className="text-xs font-medium text-white/82 sm:text-sm">
              Family preview
            </p>
            <p className="mt-1 line-clamp-2 text-[0.92rem] font-semibold leading-5 text-white sm:text-lg">
              {activeSlide.alt}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2.5 flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-10 sm:overflow-visible sm:pb-0">
        {visibleThumbs.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => {
              setActiveIndex(index);
              setIsPlaying(false);
            }}
            className={`relative h-12 w-14 flex-none overflow-hidden rounded-2xl border transition sm:h-20 sm:w-auto ${
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
