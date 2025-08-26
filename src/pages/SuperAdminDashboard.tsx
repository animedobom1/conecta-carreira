import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, Users, Building2, Briefcase, Settings, TrendingUp, 
  LogOut, BarChart3, Database, UserCheck, AlertTriangle,
  Search, Bell, Menu, Activity, DollarSign, 
  Globe, Lock, FileText, Home, Plus, Edit3, Trash2,
  Eye, Download, RefreshCw, CheckCircle, XCircle, Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setRole, getJobs, getCompanies, getApplications } from "@/lib/storage";

export default function SuperAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showAddCompanyDialog, setShowAddCompanyDialog] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const navigate = useNavigate();
  const jobs = getJobs();
  const companies = getCompanies();
  const applications = getApplications();

  // Dados simulados
  const [candidates] = useState([
    { id: 1, name: "Ana Silva", email: "ana@email.com", status: "active", registeredAt: "2024-01-15", applications: 5 },
    { id: 2, name: "João Santos", email: "joao@email.com", status: "active", registeredAt: "2024-01-20", applications: 3 },
    { id: 3, name: "Maria Costa", email: "maria@email.com", status: "inactive", registeredAt: "2024-01-10", applications: 8 },
    { id: 4, name: "Carlos Lima", email: "carlos@email.com", status: "active", registeredAt: "2024-01-25", applications: 2 },
  ]);

  const [subscriptions] = useState([
    { id: 1, company: "TechCorp", plan: "Pro", amount: 299.90, status: "active", nextPayment: "2024-02-15" },
    { id: 2, company: "StartupXYZ", plan: "Basic", amount: 99.90, status: "active", nextPayment: "2024-02-20" },
    { id: 3, company: "MegaCorp", plan: "Enterprise", amount: 999.90, status: "active", nextPayment: "2024-02-10" },
    { id: 4, company: "SmallBiz", plan: "Basic", amount: 99.90, status: "expired", nextPayment: "2024-01-30" },
  ]);

  const handleLogout = () => {
    setRole("candidate");
    navigate("/");
  };

  const handleRefreshData = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const downloadReport = (type) => {
    console.log(`Downloading ${type} report`);
  };

  const stats = [
    { title: "Total de Empresas", value: companies.length.toString(), icon: Building2, color: "bg-blue-500", trend: "+12%" },
    { title: "Vagas Ativas", value: jobs.filter(j => j.status === "open").length.toString(), icon: Briefcase, color: "bg-green-500", trend: "+8%" },
    { title: "Total de Candidatos", value: candidates.length.toString(), icon: Users, color: "bg-purple-500", trend: "+23%" },
    { title: "Candidaturas Hoje", value: applications.length.toString(), icon: UserCheck, color: "bg-orange-500", trend: "+5%" },
    { title: "Receita Mensal", value: "R$ 47.2K", icon: DollarSign, color: "bg-emerald-500", trend: "+18%" },
    { title: "Taxa de Conversão", value: "12.4%", icon: TrendingUp, color: "bg-pink-500", trend: "+3%" },
  ];

  const menuItems = [
    { id: "overview", label: "Visão Geral", icon: Home },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "users", label: "Usuários", icon: Users },
    { id: "companies", label: "Empresas", icon: Building2 },
    { id: "jobs", label: "Vagas", icon: Briefcase },
    { id: "finance", label: "Financeiro", icon: DollarSign },
    { id: "system", label: "Sistema", icon: Database },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  const recentActivity = [
    { action: "Nova empresa cadastrada", details: "TechCorp se registrou na plataforma", time: "2 min atrás", type: "success" },
    { action: "Vaga publicada", details: "Desenvolvedor React - MXS Soluções", time: "15 min atrás", type: "info" },
    { action: "Candidatura recebida", details: "João Silva se candidatou para Analista", time: "1 hora atrás", type: "info" },
    { action: "Pagamento processado", details: "TechCorp - Plano Profissional", time: "2 horas atrás", type: "success" },
    { action: "Suporte solicitado", details: "Empresa XYZ reportou problema", time: "3 horas atrás", type: "warning" },
  ];

  const systemHealth = [
    { metric: "Uptime", value: "99.9%", status: "excellent" },
    { metric: "Resp. Time", value: "142ms", status: "good" },
    { metric: "Error Rate", value: "0.02%", status: "excellent" },
    { metric: "Active Users", value: "2,341", status: "good" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <img src="/ia-code-labs-logo.svg" alt="IA Code Labs" className="h-6 w-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-lg">IA Code Labs</h1>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-white">SA</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">Super Admin</p>
                <p className="text-xs text-gray-500 truncate">admin@iacodelabs.com</p>
                <Badge variant="secondary" className="text-xs mt-1">Master</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
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

        {/* Logout */}
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-sm text-gray-500">Bem-vindo de volta, Admin</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Buscar..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
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

              {/* Charts and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Métricas de Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-4">Sistema</h4>
                        <div className="space-y-3">
                          {systemHealth.map((metric, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-sm">{metric.metric}</span>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-sm">{metric.value}</span>
                                <div className={`w-2 h-2 rounded-full ${
                                  metric.status === 'excellent' ? 'bg-green-500' :
                                  metric.status === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4">Crescimento</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">Novas Empresas</span>
                            <span className="font-semibold text-sm text-green-600">+24</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Novos Candidatos</span>
                            <span className="font-semibold text-sm text-green-600">+312</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Vagas Publicadas</span>
                            <span className="font-semibold text-sm text-green-600">+89</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Receita (MRR)</span>
                            <span className="font-semibold text-sm text-green-600">+R$ 15.4K</span>
                          </div>
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
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestão de Usuários</h2>
                <div className="flex gap-2">
                  <Button onClick={handleRefreshData} variant="outline" size="sm" disabled={refreshing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                    Atualizar
                  </Button>
                  <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Usuário
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                        <DialogDescription>
                          Preencha os dados para criar um novo usuário no sistema.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Nome</Label>
                          <Input id="name" placeholder="Nome completo" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">Email</Label>
                          <Input id="email" type="email" placeholder="email@exemplo.com" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">Função</Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Selecione a função" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="candidate">Candidato</SelectItem>
                              <SelectItem value="company">Empresa</SelectItem>
                              <SelectItem value="admin">Administrador</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={() => setShowAddUserDialog(false)}>
                          Criar Usuário
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              {/* Stats de Usuários */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold">{candidates.length}</p>
                    <p className="text-sm text-gray-600">Candidatos</p>
                    <p className="text-xs text-green-600 mt-1">+12 esta semana</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Building2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">{companies.length}</p>
                    <p className="text-sm text-gray-600">Empresas</p>
                    <p className="text-xs text-green-600 mt-1">+3 esta semana</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-gray-600">Admins</p>
                    <p className="text-xs text-gray-500 mt-1">Sem alterações</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <UserCheck className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <p className="text-2xl font-bold">{candidates.filter(c => c.status === 'active').length}</p>
                    <p className="text-sm text-gray-600">Ativos</p>
                    <p className="text-xs text-green-600 mt-1">85% atividade</p>
                  </CardContent>
                </Card>
              </div>

              {/* Lista de Candidatos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Candidatos Registrados</span>
                    <Button variant="outline" size="sm" onClick={() => downloadReport('users')}>
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4">
                    <Input
                      placeholder="Buscar por nome ou email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    {candidates
                      .filter(candidate => 
                        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((candidate) => (
                      <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{candidate.name}</h4>
                            <p className="text-sm text-gray-600">{candidate.email}</p>
                            <p className="text-xs text-gray-500">
                              Registrado em {new Date(candidate.registeredAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant={candidate.status === 'active' ? 'default' : 'secondary'}>
                            {candidate.status === 'active' ? 'Ativo' : 'Inativo'}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {candidate.applications} candidaturas
                          </span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
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

          {/* Companies Tab */}
          {activeTab === "companies" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestão de Empresas</h2>
                <div className="flex gap-2">
                  <Button onClick={handleRefreshData} variant="outline" size="sm" disabled={refreshing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                    Atualizar
                  </Button>
                  <Dialog open={showAddCompanyDialog} onOpenChange={setShowAddCompanyDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Empresa
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Adicionar Nova Empresa</DialogTitle>
                        <DialogDescription>
                          Registre uma nova empresa na plataforma.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="companyName" className="text-right">Nome</Label>
                          <Input id="companyName" placeholder="Empresa Ltda" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="companyEmail" className="text-right">Email</Label>
                          <Input id="companyEmail" type="email" placeholder="contato@empresa.com" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="plan" className="text-right">Plano</Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Selecione o plano" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Básico - Gratuito</SelectItem>
                              <SelectItem value="pro">Pro - R$ 299/mês</SelectItem>
                              <SelectItem value="enterprise">Enterprise - R$ 999/mês</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowAddCompanyDialog(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={() => setShowAddCompanyDialog(false)}>
                          Criar Empresa
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              {/* Stats de Empresas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Building2 className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold">{companies.length}</p>
                    <p className="text-sm text-gray-600">Total de Empresas</p>
                    <p className="text-xs text-green-600 mt-1">+{Math.floor(companies.length * 0.15)} este mês</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">{Math.floor(companies.length * 0.85)}</p>
                    <p className="text-sm text-gray-600">Ativas</p>
                    <p className="text-xs text-green-600 mt-1">85% aprovadas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-2xl font-bold">{Math.floor(companies.length * 0.1)}</p>
                    <p className="text-sm text-gray-600">Pendentes</p>
                    <p className="text-xs text-yellow-600 mt-1">Aguardando aprovação</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <XCircle className="h-8 w-8 mx-auto mb-2 text-red-500" />
                    <p className="text-2xl font-bold">{Math.floor(companies.length * 0.05)}</p>
                    <p className="text-sm text-gray-600">Suspensas</p>
                    <p className="text-xs text-red-600 mt-1">5% do total</p>
                  </CardContent>
                </Card>
              </div>

              {/* Lista de Empresas */}
              <Card>
                <CardHeader>
                  <CardTitle>Empresas Cadastradas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {companies.map((company) => (
                      <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {company.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-lg">{company.name}</h4>
                            <p className="text-sm text-gray-600">
                              Cadastrada em {new Date(company.createdAt).toLocaleDateString()}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {jobs.filter(j => j.companyId === company.id).length} vagas
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Plano Pro
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Ativa
                          </Badge>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">R$ 299/mês</p>
                            <p className="text-xs text-gray-500">Próximo: 15/02</p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <XCircle className="h-4 w-4 text-red-600" />
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

          {/* Finance Tab */}
          {activeTab === "finance" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestão Financeira</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => downloadReport('financial')}>
                    <Download className="h-4 w-4 mr-2" />
                    Relatório Financeiro
                  </Button>
                  <Button onClick={handleRefreshData} variant="outline" size="sm" disabled={refreshing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                    Atualizar
                  </Button>
                </div>
              </div>

              {/* Métricas Financeiras */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-3xl font-bold text-green-600">R$ 47.2K</p>
                    <p className="text-sm text-gray-600">Receita Mensal</p>
                    <p className="text-xs text-green-600 mt-1">+18% vs mês anterior</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-3xl font-bold text-blue-600">R$ 565K</p>
                    <p className="text-sm text-gray-600">Receita Anual</p>
                    <p className="text-xs text-blue-600 mt-1">Meta: R$ 720K</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <p className="text-3xl font-bold text-purple-600">156</p>
                    <p className="text-sm text-gray-600">Assinantes Ativos</p>
                    <p className="text-xs text-purple-600 mt-1">+12 este mês</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <p className="text-3xl font-bold text-orange-600">R$ 302</p>
                    <p className="text-sm text-gray-600">Ticket Médio</p>
                    <p className="text-xs text-orange-600 mt-1">+5% vs mês anterior</p>
                  </CardContent>
                </Card>
              </div>

              {/* Tabela de Assinaturas */}
              <Card>
                <CardHeader>
                  <CardTitle>Assinaturas Ativas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Empresa</th>
                          <th className="text-left p-3">Plano</th>
                          <th className="text-left p-3">Valor</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Próximo Pagamento</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscriptions.map((subscription) => (
                          <tr key={subscription.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <div className="font-medium">{subscription.company}</div>
                            </td>
                            <td className="p-3">
                              <Badge variant="outline">{subscription.plan}</Badge>
                            </td>
                            <td className="p-3">
                              <span className="font-semibold text-green-600">
                                R$ {subscription.amount.toFixed(2)}
                              </span>
                            </td>
                            <td className="p-3">
                              <Badge 
                                variant={subscription.status === 'active' ? 'default' : 'destructive'}
                                className={subscription.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                              >
                                {subscription.status === 'active' ? 'Ativo' : 'Vencido'}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <span className={`text-sm ${
                                new Date(subscription.nextPayment) < new Date() ? 'text-red-600' : 'text-gray-600'
                              }`}>
                                {new Date(subscription.nextPayment).toLocaleDateString()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Analytics & Relatórios</h2>
                <div className="flex gap-2">
                  <Button onClick={handleRefreshData} variant="outline" size="sm" disabled={refreshing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                    Atualizar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => downloadReport('analytics')}>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Dados
                  </Button>
                </div>
              </div>

              {/* Métricas Principais */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Tráfego Total</p>
                        <p className="text-3xl font-bold">45.2K</p>
                        <p className="text-sm text-green-600 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +15% vs mês anterior
                        </p>
                      </div>
                      <div className="p-3 rounded-full bg-blue-500 text-white">
                        <Activity className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                        <p className="text-3xl font-bold">12.4%</p>
                        <p className="text-sm text-green-600 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +3.2% vs mês anterior
                        </p>
                      </div>
                      <div className="p-3 rounded-full bg-green-500 text-white">
                        <BarChart3 className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Sessões Ativas</p>
                        <p className="text-3xl font-bold">2,341</p>
                        <p className="text-sm text-blue-600 flex items-center mt-1">
                          <Users className="h-3 w-3 mr-1" />
                          Online agora
                        </p>
                      </div>
                      <div className="p-3 rounded-full bg-purple-500 text-white">
                        <Globe className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Tempo na Página</p>
                        <p className="text-3xl font-bold">4m 32s</p>
                        <p className="text-sm text-orange-600 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          Média por sessão
                        </p>
                      </div>
                      <div className="p-3 rounded-full bg-orange-500 text-white">
                        <Clock className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Gráficos e Relatórios */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Crescimento de Usuários (30 dias)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">Gráfico de Crescimento</p>
                        <p className="text-sm text-gray-400">Dados dos últimos 30 dias</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Fontes de Tráfego</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Busca Orgânica</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">65%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Direto</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">20%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Redes Sociais</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">10%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Outros</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">5%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabela de Páginas Mais Visitadas */}
              <Card>
                <CardHeader>
                  <CardTitle>Páginas Mais Visitadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Página</th>
                          <th className="text-left p-3">Visualizações</th>
                          <th className="text-left p-3">Tempo Médio</th>
                          <th className="text-left p-3">Taxa de Rejeição</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3">/vagas</td>
                          <td className="p-3 font-semibold">12,432</td>
                          <td className="p-3">3m 45s</td>
                          <td className="p-3 text-green-600">23%</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3">/empresas</td>
                          <td className="p-3 font-semibold">8,231</td>
                          <td className="p-3">2m 12s</td>
                          <td className="p-3 text-yellow-600">45%</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3">/</td>
                          <td className="p-3 font-semibold">15,678</td>
                          <td className="p-3">1m 30s</td>
                          <td className="p-3 text-red-600">67%</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3">/candidatos/perfil</td>
                          <td className="p-3 font-semibold">5,432</td>
                          <td className="p-3">5m 20s</td>
                          <td className="p-3 text-green-600">18%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestão de Vagas</h2>
                <div className="flex gap-2">
                  <Button onClick={handleRefreshData} variant="outline" size="sm" disabled={refreshing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                    Atualizar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => downloadReport('jobs')}>
                    <Download className="h-4 w-4 mr-2" />
                    Relatório de Vagas
                  </Button>
                </div>
              </div>

              {/* Stats de Vagas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Briefcase className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold">{jobs.length}</p>
                    <p className="text-sm text-gray-600">Total de Vagas</p>
                    <p className="text-xs text-blue-600 mt-1">+{Math.floor(jobs.length * 0.1)} esta semana</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">{jobs.filter(j => j.status === 'open').length}</p>
                    <p className="text-sm text-gray-600">Ativas</p>
                    <p className="text-xs text-green-600 mt-1">Abertas para candidatura</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-2xl font-bold">{Math.floor(jobs.length * 0.15)}</p>
                    <p className="text-sm text-gray-600">Pendentes</p>
                    <p className="text-xs text-yellow-600 mt-1">Aguardando aprovação</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <XCircle className="h-8 w-8 mx-auto mb-2 text-red-500" />
                    <p className="text-2xl font-bold">{Math.floor(jobs.length * 0.05)}</p>
                    <p className="text-sm text-gray-600">Expiradas</p>
                    <p className="text-xs text-red-600 mt-1">Fora do prazo</p>
                  </CardContent>
                </Card>
              </div>

              {/* Filtros e Busca */}
              <Card>
                <CardHeader>
                  <CardTitle>Filtros de Vagas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input placeholder="Buscar vaga..." />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="open">Ativas</SelectItem>
                        <SelectItem value="pending">Pendentes</SelectItem>
                        <SelectItem value="closed">Fechadas</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas Categorias</SelectItem>
                        <SelectItem value="tech">Tecnologia</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Vendas</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Localização" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="remote">Remoto</SelectItem>
                        <SelectItem value="sp">São Paulo</SelectItem>
                        <SelectItem value="rj">Rio de Janeiro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Vagas */}
              <Card>
                <CardHeader>
                  <CardTitle>Vagas Cadastradas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobs.slice(0, 10).map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Briefcase className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{job.title}</h4>
                            <p className="text-sm text-gray-600">{companies.find(c => c.id === job.companyId)?.name || 'Empresa não encontrada'}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {job.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {job.location}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                R$ {job.salary}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge 
                            variant={job.status === 'open' ? 'default' : 'secondary'}
                            className={job.status === 'open' ? 'bg-green-100 text-green-700' : ''}
                          >
                            {job.status === 'open' ? 'Ativa' : 'Inativa'}
                          </Badge>
                          <div className="text-right">
                            <p className="font-semibold text-sm">{applications.filter(a => a.jobId === job.id).length} candidatos</p>
                            <p className="text-xs text-gray-500">
                              Publicada em {new Date(job.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
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

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Configurações da Plataforma</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Configurações Gerais */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Configurações Gerais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Nome da Plataforma</Label>
                      <Input id="siteName" defaultValue="IA Code Labs" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteDescription">Descrição</Label>
                      <Input id="siteDescription" defaultValue="Conectando talentos às melhores oportunidades" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supportEmail">Email de Suporte</Label>
                      <Input id="supportEmail" type="email" defaultValue="suporte@iacodelabs.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxJobs">Máximo de Vagas por Empresa (Plano Básico)</Label>
                      <Input id="maxJobs" type="number" defaultValue="5" />
                    </div>
                  </CardContent>
                </Card>

                {/* Configurações de Email */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Notificações por Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificar novas empresas</p>
                        <p className="text-sm text-gray-500">Receber email quando uma empresa se cadastra</p>
                      </div>
                      <Button variant="outline" size="sm">Ativo</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificar novas vagas</p>
                        <p className="text-sm text-gray-500">Receber email quando uma vaga é publicada</p>
                      </div>
                      <Button variant="outline" size="sm">Ativo</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Relatório semanal</p>
                        <p className="text-sm text-gray-500">Resumo semanal das atividades</p>
                      </div>
                      <Button variant="outline" size="sm">Ativo</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Alertas de sistema</p>
                        <p className="text-sm text-gray-500">Notificações de problemas técnicos</p>
                      </div>
                      <Button variant="outline" size="sm">Ativo</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Configurações de Segurança */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="h-5 w-5 mr-2" />
                      Segurança
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Duração da Sessão (minutos)</Label>
                      <Input type="number" defaultValue="60" />
                    </div>
                    <div className="space-y-2">
                      <Label>Tentativas de Login Máximas</Label>
                      <Input type="number" defaultValue="5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Autenticação de 2 Fatores</p>
                        <p className="text-sm text-gray-500">Requer verificação adicional</p>
                      </div>
                      <Button variant="outline" size="sm">Ativar</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Força da Senha</p>
                        <p className="text-sm text-gray-500">Exigir senhas complexas</p>
                      </div>
                      <Button variant="outline" size="sm">Ativo</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Configurações de Planos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Planos e Preços
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Plano Básico (R$)</Label>
                      <Input type="number" step="0.01" defaultValue="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label>Plano Pro (R$)</Label>
                      <Input type="number" step="0.01" defaultValue="299.90" />
                    </div>
                    <div className="space-y-2">
                      <Label>Plano Enterprise (R$)</Label>
                      <Input type="number" step="0.01" defaultValue="999.90" />
                    </div>
                    <div className="space-y-2">
                      <Label>Taxa de Comissão (%)</Label>
                      <Input type="number" step="0.01" defaultValue="5.00" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Ações de Sistema */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    Manutenção do Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Backup Manual
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Limpar Cache
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Logs do Sistema
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Botão de Salvar */}
              <div className="flex justify-end">
                <Button className="px-8">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === "system" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Configurações do Sistema</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2" />
                      Status do Sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Servidor Principal</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Banco de Dados</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>CDN</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Email Service</span>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Lento</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="h-5 w-5 mr-2" />
                      Segurança
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>SSL Certificate</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Válido</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Backup Diário</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Ativo</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Firewall</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Ativo</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Rate Limiting</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Ativo</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}