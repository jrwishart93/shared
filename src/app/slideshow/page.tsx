/* eslint-disable @next/next/no-img-element */
import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { albums } from "@/lib/albums";

type SlideshowPhoto = {
  src: string;
  alt: string;
  caption: string;
};

const PHOTO_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export const metadata: Metadata = {
  title: "Family Photo Frame",
  description: "A lightweight full-screen family slideshow for older iPads.",
};

function publicPhotos(): SlideshowPhoto[] {
  const photosPath = path.join(process.cwd(), "public", "photos");

  if (!fs.existsSync(photosPath)) {
    return [];
  }

  return fs
    .readdirSync(photosPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => PHOTO_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({
      src: `/photos/${name}`,
      alt: name.replace(/[-_]+/g, " ").replace(/\.[^.]+$/, ""),
      caption: "Family photos",
    }));
}

function albumPhotos(): SlideshowPhoto[] {
  return albums.flatMap((album) =>
    (album.photos ?? [album.coverImage]).map((src) => ({
      src,
      alt: album.title,
      caption: [album.location, album.date].filter(Boolean).join(" · "),
    })),
  );
}

function slideshowPhotos() {
  const droppedPhotos = publicPhotos();
  return droppedPhotos.length > 0 ? droppedPhotos : albumPhotos();
}

export default function SlideshowPage() {
  const photos = slideshowPhotos();
  const photosJson = JSON.stringify(photos).replace(/</g, "\\u003c");

  return (
    <main className="slideshow-page" aria-label="Family photo slideshow">
      <div className="slideshow-stage" data-slideshow-root>
        <img className="slide-image slide-image-a is-visible" data-slide-a alt="" />
        <img className="slide-image slide-image-b" data-slide-b alt="" />

        <div className="slide-empty" data-empty hidden>
          Add photos to <code>/public/photos</code> to start the photo frame.
        </div>

        <div className="slide-clock" data-clock aria-label="Current time" />

        <div className="slide-caption" data-caption aria-live="polite" />

        <div className="slide-controls" aria-label="Slideshow controls">
          <button type="button" className="slide-button" data-play-pause>
            Pause
          </button>
          <button type="button" className="slide-button" data-shuffle>
            Shuffle photos
          </button>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `window.__FAMILY_SLIDESHOW_PHOTOS__ = ${photosJson};`,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function () {
  "use strict";

  var photos = window.__FAMILY_SLIDESHOW_PHOTOS__ || [];
  var intervalMs = 5000;
  var index = 0;
  var showingA = true;
  var timer = null;
  var playing = true;

  var imageA = document.querySelector("[data-slide-a]");
  var imageB = document.querySelector("[data-slide-b]");
  var caption = document.querySelector("[data-caption]");
  var clock = document.querySelector("[data-clock]");
  var empty = document.querySelector("[data-empty]");
  var playPause = document.querySelector("[data-play-pause]");
  var shuffle = document.querySelector("[data-shuffle]");

  function setText(node, text) {
    if (node) {
      node.innerHTML = "";
      node.appendChild(document.createTextNode(text || ""));
    }
  }

  function updateClock() {
    var now = new Date();
    var hours = String(now.getHours()).replace(/^([0-9])$/, "0$1");
    var minutes = String(now.getMinutes()).replace(/^([0-9])$/, "0$1");
    setText(clock, hours + ":" + minutes);
  }

  function activeImage() {
    return showingA ? imageA : imageB;
  }

  function nextImage() {
    return showingA ? imageB : imageA;
  }

  function showPhoto(nextIndex) {
    if (!photos.length) {
      if (empty) {
        empty.hidden = false;
      }
      return;
    }

    index = (nextIndex + photos.length) % photos.length;
    var photo = photos[index];
    var incoming = nextImage();
    var outgoing = activeImage();

    incoming.onload = function () {
      incoming.className = incoming.className.replace(/ is-visible/g, "") + " is-visible";
      outgoing.className = outgoing.className.replace(/ is-visible/g, "");
      showingA = !showingA;
      setText(caption, photo.caption || photo.alt || "Family photos");
    };

    incoming.alt = photo.alt || "Family photo";
    incoming.src = photo.src;
  }

  function advance() {
    showPhoto(index + 1);
  }

  function startTimer() {
    stopTimer();
    timer = window.setInterval(advance, intervalMs);
  }

  function stopTimer() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function shufflePhotos() {
    var current = photos[index];
    var i;
    var j;
    var temp;

    for (i = photos.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = photos[i];
      photos[i] = photos[j];
      photos[j] = temp;
    }

    index = 0;
    if (current && photos.length > 1 && photos[0].src === current.src) {
      photos.push(photos.shift());
    }
    showPhoto(0);
  }

  if (playPause) {
    playPause.onclick = function () {
      playing = !playing;
      setText(playPause, playing ? "Pause" : "Play");
      if (playing) {
        startTimer();
      } else {
        stopTimer();
      }
    };
  }

  if (shuffle) {
    shuffle.onclick = shufflePhotos;
  }

  if (photos.length) {
    imageA.alt = photos[0].alt || "Family photo";
    imageA.src = photos[0].src;
    setText(caption, photos[0].caption || photos[0].alt || "Family photos");
    startTimer();
  } else if (empty) {
    empty.hidden = false;
  }

  updateClock();
  window.setInterval(updateClock, 30000);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/slideshow-sw.js").then(function (registration) {
      var urls = photos.map(function (photo) { return photo.src; }).concat(["/slideshow"]);
      if (registration.active) {
        registration.active.postMessage({ type: "CACHE_SLIDES", urls: urls });
      }
    }).catch(function () {});
  }
}());`,
        }}
      />
    </main>
  );
}
