# vizai-site

Site do Vizai: landing, checkout, download do plugin e Treinamento.
Next.js 16 (App Router) publicado na Cloudflare via OpenNext.

O contexto do projeto, as regras de deploy e as armadilhas conhecidas estão em
[CLAUDE.md](CLAUDE.md).

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:3000
```

Confira o visual pelo `npm run dev`. Build de produção servido em localhost
quebra o CSS no Safari.

## Publicar

```bash
npm run deploy   # opennextjs-cloudflare build && deploy
```

O build automático foi desconectado: push no GitHub é só versionamento,
publicar é passo manual.
