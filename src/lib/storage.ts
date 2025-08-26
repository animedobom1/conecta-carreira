// LocalStorage data layer for demo/testing
export type Role = "candidate" | "company" | "admin";

export type Company = {
  id: string;
  name: string;
  createdAt: string;
};

export type Job = {
  id: string;
  companyId: string;
  title: string;
  description: string;
  location: string;
  type: string; // CLT, PJ, Remoto
  salary?: string;
  createdAt: string;
  status: "open" | "closed";
};

export type Application = {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone?: string;
  resume?: string; // texto livre para testes
  createdAt: string;
  status: "submitted" | "reviewed" | "rejected";
};

export type Session = {
  role: Role;
  companyId?: string;
};

const KEYS = {
  companies: "lc_companies",
  jobs: "lc_jobs",
  applications: "lc_applications",
  session: "lc_session",
} as const;

const genId = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function seed() {
  const companies = readJSON<Company[]>(KEYS.companies, []);
  if (companies.length === 0) {
    const mxs: Company = {
      id: "mxs",
      name: "MXS Soluções",
      createdAt: new Date().toISOString(),
    };
    writeJSON(KEYS.companies, [mxs]);
  }

  const jobs = readJSON<Job[]>(KEYS.jobs, []);
  if (jobs.length === 0) {
    const now = new Date().toISOString();
    const demoJobs: Job[] = [
      {
        id: genId(),
        companyId: "mxs",
        title: "Desenvolvedor Frontend React",
        description: "Atue no desenvolvimento de interfaces usando React, TS e Tailwind.",
        location: "São Paulo, SP",
        type: "CLT",
        salary: "R$ 8.000 - R$ 12.000",
        createdAt: now,
        status: "open",
      },
      {
        id: genId(),
        companyId: "mxs",
        title: "Analista de Marketing Digital",
        description: "Gestão de campanhas, SEO e métricas.",
        location: "Remoto",
        type: "PJ",
        salary: "R$ 5.000 - R$ 7.000",
        createdAt: now,
        status: "open",
      },
    ];
    writeJSON(KEYS.jobs, demoJobs);
  }

  const session = readJSON<Session | null>(KEYS.session, null);
  if (!session) {
    writeJSON<Session>(KEYS.session, { role: "candidate" });
  }
}

// Run seed once per load
seed();

// Session helpers
export function getSession(): Session {
  return readJSON<Session>(KEYS.session, { role: "candidate" });
}

export function setRole(role: Role) {
  const s = getSession();
  writeJSON(KEYS.session, { ...s, role });
}

export function setCompany(companyId: string) {
  const s = getSession();
  writeJSON(KEYS.session, { ...s, companyId });
}

// Companies
export function getCompanies(): Company[] {
  return readJSON<Company[]>(KEYS.companies, []);
}

// Jobs
export function getJobs(): Job[] {
  return readJSON<Job[]>(KEYS.jobs, []);
}

export function getJob(id: string): Job | undefined {
  return getJobs().find((j) => j.id === id);
}

export function saveJobs(jobs: Job[]) {
  writeJSON(KEYS.jobs, jobs);
}

export function createJob(input: Omit<Job, "id" | "createdAt" | "status"> & { status?: Job["status"] }): Job {
  const jobs = getJobs();
  const job: Job = {
    ...input,
    id: genId(),
    createdAt: new Date().toISOString(),
    status: input.status ?? "open",
  };
  jobs.unshift(job);
  saveJobs(jobs);
  return job;
}

export function updateJobStatus(id: string, status: Job["status"]) {
  const jobs = getJobs().map((j) => (j.id === id ? { ...j, status } : j));
  saveJobs(jobs);
}

export function deleteJob(id: string) {
  const jobs = getJobs().filter((j) => j.id !== id);
  saveJobs(jobs);
}

// Applications
export function getApplications(): Application[] {
  return readJSON<Application[]>(KEYS.applications, []);
}

export function getApplicationsByJob(jobId: string): Application[] {
  return getApplications().filter((a) => a.jobId === jobId);
}

export function saveApplications(apps: Application[]) {
  writeJSON(KEYS.applications, apps);
}

export function createApplication(input: Omit<Application, "id" | "createdAt" | "status"> & { status?: Application["status"] }): Application {
  const apps = getApplications();
  const app: Application = {
    ...input,
    id: genId(),
    createdAt: new Date().toISOString(),
    status: input.status ?? "submitted",
  };
  apps.unshift(app);
  saveApplications(apps);
  return app;
}
