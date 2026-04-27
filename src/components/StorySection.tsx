"use client";

import { MotionSection } from "@/components/MotionSection";

type StorySectionProps = {
  title: string;
  children: React.ReactNode;
};

export function StorySection({ title, children }: StorySectionProps) {
  return (
    <MotionSection className="liquid-panel rounded-3xl p-5 sm:p-8">
      <h2 className="text-2xl font-semibold text-app-text">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-app-muted md:text-lg md:leading-8">
        {children}
      </div>
    </MotionSection>
  );
}
