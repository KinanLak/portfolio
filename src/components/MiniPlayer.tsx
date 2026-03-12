import { musicController, useMusicPlayer } from "@/hooks/useMusicPlayer";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function MiniPlayer() {
  const {
    artist,
    beatPhase,
    bpm,
    coverUrl,
    currentTime,
    duration,
    isPlaying,
    seekBeats,
    seekSeconds,
    syncOffsetMs,
    title,
  } = useMusicPlayer();

  const beatGlow = isPlaying ? 1 + Math.max(0, 1 - beatPhase * 5) * 0.08 : 1;
  const progressMax = duration > 0 ? duration : 0.01;
  const progressValue = Math.min(currentTime, progressMax);

  return (
    <aside className="fixed top-4 right-4 z-[60] w-[min(22rem,calc(100vw-2rem))] rounded-[1.75rem] border border-white/10 bg-black/70 p-4 text-white shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(255,102,0,0.16)]">
          <div className="music-player-disc-scale" style={{ transform: `scale(${beatGlow})` }}>
            <div className={`music-player-disc ${isPlaying ? "is-playing" : ""}`}>
              {coverUrl ? (
                <img src={coverUrl} alt={`${title} cover`} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_65%_70%,rgba(255,102,0,0.75),rgba(5,5,5,0.95)_75%)] font-display text-3xl tracking-[0.14em] text-white-pure">
                  {title.slice(0, 1)}
                </div>
              )}
              <span className="music-player-disc-center" />
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-3xl leading-none tracking-[0.08em] text-white-pure">
            {title}
          </p>
          <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.36em] text-grey-light/80">
            {artist}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-grey-light/80">
            <span className="rounded-full border border-white/10 px-2 py-1">{bpm} BPM</span>
            <span className="rounded-full border border-white/10 px-2 py-1">
              {syncOffsetMs >= 0 ? `Sync +${syncOffsetMs}ms` : `Sync ${syncOffsetMs}ms`}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={progressMax}
          step={0.01}
          value={progressValue}
          onChange={(event) => musicController.seekTo(Number(event.target.value))}
          className="music-player-slider h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10"
          aria-label="Track progress"
        />
        <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-grey-light/70">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => musicController.seekByBeats(-1)}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-grey-light transition-colors duration-300 hover:border-accent/60 hover:text-white-pure"
          aria-label={`Go back ${seekBeats} beats`}
          title={`-${seekBeats} beats (${seekSeconds.toFixed(2)}s)`}
        >
          -{seekBeats}B
        </button>
        <button
          type="button"
          onClick={() => void musicController.togglePlayback()}
          className="rounded-full border border-accent bg-accent px-3 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-black transition-colors duration-300 hover:bg-accent-light"
          aria-label={isPlaying ? "Pause track" : "Play track"}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={() => musicController.seekByBeats(1)}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-grey-light transition-colors duration-300 hover:border-accent/60 hover:text-white-pure"
          aria-label={`Go forward ${seekBeats} beats`}
          title={`+${seekBeats} beats (${seekSeconds.toFixed(2)}s)`}
        >
          +{seekBeats}B
        </button>
      </div>
    </aside>
  );
}
