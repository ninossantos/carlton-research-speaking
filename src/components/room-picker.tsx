import { TALKS, type TalkId } from "@/lib/talks";
import { cn } from "@/lib/utils";

export function RoomPicker({
  value,
  onChange,
}: {
  value: TalkId | null;
  onChange: (id: TalkId) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {TALKS.map((talk, i) => {
        const selected = value === talk.id;
        return (
          <button
            key={talk.id}
            type="button"
            onClick={() => onChange(talk.id)}
            aria-pressed={selected}
            className={cn(
              "flex min-h-44 flex-col rounded-[var(--radius-md)] border p-5 text-left transition-[border-color,background-color,transform] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)] active:scale-[0.96]",
              selected
                ? "border-primary bg-surface shadow-[var(--shadow-border)]"
                : "border-border bg-surface-2 hover:border-gold",
            )}
          >
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-gold">
              Topic {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-3 font-display text-xl leading-snug text-ink">{talk.title}</span>
            <span className="mt-3 text-sm text-muted">{talk.promise}</span>
          </button>
        );
      })}
    </div>
  );
}
