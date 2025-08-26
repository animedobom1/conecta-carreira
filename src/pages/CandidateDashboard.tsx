import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, Briefcase, Settings, TrendingUp, LogOut, 
  Search, Bell, Menu, Activity, 
  Eye, Calendar, Download, RefreshCw, CheckCircle, 
  XCircle, Clock, Target, MessageSquare, FileText, 
  Home, MapPin, Building2, DollarSign, Star,
  Send, BookOpen, Award, Bookmark, Edit3,
  Plus, Trash2, Upload, File, GraduationCap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  getJobs, getApplications, getSession, saveApplications, Job, Application,
  getCandidateApplications, createCandidateApplication, getSavedJobs, 
  toggleSavedJob, isJobSaved, SavedJob, Experience, FormacaoAcademica,
  CursoQualificacao, Habilidade, InformacaoAdicional, getExperiences,
  saveExperience, updateExperience, deleteExperience, getFormacaoAcademica,
  saveFormacaoAcademica, updateFormacaoAcademica, deleteFormacaoAcademica,
  getCursosQualificacoes, saveCursoQualificacao, deleteCursoQualificacao,
  getHabilidades, saveHabilidade, deleteHabilidade, getInformacoesAdicionais,
  saveInformacaoAdicional, deleteInformacaoAdicional, getCompany
} from "@/lib/storage";
import { useSEO } from "@/hooks/useSEO";

