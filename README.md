# Chá de bênçãos do Francisco

Site da lista de presentes e confirmação de presença do chá do Francisco, 19 de setembro, no Povo em Pé (Belém Novo, Porto Alegre).

Construído com [Remix 3](https://remix.run), renderizado no servidor, sem JavaScript no navegador.

## Rodando localmente

```sh
npm install
cp .env.example .env
npm run dev
```

Abre em http://localhost:44100. Sem `DATABASE_URL`, os dados ficam em `db/app.sqlite`.

## Onde as coisas moram

- `app/data/gifts.ts` é a lista de presentes: nome, descrição, quantidade, links e foto. Edite aqui para mudar a lista.
- `app/data/event.ts` guarda data, horário e endereço da festa.
- `public/products/` tem as fotos dos produtos.
- `db/migrations/` cria as tabelas de escolhas (`claims`) e presenças (`rsvps`).
- `app/actions/controller.tsx` implementa as rotas: página inicial, reservar presente, desfazer, confirmar presença e bastidores.

## Bastidores

`/admin?chave=SUA_ADMIN_KEY` mostra quem escolheu o quê e quem confirmou presença, com um resumo pronto para copiar.

## Variáveis de ambiente

| Nome             | Para quê                                                       |
| ---------------- | -------------------------------------------------------------- |
| `SESSION_SECRET` | Assina o cookie que lembra quais escolhas são do visitante.    |
| `ADMIN_KEY`      | Chave da página de bastidores.                                 |
| `DATABASE_URL`   | Postgres em produção (Neon). Vazio usa SQLite local.           |
| `EVENT_TIME`     | Horário da festa, opcional, ex.: `15h`.                        |

## Deploy na Vercel

1. Crie o projeto na Vercel a partir deste repositório. O `vercel.json` já aponta tudo para a função em `api/index.js`.
2. Em Storage, adicione um banco Neon Postgres (plano gratuito). Ele injeta `DATABASE_URL` sozinho.
3. Em Environment Variables, defina `SESSION_SECRET` e `ADMIN_KEY`.
4. Faça o deploy. As migrações rodam na primeira requisição.

## Outras hospedagens

O `Dockerfile` sobe o servidor Node completo (`npm start`) para Fly.io, Railway ou similares. Nesses casos o SQLite persiste se `SQLITE_PATH` apontar para um volume.
