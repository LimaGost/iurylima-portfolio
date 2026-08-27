# Iury Lima — Portfólio

Meu site pessoal, construído do zero pra mostrar quem eu sou e o que eu já fiz: [Iury Lima](https://github.com/LimaGost), Analista de Sistemas na Linx Goiânia, estudando e evoluindo em desenvolvimento Full Stack.

A ideia por trás do visual foi fugir do portfólio genérico de "cards brancos e fonte bonitinha" e trazer uma identidade mais forte — daí o tema de teia de aranha, cursor customizado e uma paleta mais escura com detalhes em vermelho.

## Stack

- **React 19** + **TypeScript**
- **Vite** (build e dev server)
- **Tailwind CSS 4**
- **Framer Motion** pras animações e transições de seção
- **Lucide React** pros ícones

## O que tem no site

- Hero com efeito de reveal na foto (passa o mouse e a imagem aparece)
- Seção Sobre, com stack principal e um resumo de quem eu sou
- Experiência profissional
- Habilidades técnicas, separadas por categoria e nível (básico / intermediário / avançado)
- Projetos em destaque
- Formulário de contato

Ainda estou terminando de conectar o formulário de contato a um backend de verdade (hoje ele só previne o reload da página) — a ideia é subir isso como uma função serverless na Vercel.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

Outros scripts:

```bash
npm run build     # build de produção
npm run preview   # serve o build localmente
npm run lint      # oxlint
```

## Deploy

Hospedado na [Vercel](https://vercel.com).

## Contato

Se quiser trocar uma ideia sobre alguma dessas seções ou sobre o código, os links de contato estão no próprio site.
