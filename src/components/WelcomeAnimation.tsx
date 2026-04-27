"use client";

import Image from "next/image";
import { Camera, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type WelcomeAnimationProps = {
  message?: string;
};

export function WelcomeAnimation({
  message = "Opening your family albums",
}: WelcomeAnimationProps) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-app-bg/88 px-5 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="liquid-panel relative w-full max-w-sm overflow-hidden rounded-[2rem] p-7 text-center"
      >
        <motion.div
          aria-hidden="true"
          className="absolute -left-12 top-10 h-28 w-28 rounded-full bg-app-accent/20 blur-3xl"
          animate={{ x: [0, 28, 0], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -right-12 bottom-8 h-32 w-32 rounded-full bg-app-warm blur-3xl"
          animate={{ x: [0, -26, 0], opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative">
          <motion.div
            className="mx-auto grid h-24 w-24 place-items-center"
            initial={{ rotate: -4 }}
            animate={{ rotate: [0, -3, 3, 0], y: [0, -4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/albums/logo-image/family-adventures-logo.png"
              alt="Family Adventures"
              width={96}
              height={96}
              priority
              className="h-full w-full object-contain drop-shadow-2xl"
            />
          </motion.div>

          <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-app-border bg-app-card/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-app-warm-text">
            <Sparkles className="h-4 w-4" />
            Welcome
          </div>

          <h2 className="mt-4 text-3xl font-semibold leading-tight text-app-text">
            Welcome to the family adventure.
          </h2>
          <p className="mt-3 text-sm leading-6 text-app-muted">{message}</p>

          <div className="mx-auto mt-6 flex max-w-48 items-center justify-center gap-3">
            {[Camera, Heart, Sparkles].map((Icon, index) => (
              <motion.span
                key={Icon.displayName ?? index}
                className="grid h-11 w-11 place-items-center rounded-full border border-app-border bg-app-card text-app-accent shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: [0, -5, 0] }}
                transition={{
                  delay: index * 0.15,
                  duration: 1.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Icon className="h-5 w-5" />
              </motion.span>
            ))}
          </div>

          <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-app-card">
            <motion.div
              className="h-full rounded-full bg-app-accent"
              initial={{ width: "8%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
