import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Eye, EyeOff, Building2, User, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { setRole, setCompany } from "@/lib/storage";

type UserRole = "super-admin" | "company" | "candidate";

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("candidate");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: ""
  });
  const navigate = useNavigate();

  const roles = [
    {
      id: "candidate" as UserRole,
      title: "Candidato",
      description: "Busque vagas e candidate-se",
      icon: User,
      color: "bg-blue-500",
      dashboard: "/dashboard/candidate"
    },
    {
      id: "company" as UserRole,
      title: "Empresa",
      description: "Publique vagas e gerencie candidatos",
      icon: Building2,
      color: "bg-green-500",
      dashboard: "/dashboard/company"
    },
    {
      id: "super-admin" as UserRole,
      title: "Super Admin",
      description: "Gerencie todo o sistema",
      icon: Shield,
      color: "bg-purple-500",
      dashboard: "/dashboard/super-admin"
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    if (selectedRole === "company") setCompany("mxs");
    
    const selectedRoleData = roles.find(r => r.id === selectedRole);
    navigate(selectedRoleData?.dashboard || "/");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Senhas não coincidem");
      return;
    }
    setRole(selectedRole);
    if (selectedRole === "company") setCompany("mxs");
    
    const selectedRoleData = roles.find(r => r.id === selectedRole);
    navigate(selectedRoleData?.dashboard || "/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <img 
              src="https://mxsfornecedores.iacodelabs.com.br/favicon.svg" 
              alt="MX Vagas" 
              className="h-10 w-10 group-hover:scale-110 transition" 
            />
            <span className="text-3xl font-bold text-foreground">MX Vagas</span>
          </Link>
          <p className="text-muted-foreground mt-2">Plataforma de Recrutamento e Seleção</p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Acesso ao Sistema</CardTitle>
            <CardDescription>
              Escolha seu tipo de acesso e entre na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Seleção de Tipo de Usuário */}
           

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Criar Conta</TabsTrigger>
              </TabsList>

              {/* Credenciais de Teste */}
              <div className="mb-6 p-4 bg-secondary/50 rounded-lg border">
                <h4 className="font-semibold text-sm mb-3 text-center">🔑 Credenciais para Teste</h4>
                <div className="grid grid-cols-1 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole("candidate");
                      setLoginForm({ email: "candidato@teste.com", password: "123456" });
                    }}
                    className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded border-l-4 border-blue-500 text-left hover:bg-blue-100 dark:hover:bg-blue-950/30 transition"
                  >
                    <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">👤 CANDIDATO</div>
                    <div className="text-blue-600 dark:text-blue-400">
                      Email: candidato@teste.com<br/>
                      Senha: 123456
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole("company");
                      setLoginForm({ email: "empresa@teste.com", password: "123456" });
                    }}
                    className="bg-green-50 dark:bg-green-950/20 p-3 rounded border-l-4 border-green-500 text-left hover:bg-green-100 dark:hover:bg-green-950/30 transition"
                  >
                    <div className="font-semibold text-green-700 dark:text-green-300 mb-1">🏢 EMPRESA</div>
                    <div className="text-green-600 dark:text-green-400">
                      Email: empresa@teste.com<br/>
                      Senha: 123456
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole("super-admin");
                      setLoginForm({ email: "admin@teste.com", password: "123456" });
                    }}
                    className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded border-l-4 border-purple-500 text-left hover:bg-purple-100 dark:hover:bg-purple-950/30 transition"
                  >
                    <div className="font-semibold text-purple-700 dark:text-purple-300 mb-1">🛡️ SUPER ADMIN</div>
                    <div className="text-purple-600 dark:text-purple-400">
                      Email: admin@teste.com<br/>
                      Senha: 123456
                    </div>
                  </button>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  💡 Clique nos cartões acima para preencher automaticamente
                </p>
              </div>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={selectedRole === "company" ? "empresa@exemplo.com" : "seu@email.com"}
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Lembrar-me</span>
                    </label>
                    <a href="#" className="text-primary hover:underline">
                      Esqueci minha senha
                    </a>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Entrar como {roles.find(r => r.id === selectedRole)?.title}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="name">
                      {selectedRole === "company" ? "Nome do Responsável" : "Nome Completo"}
                    </Label>
                    <Input
                      id="name"
                      placeholder={selectedRole === "company" ? "João Silva" : "Seu nome completo"}
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>

                  {selectedRole === "company" && (
                    <div>
                      <Label htmlFor="companyName">Nome da Empresa</Label>
                      <Input
                        id="companyName"
                        placeholder="Sua Empresa Ltda"
                        value={registerForm.companyName}
                        onChange={(e) => setRegisterForm({...registerForm, companyName: e.target.value})}
                        required
                        className="mt-1"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="registerEmail">E-mail</Label>
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder={selectedRole === "company" ? "contato@empresa.com" : "seu@email.com"}
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="registerPassword">Senha</Label>
                    <Input
                      id="registerPassword"
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-start space-x-2 text-sm">
                    <input type="checkbox" required className="rounded mt-1" />
                    <span className="text-muted-foreground">
                      Concordo com os{" "}
                      <a href="#" className="text-primary hover:underline">
                        Termos de Uso
                      </a>{" "}
                      e{" "}
                      <a href="#" className="text-primary hover:underline">
                        Política de Privacidade
                      </a>
                    </span>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Criar Conta como {roles.find(r => r.id === selectedRole)?.title}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Precisa de ajuda?{" "}
                <a href="#" className="text-primary hover:underline">
                  Entre em contato
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition">
            ← Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  );
}
