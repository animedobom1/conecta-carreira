import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getJobs, getSession } from "@/lib/storage";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const CompanyDashboard = () => {
  const session = getSession();
  const companyId = session.companyId ?? "mxs";
  const jobs = getJobs().filter((j) => j.companyId === companyId);
  useSEO({ title: "Dashboard da Empresa | MXS Soluções", description: "Gerencie as vagas da sua empresa." });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-10 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Minhas Vagas</h1>
          <Link to="/jobs/new"><Button variant="hero">Publicar Vaga</Button></Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.status === "open" ? "Aberta" : "Fechada"}</TableCell>
                <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyDashboard;
