"use client";

import type { Album } from "@/lib/albums";
import { AlbumCTA } from "@/components/AlbumCTA";
import { AlbumHero } from "@/components/AlbumHero";
import { AlbumPhotoGrid } from "@/components/AlbumPhotoGrid";
import { CommentsSection } from "@/components/CommentsSection";
import { EditableStorySection } from "@/components/EditableStorySection";
import { MemoryHighlights } from "@/components/MemoryHighlights";

const ALBUM_SLUG = "camping-trip-april-2026";

type SectionDef = { id: string; title: string; paragraphs: string[] };

const mainSection: SectionDef = {
  id: "main-story",
  title: "Camping Trip — April 2026",
  paragraphs: [
    "Jamie had taken annual leave with the plan that Karen, Bess and Marley would be travelling over from Australia to visit Scotland. The weather had lined up perfectly, everything was set, and it was shaping up to be a great few weeks together.",
    "Then, out of nowhere, world events stepped in. Flights were cancelled following unrest in the Middle East, and the trip had to be called off.",
    "Although disappointed, we took the opportunity of having time off together and a rare stretch of good weather to get away for a few days and make the most of it.",
  ],
};

const howItCameAbout: SectionDef = {
  id: "how-it-came-about",
  title: "How the trip came about",
  paragraphs: [
    "With a new bell tent sitting unused, it felt like the perfect chance to put it to use. The car was packed, and with Tin doing some quick research on the drive down from Edinburgh, a last-minute destination appeared: Southerness Holiday Park.",
  ],
};

const journeySouth: SectionDef = {
  id: "journey-south",
  title: "The journey south",
  paragraphs: [
    "The first stop was Moffat Park, a chance to stretch the legs after leaving Edinburgh.",
    "Dunedin made a beeline for the pond, watching the ducks and swan while enjoying a run around the park. A simple stop, but a lovely start to the trip and a chance to slow things down before getting back on the road.",
    "Not long after, we continued south towards Southerness, with the plan taking shape as we went.",
  ],
};

const settingUpCamp: SectionDef = {
  id: "setting-up-camp",
  title: "Setting up camp",
  paragraphs: [
    "Arriving on site, the first job was getting the bell tent up and running. The entrance was carefully positioned to look out towards Criffel, giving the whole setup a surprisingly scenic backdrop.",
    "Not long after, Nana Josie and cousin Jayme arrived to help get everything sorted. With camp set, it was straight into holiday mode.",
    "The evening was spent over at the entertainment venue where a kids’ show was in full swing. Dunedin and Jayme danced their way through the night, fuelled mostly by excitement and ice cream. A stop at the park in the evening sun rounded things off before saying goodbye and settling in for the night.",
    "It was a cold one, dropping to around 2°C. Everyone huddled in, but despite the chill, Callie had one of her most settled nights in quite a while.",
  ],
};

const secondDay: SectionDef = {
  id: "second-day",
  title: "The second day",
  paragraphs: [
    "The morning started slowly. Bacon rolls were made at the tent, before Grandpa Robin and Glama Ella arrived to join for coffee and a second round at the restaurant.",
    "A walk took everyone down to Southerness Lighthouse, along the beachfront and through the caravan park, with the kind of easy pace that makes these trips feel simple and relaxed.",
    "On the way back, a quick stop at Halfords solved the main problem from the night before. A camping electric hook-up converter meant that warmth was now part of the plan.",
  ],
};

const mabieFarm: SectionDef = {
  id: "mabie-farm",
  title: "Mabie Farm Park",
  paragraphs: [
    "That afternoon was spent at Mabie Farm Park, where the family were welcomed by Allan, who has been running the farm for decades and had crossed paths with Grandpa Robin before.",
    "There were animals to feed, parks to explore, a few questionable slides, and a farm train to ride. Dunedin was in her element, especially with the freedom to run around, watching dogs pass by and soaking up the sunshine.",
    "Both girls came back smiling, a little sun-kissed from the day.",
    "For Caledonia, it was her first proper camping trip. Dunedin, already well travelled, having camped in Australia and Canada, seemed right at home showing her the ropes.",
  ],
};

