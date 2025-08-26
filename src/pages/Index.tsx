import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedJobs } from "@/components/FeaturedJobs";
import { Stats } from "@/components/Stats";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";


import { useState } from "react";

const testimonials = [
  {
    name: "Ana Souza",
    role: "Desenvolvedora Frontend",
    text: "Consegui minha vaga dos sonhos em menos de 2 semanas! A MX Vagas é intuitiva e cheia de oportunidades reais.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Carlos Lima",
    role: "Tech Recruiter",
    text: "Encontramos talentos incríveis para nossa startup. O processo de triagem ficou muito mais ágil com a MX Vagas.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Juliana Alves",
    role: "Analista de RH",
    text: "A integração com nosso fluxo de contratação foi perfeita. Recomendo a MX Vagas para qualquer empresa!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const partners = [
  "Google", "Nubank", "iFood", "Stone", "XP Inc.", "Magazine Luiza"
];

const blogPosts = [
  { title: "Como se destacar em processos seletivos", link: "#" },
  { title: "Tendências do mercado de trabalho em 2025", link: "#" },
  { title: "Dicas para montar um currículo campeão", link: "#" },
];

const plans = [
  {
    name: "Básico",
    price: "Gratuito",
    features: [
      "Publicar 3 vagas por mês",
      "Acesso básico aos candidatos",
      "Suporte por email",
      "Dashboard simples"
    ],
    cta: "Começar Grátis",
    popular: false,
  },
  {
    name: "Profissional",
    price: "R$ 299/mês",
    features: [
      "Publicar vagas ilimitadas",
      "Acesso completo aos candidatos",
      "Filtros avançados de busca",
      "Suporte prioritário",
      "Analytics detalhados",
      "ATS integrado"
    ],
    cta: "Assinar Agora",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Sob consulta",
    features: [
      "Tudo do Profissional",
      "Múltiplas contas de usuário",
      "API personalizada",
      "Treinamento dedicado",
      "Account manager",
      "White label"
    ],
    cta: "Falar com Vendas",
    popular: false,
  },
];

const faqs = [
  { q: "Como me cadastro na plataforma?", a: "Clique em 'Criar Perfil', preencha seus dados e comece a buscar vagas!" },
  { q: "Empresas pagam para publicar vagas?", a: "Há planos gratuitos e premium para empresas, escolha o ideal para seu negócio." },
  { q: "Posso me candidatar a quantas vagas quiser?", a: "Sim! Não há limite de candidaturas para profissionais." },
];

const Index = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />
      <section id="hero"><HeroSection /></section>
      <section id="stats"><Stats /></section>
      <section id="featured"><FeaturedJobs /></section>
      <section id="how"><HowItWorks /></section>

      {/* Seção: Diferenciais */}
      <section id="diferenciais" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Por que escolher a MX Vagas?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-primary/10 rounded-xl p-6 text-center shadow-sm">
              <span className="text-4xl">🚀</span>
              <h3 className="font-semibold text-lg mt-4 mb-2">Rápido e Eficiente</h3>
              <p>Processos otimizados para candidatos e empresas.</p>
            </div>
            <div className="bg-primary/10 rounded-xl p-6 text-center shadow-sm">
              <span className="text-4xl">🔒</span>
              <h3 className="font-semibold text-lg mt-4 mb-2">Seguro</h3>
              <p>Seus dados protegidos com tecnologia de ponta.</p>
            </div>
            <div className="bg-primary/10 rounded-xl p-6 text-center shadow-sm">
              <span className="text-4xl">🤝</span>
              <h3 className="font-semibold text-lg mt-4 mb-2">Conexão Real</h3>
              <p>Empresas e talentos verificados e engajados.</p>
            </div>
            <div className="bg-primary/10 rounded-xl p-6 text-center shadow-sm">
              <span className="text-4xl">📱</span>
              <h3 className="font-semibold text-lg mt-4 mb-2">Acesso Mobile</h3>
              <p>Plataforma responsiva e app dedicado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Depoimentos */}
      <section id="depoimentos" className="py-16 bg-gradient-to-r from-primary/5 to-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Depoimentos</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white dark:bg-background rounded-xl shadow-lg p-8 flex-1 flex flex-col items-center">
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 border-4 border-primary/30" />
                <p className="text-lg italic mb-4">“{t.text}”</p>
                <div className="font-semibold text-primary">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção: Parceiros */}
      <section id="parceiros" className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Empresas Parceiras</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {partners.map((p, i) => (
              <span key={i} className="text-lg font-semibold text-primary bg-primary/10 rounded-full px-6 py-2 shadow-sm">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Seção: CTA App Mobile */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Baixe nosso App Mobile</h2>
          <p className="text-lg mb-8">Tenha acesso às vagas e recursos exclusivos na palma da sua mão.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#" className="inline-block bg-primary text-white rounded-lg px-8 py-3 font-semibold shadow-lg hover:opacity-90 transition">Google Play</a>
            <a href="#" className="inline-block bg-secondary text-primary rounded-lg px-8 py-3 font-semibold shadow-lg hover:opacity-90 transition border border-primary">App Store</a>
          </div>
        </div>
      </section>

      {/* Seção: Blog */}
      <section id="blog" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Conteúdo & Dicas</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {blogPosts.map((post, i) => (
              <a key={i} href={post.link} className="flex-1 bg-secondary rounded-xl p-6 shadow-md hover:shadow-xl transition border border-primary/10">
                <h3 className="font-semibold text-lg mb-2 text-primary">{post.title}</h3>
                <span className="text-sm text-muted-foreground">Leia mais &rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Seção: Planos e Preços */}
      <section id="planos" className="py-16 bg-gradient-to-r from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Planos e Preços</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para sua empresa e encontre os melhores talentos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative bg-white dark:bg-card rounded-2xl shadow-xl p-8 ${
                  plan.popular ? 'ring-2 ring-primary scale-105 z-10' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-primary mb-2">{plan.price}</div>
                  {plan.price !== "Sob consulta" && plan.price !== "Gratuito" && (
                    <p className="text-muted-foreground text-sm">por empresa</p>
                  )}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                    plan.popular 
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'bg-secondary text-primary border border-primary/20 hover:bg-primary/10'
                  }`}
                  onClick={() => window.location.href = '/auth'}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Precisa de algo personalizado? Entre em contato conosco.
            </p>
            <button 
              className="bg-background text-primary border border-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition"
              onClick={() => window.location.href = '/auth'}
            >
              Falar com Especialista
            </button>
          </div>
        </div>
      </section>

      {/* Seção: FAQ */}
      <section id="faq" className="py-16 bg-gradient-to-r from-secondary/30 to-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-background rounded-lg shadow p-6">
                <div className="font-semibold text-primary mb-2">{faq.q}</div>
                <div className="text-muted-foreground">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção: Newsletter */}
      <section id="newsletter" className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Receba vagas e dicas no seu e-mail</h2>
          <p className="text-lg mb-8">Assine nossa newsletter e fique por dentro das novidades do mercado.</p>
          <form className="max-w-xl mx-auto flex flex-col md:flex-row gap-4 justify-center" onSubmit={e => { e.preventDefault(); setEmail(""); }}>
            <input
              type="email"
              required
              placeholder="Seu e-mail"
              className="flex-1 px-4 py-3 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary outline-none bg-secondary text-foreground"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold shadow hover:opacity-90 transition">Assinar</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;