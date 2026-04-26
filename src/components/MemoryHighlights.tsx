"use client";

import { Heart, MapPin, Tent, UsersRound } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";

const highlights = [
  {
    title: "First camping trip for Callie",
    icon: Heart,
  },
  {
    title: "Dunedin loved the freedom of the campsite",
    icon: UsersRound,
  },
  {
    title: "Bell tent tested properly",
    icon: Tent,
  },
  {
    title: "Cold first night, warm second night",
    icon: Tent,
  },
  {
    title: "Loch Doon dinner by the water",
    icon: MapPin,
  },
  {
    title: "Family joining along the way",
    icon: Heart,
  },
];

export function MemoryHighlights() {
  return (
    <MotionSection className="liquid-panel rounded-3xl p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-app-warm-text">
        Memory highlights
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-app-text">
        Small moments worth keeping
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((highlight) => {
          const Icon = highlight.icon;

          return (
            <div
              key={highlight.title}
              className="liquid-glass rounded-2xl p-4 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Icon className="h-5 w-5 text-app-accent" />
              <p className="mt-3 font-semibold leading-6 text-[#3b332d]">
                {highlight.title}
              </p>
            </div>
          );
        })}
      </div>
    </MotionSection>
  );
}
