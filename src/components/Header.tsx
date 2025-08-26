import { Button } from "@/components/ui/button";
import { Briefcase, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSession, setRole, setCompany } from "@/lib/storage";
import { useEffect, useState } from "react";

export const Header = () => {
  // Remove seleção de role e menu antigo, adiciona navegação para as seções da landing page
  return (
    <header className="bg-background/80 border-b border-border backdrop-blur sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <Briefcase className="h-10 w-10 text-primary group-hover:scale-110 transition" />
          <span className="text-2xl font-bold text-foreground tracking-tight">MX Vagas</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">Início</Link>
          <a href="/#stats" className="text-foreground hover:text-primary transition-colors">Números</a>
          <a href="/#featured" className="text-foreground hover:text-primary transition-colors">Vagas</a>
          <a href="/#how" className="text-foreground hover:text-primary transition-colors">Como Funciona</a>
          <a href="/#diferenciais" className="text-foreground hover:text-primary transition-colors">Diferenciais</a>
          <a href="/#depoimentos" className="text-foreground hover:text-primary transition-colors">Depoimentos</a>
          <a href="/#planos" className="text-foreground hover:text-primary transition-colors">Planos</a>
          <a href="/#blog" className="text-foreground hover:text-primary transition-colors">Blog</a>
          <a href="/#faq" className="text-foreground hover:text-primary transition-colors">FAQ</a>
        </nav>
        <Link to="/auth" className="hidden md:inline-block"><Button variant="hero">Portal Empresa</Button></Link>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
};
