import { useState } from "react";
import { Copy, Check, Send, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import WebSvg from "./WebSvg";
import Reveal from "./Reveal";
import { GithubIcon, LinkedinIcon, MailIcon } from "./SocialIcons";

const availability = [
  "Desenvolvimento Full-Stack (React & Node.js)",
  "Integrações de APIs corporativas & Webhooks",
  "Sistemas Web & ERP (Linx Microvix)",
  "Automação e otimização de processos de negócio",
];

const directEmail = "iuryslima_001@outlook.com";

const contactLinks = [
  {
    label: "GitHub",
    value: "github.com/LimaGost",
    href: "https://github.com/LimaGost",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/iurylima",
    href: "https://linkedin.com",
    icon: LinkedinIcon,
  },
  {
    label: "E-mail Direto",
    value: directEmail,
    href: `mailto:${directEmail}`,
    icon: MailIcon,
  },
];

type FormStatus = "idle" | "loading" | "success" | "error";

function validate(name: string, email: string, message: string): string | null {
  if (!name.trim()) return "Por favor, informe seu nome.";
  if (!email.trim()) return "Por favor, informe seu e-mail de contato.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Informe um endereço de e-mail válido.";
  if (!message.trim()) return "Por favor, escreva uma mensagem.";
  if (message.trim().length < 10) return "A mensagem deve conter pelo menos 10 caracteres.";
  return null;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const error = validate(name, email, message);
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError(null);
    setStatus("loading");

    try {
      const subject = `Novo contato via portfólio - ${name}`;
      const body = `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`;
      window.location.href = `mailto:${directEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden pt-16 pb-28 sm:pt-24 sm:pb-36">
      {/* Número de seção decorativo */}
      <span className="section-number left-0 top-0 -translate-x-1/4" aria-hidden="true">
        05
      </span>

      <WebSvg
        className="pointer-events-none absolute bottom-[-90px] left-[-90px] h-[400px] w-[400px] text-white"
        style={{ opacity: 0.05 }}
      />

      <div className="wrap relative grid grid-cols-1 gap-14 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
        {/* Coluna esquerda */}
        <Reveal>
          <div className="mb-4 flex items-center gap-2.5">
            <span className="inline-block h-2 w-2 bg-accent shadow-[0_0_8px_rgba(216,31,38,0.8)]" />
            <span className="text-caption font-bold tracking-[2px] text-accent">
              CONEXÃO DIRETA
            </span>
          </div>
          <h2 className="font-display text-h1 m-0 mb-6 uppercase leading-[1.02] tracking-[0.5px]">
            VAMOS CONSTRUIR
            <br />
            ALGO <span className="text-accent">INCRÍVEL.</span>
          </h2>

          <p className="mb-8 max-w-[500px] text-body text-body-text">
            Tem um projeto em mente, uma oportunidade ou quer trocar uma ideia sobre tecnologia?
            Fique à vontade para me enviar uma mensagem ou entrar em contato direto.
          </p>

          {/* Disponibilidade com radar pulsante */}
          <div className="mb-3 text-small font-bold tracking-[1.5px] text-muted-2">
            DISPONÍVEL PARA
          </div>
          <ul className="m-0 mb-8 flex list-none flex-col gap-2.5 p-0">
            {availability.map((item) => (
              <li key={item} className="flex items-center gap-3 text-body-text">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(216,31,38,0.7)]" />
                <span className="text-small">{item}</span>
              </li>
            ))}
          </ul>

          {/* Canais diretos com botão de copiar e-mail instantâneo */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-small font-bold tracking-[1.5px] text-muted-2">
              CANAIS DIRETOS
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent transition-all hover:bg-accent hover:text-white"
            >
              {copiedEmail ? (
                <>
                  <Check size={12} className="text-emerald-400" />
                  <span className="text-emerald-400">E-mail copiado!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copiar E-mail</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {contactLinks.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group glass-card card-glow flex items-center gap-3.5 rounded-xl px-4 py-3.5 transition-all"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                  <Icon size={16} />
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold tracking-[1px] text-muted">{label}</div>
                  <div className="truncate text-small font-semibold text-white transition-colors duration-200 group-hover:text-accent">
                    {value}
                  </div>
                </div>
                <span className="ml-auto shrink-0 text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Coluna direita — formulário com alta ergonomia */}
        <Reveal delay={120}>
          <form
            className="glass-card relative grid grid-cols-1 gap-5 rounded-2xl border border-white/10 p-6 sm:p-8"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-accent" />
                <h3 className="text-h3 m-0 font-bold text-white">Envie uma mensagem</h3>
              </div>
              <span className="text-xs text-muted">Resposta em até 24h</span>
            </div>

            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-xs font-bold tracking-[1.5px] text-muted"
              >
                SEU NOME
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Como posso te chamar?"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setValidationError(null);
                }}
                disabled={status === "loading" || status === "success"}
                className="w-full rounded-lg border border-white/15 bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder:text-muted transition-all duration-200 focus:border-accent focus:bg-white/[0.08] focus:shadow-[0_0_12px_rgba(216,31,38,0.25)] focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-xs font-bold tracking-[1.5px] text-muted"
              >
                SEU E-MAIL
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setValidationError(null);
                }}
                disabled={status === "loading" || status === "success"}
                className="w-full rounded-lg border border-white/15 bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder:text-muted transition-all duration-200 focus:border-accent focus:bg-white/[0.08] focus:shadow-[0_0_12px_rgba(216,31,38,0.25)] focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold tracking-[1.5px] text-muted"
                >
                  MENSAGEM
                </label>
                <span className="text-[11px] text-muted">
                  {message.length} caracteres
                </span>
              </div>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Conte-me sobre seu projeto, ideia ou oportunidade..."
                rows={4}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setValidationError(null);
                }}
                disabled={status === "loading" || status === "success"}
                className="w-full resize-y rounded-lg border border-white/15 bg-white/[0.05] px-4 py-3.5 font-sans text-sm text-white placeholder:text-muted transition-all duration-200 focus:border-accent focus:bg-white/[0.08] focus:shadow-[0_0_12px_rgba(216,31,38,0.25)] focus:outline-none disabled:opacity-50"
              />
            </div>

            {/* Erro de validação ergonômico */}
            {validationError && (
              <div className="flex items-center gap-2.5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <AlertCircle size={16} className="shrink-0 text-red-400" aria-hidden="true" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Feedback de status */}
            {status === "success" && (
              <div className="flex items-center gap-2.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-400" aria-hidden="true" />
                <span>Seu cliente de e-mail foi aberto com a mensagem pronta — é só clicar em enviar.</span>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2.5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <AlertCircle size={16} className="shrink-0 text-red-400" aria-hidden="true" />
                <span>Falha ao enviar. Tente novamente ou use o e-mail direto acima.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg bg-accent px-6 py-3.5 text-xs font-bold tracking-[1.5px] text-white shadow-[0_4px_20px_rgba(216,31,38,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#eb242c] hover:shadow-[0_6px_24px_rgba(216,31,38,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Enviando...</span>
                </>
              ) : status === "success" ? (
                <>
                  <Check size={16} />
                  <span>E-mail pronto para enviar!</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>ENVIAR MENSAGEM</span>
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
