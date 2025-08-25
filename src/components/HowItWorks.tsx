import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Search, Send, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Cadastre-se",
    description: "Crie seu perfil completo com suas habilidades e experiências",
    forCompany: "Cadastre sua empresa e comece a publicar vagas"
  },
  {
    icon: Search,
    title: "Explore",
    description: "Busque por vagas que combinem com seu perfil",
    forCompany: "Encontre candidatos qualificados para suas vagas"
  },
  {
    icon: Send,
    title: "Candidate-se",
    description: "Envie sua candidatura com apenas um clique",
    forCompany: "Receba candidaturas e analise os perfis"
  },
  {
    icon: CheckCircle,
    title: "Seja Contratado",
    description: "Conecte-se diretamente com as empresas",
    forCompany: "Contrate os melhores talentos para sua equipe"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como Funciona
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Processo simples e eficiente para conectar talentos e oportunidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-3">
                    {index + 1}. {step.title}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {step.description}
                  </p>
                  <div className="text-xs text-primary font-medium bg-primary/10 px-3 py-2 rounded-full">
                    Para empresas: {step.forCompany}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};