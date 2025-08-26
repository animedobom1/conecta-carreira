import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { getJobs } from "@/lib/storage";
import { useSEO } from "@/hooks/useSEO";

const JobsList = () => {
  const jobs = getJobs().filter((j) => j.status === "open");
  useSEO({ title: "Vagas | MXS Soluções", description: "Lista de vagas abertas na plataforma da MXS Soluções." });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-10 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Vagas Abertas</h1>
        {jobs.length === 0 ? (
          <p className="text-muted-foreground">Nenhuma vaga aberta no momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{job.type}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="mt-2">{job.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Building className="h-4 w-4 mr-2" />
                    MXS Soluções
                  </div>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{job.description}</p>
                  <Link to={`/apply/${job.id}`}>
                    <Button className="w-full" variant="outline">Candidatar-se</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default JobsList;
