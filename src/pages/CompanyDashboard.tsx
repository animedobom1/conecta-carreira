import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getJobs, getSession, getApplications } from "@/lib/storage";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { Briefcase, Users, PlusCircle, TrendingUp } from "lucide-react";

const CompanyDashboard = () => {
  const session = getSession();
  const companyId = session.companyId ?? "mxs";
  const jobs = getJobs().filter((j) => j.companyId === companyId);
  const allApps = getApplications();
  const myJobIds = jobs.map(j => j.id);
  const myApps = allApps.filter(app => myJobIds.includes(app.jobId));
  
  useSEO({ title: "Dashboard da Empresa | MXS Soluções", description: "Gerencie as vagas da sua empresa." });

  const openJobs = jobs.filter(j => j.status === "open").length;
  const appsByJob = (jobId: string) => myApps.filter(a => a.jobId === jobId);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Dashboard Empresarial
            </h1>
            <p className="text-muted-foreground mt-2">Gerencie suas vagas e acompanhe candidaturas</p>
          </div>
          <Link to="/jobs/new">
            <Button variant="hero" size="lg" className="shadow-lg">
              <PlusCircle className="mr-2 h-5 w-5" />
              Publicar Nova Vaga
            </Button>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Vagas</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobs.length}</div>
              <p className="text-xs text-muted-foreground">
                Vagas publicadas
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vagas Ativas</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{openJobs}</div>
              <p className="text-xs text-muted-foreground">
                Recebendo candidaturas
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Candidaturas</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myApps.length}</div>
              <p className="text-xs text-muted-foreground">
                Total recebidas
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Média por Vaga</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {jobs.length > 0 ? Math.round((myApps.length / jobs.length) * 10) / 10 : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Candidatos por vaga
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs">Minhas Vagas</TabsTrigger>
            <TabsTrigger value="applications">Candidaturas</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Vagas Publicadas</CardTitle>
                <CardDescription>
                  Acompanhe o desempenho das suas vagas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {jobs.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhuma vaga publicada</h3>
                    <p className="text-muted-foreground mb-4">
                      Comece publicando sua primeira vaga para atrair candidatos.
                    </p>
                    <Link to="/jobs/new">
                      <Button variant="hero">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Publicar Primeira Vaga
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Candidaturas</TableHead>
                        <TableHead>Data</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell>
                            <Badge variant={job.status === "open" ? "secondary" : "outline"}>
                              {job.status === "open" ? "Aberta" : "Fechada"}
                            </Badge>
                          </TableCell>
                          <TableCell>{appsByJob(job.id).length}</TableCell>
                          <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Candidaturas Recebidas</CardTitle>
                <CardDescription>
                  Visualize todos os candidatos interessados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {myApps.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhuma candidatura ainda</h3>
                    <p className="text-muted-foreground">
                      As candidaturas aparecerão aqui quando os usuários se candidatarem às suas vagas.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Vaga</TableHead>
                        <TableHead>Data</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myApps.map((app) => {
                        const job = jobs.find(j => j.id === app.jobId);
                        return (
                          <TableRow key={app.id}>
                            <TableCell className="font-medium">{app.name}</TableCell>
                            <TableCell>{app.email}</TableCell>
                            <TableCell>{job?.title ?? "-"}</TableCell>
                            <TableCell>{new Date(app.createdAt).toLocaleString()}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyDashboard;
