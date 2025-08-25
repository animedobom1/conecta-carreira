import { Briefcase, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">JobConnect</span>
            </div>
            <p className="text-background/80 mb-4">
              Conectando talentos excepcionais às melhores oportunidades do mercado.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">contato@jobconnect.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">São Paulo, SP</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Para Candidatos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Buscar Vagas</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Criar Perfil</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Dicas de Carreira</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Empresas</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Para Empresas</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Publicar Vaga</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Planos</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Buscar Talentos</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Privacidade</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60">
            © 2024 JobConnect. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};