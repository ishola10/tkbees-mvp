export type StudentRecord = {
  name: string;
  email: string;
  university: string;
  course: string;
  year: string;
  entrepreneurType: string;
  bio?: string;
  referralSource?: string;
  createdAt: string;
};

export type IdeaRecord = {
  studentEmail: string;
  ideaName: string;
  problem: string;
  targetAudience: string;
  solution: string;
  stage: string;
  industry: string;
  teamSize: string;
  supportNeeded: string[];
  pitchDeckName?: string;
  createdAt: string;
};

export type PartnershipRecord = {
  universityName: string;
  contactName: string;
  role: string;
  email: string;
  phone?: string;
  interests: string[];
  message?: string;
  createdAt: string;
};

type Hive = {
  students: StudentRecord[];
  ideas: IdeaRecord[];
  partnerships: PartnershipRecord[];
};

const KEY = "tkbees-hive";

function empty(): Hive {
  return { students: [], ideas: [], partnerships: [] };
}

export function getHive(): Hive {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Hive;
    return {
      students: parsed.students ?? [],
      ideas: parsed.ideas ?? [],
      partnerships: parsed.partnerships ?? [],
    };
  } catch {
    return empty();
  }
}

function save(hive: Hive) {
  localStorage.setItem(KEY, JSON.stringify(hive));
}

export function addStudent(record: Omit<StudentRecord, "createdAt">) {
  const hive = getHive();
  hive.students.unshift({ ...record, createdAt: new Date().toISOString() });
  save(hive);
}

export function addIdea(record: Omit<IdeaRecord, "createdAt">) {
  const hive = getHive();
  hive.ideas.unshift({ ...record, createdAt: new Date().toISOString() });
  save(hive);
}

export function addPartnership(record: Omit<PartnershipRecord, "createdAt">) {
  const hive = getHive();
  hive.partnerships.unshift({ ...record, createdAt: new Date().toISOString() });
  save(hive);
}
