import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getApplications, getJobs, updateJobStatus } from "@/lib/storage";
import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-10 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Super Admin - Vagas Publicadas</h1>

        <section className="mb-10">
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
                  <TableCell>{job.title}</TableCell>
                  <TableCell>MXS Soluções</TableCell>
                  <TableCell>
                    <Badge variant={job.status === "open" ? "secondary" : "outline"}>
                      {job.status === "open" ? "Aberta" : "Fechada"}
                    </Badge>
                  </TableCell>
                  <TableCell>{appsByJob(job.id).length}</TableCell>
                  <TableCell className="text-right space-x-2">
                    {job.status === "open" ? (
                      <Button size="sm" variant="outline" onClick={() => toggleStatus(job.id, "closed")}>Fechar</Button>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => toggleStatus(job.id, "open")}>Reabrir</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Candidaturas Recentes</h2>
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
                    <TableCell>{a.name}</TableCell>
                    <TableCell>{a.email}</TableCell>
                    <TableCell>{job?.title ?? "-"}</TableCell>
                    <TableCell>{new Date(a.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
