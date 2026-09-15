# Chá do Francisco

App Remix 3 (`remix@3.0.0-rc`) renderizado no servidor. Consulte `./.agents/skills/remix/SKILL.md` para convenções do framework.

## Comandos

```sh
npm run dev        # servidor local com watch em http://localhost:44100
npm run build      # compila app/ para dist/ (usado pela função da Vercel em api/index.js)
npm run typecheck
```

## Estrutura

- `app/routes.ts` é o contrato de URLs; `app/actions/controller.tsx` implementa todas as ações.
- `app/actions/home-page.tsx` e `admin-page.tsx` são as páginas; `app/actions/document.tsx` é a casca HTML com fontes e tokens.
- `app/ui/` guarda tema, ilustrações e a coroa de folhas do topo.
- `app/data/gifts.ts` é o catálogo estático; `app/data/schema.ts` e `app/data/migrations.ts` definem as tabelas de escolhas e presenças.
- `app/data/database.ts` escolhe SQLite (local) ou Postgres (`DATABASE_URL`) e roda migrações na primeira requisição.
- Não há JavaScript no navegador: formulários nativos, `<details>` para abrir o formulário de cada presente e redirecionamento com âncora (`/#slug`) depois de cada POST.

## Regras

- Texto do site em português do Brasil, tom afetuoso e direto.
- Toda mutação é um POST de formulário que redireciona de volta com `session.flash`. Nada depende de JavaScript no cliente.
- Não adicione comentários no código.
