# Chá de bênçãos do Francisco

Site da lista de presentes e confirmação de presença do chá do Francisco, 19 de setembro, no Povo em Pé (Belém Novo, Porto Alegre).

Construído com [Remix 3](https://remix.run), renderizado no servidor, sem JavaScript no navegador.

## Rodando localmente

```sh
npm install
npm run dev
```

Abre em http://localhost:44100. Não há nada para configurar: os dados ficam em `db/app.sqlite`.

## Onde as coisas moram

- `app/data/gifts.ts` é a lista de presentes: nome, descrição, quantidade, links e foto. Edite aqui para mudar a lista.
- `app/data/event.ts` guarda data, horário e endereço da festa.
- `public/products/` tem as fotos dos produtos.
- `db/migrations/` cria as tabelas de escolhas (`claims`) e presenças (`rsvps`).
- `app/actions/controller.tsx` implementa as rotas: página inicial, reservar presente, desfazer, confirmar presença e bastidores.

## Bastidores

O repositório é público, então a chave dos bastidores que está no código é conhecida. Para ter uma chave só sua, defina `ADMIN_KEY` nas variáveis da Vercel. O segredo do cookie é derivado da `DATABASE_URL`, que não está no repositório.

`/admin?chave=bastidores-do-chico` mostra quem escolheu o quê e quem confirmou presença, com um resumo pronto para copiar.

## Variáveis de ambiente

A única variável é `DATABASE_URL`, injetada pelo Neon na Vercel. Localmente o app usa SQLite em `db/app.sqlite`, sem nada para configurar. Se quiser usar o banco do Neon no lugar do SQLite, crie um arquivo `.env` na raiz com `DATABASE_URL=postgresql://...` e reinicie o servidor de desenvolvimento, pois ele só lê o arquivo ao subir — o mesmo vale sempre que você alterar o valor.

## Deploy na Vercel

1. Crie o projeto na Vercel a partir deste repositório. O `vercel.json` já aponta tudo para a função em `api/index.js`.
2. Em Storage, adicione um banco Neon Postgres (plano gratuito). Ele injeta `DATABASE_URL` sozinho.
3. Faça o deploy. As migrações rodam na primeira requisição.

## Outras hospedagens

O `Dockerfile` sobe o servidor Node completo (`npm start`) para Fly.io, Railway ou similares. Nesses casos o SQLite persiste se `SQLITE_PATH` apontar para um volume.
