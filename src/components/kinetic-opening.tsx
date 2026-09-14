import { useEffect, useMemo, useRef, useState } from "react";
import { PRONGS, type Talk } from "@/lib/talks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LAST_HOLD = 4000;

export function KineticOpening({ talk }: { talk: Talk }) {
  const duration = (talk.opening.at(-1)?.at ?? 0) + LAST_HOLD;
  const [now, setNow] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [runId, setRunId] = useState(0);
  const nowRef = useRef(0);

  useEffect(() => {
    nowRef.current = now;
  }, [now]);

  useEffect(() => {
    setNow(0);
    nowRef.current = 0;
    setPlaying(true);
    setRunId((n) => n + 1);
  }, [talk.id]);

  useEffect(() => {
    if (!playing) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setNow(duration);
      nowRef.current = duration;
      setPlaying(false);
      return;
    }
    let raf = 0;
    const start = performance.now() - nowRef.current;
    const tick = (t: number) => {
      const elapsed = Math.min(duration, t - start);
      nowRef.current = elapsed;
      setNow(elapsed);
      if (elapsed >= duration) {
        setPlaying(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, runId, duration]);

  const beat = useMemo(() => {
    let current = talk.opening[0];
    for (const b of talk.opening) {
      if (now >= b.at) current = b;
    }
    return current;
  }, [now, talk.opening]);

  const progress = Math.min(1, now / duration);
  const stackCount = talk.opening.filter((b) => b.visual === "stack" && b.at <= now).length;
  const shown =
    beat.visual === "flash"
      ? 1
      : beat.visual === "stack"
        ? Math.min(talk.artifacts.length, Math.max(stackCount, 1))
        : 0;

  function pause() {
    setPlaying(false);
  }

  function replay() {
    setNow(0);
    nowRef.current = 0;
    setPlaying(true);
    setRunId((n) => n + 1);
  }

  return (
    <section
      aria-label="Opening of the presentation"
      className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow-border)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Opening of the Presentation</p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="no-print"
            disabled={!playing}
            onClick={pause}
          >
            Pause
          </Button>
          <Button variant="outline" size="sm" className="no-print" onClick={replay}>
            Replay
          </Button>
        </div>
      </div>

      <div className="grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex min-h-48 flex-col justify-end">
          <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">{beat.line}</p>
          <p className="mt-4 text-sm text-muted">
            {talk.title}. Sixty minutes, presentation plus questions.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {beat.visual === "split" ? (
            <div className="grid grid-cols-2 gap-3">
              <Slate label="High conflict" active={now < 8400} dim />
              <Slate label="Coercive control" active={now >= 2800} />
            </div>
          ) : null}

          {beat.visual === "flash" ? <Slate label={talk.artifacts[0]} active /> : null}

          {beat.visual === "stack" && (
            <ul className="flex flex-wrap gap-2">
              {talk.artifacts.slice(0, shown).map((item) => (
                <li
                  key={item}
                  className="rounded-[var(--radius-sm)] border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PRONGS.map((prong, i) => {
              const on = beat.prongs[i];
              return (
                <li
                  key={prong.id}
                  className={cn(
                    "rounded-[var(--radius-sm)] border px-3 py-3 transition-[background-color,border-color,color] duration-[var(--motion-fast)]",
                    on
                      ? "border-primary bg-primary text-primary-fg"
                      : "border-border bg-surface-2 text-faint",
                  )}
                >
                  <span className="block text-xs font-bold uppercase tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-tight">{prong.label}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="h-1 bg-border">
        <div className="h-full bg-gold" style={{ width: `${progress * 100}%` }} />
      </div>
    </section>
  );
}

function Slate({ label, active, dim }: { label: string; active: boolean; dim?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-sm)] border px-4 py-6 text-center text-sm font-semibold transition-colors duration-[var(--motion-fast)]",
        active
          ? dim
            ? "border-border bg-surface-2 text-muted"
            : "border-gold bg-ink text-surface"
          : "border-border bg-bg text-faint",
      )}
    >
      {label}
    </div>
  );
}
