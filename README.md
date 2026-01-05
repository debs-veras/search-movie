# MovieExplore

🔎 **MovieExplore** é um front-end em **React + TypeScript + Vite** para pesquisar filmes e séries usando a API do **TMDB**. O projeto oferece busca, página de detalhes, autenticação e gerenciamento de favoritos (Minha Coleção).

---

## 🧭 Visão geral

- **Framework**: React + TypeScript
- **Bundler**: Vite
- **Estilização**: Tailwind CSS
- **Libs**: React Router, Framer Motion, React Hook Form, React Toastify, Swiper
- **Gerenciador de pacotes**: pnpm

## ✅ Funcionalidades principais

- Busca por filmes/séries com navegação e cache simples
- Página de detalhes com trailer, sinopse, elenco, runtime, e imagens responsivas
- Autenticação via TMDB (request token -> validate -> session)
- Favoritos (adicionar/remover) e página "Minha Coleção" (filmes e séries)
- Header responsivo, menu do usuário, e experiência mobile otimizada

## 🔧 Pré-requisitos

- Node.js >= 18
- pnpm (recomendado)

## 🚀 Rodando localmente

1. Clone o repositório

```bash
git clone <repo-url>
cd search-movie
```

2. Instale dependências

```bash
pnpm install
```

3. Crie arquivo `.env` na raiz com as variáveis abaixo

```
VITE_TMDB_KEY=your_tmdb_api_key_here
VITE_AUTH_TOKEN=your_tmdb_bearer_token_here
```

- `VITE_TMDB_KEY`: sua API Key do TMDB (https://www.themoviedb.org/settings/api)
- `VITE_AUTH_TOKEN`: token Bearer (opcional conforme necessidade)

4. Rodar em desenvolvimento

```bash
pnpm dev
```

Acesse: http://localhost:5173

## 📦 Scripts úteis

- `pnpm dev` — rodar em modo desenvolvimento
- `pnpm build` — build de produção (TS + vite build)
- `pnpm preview` — rodar preview do build local
- `pnpm lint` — rodar ESLint
- `pnpm format` — formatar com Prettier

## 🧾 Arquitetura importante

- `src/pages` — páginas (Home, Details, Login, MyCollection)
- `src/services` — interações com a API (authRequest, movieRequest, searchRequest)
- `src/components` — componentes reutilizáveis (Header, MenuUser, Logo, etc.)
- `src/layout` — seções e layout da página (TrendingHero, CollectionsSection)

## 🔌 Integração TMDB (endpoints usados)

- Autenticação:
  - `GET /3/authentication/token/new` — request token
  - `POST /3/authentication/token/validate_with_login` — validar credenciais
  - `POST /3/authentication/session/new` — criar sessão
  - `DELETE /3/authentication/session` — remover sessão
  - `GET /3/account` — obter detalhes da conta
- Favoritos:
  - `GET /3/{media_type}/{id}/account_states` — estados da conta
  - `POST /3/account/{account_id}/favorite` — marcar/desmarcar favorito
  - `GET /3/account/{account_id}/favorite/movies` — listar filmes favoritos
  - `GET /3/account/{account_id}/favorite/tv` — listar séries favoritas
- Outros:
  - Trending, Upcoming e detalhes (ex.: `/3/trending/movie/week`, `/3/movie/{id}`)

> Observação: `src/configAxios.ts` já injeta `api_key` e `language=pt-BR` nas requisições.

## 🧭 Como funcionam os favoritos

1. O usuário faz login (fluxo TMDB) e a `session_id` é salva no `localStorage`.
2. Ao favoritar, a aplicação chama `POST /3/account/{account_id}/favorite?session_id=...` com `{ media_type, media_id, favorite }`.
3. A listagem em "Minha Coleção" usa os endpoints `GET /favorite/movies` e `GET /favorite/tv`.

## 🧪 Testes

- Atualmente não há testes automatizados configurados. Recomenda-se adicionar testes com Vitest + React Testing Library.

## ♻️ Boas práticas e contribuição

1. Fork → branch (`feat/` ou `fix/`) → PR claro
2. Rodar `pnpm format` e `pnpm lint` antes de abrir PR
3. Documentar mudanças e adicionar screenshots quando necessário

## 🔜 Próximos passos sugeridos

- Adicionar testes automatizados
- Confirmação modal antes de remover favorito
- Página de perfil/account com edição (implementada parcialmente no menu)
- Otimização de imagens (WebP + blur-up)