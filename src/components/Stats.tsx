import { Users, Building2, Briefcase, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    number: "2.500+",
    label: "Vagas Ativas",
    description: "Oportunidades em diversas áreas"
  },
  {
    icon: Building2,
    number: "850+",
    label: "Empresas Parceiras",
    description: "Das startups às grandes corporações"
  },
  {
    icon: Users,
    number: "15.000+",
    label: "Profissionais",
    description: "Cadastrados na plataforma"
  },
  {
    icon: TrendingUp,
    number: "92%",
    label: "Taxa de Sucesso",
    description: "Profissionais contratados"
  }
];

export const Stats = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Números que Impressionam
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conectamos milhares de profissionais às melhores oportunidades
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};