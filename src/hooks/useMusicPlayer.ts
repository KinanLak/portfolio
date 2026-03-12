import { useSyncExternalStore } from "react";
import { parseBlob, selectCover } from "music-metadata";
import musicData from "@/data/music";

interface BeatState {
  beatDuration: number;
  beatIndex: number;
  beatInBar: number;
  beatPhase: number;
  isPlaying: boolean;
  syncedTime: number;
}

interface MusicPlayerSnapshot {
  artist: string;
  beatInBar: number;
  beatPhase: number;
  bpm: number;
  coverUrl: string | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isReady: boolean;
  seekBeats: number;
  seekSeconds: number;
  src: string;
  syncOffsetMs: number;
  title: string;
}

function createInitialSnapshot(): MusicPlayerSnapshot {
  return {
    artist: musicData.artist,
    beatInBar: 0,
    beatPhase: 0,
    bpm: musicData.bpm,
    coverUrl: null,
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    isReady: false,
    seekBeats: musicData.seekBeats,
    seekSeconds: (60 / musicData.bpm) * musicData.seekBeats,
    src: musicData.src,
    syncOffsetMs: musicData.syncOffsetMs,
    title: musicData.title,
  };
}

class MusicController {
  private audio: HTMLAudioElement | null = null;
  private coverPromise: Promise<void> | null = null;
  private frameId: number | null = null;
  private listeners = new Set<() => void>();
  private snapshot = createInitialSnapshot();

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = () => this.snapshot;

  init = () => {
    this.ensureAudio();
  };

  togglePlayback = async () => {
    const audio = this.ensureAudio();

    if (!audio) return;

    if (audio.paused || audio.ended) {
      await audio.play();
      return;
    }

    audio.pause();
  };

  pause = () => {
    this.audio?.pause();
  };

  seekTo = (time: number) => {
    const audio = this.ensureAudio();

    if (!audio) return;

    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    const nextTime = Math.min(Math.max(time, 0), duration || 0);
    audio.currentTime = nextTime;
    this.syncSnapshot();
  };

  seekByBeats = (direction: number) => {
    const beatDuration = 60 / musicData.bpm;
    this.seekTo((this.audio?.currentTime ?? 0) + beatDuration * musicData.seekBeats * direction);
  };

  getBeatState = (): BeatState => {
    const currentTime = this.audio?.currentTime ?? 0;
    const isPlaying = Boolean(this.audio && !this.audio.paused && !this.audio.ended);
    return this.computeBeatState(currentTime, isPlaying);
  };

  private emit() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  private setSnapshot(nextSnapshot: MusicPlayerSnapshot) {
    this.snapshot = nextSnapshot;
    this.emit();
  }

  private ensureAudio() {
    if (typeof window === "undefined") return null;

    if (this.audio) return this.audio;

    const audio = new Audio(musicData.src);
    audio.preload = "auto";
    audio.loop = musicData.loop;

    audio.addEventListener("loadedmetadata", this.handleLoadedMetadata);
    audio.addEventListener("timeupdate", this.syncSnapshot);
    audio.addEventListener("play", this.handlePlay);
    audio.addEventListener("pause", this.handlePause);
    audio.addEventListener("seeked", this.syncSnapshot);
    audio.addEventListener("ended", this.handlePause);

    this.audio = audio;
    void this.loadCover();

    return audio;
  }

  private computeBeatState(currentTime: number, isPlaying: boolean): BeatState {
    const beatDuration = 60 / musicData.bpm;
    const syncedTime = Math.max(0, currentTime - musicData.syncOffsetMs / 1000);
    const beatProgress = syncedTime / beatDuration;
    const beatIndex = Math.max(0, Math.floor(beatProgress));

    return {
      beatDuration,
      beatIndex,
      beatInBar: beatIndex % 4,
      beatPhase: beatProgress - Math.floor(beatProgress),
      isPlaying,
      syncedTime,
    };
  }

  private handleLoadedMetadata = () => {
    this.syncSnapshot();
  };

  private handlePlay = () => {
    this.startFrameLoop();
    this.syncSnapshot();
  };

  private handlePause = () => {
    this.stopFrameLoop();
    this.syncSnapshot();
  };

  private startFrameLoop() {
    if (this.frameId !== null) return;

    this.frameId = window.requestAnimationFrame(this.syncWhilePlaying);
  }

  private stopFrameLoop() {
    if (this.frameId === null) return;

    window.cancelAnimationFrame(this.frameId);
    this.frameId = null;
  }

  private syncWhilePlaying = () => {
    this.syncSnapshot();

    if (this.audio && !this.audio.paused && !this.audio.ended) {
      this.frameId = window.requestAnimationFrame(this.syncWhilePlaying);
      return;
    }

    this.frameId = null;
  };

  private syncSnapshot = () => {
    const currentTime = this.audio?.currentTime ?? 0;
    const duration = this.audio && Number.isFinite(this.audio.duration) ? this.audio.duration : 0;
    const isPlaying = Boolean(this.audio && !this.audio.paused && !this.audio.ended);
    const beatState = this.computeBeatState(currentTime, isPlaying);

    this.setSnapshot({
      ...this.snapshot,
      beatInBar: beatState.beatInBar,
      beatPhase: beatState.beatPhase,
      currentTime,
      duration,
      isPlaying,
      isReady: Boolean(this.audio && this.audio.readyState >= 1),
    });
  };

  private async loadCover() {
    if (this.coverPromise) return this.coverPromise;

    this.coverPromise = (async () => {
      try {
        const response = await fetch(musicData.src);

        if (!response.ok) return;

        const blob = await response.blob();
        const metadata = await parseBlob(blob);
        const picture = selectCover(metadata.common.picture);

        if (!picture) return;

        this.setSnapshot({
          ...this.snapshot,
          coverUrl: this.pictureToDataUrl(picture),
        });
      } catch {
        // Ignore cover extraction failures and keep the fallback artwork.
      }
    })();

    return this.coverPromise;
  }

  private pictureToDataUrl(picture: { data: Uint8Array; format: string }) {
    let binary = "";
    const chunkSize = 0x8000;

    for (let index = 0; index < picture.data.length; index += chunkSize) {
      const chunk = picture.data.subarray(index, index + chunkSize);
      binary += String.fromCharCode(...chunk);
    }

    return `data:${picture.format};base64,${window.btoa(binary)}`;
  }
}

export const musicController = new MusicController();

export function useMusicPlayer() {
  return useSyncExternalStore(
    musicController.subscribe,
    musicController.getSnapshot,
    musicController.getSnapshot
  );
}
