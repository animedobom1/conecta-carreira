import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createJob, getSession, setCompany } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { toast } from "@/hooks/use-toast";

const JobForm = () => {
  const nav = useNavigate();
  const session = getSession();
  useSEO({ title: "Publicar Vaga | MXS Soluções", description: "Publique uma nova vaga para a sua empresa." });

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "CLT",
    salary: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const companyId = session.companyId ?? "mxs";
    if (!session.companyId) setCompany("mxs");

    createJob({
      companyId,
      title: form.title.trim(),
      description: form.description.trim(),
      location: form.location.trim(),
      type: form.type.trim(),
      salary: form.salary.trim(),
    });

    toast({ title: "Vaga publicada!", description: "Sua vaga foi criada com sucesso." });
    nav("/dashboard/company");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-10 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Publicar Vaga</h1>
        <form onSubmit={onSubmit} className="max-w-2xl space-y-6">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" rows={6} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="location">Localização</Label>
              <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Input id="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="CLT, PJ, Remoto" />
            </div>
          </div>
          <div>
            <Label htmlFor="salary">Faixa Salarial (opcional)</Label>
            <Input id="salary" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <Button type="submit" variant="hero">Publicar</Button>
            <Button type="button" variant="outline" onClick={() => nav(-1)}>Cancelar</Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default JobForm;
