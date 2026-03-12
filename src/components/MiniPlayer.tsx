import { ArrowLeft01Icon, ArrowRight01Icon, PauseIcon, PlayIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { musicController, useMusicPlayer } from "@/hooks/useMusicPlayer";

export default function MiniPlayer() {
  const { beatPhase, coverUrl, currentTime, duration, isPlaying, seekBeats, title } = useMusicPlayer();

  const beatGlow = isPlaying ? 1 + Math.max(0, 1 - beatPhase * 5) * 0.08 : 1;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <aside className="fixed top-4 right-4 z-[60] flex w-[min(16rem,calc(100vw-2rem))] items-center gap-2.5 overflow-hidden rounded-full border border-white/10 bg-black/70 py-1 pr-3 pl-1 backdrop-blur-xl">
      {/* Vinyl disc */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
        <div className="music-player-disc-scale" style={{ transform: `scale(${beatGlow})` }}>
          <div className={`music-player-disc ${isPlaying ? "is-playing" : ""}`}>
            {coverUrl ? (
              <img src={coverUrl} alt={`${title} cover`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_65%_70%,rgba(255,102,0,0.75),rgba(5,5,5,0.95)_75%)] font-display text-sm tracking-[0.14em] text-white-pure">
                {title.slice(0, 1)}
              </div>
            )}
            <span className="music-player-disc-center" />
          </div>
        </div>
      </div>

      {/* Title */}
      <span className="min-w-0 flex-1 truncate font-display text-lg leading-none tracking-[0.08em] text-white-pure">
        {title}
      </span>

      {/* Controls */}
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => musicController.seekByBeats(-1)}
          className="flex h-7 w-7 items-center justify-center rounded-full text-grey-light/70 transition-colors hover:text-white-pure"
          aria-label={`Go back ${seekBeats} beats`}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={1.8} color="currentColor" />
        </button>
        <button
          type="button"
          onClick={() => void musicController.togglePlayback()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-black transition-colors hover:bg-accent-light"
          aria-label={isPlaying ? "Pause track" : "Play track"}
        >
          {isPlaying ? (
            <HugeiconsIcon icon={PauseIcon} size={16} strokeWidth={2} color="currentColor" />
          ) : (
            <HugeiconsIcon icon={PlayIcon} size={16} strokeWidth={2} color="currentColor" />
          )}
        </button>
        <button
          type="button"
          onClick={() => musicController.seekByBeats(1)}
          className="flex h-7 w-7 items-center justify-center rounded-full text-grey-light/70 transition-colors hover:text-white-pure"
          aria-label={`Go forward ${seekBeats} beats`}
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.8} color="currentColor" />
        </button>
      </div>

      {/* Progress bar — overlays at the bottom without adding height */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
        <div
          className="h-full bg-accent transition-[width] duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </aside>
  );
}
