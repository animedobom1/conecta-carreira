import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Building2, Users } from "lucide-react";
import heroImage from "@/assets/hero-jobs.jpg";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative bg-hero-gradient text-primary-foreground py-20">
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            MX Vagas: Conecte Talentos com Oportunidades
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            A plataforma que une profissionais qualificados às melhores empresas do mercado
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Buscar vagas por cargo ou empresa..."
                className="pl-10 h-12 text-foreground bg-background border-none"
              />
            </div>
            <Link to="/jobs"><Button size="lg" className="bg-background text-primary hover:bg-background/90 h-12">Buscar Vagas</Button></Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Building2 className="h-12 w-12 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Para Empresas</h3>
              <p className="opacity-90 mb-4">
                Publique suas vagas e encontre os melhores candidatos
              </p>
              <Link to="/auth"><Button variant="secondary" className="w-full">Publicar Vaga</Button></Link>
            </div>
            
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Users className="h-12 w-12 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Para Candidatos</h3>
              <p className="opacity-90 mb-4">
                Crie seu perfil e candidate-se às melhores vagas
              </p>
              <Link to="/jobs"><Button variant="secondary" className="w-full">Ver Vagas</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
