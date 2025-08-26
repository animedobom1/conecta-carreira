import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useNavigate } from "react-router-dom";
import { createApplication, getJob } from "@/lib/storage";
import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { toast } from "@/hooks/use-toast";

const ApplyJob = () => {
  const { jobId } = useParams();
  const job = jobId ? getJob(jobId) : undefined;
  const nav = useNavigate();
  useSEO({ title: `Candidatar-se | ${job?.title ?? "Vaga"} | MXS Soluções`, description: "Envie sua candidatura para a vaga selecionada." });

  const [form, setForm] = useState({ name: "", email: "", phone: "", resume: "" });

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-10 flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Vaga não encontrada</h1>
          <Button variant="outline" onClick={() => nav("/jobs")}>Voltar para Vagas</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createApplication({ jobId: job.id, name: form.name, email: form.email, phone: form.phone, resume: form.resume });
    toast({ title: "Candidatura enviada!", description: "A empresa receberá seus dados." });
    nav("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-10 flex-1">
        <article className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{job.title}</h1>
          <p className="text-muted-foreground mb-6">{job.location} • {job.type} {job.salary ? `• ${job.salary}` : ""}</p>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-2">Descrição</h2>
            <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Candidatar-se</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div>
                <Label htmlFor="resume">Resumo do currículo (texto)</Label>
                <Textarea id="resume" rows={5} value={form.resume} onChange={(e) => setForm({ ...form, resume: e.target.value })} />
              </div>
              <div className="flex gap-3">
                <Button type="submit" variant="hero">Enviar</Button>
                <Button type="button" variant="outline" onClick={() => nav(-1)}>Cancelar</Button>
              </div>
            </form>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ApplyJob;