const surpriseAtCamp: SectionDef = {
  id: "surprise-at-camp",
  title: "A surprise at camp",
  paragraphs: [
    "Back at camp, there was an unexpected surprise.",
    "Uncle Jimmy had arrived and pitched up beside us in his Renault campervan. Completely by coincidence, he had been planning his own trip to Southerness and ended up arriving at exactly the same time. What had started as a quiet family getaway suddenly felt like something much bigger.",
    "Dinner was cooked on the camping stove, helped along by Jimmy’s impressively well-equipped van, which seemed to have everything you could possibly need.",
    "As the evening rolled on, Grandpa Robin and Uncle Aleksei joined, bringing a few beers and settling in for the night. The group sat out watching the sun go down, chatting, laughing, and chasing Dunedin around the campsite until it was finally time to turn in.",
    "This time, the tent was warm.",
    "A small upgrade, but a big one.",
  ],
};

const finalDay: SectionDef = {
  id: "final-day",
  title: "A final day on the road",
  paragraphs: [
    "The next morning, camp was packed down and the trip turned into more of a wander.",
    "First stop was Logan Botanic Garden, a place that feels completely different to the rest of Scotland. Thanks to the Gulf Stream, tropical plants from the Americas and Caribbean grow outdoors, giving it a unique atmosphere.",
    "The Tasmanian section stood out in particular, with plants that felt oddly familiar.",
    "From there, the journey continued into Galloway Forest Park, before heading on towards Loch Doon.",
    "Dinner was made by the water, with views across the loch and the hills beyond. A quiet moment to slow things down before heading home.",
    "The drive back to Edinburgh followed winding country roads, with the sun setting in the distance. A simple ending to a trip that had not gone to plan, but turned out better than expected.",
  ],
};

const inTheEnd: SectionDef = {
  id: "in-the-end",
  title: "In the end",
  paragraphs: [
    "It was not the trip that had been planned.",
    "But it was one that felt worth remembering.",
    "A last-minute decision, a bit of luck, and a handful of small moments that came together into something better than expected.",
  ],
};

export function CampingTripStory({ album }: { album: Album }) {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-app-bg px-4 py-6 sm:px-6 md:py-8 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
        <AlbumHero album={album} />

        <AlbumPhotoGrid photos={album.photos ?? []} />

        <EditableStorySection
          albumSlug={ALBUM_SLUG}
          sectionId={mainSection.id}
          defaultTitle={mainSection.title}
          defaultParagraphs={mainSection.paragraphs}
        />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <EditableStorySection
            albumSlug={ALBUM_SLUG}
            sectionId={howItCameAbout.id}
            defaultTitle={howItCameAbout.title}
            defaultParagraphs={howItCameAbout.paragraphs}
          />
          <EditableStorySection
            albumSlug={ALBUM_SLUG}
            sectionId={journeySouth.id}
            defaultTitle={journeySouth.title}
            defaultParagraphs={journeySouth.paragraphs}
          />
        </div>

        <EditableStorySection
          albumSlug={ALBUM_SLUG}
          sectionId={settingUpCamp.id}
          defaultTitle={settingUpCamp.title}
          defaultParagraphs={settingUpCamp.paragraphs}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <EditableStorySection
            albumSlug={ALBUM_SLUG}
            sectionId={secondDay.id}
            defaultTitle={secondDay.title}
            defaultParagraphs={secondDay.paragraphs}
          />
          <EditableStorySection
            albumSlug={ALBUM_SLUG}
            sectionId={mabieFarm.id}
            defaultTitle={mabieFarm.title}
            defaultParagraphs={mabieFarm.paragraphs}
          />
        </div>

        <MemoryHighlights />

        <EditableStorySection
          albumSlug={ALBUM_SLUG}
          sectionId={surpriseAtCamp.id}
          defaultTitle={surpriseAtCamp.title}
          defaultParagraphs={surpriseAtCamp.paragraphs}
        />

        <EditableStorySection
          albumSlug={ALBUM_SLUG}
          sectionId={finalDay.id}
          defaultTitle={finalDay.title}
          defaultParagraphs={finalDay.paragraphs}
        />

        <EditableStorySection
          albumSlug={ALBUM_SLUG}
          sectionId={inTheEnd.id}
          defaultTitle={inTheEnd.title}
          defaultParagraphs={inTheEnd.paragraphs}
        />

        <AlbumCTA icloudUrl={album.icloudUrl} />

        <CommentsSection albumSlug={album.slug} />
      </div>
    </main>
  );
}
