import { create } from "zustand";
import { isFormatId, isRoleId, isTalkId, type FormatId, type RoleId, type TalkId } from "@/lib/talks";

export type BriefingState = {
  talkId: TalkId | null;
  role: RoleId | null;
  format: FormatId | null;
  org: string;
  city: string;
  hostName: string;
  hostEmail: string;
  preferredWeek: string;
  questions: string;
  setTalk: (talkId: TalkId) => void;
  setRole: (role: RoleId) => void;
  setFormat: (format: FormatId) => void;
  setOrg: (org: string) => void;
  setCity: (city: string) => void;
  setHostName: (hostName: string) => void;
  setHostEmail: (hostEmail: string) => void;
  setPreferredWeek: (preferredWeek: string) => void;
  setQuestions: (questions: string) => void;
};

const KEY = "cr-lunch-and-learn-draft";

function load(): Partial<BriefingState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<BriefingState>;
  } catch {
    return {};
  }
}

function persist(state: BriefingState) {
  if (typeof window === "undefined") return;
  const {
    talkId,
    role,
    format,
    org,
    city,
    hostName,
    hostEmail,
    preferredWeek,
    questions,
  } = state;
  localStorage.setItem(
    KEY,
    JSON.stringify({
      talkId,
      role,
      format,
      org,
      city,
      hostName,
      hostEmail,
      preferredWeek,
      questions,
    }),
  );
}

export const useBriefing = create<BriefingState>((set, get) => ({
  talkId: null,
  role: null,
  format: null,
  org: "",
  city: "",
  hostName: "",
  hostEmail: "",
  preferredWeek: "",
  questions: "",
  setTalk: (talkId) => {
    set({ talkId });
    persist(get());
  },
  setRole: (role) => {
    set({ role });
    persist(get());
  },
  setFormat: (format) => {
    set({ format });
    persist(get());
  },
  setOrg: (org) => {
    set({ org });
    persist(get());
  },
  setCity: (city) => {
    set({ city });
    persist(get());
  },
  setHostName: (hostName) => {
    set({ hostName });
    persist(get());
  },
  setHostEmail: (hostEmail) => {
    set({ hostEmail });
    persist(get());
  },
  setPreferredWeek: (preferredWeek) => {
    set({ preferredWeek });
    persist(get());
  },
  setQuestions: (questions) => {
    set({ questions });
    persist(get());
  },
}));

export function hydrateBriefing() {
  const saved = load();
  useBriefing.setState({
    talkId: isTalkId(saved.talkId) ? saved.talkId : null,
    role: isRoleId(saved.role) ? saved.role : null,
    format: isFormatId(saved.format) ? saved.format : null,
    org: saved.org ?? "",
    city: saved.city ?? "",
    hostName: saved.hostName ?? "",
    hostEmail: saved.hostEmail ?? "",
    preferredWeek: saved.preferredWeek ?? "",
    questions: saved.questions ?? "",
  });
}
