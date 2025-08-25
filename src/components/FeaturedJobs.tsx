import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, Building } from "lucide-react";

const featuredJobs = [
  {
    id: 1,
    title: "Desenvolvedor Frontend React",
    company: "TechCorp",
    location: "São Paulo, SP",
    type: "CLT",
    salary: "R$ 8.000 - R$ 12.000",
    postedAt: "2 dias atrás",
    tags: ["React", "TypeScript", "Tailwind"],
    description: "Procuramos um desenvolvedor frontend para integrar nossa equipe..."
  },
  {
    id: 2,
    title: "Analista de Marketing Digital",
    company: "InnovaMkt",
    location: "Rio de Janeiro, RJ",
    type: "Remoto",
    salary: "R$ 5.000 - R$ 7.000",
    postedAt: "1 dia atrás",
    tags: ["SEO", "Google Ads", "Analytics"],
    description: "Oportunidade para analista de marketing digital sênior..."
  },
  {
    id: 3,
    title: "Gerente de Vendas",
    company: "SalesMax",
    location: "Belo Horizonte, MG",
    type: "CLT",
    salary: "R$ 10.000 - R$ 15.000",
    postedAt: "3 dias atrás",
    tags: ["Vendas", "Liderança", "CRM"],
    description: "Lidere nossa equipe de vendas e alcance novos patamares..."
  },
];

export const FeaturedJobs = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vagas em Destaque
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Oportunidades selecionadas especialmente para você
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {job.type}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {job.postedAt}
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Building className="h-4 w-4 mr-2" />
                  {job.company}
                </div>
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="text-lg font-semibold text-success">
                  {job.salary}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full" variant="outline">
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            Ver Todas as Vagas
          </Button>
        </div>
      </div>
    </section>
  );
};