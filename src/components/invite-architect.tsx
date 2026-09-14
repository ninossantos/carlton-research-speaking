import { ROLES } from "@/lib/talks";
import { useBriefing } from "@/lib/store";
import { cn } from "@/lib/utils";
import { TERMS } from "@/lib/booking";

export function InviteArchitect() {
  const s = useBriefing();

  return (
    <section id="architect" className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-border)] sm:p-8">
      <h2 className="text-2xl">Build the Invite</h2>
      <p className="mt-2 max-w-2xl text-muted">
        Five facts. The page writes a one-sheet and a blurb you can forward. Remote books on the
        next step. In-person needs a city so travel can be quoted.
      </p>

      <fieldset className="mt-8">
        <legend className="text-sm font-bold text-ink">Who attends</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ROLES.map((role) => (
            <Choice
              key={role.id}
              selected={s.role === role.id}
              onClick={() => s.setRole(role.id)}
              label={role.label}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-bold text-ink">Format</legend>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Choice
            selected={s.format === "remote"}
            onClick={() => s.setFormat("remote")}
            label="Remote · $750"
          />
          <Choice
            selected={s.format === "in-person"}
            onClick={() => s.setFormat("in-person")}
            label="In person · $1,500 + travel"
          />
        </div>
        {s.format === "in-person" ? (
          <p className="mt-3 text-sm text-muted">
            {TERMS.hold} {TERMS.travel} {TERMS.geoPrice}
          </p>
        ) : s.format === "remote" ? (
          <p className="mt-3 text-sm text-muted">
            {TERMS.remoteFee} {TERMS.remoteCancel} {TERMS.geoPrice}
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted">{TERMS.geoPrice}</p>
        )}
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field
          label="Organization"
          value={s.org}
          onChange={s.setOrg}
          autoComplete="organization"
        />
        <Field
          label="Your name"
          value={s.hostName}
          onChange={s.setHostName}
          autoComplete="name"
        />
        <Field
          label="Email"
          value={s.hostEmail}
          onChange={s.setHostEmail}
          type="email"
          autoComplete="email"
        />
        <Field
          label="Preferred week"
          value={s.preferredWeek}
          onChange={s.setPreferredWeek}
          placeholder="Week of 12 October"
        />
        {s.format === "in-person" ? (
          <Field
            label="City and state"
            value={s.city}
            onChange={s.setCity}
            placeholder="Phoenix, Arizona"
            autoComplete="address-level2"
          />
        ) : null}
      </div>
      {s.talkId === "customize" ? (
        <label className="mt-6 flex flex-col gap-1.5 text-sm font-semibold text-ink" htmlFor="questions-for-the-hour">
          Questions for the hour
          <textarea
            id="questions-for-the-hour"
            value={s.questions}
            onChange={(e) => s.setQuestions(e.target.value)}
            rows={5}
            placeholder="Name the questions you want answered."
            className="rounded-[var(--radius-sm)] border border-border bg-surface-2 px-3 py-2 font-normal text-fg outline-none placeholder:text-faint focus:border-gold"
          />
        </label>
      ) : null}
    </section>
  );
}

function Choice({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-[var(--radius-sm)] border px-3 py-2 text-sm font-semibold transition-colors duration-[var(--motion-quick)]",
        selected
          ? "border-primary bg-primary text-primary-fg"
          : "border-border bg-surface-2 text-fg hover:border-gold",
      )}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink" htmlFor={id}>
      {label}
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 rounded-[var(--radius-sm)] border border-border bg-surface-2 px-3 font-normal text-fg outline-none placeholder:text-faint focus:border-gold"
      />
    </label>
  );
}
