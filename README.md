# Site da Confraria Insulana

Site institucional da **Confraria Insulana**, confraria de cervejeiros caseiros da Ilha do Governador (RJ), desde 2014.
Página única feita em React 18 + Vite, publicada no GitHub Pages.

- Endereço (depois de publicar): `https://<seu-usuario>.github.io/confraria-insulana/`

## ⚠️ Pendências: `[COMPLETAR: ...]`

Estes marcadores aparecem no site com fundo listrado amarelo para ficarem fáceis de achar:

| Marcador | Arquivo | O que fazer |
|---|---|---|
| `[COMPLETAR: como/onde foi o primeiro encontro]` | `src/components/Confraria.jsx` (1º parágrafo) | Trocar o `<span className="completar">…</span>` por uma frase contando o primeiro encontro. |
| `[COMPLETAR: @instagram]` | `src/data/links.js` → `contatos.instagram` | Preencher `texto` (ex.: `'@confrariainsulana'`) e `url` (ex.: `'https://instagram.com/confrariainsulana'`). |
| `[COMPLETAR: email]` | `src/data/links.js` → `contatos.email` | Preencher `texto` (ex.: `'contato@exemplo.com'`) e `url` (ex.: `'mailto:contato@exemplo.com'`). |

Outras pendências que não aparecem como marcador:

- **Links e fotos da lojinha:** todos os produtos apontam para `https://www.mercadolivre.com.br/SUBSTITUIR` e usam ilustrações provisórias (veja [Lojinha](#lojinha-adicionar-e-editar-produtos)).
- **ID do Formspree:** sem ele, o formulário de contato mostra um aviso de erro (veja [Formspree](#formulário-de-contato-formspree)).
- **Imagem de prévia (Open Graph):** em `index.html`, troque `%BASE_URL%og-image.jpg` pela URL absoluta (`https://<seu-usuario>.github.io/confraria-insulana/og-image.jpg`) depois do primeiro deploy, para o WhatsApp e as redes mostrarem a prévia do link.

Para encontrar tudo de uma vez:

```bash
grep -rn "COMPLETAR\|SUBSTITUIR" src index.html
```

## Rodar localmente

Requisitos: Node.js 20.19+ (ou 22.12+) e npm.

```bash
npm install
```

```bash
npm run dev
```

O site abre em `http://localhost:5173/confraria-insulana/`.

Para testar a versão de produção (igual à publicada):

```bash
npm run build
```

```bash
npm run preview
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub chamado **`confraria-insulana`**.
   - Se usar outro nome, altere `base` em `vite.config.js` para `'/<nome-do-repositorio>/'`.
2. Envie o código para a branch `main`:
   ```bash
   git init
   git add .
   git commit -m "Site da Confraria Insulana"
   git branch -M main
   git remote add origin https://github.com/<seu-usuario>/confraria-insulana.git
   git push -u origin main
   ```
3. No GitHub, vá em **Settings → Pages → Build and deployment → Source** e escolha **GitHub Actions**.
4. A cada push na `main`, o workflow `.github/workflows/deploy.yml` gera o build e publica. Acompanhe na aba **Actions**.

## Formulário de contato (Formspree)

O GitHub Pages não tem servidor, então as mensagens são enviadas pelo [Formspree](https://formspree.io) (tem plano gratuito).

1. Crie uma conta no Formspree e clique em **New Form**. Informe o e-mail que vai receber as mensagens.
2. Copie o ID do formulário: é o trecho depois de `/f/` no endpoint (em `https://formspree.io/f/abcdwxyz`, o ID é `abcdwxyz`).
3. No repositório do GitHub, vá em **Settings → Secrets and variables → Actions → aba Variables → New repository variable**:
   - Nome: `VITE_FORMSPREE_ID`
   - Valor: o ID copiado
4. O workflow já repassa essa variável para o build (`VITE_FORMSPREE_ID: ${{ vars.VITE_FORMSPREE_ID }}`). Rode um novo deploy (push na `main` ou **Actions → Publicar no GitHub Pages → Run workflow**).

> O ID do Formspree não é secreto (ele fica visível no site publicado), por isso usamos uma *variable* e não um *secret*. Se preferir um secret, cadastre em **Secrets** e troque `vars.` por `secrets.` no workflow.

Para testar localmente, copie `.env.example` para `.env.local` e preencha o ID.

O formulário já tem validação, os estados de "enviando", sucesso e erro, e um campo escondido (`_gotcha`) contra spam.

## Lojinha: adicionar e editar produtos

Os produtos ficam em `src/data/produtos.js`:

```js
{
  id: 'camisa-classica-preta',              // único, sem espaços
  nome: 'Camisa Clássica Insulana – Preta',
  categoria: 'camisas',                     // camisas | bones | copos | tap-handles
  imagem: camisaClassicaPreta,              // import do topo do arquivo
  urlMercadoLivre: 'https://www.mercadolivre.com.br/…',
  alt: 'Camisa preta com o logo laranja no peito', // opcional, descreve a foto
},
```

Para trocar a foto:

1. Salve a imagem em `src/assets/produtos/`, de preferência quadrada (~800×800, `.webp` ou `.jpg`).
2. Importe no topo de `produtos.js`: `import camisaNova from '../assets/produtos/camisa-nova.webp'`
3. Use `imagem: camisaNova` no produto.

Para **adicionar** um produto, copie um bloco `{ … }` e ajuste. Para **remover**, apague o bloco. Os preços não aparecem no site: eles ficam no anúncio do Mercado Livre.

Para criar uma **nova categoria**, adicione em `categorias` (no mesmo arquivo) e use o mesmo `id` no campo `categoria` dos produtos.

## Onde editar cada coisa

| Conteúdo | Arquivo |
|---|---|
| Links, Instagram, e-mail, menu, link do Google Forms | `src/data/links.js` |
| Cartões de benefícios e valores dos planos | `src/data/beneficios.js` |
| Produtos da lojinha | `src/data/produtos.js` |
| Texto da história | `src/components/Confraria.jsx` |
| Cores e fontes | `src/styles/variables.css` |
| Título, descrição e prévia para redes (SEO) | `index.html` |

## Estrutura

```
.github/workflows/deploy.yml   deploy automático no GitHub Pages
docs/referencia/               flyer usado como referência visual (fora do build)
public/                        favicon e imagem de prévia (og-image)
src/assets/                    logo e imagens dos produtos
src/components/                Header, Hero, Confraria, Beneficios, Associe, Lojinha, Contato, Footer, Icones
src/data/                      conteúdo editável (links, benefícios, produtos)
src/styles/                    variáveis (cores/fontes) e estilos globais
```

## Identidade visual

| Cor | Hex | Uso |
|---|---|---|
| Roxo profundo | `#1A0D1F` | fundo |
| Roxo escuro | `#2A1233` | seções alternadas |
| Roxo médio | `#4B2A5C` | cartões |
| Laranja Insulana | `#F28A1A` | títulos e botões |
| Laranja claro | `#FA9E25` | plano anual |
| Creme | `#F5E9D3` | texto |
| Verde | `#187F28` | botão "Torne-se um associado" |

Fontes (Google Fonts): **Bebas Neue** nos títulos, **Grenze Gotisch** em "Seja um associado!" e no lema "Boa cerveja gera grandes histórias.", **Permanent Marker** em detalhes manuscritos e **Inter** no texto.
