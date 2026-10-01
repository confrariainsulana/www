# Site da Confraria Insulana

Site institucional da **Confraria Insulana**, confraria de cervejeiros caseiros da Ilha do Governador (RJ), desde 2014.
Página única feita em React 18 + Vite, publicada no GitHub Pages.

- Endereço (depois de publicar): `https://confrariainsulana.github.io/www/`

## ⚠️ Pendências

Os marcadores `[COMPLETAR: ...]` já foram todos resolvidos. Se precisar marcar algo pendente no futuro, use `<span className="completar">[COMPLETAR: ...]</span>`: ele aparece no site com fundo listrado amarelo.

Pendências abertas:

- **Links e fotos da lojinha:** os produtos ainda não têm anúncio (aparecem como "Em breve" com o botão "Avise-me") e usam ilustrações provisórias (veja [Lojinha](#lojinha-adicionar-e-editar-produtos)).
- **ID do Formspree:** sem ele, o formulário de contato e o "Avise-me" da lojinha mostram um aviso de erro (veja [Formspree](#formulário-de-contato-formspree)).
- **Imagem de prévia (Open Graph):** está fixada em `https://confrariainsulana.github.io/www/og-image.jpg` no `index.html`. Se o endereço do site mudar (outro repositório ou domínio próprio), atualize `og:image` e `og:url`.

Para encontrar tudo de uma vez:

```bash
grep -rn "COMPLETAR\|urlMercadoLivre: ''" src index.html
```

## Rodar localmente

Requisitos: Node.js 20.19+ (ou 22.12+) e npm.

```bash
npm install
```

```bash
npm run dev
```

O site abre em `http://localhost:5173/www/`.

Para testar a versão de produção (igual à publicada):

```bash
npm run build
```

```bash
npm run preview
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub chamado **`www`**.
   - Se usar outro nome, altere `base` em `vite.config.js` para `'/<nome-do-repositorio>/'`.
2. Envie o código para a branch `main`:
   ```bash
   git init
   git add .
   git commit -m "Site da Confraria Insulana"
   git branch -M main
   git remote add origin https://github.com/confrariainsulana/www.git
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

Os pedidos do botão **"Avise-me"** da lojinha chegam pelo mesmo Formspree, com o assunto `[Lojinha] Avise-me: <produto> (<quantidade> un.)` e os campos produto, quantidade, telefone e e-mail.

## Lojinha: adicionar e editar produtos

Os produtos ficam em `src/data/produtos.js`:

```js
{
  id: 'camisa-classica-preta',              // único, sem espaços
  nome: 'Camisa Clássica Insulana – Preta',
  categoria: 'camisas',                     // camisas | bones | copos | tap-handles
  imagem: camisaClassicaPreta,              // import do topo do arquivo
  urlMercadoLivre: 'https://www.mercadolivre.com.br/…', // vazio ('') = "Em breve" + botão Avise-me
  alt: 'Camisa preta com o logo laranja no peito', // opcional, descreve a foto
},
```

Para trocar a foto:

1. Salve a imagem em `src/assets/produtos/`, de preferência quadrada (~800×800, `.webp` ou `.jpg`).
2. Importe no topo de `produtos.js`: `import camisaNova from '../assets/produtos/camisa-nova.webp'`
3. Use `imagem: camisaNova` no produto.

Enquanto `urlMercadoLivre` estiver vazio, o cartão mostra a fita "Em breve", o aviso "Ainda no fermentador" e o botão **Avise-me**, que abre uma janela para o visitante informar produto, quantidade, telefone e e-mail. Quando você preencher o link, o cartão vira automaticamente um botão "Comprar no Mercado Livre".

Para **adicionar** um produto, copie um bloco `{ … }` e ajuste. Para **remover**, apague o bloco. Os preços não aparecem no site: eles ficam no anúncio do Mercado Livre.

Para criar uma **nova categoria**, adicione em `categorias` (no mesmo arquivo) e use o mesmo `id` no campo `categoria` dos produtos.

## Página do Estatuto

O Estatuto é uma página separada, sem link no menu nem no rodapé do site, e fora dos buscadores (`noindex`). Para mostrá-lo a alguém, envie o link direto:

https://confrariainsulana.github.io/www/estatuto.html

- O texto fica em `src/estatuto/estatuto.md`. Para mudar o Estatuto, edite só esse arquivo.
- Formatação aceita: `##` capítulo, `###` artigo, `- ` item de lista (`  - ` para subitem), `> ` destaque, tabelas com `|`, `**negrito**` e `[texto](link)`.
- Cada artigo tem um link próprio, como `estatuto.html#art-20`.
- O botão "Imprimir / salvar PDF" gera uma versão limpa para impressão.

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

Fontes (Google Fonts): **Bebas Neue** nos títulos, **Grenze Gotisch** nas chamadas ("Seja um associado!", "Boa cerveja gera grandes histórias.", "Desde 2014 na Ilha" e o selo "Melhor opção") e **Inter** no texto.
