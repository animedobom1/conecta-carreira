import { Button } from "@/components/ui/button";
import { Briefcase, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSession, setRole, setCompany } from "@/lib/storage";
import { useEffect, useState } from "react";

export const Header = () => {
  const [role, setRoleState] = useState(getSession().role);

  useEffect(() => {
    // Garantir company para role empresa
    if (role === "company") setCompany("mxs");
    setRole(role);
  }, [role]);

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">MXS Soluções</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/jobs" className="text-foreground hover:text-primary transition-colors">Vagas</Link>
            <Link to="/dashboard/company" className="text-foreground hover:text-primary transition-colors">Empresa</Link>
            <Link to="/dashboard/admin" className="text-foreground hover:text-primary transition-colors">Admin</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <Select value={role} onValueChange={(v) => setRoleState(v as any)}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Tipo de acesso" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="candidate">Candidato</SelectItem>
                <SelectItem value="company">Empresa</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Link to="/jobs/new"><Button variant="hero">Publicar Vaga</Button></Link>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};
