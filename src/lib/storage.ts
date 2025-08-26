// LocalStorage data layer for demo/testing
export type Role = "candidate" | "company" | "admin" | "super-admin";

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
  candidateName?: string; // Para compatibilidade com candidatos logados
  name: string;
  email: string;
  phone?: string;
  resume?: string; // texto livre para testes
  appliedAt: string; // Renomeado de createdAt para melhor clareza
  status: "submitted" | "reviewed" | "rejected" | "accepted" | "interviewed";
};

export type Session = {
  role: Role;
  companyId?: string;
  candidateId?: string;
  candidateName?: string;
};

export type SavedJob = {
  id: string;
  candidateId: string;
  jobId: string;
  savedAt: string;
};

export type CandidateProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  location?: string;
  linkedin?: string;
  portfolio?: string;
  objetivoProfissional?: string;
  resumoProfissional?: string;
  createdAt: string;
};

export type FormacaoAcademica = {
  id: string;
  candidateId: string;
  curso: string;
  instituicao: string;
  anoInicio: string;
  anoConclusao: string;
  emAndamento: boolean;
};

export type Experience = {
  id: string;
  candidateId: string;
  empresa: string;
  cargo: string;
  dataInicio: string;
  dataFim: string;
  atual: boolean;
  atividades: string;
  localizacao: string;
};

export type CursoQualificacao = {
  id: string;
  candidateId: string;
  nome: string;
  instituicao: string;
  anoConclusao: string;
  cargaHoraria?: string;
  certificado: boolean;
};

export type Habilidade = {
  id: string;
  candidateId: string;
  tipo: 'tecnica' | 'comportamental';
  nome: string;
  nivel: 'basico' | 'intermediario' | 'avancado';
};

export type InformacaoAdicional = {
  id: string;
  candidateId: string;
  tipo: 'idioma' | 'voluntariado' | 'premio' | 'publicacao' | 'outro';
  titulo: string;
  descricao: string;
};

