import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getApplications, getJobs, updateJobStatus } from "@/lib/storage";
import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Users, Briefcase, TrendingUp, Activity } from "lucide-react";

const AdminDashboard = () => {
  const [_, force] = useState(0);
  const jobs = getJobs();
  const apps = getApplications();
  useSEO({ title: "Super Admin | MXS Soluções", description: "Gerencie todas as vagas e candidaturas da plataforma." });

  const toggleStatus = (id: string, status: "open" | "closed") => {
    updateJobStatus(id, status);
    force((n) => n + 1);
  };

  const appsByJob = (jobId: string) => apps.filter((a) => a.jobId === jobId);
  const openJobs = jobs.filter(j => j.status === "open").length;
  const closedJobs = jobs.filter(j => j.status === "closed").length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Super Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Gerencie todas as vagas e candidaturas da plataforma</p>
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
                {openJobs} abertas, {closedJobs} fechadas
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Candidaturas</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{apps.length}</div>
              <p className="text-xs text-muted-foreground">
                Total de candidatos
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vagas Ativas</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
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
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {jobs.length > 0 ? Math.round((apps.length / jobs.length) * 100) / 10 : 0}%
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
            <TabsTrigger value="jobs">Gerenciar Vagas</TabsTrigger>
            <TabsTrigger value="applications">Candidaturas</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Vagas Publicadas</CardTitle>
                <CardDescription>
                  Gerencie o status das vagas na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Candidaturas</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>MXS Soluções</TableCell>
                        <TableCell>
                          <Badge variant={job.status === "open" ? "secondary" : "outline"}>
                            {job.status === "open" ? "Aberta" : "Fechada"}
                          </Badge>
                        </TableCell>
                        <TableCell>{appsByJob(job.id).length}</TableCell>
                        <TableCell className="text-right">
                          {job.status === "open" ? (
                            <Button size="sm" variant="outline" onClick={() => toggleStatus(job.id, "closed")}>
                              Fechar
                            </Button>
                          ) : (
                            <Button size="sm" variant="default" onClick={() => toggleStatus(job.id, "open")}>
                              Reabrir
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Candidaturas Recentes</CardTitle>
                <CardDescription>
                  Acompanhe todas as candidaturas enviadas
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                    {apps.map((a) => {
                      const job = jobs.find((j) => j.id === a.jobId);
                      return (
                        <TableRow key={a.id}>
                          <TableCell className="font-medium">{a.name}</TableCell>
                          <TableCell>{a.email}</TableCell>
                          <TableCell>{job?.title ?? "-"}</TableCell>
                          <TableCell>{new Date(a.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
