import { Button } from "@/components/ui/button";
import { Briefcase, Menu } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">JobConnect</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Vagas
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Empresas
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Como Funciona
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">
              Entrar
            </Button>
            <Button variant="hero">
              Publicar Vaga
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};