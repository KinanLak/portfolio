import type { MusicData } from "@/types/data";

const music: MusicData = {
  title: "EVOL",
  artist: "Portfolio soundtrack",
  src: "/evol.mp3",
  bpm: 124,
  seekBeats: 4,
  // Positive values delay the visuals. Negative values make them react earlier.
  syncOffsetMs: 0,
  loop: true,
};

export default music;
