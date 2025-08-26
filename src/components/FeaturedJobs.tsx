import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { getJobs } from "@/lib/storage";

export const FeaturedJobs = () => {
  const jobs = getJobs().filter((j) => j.status === "open").slice(0, 6);
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
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">{job.type}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Building className="h-4 w-4 mr-2" />
                  MXS Soluções
                </div>
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                {job.salary && <div className="text-lg font-semibold">{job.salary}</div>}
              </CardHeader>
              <CardContent>
                <Link to={`/apply/${job.id}`}>
                  <Button className="w-full" variant="outline">Candidatar-se</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/jobs"><Button variant="hero" size="lg">Ver Todas as Vagas</Button></Link>
        </div>
      </div>
    </section>
  );
};