export default function CandidateDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showExperienceDialog, setShowExperienceDialog] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [uploadedCV, setUploadedCV] = useState<File | null>(null);

  // Dados da sessão e candidato
  const navigate = useNavigate();
  const session = getSession();
  const candidateName = "João Silva"; // Em uma implementação real, viria da sessão
  const candidateId = "candidate_1"; // Em uma implementação real, viria da sessão
  
  // Professional experiences state - usando dados reais do storage
  const experiences = getExperiences(candidateId);

  const [experienceForm, setExperienceForm] = useState({
    empresa: "",
    cargo: "",
    dataInicio: "",
    dataFim: "",
    atual: false,
    atividades: "",
    localizacao: ""
  });
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    location: "São Paulo, SP",
    title: "Desenvolvedor Full Stack",
    experience: "5 anos",
    skills: "React, Node.js, TypeScript, Python",
    education: "Ciência da Computação - USP",
    bio: "Desenvolvedor apaixonado por tecnologia com 5 anos de experiência em desenvolvimento web.",
    linkedin: "https://linkedin.com/in/joaosilva",
    github: "https://github.com/joaosilva",
    portfolio: "https://joaosilva.dev"
  });
  
  const allJobs = getJobs();
  const availableJobs = allJobs.filter((j) => j.status === "open");
  const myApplications = getCandidateApplications(candidateName);
  const savedJobsData = getSavedJobs(candidateId);

  // Converter savedJobs para incluir dados da vaga
  const savedJobsWithDetails = savedJobsData.map(saved => {
    const job = allJobs.find(j => j.id === saved.jobId);
    return job ? {
      id: saved.jobId,
      title: job.title,
      company: "Empresa Demo", // Em implementação real, buscar da company
      location: job.location,
      salary: job.salary || "A combinar",
      savedAt: saved.savedAt
    } : null;
  }).filter(Boolean);

  useSEO({ 
    title: `Dashboard - ${candidateName} | MX Vagas`, 
    description: "Dashboard do candidato para buscar vagas e gerenciar candidaturas." 
  });

  const recommendations = [
    { id: "3", title: "Frontend Developer", company: "WebSolutions", location: "Rio de Janeiro, RJ", salary: "R$ 5.000 - R$ 8.000", match: 95 },
    { id: "4", title: "React Developer", company: "DevHouse", location: "Belo Horizonte, MG", salary: "R$ 7.000 - R$ 11.000", match: 92 },
    { id: "5", title: "JavaScript Developer", company: "CodeLab", location: "Porto Alegre, RS", salary: "R$ 6.000 - R$ 9.000", match: 88 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("session");
    navigate("/");
  };

  const handleApplyJob = (jobId: string) => {
    const existingApplication = myApplications.find(app => app.jobId === jobId);
    if (existingApplication) {
      alert("Você já se candidatou a esta vaga!");
      return;
    }
    
    try {
      createCandidateApplication(candidateName, jobId);
      alert("Candidatura enviada com sucesso!");
    } catch (error) {
      alert("Erro ao enviar candidatura. Tente novamente.");
      console.error("Erro ao aplicar para vaga:", error);
    }
  };

  const handleSaveJob = (jobId: string) => {
    try {
      const wasSaved = toggleSavedJob(candidateId, jobId);
      
      if (wasSaved) {
        // Adicionado aos salvos
        alert("Vaga salva com sucesso!");
      } else {
        // Removido dos salvos
        alert("Vaga removida dos salvos!");
      }
    } catch (error) {
      alert("Erro ao salvar vaga. Tente novamente.");
      console.error("Erro ao salvar vaga:", error);
    }
  };

  const handleSaveExperience = () => {
    if (editingExperience) {
      // Edit existing experience
      const updatedExperience: Experience = {
        ...editingExperience,
        ...experienceForm
      };
      updateExperience(updatedExperience);
    } else {
      // Add new experience
      saveExperience({
        candidateId,
        ...experienceForm
      });
    }
    
    setExperienceForm({
      empresa: "",
      cargo: "",
      dataInicio: "",
      dataFim: "",
      atual: false,
      atividades: "",
      localizacao: ""
    });
    setEditingExperience(null);
    setShowExperienceDialog(false);
    alert("Experiência salva com sucesso!");
  };

  const handleEditExperience = (experience: Experience) => {
    setExperienceForm({
      empresa: experience.empresa,
      cargo: experience.cargo,
      dataInicio: experience.dataInicio,
      dataFim: experience.dataFim,
      atual: experience.atual,
      atividades: experience.atividades,
      localizacao: experience.localizacao
    });
    setEditingExperience(experience);
    setShowExperienceDialog(true);
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta experiência?")) {
      deleteExperience(id);
      alert("Experiência excluída com sucesso!");
    }
  };

  const handleAddExperience = () => {
    setExperienceForm({
      empresa: "",
      cargo: "",
      dataInicio: "",
      dataFim: "",
      atual: false,
      atividades: "",
      localizacao: ""
    });
    setEditingExperience(null);
    setShowExperienceDialog(true);
  };

  const handleCVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.name.endsWith('.pdf')) {
        setUploadedCV(file);
        alert("Currículo enviado com sucesso!");
      } else {
        alert("Por favor, envie apenas arquivos PDF.");
      }
    }
  };

  const handleDownloadCV = () => {
    if (uploadedCV) {
      const url = URL.createObjectURL(uploadedCV);
      const a = document.createElement('a');
      a.href = url;
      a.download = uploadedCV.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setShowJobDialog(true);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return `${month}/${year}`;
  };

  const getApplicationStatus = (status: string) => {
    const statusMap = {
      pending: { label: "Em análise", color: "bg-yellow-500" },
      reviewing: { label: "Em análise", color: "bg-blue-500" },
      interviewed: { label: "Entrevistado", color: "bg-purple-500" },
      accepted: { label: "Aceito", color: "bg-green-500" },
      rejected: { label: "Rejeitado", color: "bg-red-500" }
    };
    return statusMap[status as keyof typeof statusMap] || { label: status, color: "bg-gray-500" };
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredJobs = allJobs.filter(job => {
    const company = getCompany(job.companyId);
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (company?.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === "all" || job.location.includes(filterLocation);
    return matchesSearch && matchesLocation;
  });

  const stats = [
    { title: "Candidaturas", value: myApplications.length.toString(), icon: Send, color: "bg-blue-500", trend: "ativas" },
    { title: "Experiências", value: experiences.length.toString(), icon: Briefcase, color: "bg-indigo-500", trend: "no perfil" },
    { title: "Vagas Salvas", value: savedJobsWithDetails.length.toString(), icon: Bookmark, color: "bg-green-500", trend: "para revisar" },
    { title: "Notificações", value: "3", icon: Bell, color: "bg-orange-500", trend: "não lidas" },
  ];

  const menuItems = [
    { id: "overview", label: "Visão Geral", icon: Home },
    { id: "jobs", label: "Buscar Vagas", icon: Search },
    { id: "applications", label: "Minhas Candidaturas", icon: Send },
    { id: "saved", label: "Vagas Salvas", icon: Bookmark },
    { id: "experience", label: "Currículo", icon: Briefcase },
    { id: "messages", label: "Mensagens", icon: MessageSquare },
    { id: "profile", label: "Configurações", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 right-0 left-0 z-30">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Dashboard do Candidato</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleRefresh}>
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="ml-1 px-1 min-w-[1rem] h-5">3</Badge>
            </Button>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{candidateName}</p>
                <p className="text-xs text-gray-500">Candidato</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 border-r`}>
          <nav className="mt-8">
            <div className="px-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors mb-1 ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Visão Geral</h2>
                <div className="text-sm text-gray-600">
                  Bem-vindo de volta, {candidateName}!
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-xs text-gray-500">{stat.trend}</p>
                        </div>
                        <div className={`${stat.color} p-3 rounded-lg`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>
                    Acesse rapidamente as funcionalidades mais utilizadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button onClick={() => setActiveTab("jobs")} className="h-16">
                      <div className="text-center">
                        <Search className="h-5 w-5 mx-auto mb-1" />
                        <span>Buscar Vagas</span>
                      </div>
                    </Button>
                    <Button onClick={() => setActiveTab("experience")} variant="outline" className="h-16">
                      <div className="text-center">
                        <Briefcase className="h-5 w-5 mx-auto mb-1" />
                        <span>Atualizar Currículo</span>
                      </div>
                    </Button>
                    <Button onClick={() => setActiveTab("applications")} variant="outline" className="h-16">
                      <div className="text-center">
                        <Activity className="h-5 w-5 mx-auto mb-1" />
                        <span>Ver Candidaturas</span>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Job Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Vagas Recomendadas</span>
                  </CardTitle>
                  <CardDescription>
                    Baseadas no seu perfil e experiência
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div>
                          <h3 className="font-medium">{rec.title}</h3>
                          <p className="text-sm text-gray-600">{rec.company} • {rec.location}</p>
                          <p className="text-sm text-gray-500">{rec.salary}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{rec.match}% match</Badge>
                          <Button size="sm">Ver Vaga</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Profile Completion */}
              <Card>
                <CardHeader>
                  <CardTitle>Completar Perfil</CardTitle>
                  <CardDescription>
                    Aumente suas chances de ser contratado completando seu perfil
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Experiência profissional</span>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Currículo anexado</span>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Adicionar foto de perfil</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Adicionar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progresso do perfil</span>
                      <span className="text-sm text-blue-600">85%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">
                      Perfis completos recebem 3x mais visualizações!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Buscar Vagas</h2>
                <div className="text-sm text-gray-600">
                  {filteredJobs.length} vagas encontradas
                </div>
              </div>

              {/* Search and Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Buscar por cargo ou empresa..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={filterLocation} onValueChange={setFilterLocation}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Localização" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as localizações</SelectItem>
                        <SelectItem value="São Paulo">São Paulo</SelectItem>
                        <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
                        <SelectItem value="Belo Horizonte">Belo Horizonte</SelectItem>
                        <SelectItem value="Remote">Remoto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Jobs List */}
              <div className="grid gap-6">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                            <Badge variant={job.status === "open" ? "default" : "secondary"}>
                              {job.status === "open" ? "Aberta" : "Fechada"}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <Building2 className="h-4 w-4 mr-1" />
                              {getCompany(job.companyId)?.name || job.companyId}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {job.salary || "A combinar"}
                            </div>
                          </div>
                          <p className="text-gray-700 line-clamp-2">{job.description}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {job.type && (
                              <Badge variant="outline" className="text-xs">
                                {job.type}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2 ml-6">
                          <Button 
                            size="sm" 
                            onClick={() => handleViewJob(job)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSaveJob(job.id)}
                          >
                            <Bookmark className="h-4 w-4 mr-2" />
                            {isJobSaved(candidateId, job.id) ? "Salva" : "Salvar"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredJobs.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma vaga encontrada</h3>
                    <p className="text-gray-600">Tente ajustar os filtros de busca.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Minhas Candidaturas</h2>
                <div className="text-sm text-gray-600">
                  {myApplications.length} candidaturas
                </div>
              </div>

              {myApplications.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Send className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma candidatura ainda</h3>
                    <p className="text-gray-600 mb-4">Comece a se candidatar às vagas disponíveis.</p>
                    <Button onClick={() => setActiveTab("jobs")}>
                      Buscar Vagas
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {myApplications.map((application) => {
                    const job = allJobs.find(j => j.id === application.jobId);
                    const status = getApplicationStatus(application.status);
                    
                    return (
                      <Card key={application.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold">{job?.title}</h3>
                                <Badge className={`${status.color} text-white`}>
                                  {status.label}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center">
                                  <Building2 className="h-4 w-4 mr-1" />
                                  {getCompany(job?.companyId || "")?.name || job?.companyId}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Candidatura enviada em {new Date(application.appliedAt).toLocaleDateString('pt-BR')}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-6">
                              {job && (
                                <Button size="sm" variant="outline" onClick={() => handleViewJob(job)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Saved Jobs Tab */}
          {activeTab === "saved" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Vagas Salvas</h2>
                <div className="text-sm text-gray-600">
                  {savedJobsWithDetails.length} vagas salvas
                </div>
              </div>

              {savedJobsWithDetails.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma vaga salva</h3>
                    <p className="text-gray-600 mb-4">Salve vagas interessantes para revisar depois.</p>
                    <Button onClick={() => setActiveTab("jobs")}>
                      Buscar Vagas
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {savedJobsWithDetails.map((saved) => (
                    <Card key={saved.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">{saved.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <Building2 className="h-4 w-4 mr-1" />
                                {saved.company}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {saved.location}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                Salva em {new Date(saved.savedAt).toLocaleDateString('pt-BR')}
                              </div>
                            </div>
                            <p className="text-gray-600">{saved.salary}</p>
                          </div>
                          <div className="flex space-x-2 ml-6">
                            <Button size="sm" onClick={() => {
                              const job = allJobs.find(j => j.id === saved.id);
                              if (job) handleViewJob(job);
                            }}>
                              Ver Vaga
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleSaveJob(saved.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Experience/CV Tab */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Currículo</h2>
                <div className="text-sm text-gray-600">
                  Dados completos do seu perfil profissional
                </div>
              </div>

              {/* Dados Pessoais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Dados Pessoais</span>
                  </CardTitle>
                  <CardDescription>
                    Informações básicas de contato e identificação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nome Completo</Label>
                      <Input value={candidateName} disabled />
                    </div>
                    <div>
                      <Label>E-mail Profissional</Label>
                      <Input value="joao.silva@email.com" disabled />
                    </div>
                    <div>
                      <Label>Telefone/WhatsApp</Label>
                      <Input placeholder="(11) 99999-9999" />
                    </div>
                    <div>
                      <Label>Cidade e Estado</Label>
                      <Input placeholder="São Paulo, SP" />
                    </div>
                    <div className="md:col-span-2">
                      <Label>LinkedIn (opcional)</Label>
                      <Input placeholder="https://linkedin.com/in/seu-perfil" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Experiência Profissional */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5" />
                    <span>Experiência Profissional</span>
                  </CardTitle>
                  <CardDescription>
                    Histórico de trabalho em ordem cronológica (mais recente primeiro)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button onClick={handleAddExperience} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Experiência
                    </Button>

                    {experiences.length === 0 ? (
                      <div className="text-center py-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma experiência adicionada</h3>
                        <p className="text-gray-600 mb-4">Comece adicionando suas experiências profissionais para destacar seu perfil.</p>
                        <Button onClick={handleAddExperience} variant="outline">
                          Adicionar Primeira Experiência
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {experiences.map((experience) => (
                          <Card key={experience.id} className="border-l-4 border-l-blue-500">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">{experience.cargo}</h3>
                                    {experience.atual && <Badge variant="secondary">Atual</Badge>}
                                  </div>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                    <div className="flex items-center">
                                      <Building2 className="h-4 w-4 mr-1" />
                                      {experience.empresa}
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      {experience.localizacao}
                                    </div>
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-1" />
                                      {formatDate(experience.dataInicio)} - {experience.atual ? "Presente" : formatDate(experience.dataFim)}
                                    </div>
                                  </div>
                                  <p className="text-gray-700">{experience.atividades}</p>
                                </div>
                                <div className="flex flex-col space-y-2 ml-6">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleEditExperience(experience)}
                                  >
                                    <Edit3 className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => handleDeleteExperience(experience.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Upload de Currículo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5" />
                    <span>Anexar Currículo</span>
                  </CardTitle>
                  <CardDescription>
                    Anexe seu currículo em formato PDF para complementar as informações
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Label htmlFor="cv-upload" className="cursor-pointer">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                              {uploadedCV ? `${uploadedCV.name}` : "Clique para enviar seu currículo (PDF)"}
                            </p>
                          </div>
                          <input
                            id="cv-upload"
                            type="file"
                            accept=".pdf"
                            onChange={handleCVUpload}
                            className="hidden"
                          />
                        </Label>
                      </div>
                    </div>
                    {uploadedCV && (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <File className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium text-green-800">{uploadedCV.name}</span>
                        </div>
                        <Button size="sm" variant="outline" onClick={handleDownloadCV}>
                          <Download className="h-4 w-4 mr-2" />
                          Baixar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Mensagens</h2>
                <div className="text-sm text-gray-600">
                  Sistema de mensagens em desenvolvimento
                </div>
              </div>

              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Em breve</h3>
                  <p className="text-gray-600">O sistema de mensagens estará disponível em breve.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Profile Settings Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Configurações do Perfil</h2>
                <div className="text-sm text-gray-600">
                  Gerencie suas informações pessoais
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Mantenha suas informações atualizadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nome Completo</Label>
                      <Input 
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>E-mail</Label>
                      <Input 
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Telefone</Label>
                      <Input 
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Localização</Label>
                      <Input 
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Cargo Atual</Label>
                      <Input 
                        value={profileForm.title}
                        onChange={(e) => setProfileForm({...profileForm, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Experiência</Label>
                      <Input 
                        value={profileForm.experience}
                        onChange={(e) => setProfileForm({...profileForm, experience: e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Habilidades</Label>
                      <Input 
                        value={profileForm.skills}
                        onChange={(e) => setProfileForm({...profileForm, skills: e.target.value})}
                        placeholder="React, Node.js, TypeScript..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Bio Profissional</Label>
                      <Textarea 
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>LinkedIn</Label>
                      <Input 
                        value={profileForm.linkedin}
                        onChange={(e) => setProfileForm({...profileForm, linkedin: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>GitHub</Label>
                      <Input 
                        value={profileForm.github}
                        onChange={(e) => setProfileForm({...profileForm, github: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Job Details Dialog */}
      <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
            <DialogDescription>
              {getCompany(selectedJob?.companyId || "")?.name || selectedJob?.companyId} • {selectedJob?.location}
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="font-semibold mb-2">Descrição da Vaga</h4>
                <p className="text-gray-700">{selectedJob.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Tipo de Contrato</h4>
                <p className="text-gray-700">{selectedJob.type}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Salário:</span>
                  <p>{selectedJob.salary || "A combinar"}</p>
                </div>
                <div>
                  <span className="font-medium">Tipo:</span>
                  <p>{selectedJob.type || "CLT"}</p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={() => {
                    handleApplyJob(selectedJob.id);
                    setShowJobDialog(false);
                  }}
                  className="flex-1"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Candidatar-se
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    handleSaveJob(selectedJob.id);
                    setShowJobDialog(false);
                  }}
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  {isJobSaved(candidateId, selectedJob.id) ? "Salva" : "Salvar"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Experience Edit Dialog */}
      <Dialog open={showExperienceDialog} onOpenChange={setShowExperienceDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingExperience ? 'Editar' : 'Adicionar'} Experiência</DialogTitle>
            <DialogDescription>
              {editingExperience ? 'Atualize as informações desta experiência profissional.' : 'Adicione uma nova experiência profissional ao seu perfil.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exp-empresa">Empresa</Label>
                <Input 
                  id="exp-empresa" 
                  value={experienceForm.empresa}
                  onChange={(e) => setExperienceForm({...experienceForm, empresa: e.target.value})}
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exp-cargo">Cargo</Label>
                <Input 
                  id="exp-cargo" 
                  value={experienceForm.cargo}
                  onChange={(e) => setExperienceForm({...experienceForm, cargo: e.target.value})}
                  placeholder="Seu cargo na empresa"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exp-localizacao">Localização</Label>
              <Input 
                id="exp-localizacao" 
                value={experienceForm.localizacao}
                onChange={(e) => setExperienceForm({...experienceForm, localizacao: e.target.value})}
                placeholder="Cidade, Estado ou Remote"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exp-inicio">Data de Início</Label>
                <Input 
                  id="exp-inicio" 
                  type="month"
                  value={experienceForm.dataInicio}
                  onChange={(e) => setExperienceForm({...experienceForm, dataInicio: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exp-fim">Data de Fim</Label>
                <Input 
                  id="exp-fim" 
                  type="month"
                  value={experienceForm.dataFim}
                  onChange={(e) => setExperienceForm({...experienceForm, dataFim: e.target.value})}
                  disabled={experienceForm.atual}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="exp-atual"
                checked={experienceForm.atual}
                onChange={(e) => setExperienceForm({
                  ...experienceForm, 
                  atual: e.target.checked,
                  dataFim: e.target.checked ? "" : experienceForm.dataFim
                })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="exp-atual" className="text-sm">
                Este é meu emprego atual
              </Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exp-atividades">Principais Atividades e Conquistas</Label>
              <Textarea 
                id="exp-atividades" 
                value={experienceForm.atividades}
                onChange={(e) => setExperienceForm({...experienceForm, atividades: e.target.value})}
                rows={4}
                placeholder="Use verbos de ação. Ex: Organizei, Gerenciei, Implementei... Descreva suas principais responsabilidades e conquistas."
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowExperienceDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveExperience}>
              <CheckCircle className="h-4 w-4 mr-2" />
              {editingExperience ? 'Atualizar' : 'Adicionar'} Experiência
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
