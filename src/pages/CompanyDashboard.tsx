import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, Users, Briefcase, Settings, TrendingUp, 
  LogOut, BarChart3, UserCheck, AlertTriangle,
  Search, Bell, Menu, Activity, DollarSign, 
  Eye, PlusCircle, Edit3, Trash2, Calendar,
  Download, RefreshCw, CheckCircle, XCircle, Clock,
  Target, MessageSquare, FileText, Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  setRole, getJobs, getApplications, getSession, createJob, 
  updateJobStatus, deleteJob, saveApplications, Job, Application 
} from "@/lib/storage";
import { useSEO } from "@/hooks/useSEO";

export default function CompanyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddJobDialog, setShowAddJobDialog] = useState(false);
  const [showEditJobDialog, setShowEditJobDialog] = useState(false);
  const [showCandidateDialog, setShowCandidateDialog] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<{
    id: number;
    name: string;
    email: string;
    jobTitle: string;
    status: string;
    appliedAt: string;
    experience: string;
  } | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterJob, setFilterJob] = useState("all");
  
  // Form states
  const [jobForm, setJobForm] = useState({
    title: "",
    type: "",
    location: "",
    salary: "",
    description: ""
  });
  
  const navigate = useNavigate();
  const session = getSession();
  const companyId = session.companyId ?? "mxs";
  const companyName = session.companyId === "mxs" ? "MXS Soluções" : "Empresa";
  
  const [companyForm, setCompanyForm] = useState({
    name: companyName,
    email: "empresa@email.com",
    website: "https://empresa.com",
    description: "Empresa inovadora focada em tecnologia",
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: false
  });
  
  const allJobs = getJobs();
  const jobs = allJobs.filter((j) => j.companyId === companyId);
  const allApplications = getApplications();
  const myJobIds = jobs.map(j => j.id);
  const applications = allApplications.filter(app => myJobIds.includes(app.jobId));

  useSEO({ title: `Dashboard - ${companyName} | IA Code Labs`, description: "Dashboard da empresa para gerenciar vagas e candidaturas." });

  // Dados simulados para candidatos
  const [candidates, setCandidates] = useState([
    { id: 1, name: "Ana Silva", email: "ana@email.com", jobTitle: "Desenvolvedor React", status: "new", appliedAt: "2024-01-15", experience: "3 anos" },
    { id: 2, name: "João Santos", email: "joao@email.com", jobTitle: "Designer UX", status: "reviewing", appliedAt: "2024-01-20", experience: "5 anos" },
    { id: 3, name: "Maria Costa", email: "maria@email.com", jobTitle: "Analista de Dados", status: "approved", appliedAt: "2024-01-10", experience: "2 anos" },
    { id: 4, name: "Carlos Lima", email: "carlos@email.com", jobTitle: "Product Manager", status: "rejected", appliedAt: "2024-01-25", experience: "7 anos" },
    { id: 5, name: "Julia Oliveira", email: "julia@email.com", jobTitle: "Desenvolvedor React", status: "interview", appliedAt: "2024-01-18", experience: "4 anos" },
  ]);

  const handleLogout = () => {
    setRole("candidate");
    navigate("/");
  };

  const handleRefreshData = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const downloadReport = (type: string) => {
    const data = type === 'jobs' ? jobs : type === 'candidates' ? candidates : applications;
    const csvContent = "data:text/csv;charset=utf-8," 
      + (type === 'jobs' ? "ID,Título,Localização,Tipo,Salário,Status,Data Criação\n" 
          + jobs.map(j => `${j.id},${j.title},${j.location},${j.type},${j.salary},${j.status},${j.createdAt}`).join("\n")
        : type === 'candidates' ? "ID,Nome,Email,Cargo,Status,Data Candidatura,Experiência\n"
          + candidates.map(c => `${c.id},${c.name},${c.email},${c.jobTitle},${c.status},${c.appliedAt},${c.experience}`).join("\n")
        : "ID,Nome,Email,Vaga,Status,Data\n"
          + applications.map(a => `${a.id},${a.name},${a.email},${a.jobId},${a.status},${a.createdAt}`).join("\n"));
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${type}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateJob = () => {
    if (!jobForm.title || !jobForm.type || !jobForm.location || !jobForm.description) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    createJob({
      companyId,
      title: jobForm.title,
      type: jobForm.type,
      location: jobForm.location,
      salary: jobForm.salary,
      description: jobForm.description
    });

    setJobForm({ title: "", type: "", location: "", salary: "", description: "" });
    setShowAddJobDialog(false);
    alert("Vaga criada com sucesso!");
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setJobForm({
      title: job.title,
      type: job.type,
      location: job.location,
      salary: job.salary || "",
      description: job.description
    });
    setShowEditJobDialog(true);
  };

  const handleUpdateJob = () => {
    if (!selectedJob) return;
    
    const updatedJobs = getJobs().map(j => 
      j.id === selectedJob.id 
        ? { ...j, ...jobForm }
        : j
    );
    
    // Update jobs in storage
    localStorage.setItem('lc_jobs', JSON.stringify(updatedJobs));
    
    setSelectedJob(null);
    setJobForm({ title: "", type: "", location: "", salary: "", description: "" });
    setShowEditJobDialog(false);
    alert("Vaga atualizada com sucesso!");
  };

  const handleDeleteJob = (jobId: string) => {
    if (confirm("Tem certeza que deseja excluir esta vaga?")) {
      deleteJob(jobId);
      alert("Vaga excluída com sucesso!");
    }
  };

  const handleToggleJobStatus = (jobId: string, currentStatus: string) => {
    const newStatus = currentStatus === "open" ? "closed" : "open";
    updateJobStatus(jobId, newStatus as "open" | "closed");
    alert(`Vaga ${newStatus === "open" ? "ativada" : "pausada"} com sucesso!`);
  };

  const handleCandidateAction = (candidateId: number, action: 'approve' | 'reject' | 'interview') => {
    const updatedCandidates = candidates.map(c => 
      c.id === candidateId 
        ? { ...c, status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'interview' }
        : c
    );
    
    // Update candidates in state (in real app would be API call)
    setCandidates(updatedCandidates);
    
    const actionText = action === 'approve' ? 'aprovado' : action === 'reject' ? 'rejeitado' : 'marcado para entrevista';
    alert(`Candidato ${actionText} com sucesso!`);
  };

  const handleViewCandidate = (candidate: typeof candidates[0]) => {
    setSelectedCandidate(candidate);
    setShowCandidateDialog(true);
  };

  const handleSaveCompanySettings = () => {
    // In real app, this would save to backend
    alert("Configurações salvas com sucesso!");
  };

  const stats = [
    { title: "Total de Vagas", value: jobs.length.toString(), icon: Briefcase, color: "bg-blue-500", trend: "+2 esta semana" },
    { title: "Vagas Ativas", value: jobs.filter(j => j.status === "open").length.toString(), icon: CheckCircle, color: "bg-green-500", trend: "8 abertas" },
    { title: "Candidaturas", value: applications.length.toString(), icon: Users, color: "bg-purple-500", trend: "+15 esta semana" },
    { title: "Em Processo", value: candidates.filter(c => c.status === 'reviewing' || c.status === 'interview').length.toString(), icon: Clock, color: "bg-orange-500", trend: "5 aguardando" },
    { title: "Taxa Conversão", value: "18.5%", icon: TrendingUp, color: "bg-emerald-500", trend: "+3% vs mês passado" },
    { title: "Tempo Médio", value: "12 dias", icon: Calendar, color: "bg-pink-500", trend: "Para contratação" },
  ];

  const menuItems = [
    { id: "overview", label: "Visão Geral", icon: Home },
    { id: "jobs", label: "Minhas Vagas", icon: Briefcase },
    { id: "candidates", label: "Candidatos", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "messages", label: "Mensagens", icon: MessageSquare },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  const recentActivity = [
    { action: "Nova candidatura recebida", details: "Ana Silva se candidatou para Desenvolvedor React", time: "5 min atrás", type: "success" },
    { action: "Entrevista agendada", details: "Carlos Lima - Product Manager", time: "1 hora atrás", type: "info" },
    { action: "Vaga publicada", details: "Designer UX/UI Sênior", time: "2 horas atrás", type: "success" },
    { action: "Candidato aprovado", details: "Maria Costa para Analista de Dados", time: "1 dia atrás", type: "success" },
    { action: "Feedback enviado", details: "João Santos - Designer UX", time: "2 dias atrás", type: "info" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <img src="/ia-code-labs-logo.svg" alt="IA Code Labs" className="h-6 w-6" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-lg">IA Code Labs</h1>
                <p className="text-xs text-gray-500">Painel Empresa</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {companyName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{companyName}</p>
                <p className="text-xs text-gray-500 truncate">empresa@email.com</p>
                <Badge variant="secondary" className="text-xs mt-1">Plano Pro</Badge>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <IconComponent className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className={`w-full ${sidebarOpen ? 'justify-start' : 'justify-center'} text-red-600 hover:text-red-700 hover:bg-red-50`}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Sair</span>}
          </Button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Empresarial</h1>
                <p className="text-sm text-gray-500">Bem-vindo de volta, {companyName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Buscar candidatos..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">5</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <Card key={index} className="relative overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                            <p className="text-sm text-green-600 font-medium flex items-center mt-1">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {stat.trend}
                            </p>
                          </div>
                          <div className={`p-3 rounded-full ${stat.color} text-white`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Performance das Vagas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-4">Métricas Principais</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Visualizações</span>
                            <span className="font-semibold text-sm">2,341</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Candidaturas</span>
                            <span className="font-semibold text-sm">{applications.length}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Taxa Conversão</span>
                            <span className="font-semibold text-sm">18.5%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Contratações</span>
                            <span className="font-semibold text-sm">12</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4">Vagas Mais Procuradas</h4>
                        <div className="space-y-3">
                          {jobs.slice(0, 4).map((job, index) => (
                            <div key={job.id} className="flex justify-between">
                              <span className="text-sm truncate">{job.title}</span>
                              <span className="font-semibold text-sm text-green-600">
                                {applications.filter(a => a.jobId === job.id).length}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Atividade Recente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.type === 'success' ? 'bg-green-500' :
                            activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-gray-500 truncate">{activity.details}</p>
                            <p className="text-xs text-gray-400">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button className="flex items-center justify-start h-auto p-4" onClick={() => setShowAddJobDialog(true)}>
                      <PlusCircle className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Nova Vaga</p>
                        <p className="text-xs opacity-80">Publicar oportunidade</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-start h-auto p-4" onClick={() => setActiveTab("candidates")}>
                      <Users className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Ver Candidatos</p>
                        <p className="text-xs opacity-80">{candidates.filter(c => c.status === 'new').length} novos</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-start h-auto p-4" onClick={() => downloadReport('jobs')}>
                      <Download className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Relatórios</p>
                        <p className="text-xs opacity-80">Exportar dados</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-start h-auto p-4" onClick={() => setActiveTab("settings")}>
                      <Settings className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Configurações</p>
                        <p className="text-xs opacity-80">Perfil da empresa</p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "jobs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Minhas Vagas</h2>
                <div className="flex gap-2">
                  <Button onClick={handleRefreshData} variant="outline" size="sm" disabled={refreshing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                    Atualizar
                  </Button>
                  <Dialog open={showAddJobDialog} onOpenChange={setShowAddJobDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Nova Vaga
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Publicar Nova Vaga</DialogTitle>
                        <DialogDescription>
                          Preencha os dados para publicar uma nova oportunidade.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Título da Vaga</Label>
                            <Input 
                              id="title" 
                              placeholder="Ex: Desenvolvedor React Sênior"
                              value={jobForm.title}
                              onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="type">Tipo</Label>
                            <Select value={jobForm.type} onValueChange={(value) => setJobForm(prev => ({ ...prev, type: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="CLT">CLT</SelectItem>
                                <SelectItem value="PJ">PJ</SelectItem>
                                <SelectItem value="Remoto">Remoto</SelectItem>
                                <SelectItem value="Estágio">Estágio</SelectItem>
                                <SelectItem value="Freelance">Freelance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="location">Localização</Label>
                            <Input 
                              id="location" 
                              placeholder="Ex: São Paulo, SP"
                              value={jobForm.location}
                              onChange={(e) => setJobForm(prev => ({ ...prev, location: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="salary">Salário</Label>
                            <Input 
                              id="salary" 
                              placeholder="Ex: R$ 8.000 - R$ 12.000"
                              value={jobForm.salary}
                              onChange={(e) => setJobForm(prev => ({ ...prev, salary: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Descrição</Label>
                          <Textarea 
                            id="description" 
                            placeholder="Descreva a vaga, responsabilidades e requisitos..."
                            value={jobForm.description}
                            onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
                            rows={4}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowAddJobDialog(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateJob}>
                          Publicar Vaga
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {/* Edit Job Dialog */}
                  <Dialog open={showEditJobDialog} onOpenChange={setShowEditJobDialog}>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Editar Vaga</DialogTitle>
                        <DialogDescription>
                          Atualize as informações da vaga.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-title">Título da Vaga</Label>
                            <Input 
                              id="edit-title" 
                              placeholder="Ex: Desenvolvedor React Sênior"
                              value={jobForm.title}
                              onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-type">Tipo</Label>
                            <Select value={jobForm.type} onValueChange={(value) => setJobForm(prev => ({ ...prev, type: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="CLT">CLT</SelectItem>
                                <SelectItem value="PJ">PJ</SelectItem>
                                <SelectItem value="Remoto">Remoto</SelectItem>
                                <SelectItem value="Estágio">Estágio</SelectItem>
                                <SelectItem value="Freelance">Freelance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-location">Localização</Label>
                            <Input 
                              id="edit-location" 
                              placeholder="Ex: São Paulo, SP"
                              value={jobForm.location}
                              onChange={(e) => setJobForm(prev => ({ ...prev, location: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-salary">Salário</Label>
                            <Input 
                              id="edit-salary" 
                              placeholder="Ex: R$ 8.000 - R$ 12.000"
                              value={jobForm.salary}
                              onChange={(e) => setJobForm(prev => ({ ...prev, salary: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-description">Descrição</Label>
                          <Textarea 
                            id="edit-description" 
                            placeholder="Descreva a vaga, responsabilidades e requisitos..."
                            value={jobForm.description}
                            onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
                            rows={4}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowEditJobDialog(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleUpdateJob}>
                          Atualizar Vaga
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Briefcase className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold">{jobs.length}</p>
                    <p className="text-sm text-gray-600">Total de Vagas</p>
                    <p className="text-xs text-blue-600 mt-1">+2 esta semana</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">{jobs.filter(j => j.status === 'open').length}</p>
                    <p className="text-sm text-gray-600">Ativas</p>
                    <p className="text-xs text-green-600 mt-1">Recebendo candidaturas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <p className="text-2xl font-bold">{applications.length}</p>
                    <p className="text-sm text-gray-600">Candidaturas</p>
                    <p className="text-xs text-purple-600 mt-1">Total recebidas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <p className="text-2xl font-bold">18.5%</p>
                    <p className="text-sm text-gray-600">Taxa Conversão</p>
                    <p className="text-xs text-orange-600 mt-1">Candidatos por vaga</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Vagas Publicadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Briefcase className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{job.title}</h4>
                            <p className="text-sm text-gray-600">{job.location} • {job.type}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                R$ {job.salary}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {applications.filter(a => a.jobId === job.id).length} candidatos
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge 
                            variant={job.status === 'open' ? 'default' : 'secondary'}
                            className={job.status === 'open' ? 'bg-green-100 text-green-700' : ''}
                          >
                            {job.status === 'open' ? 'Ativa' : 'Pausada'}
                          </Badge>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              Publicada em {new Date(job.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleToggleJobStatus(job.id, job.status)}
                              title={job.status === 'open' ? 'Pausar vaga' : 'Ativar vaga'}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditJob(job)}
                              title="Editar vaga"
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteJob(job.id)}
                              title="Excluir vaga"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "candidates" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Candidatos</h2>
                <Button onClick={handleRefreshData} variant="outline" size="sm" disabled={refreshing}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold">{candidates.length}</p>
                    <p className="text-sm text-gray-600">Total de Candidatos</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-2xl font-bold">{candidates.filter(c => c.status === 'new').length}</p>
                    <p className="text-sm text-gray-600">Novos</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <p className="text-2xl font-bold">{candidates.filter(c => c.status === 'reviewing' || c.status === 'interview').length}</p>
                    <p className="text-sm text-gray-600">Em Processo</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">{candidates.filter(c => c.status === 'approved').length}</p>
                    <p className="text-sm text-gray-600">Aprovados</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Buscar candidatos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="new">Novos</SelectItem>
                        <SelectItem value="reviewing">Em Análise</SelectItem>
                        <SelectItem value="interview">Entrevista</SelectItem>
                        <SelectItem value="approved">Aprovados</SelectItem>
                        <SelectItem value="rejected">Rejeitados</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterJob} onValueChange={setFilterJob}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Vaga" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as Vagas</SelectItem>
                        {jobs.map((job) => (
                          <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={() => downloadReport('candidates')} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lista de Candidatos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidates
                      .filter(candidate => {
                        const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
                        
                        const matchesStatus = filterStatus === 'all' || candidate.status === filterStatus;
                        const matchesJob = filterJob === 'all' || candidate.jobTitle.includes(jobs.find(j => j.id === filterJob)?.title || '');
                        
                        return matchesSearch && matchesStatus && matchesJob;
                      })
                      .map((candidate) => (
                      <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{candidate.name}</h4>
                            <p className="text-sm text-gray-600">{candidate.email}</p>
                            <p className="text-sm text-gray-500">{candidate.jobTitle} • {candidate.experience}</p>
                            <p className="text-xs text-gray-400">
                              Candidatou-se em {new Date(candidate.appliedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge 
                            variant={
                              candidate.status === 'new' ? 'secondary' :
                              candidate.status === 'approved' ? 'default' :
                              candidate.status === 'rejected' ? 'destructive' : 'outline'
                            }
                            className={
                              candidate.status === 'new' ? 'bg-blue-100 text-blue-700' :
                              candidate.status === 'approved' ? 'bg-green-100 text-green-700' :
                              candidate.status === 'reviewing' ? 'bg-yellow-100 text-yellow-700' :
                              candidate.status === 'interview' ? 'bg-purple-100 text-purple-700' : ''
                            }
                          >
                            {candidate.status === 'new' ? 'Novo' :
                             candidate.status === 'reviewing' ? 'Analisando' :
                             candidate.status === 'interview' ? 'Entrevista' :
                             candidate.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                          </Badge>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewCandidate(candidate)}
                              title="Ver detalhes"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleCandidateAction(candidate.id, 'approve')}
                              title="Aprovar candidato"
                              disabled={candidate.status === 'approved'}
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleCandidateAction(candidate.id, 'reject')}
                              title="Rejeitar candidato"
                              disabled={candidate.status === 'rejected'}
                            >
                              <XCircle className="h-4 w-4 text-red-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleCandidateAction(candidate.id, 'interview')}
                              title="Marcar para entrevista"
                              disabled={candidate.status === 'interview'}
                            >
                              <Calendar className="h-4 w-4 text-blue-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Analytics & Relatórios</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance das Vagas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">Gráfico de Performance</p>
                        <p className="text-sm text-gray-400">Visualizações vs Candidaturas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Funil de Conversão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Visualizações</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">2,341</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Candidaturas</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">{applications.length}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Entrevistas</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">{candidates.filter(c => c.status === 'interview').length}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Contratações</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">{candidates.filter(c => c.status === 'approved').length}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Mensagens</h2>
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Sistema de Mensagens</h3>
                  <p className="text-gray-500">
                    Funcionalidade em desenvolvimento. Em breve você poderá se comunicar diretamente com os candidatos.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Configurações da Empresa</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações da Empresa</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Nome da Empresa</Label>
                      <Input 
                        id="companyName" 
                        value={companyForm.name}
                        onChange={(e) => setCompanyForm({...companyForm, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Email Corporativo</Label>
                      <Input 
                        id="companyEmail" 
                        type="email" 
                        value={companyForm.email}
                        onChange={(e) => setCompanyForm({...companyForm, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyWebsite">Website</Label>
                      <Input 
                        id="companyWebsite" 
                        value={companyForm.website}
                        onChange={(e) => setCompanyForm({...companyForm, website: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyDescription">Descrição</Label>
                      <Textarea 
                        id="companyDescription" 
                        placeholder="Conte sobre sua empresa..."
                        value={companyForm.description}
                        onChange={(e) => setCompanyForm({...companyForm, description: e.target.value})}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferências</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificações por Email</p>
                        <p className="text-sm text-gray-500">Receber emails sobre novas candidaturas</p>
                      </div>
                      <Button 
                        variant={companyForm.emailNotifications ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setCompanyForm({...companyForm, emailNotifications: !companyForm.emailNotifications})}
                      >
                        {companyForm.emailNotifications ? 'Ativo' : 'Inativo'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificações Push</p>
                        <p className="text-sm text-gray-500">Alertas em tempo real</p>
                      </div>
                      <Button 
                        variant={companyForm.pushNotifications ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setCompanyForm({...companyForm, pushNotifications: !companyForm.pushNotifications})}
                      >
                        {companyForm.pushNotifications ? 'Ativo' : 'Inativo'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Relatório Semanal</p>
                        <p className="text-sm text-gray-500">Resumo das atividades</p>
                      </div>
                      <Button 
                        variant={companyForm.weeklyReport ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setCompanyForm({...companyForm, weeklyReport: !companyForm.weeklyReport})}
                      >
                        {companyForm.weeklyReport ? 'Ativo' : 'Inativo'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end">
                <Button className="px-8" onClick={handleSaveCompanySettings}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Candidate Details Dialog */}
      <Dialog open={showCandidateDialog} onOpenChange={setShowCandidateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Candidato</DialogTitle>
            <DialogDescription>
              Informações completas do candidato.
            </DialogDescription>
          </DialogHeader>
          {selectedCandidate && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedCandidate.name}</h3>
                  <p className="text-sm text-gray-600">{selectedCandidate.email}</p>
                  <Badge 
                    variant={
                      selectedCandidate.status === 'new' ? 'secondary' :
                      selectedCandidate.status === 'approved' ? 'default' :
                      selectedCandidate.status === 'rejected' ? 'destructive' : 'outline'
                    }
                    className="mt-1"
                  >
                    {selectedCandidate.status === 'new' ? 'Novo' :
                     selectedCandidate.status === 'reviewing' ? 'Analisando' :
                     selectedCandidate.status === 'interview' ? 'Entrevista' :
                     selectedCandidate.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Cargo Desejado</Label>
                  <p className="text-sm text-gray-700">{selectedCandidate.jobTitle}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Experiência</Label>
                  <p className="text-sm text-gray-700">{selectedCandidate.experience}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Data da Candidatura</Label>
                <p className="text-sm text-gray-700">
                  {new Date(selectedCandidate.appliedAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              
              <div className="flex justify-between gap-2 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleCandidateAction(selectedCandidate.id, 'interview')}
                  disabled={selectedCandidate.status === 'interview'}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Entrevista
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleCandidateAction(selectedCandidate.id, 'approve')}
                  disabled={selectedCandidate.status === 'approved'}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Aprovar
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => handleCandidateAction(selectedCandidate.id, 'reject')}
                  disabled={selectedCandidate.status === 'rejected'}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Rejeitar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}