const KEYS = {
  companies: "lc_companies",
  jobs: "lc_jobs",
  applications: "lc_applications",
  session: "lc_session",
  savedJobs: "lc_saved_jobs",
  candidateProfiles: "lc_candidate_profiles",
  experiences: "lc_experiences",
  formacaoAcademica: "lc_formacao_academica",
  cursosQualificacoes: "lc_cursos_qualificacoes",
  habilidades: "lc_habilidades",
  informacoesAdicionais: "lc_informacoes_adicionais",
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
      name: "MX Vagas",
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

export function getCompany(id: string): Company | undefined {
  return getCompanies().find((c) => c.id === id);
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

export function createApplication(input: Omit<Application, "id" | "appliedAt" | "status"> & { status?: Application["status"] }): Application {
  const apps = getApplications();
  const app: Application = {
    ...input,
    id: genId(),
    appliedAt: new Date().toISOString(),
    status: input.status ?? "submitted",
  };
  apps.unshift(app);
  saveApplications(apps);
  return app;
}

// Saved Jobs
export function getSavedJobs(candidateId: string): SavedJob[] {
  const allSaved = readJSON<SavedJob[]>(KEYS.savedJobs, []);
  return allSaved.filter(saved => saved.candidateId === candidateId);
}

export function saveSavedJobs(savedJobs: SavedJob[]) {
  writeJSON(KEYS.savedJobs, savedJobs);
}

export function toggleSavedJob(candidateId: string, jobId: string): boolean {
  const allSaved = readJSON<SavedJob[]>(KEYS.savedJobs, []);
  const existingIndex = allSaved.findIndex(saved => 
    saved.candidateId === candidateId && saved.jobId === jobId
  );
  
  if (existingIndex >= 0) {
    // Remove from saved
    allSaved.splice(existingIndex, 1);
    saveSavedJobs(allSaved);
    return false;
  } else {
    // Add to saved
    const newSaved: SavedJob = {
      id: genId(),
      candidateId,
      jobId,
      savedAt: new Date().toISOString()
    };
    allSaved.unshift(newSaved);
    saveSavedJobs(allSaved);
    return true;
  }
}

export function isJobSaved(candidateId: string, jobId: string): boolean {
  const saved = getSavedJobs(candidateId);
  return saved.some(s => s.jobId === jobId);
}

// Candidate Applications
export function getCandidateApplications(candidateName: string): Application[] {
  return getApplications().filter(app => 
    app.candidateName === candidateName || app.name === candidateName
  );
}

export function createCandidateApplication(candidateName: string, jobId: string): Application {
  return createApplication({
    jobId,
    candidateName,
    name: candidateName,
    email: "joao.silva@email.com", // Mock email
    phone: "(11) 99999-9999"
  });
}

// Experiências Profissionais
export function getExperiences(candidateId: string): Experience[] {
  const allExperiences = readJSON<Experience[]>(KEYS.experiences, []);
  return allExperiences.filter(exp => exp.candidateId === candidateId);
}

export function saveExperience(experience: Omit<Experience, 'id'>): Experience {
  const allExperiences = readJSON<Experience[]>(KEYS.experiences, []);
  const newExperience: Experience = {
    ...experience,
    id: genId()
  };
  allExperiences.unshift(newExperience);
  writeJSON(KEYS.experiences, allExperiences);
  return newExperience;
}

export function updateExperience(experience: Experience): void {
  const allExperiences = readJSON<Experience[]>(KEYS.experiences, []);
  const index = allExperiences.findIndex(exp => exp.id === experience.id);
  if (index >= 0) {
    allExperiences[index] = experience;
    writeJSON(KEYS.experiences, allExperiences);
  }
}

export function deleteExperience(id: string): void {
  const allExperiences = readJSON<Experience[]>(KEYS.experiences, []);
  const filtered = allExperiences.filter(exp => exp.id !== id);
  writeJSON(KEYS.experiences, filtered);
}

// Formação Acadêmica
export function getFormacaoAcademica(candidateId: string): FormacaoAcademica[] {
  const allFormacao = readJSON<FormacaoAcademica[]>(KEYS.formacaoAcademica, []);
  return allFormacao.filter(form => form.candidateId === candidateId);
}

export function saveFormacaoAcademica(formacao: Omit<FormacaoAcademica, 'id'>): FormacaoAcademica {
  const allFormacao = readJSON<FormacaoAcademica[]>(KEYS.formacaoAcademica, []);
  const newFormacao: FormacaoAcademica = {
    ...formacao,
    id: genId()
  };
  allFormacao.unshift(newFormacao);
  writeJSON(KEYS.formacaoAcademica, allFormacao);
  return newFormacao;
}

export function updateFormacaoAcademica(formacao: FormacaoAcademica): void {
  const allFormacao = readJSON<FormacaoAcademica[]>(KEYS.formacaoAcademica, []);
  const index = allFormacao.findIndex(form => form.id === formacao.id);
  if (index >= 0) {
    allFormacao[index] = formacao;
    writeJSON(KEYS.formacaoAcademica, allFormacao);
  }
}

export function deleteFormacaoAcademica(id: string): void {
  const allFormacao = readJSON<FormacaoAcademica[]>(KEYS.formacaoAcademica, []);
  const filtered = allFormacao.filter(form => form.id !== id);
  writeJSON(KEYS.formacaoAcademica, filtered);
}

// Cursos e Qualificações
export function getCursosQualificacoes(candidateId: string): CursoQualificacao[] {
  const allCursos = readJSON<CursoQualificacao[]>(KEYS.cursosQualificacoes, []);
  return allCursos.filter(curso => curso.candidateId === candidateId);
}

export function saveCursoQualificacao(curso: Omit<CursoQualificacao, 'id'>): CursoQualificacao {
  const allCursos = readJSON<CursoQualificacao[]>(KEYS.cursosQualificacoes, []);
  const newCurso: CursoQualificacao = {
    ...curso,
    id: genId()
  };
  allCursos.unshift(newCurso);
  writeJSON(KEYS.cursosQualificacoes, allCursos);
  return newCurso;
}

export function deleteCursoQualificacao(id: string): void {
  const allCursos = readJSON<CursoQualificacao[]>(KEYS.cursosQualificacoes, []);
  const filtered = allCursos.filter(curso => curso.id !== id);
  writeJSON(KEYS.cursosQualificacoes, filtered);
}

// Habilidades
export function getHabilidades(candidateId: string): Habilidade[] {
  const allHabilidades = readJSON<Habilidade[]>(KEYS.habilidades, []);
  return allHabilidades.filter(hab => hab.candidateId === candidateId);
}

export function saveHabilidade(habilidade: Omit<Habilidade, 'id'>): Habilidade {
  const allHabilidades = readJSON<Habilidade[]>(KEYS.habilidades, []);
  const newHabilidade: Habilidade = {
    ...habilidade,
    id: genId()
  };
  allHabilidades.unshift(newHabilidade);
  writeJSON(KEYS.habilidades, allHabilidades);
  return newHabilidade;
}

export function deleteHabilidade(id: string): void {
  const allHabilidades = readJSON<Habilidade[]>(KEYS.habilidades, []);
  const filtered = allHabilidades.filter(hab => hab.id !== id);
  writeJSON(KEYS.habilidades, filtered);
}

// Informações Adicionais
export function getInformacoesAdicionais(candidateId: string): InformacaoAdicional[] {
  const allInfo = readJSON<InformacaoAdicional[]>(KEYS.informacoesAdicionais, []);
  return allInfo.filter(info => info.candidateId === candidateId);
}

export function saveInformacaoAdicional(info: Omit<InformacaoAdicional, 'id'>): InformacaoAdicional {
  const allInfo = readJSON<InformacaoAdicional[]>(KEYS.informacoesAdicionais, []);
  const newInfo: InformacaoAdicional = {
    ...info,
    id: genId()
  };
  allInfo.unshift(newInfo);
  writeJSON(KEYS.informacoesAdicionais, allInfo);
  return newInfo;
}

export function deleteInformacaoAdicional(id: string): void {
  const allInfo = readJSON<InformacaoAdicional[]>(KEYS.informacoesAdicionais, []);
  const filtered = allInfo.filter(info => info.id !== id);
  writeJSON(KEYS.informacoesAdicionais, filtered);
}
