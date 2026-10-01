// Leitor de Markdown simples, feito só para o texto do Estatuto (estatuto.md).
// Entende: # títulos (#, ##, ###), parágrafos, listas com "- " (e subitens com "  - "),
// citações com "> ", tabelas com "|", **negrito**, [links](url)
// e o bloco especial "::: assinaturas" … ":::" (linhas de assinatura).

const ehEspecial = (linha) => /^(#{1,3} |> ?|>$|\||- |::: )/.test(linha)

export function slug(texto) {
  const artigo = texto.match(/^Art\.\s*(\d+)/)
  if (artigo) return `art-${artigo[1]}`
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function parseMarkdown(md) {
  const linhas = md.replace(/\r\n?/g, '\n').split('\n')
  const blocos = []
  let i = 0

  while (i < linhas.length) {
    const linha = linhas[i]

    if (!linha.trim()) {
      i++
      continue
    }

    const titulo = linha.match(/^(#{1,3}) (.+)$/)
    if (titulo) {
      const texto = titulo[2].trim()
      blocos.push({ tipo: `h${titulo[1].length}`, texto, id: slug(texto) })
      i++
      continue
    }

    if (/^>/.test(linha)) {
      const internas = []
      while (i < linhas.length && /^>/.test(linhas[i])) internas.push(linhas[i++].replace(/^> ?/, ''))
      blocos.push({ tipo: 'citacao', filhos: parseMarkdown(internas.join('\n')) })
      continue
    }

    if (/^\|/.test(linha)) {
      const linhasTabela = []
      while (i < linhas.length && /^\|/.test(linhas[i])) linhasTabela.push(linhas[i++])
      const celulas = linhasTabela
        .filter((l) => !/^\|\s*:?-{3,}/.test(l))
        .map((l) =>
          l
            .replace(/^\||\|\s*$/g, '')
            .split('|')
            .map((c) => c.trim()),
        )
      blocos.push({ tipo: 'tabela', cabecalho: celulas[0], linhas: celulas.slice(1) })
      continue
    }

    if (/^::: assinaturas/.test(linha)) {
      const nomes = []
      i++
      while (i < linhas.length && !/^:::\s*$/.test(linhas[i])) {
        if (linhas[i].trim()) nomes.push(linhas[i].trim())
        i++
      }
      i++
      blocos.push({ tipo: 'assinaturas', nomes })
      continue
    }

    if (/^- /.test(linha)) {
      const itens = []
      while (i < linhas.length && /^( {2})?- /.test(linhas[i])) {
        const sub = linhas[i].startsWith('  - ')
        const texto = linhas[i].replace(/^( {2})?- /, '')
        if (sub && itens.length) itens[itens.length - 1].sub.push(texto)
        else itens.push({ texto, sub: [] })
        i++
      }
      blocos.push({ tipo: 'lista', itens })
      continue
    }

    const paragrafo = []
    while (i < linhas.length && linhas[i].trim() && !ehEspecial(linhas[i])) paragrafo.push(linhas[i++].trim())
    blocos.push({ tipo: 'p', texto: paragrafo.join(' ') })
  }

  return blocos
}

// **negrito** e [texto](url)
export function Inline({ texto }) {
  const partes = texto.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g).filter(Boolean)
  return partes.map((parte, i) => {
    if (parte.startsWith('**') && parte.endsWith('**')) return <strong key={i}>{parte.slice(2, -2)}</strong>
    const link = parte.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
    if (link) {
      const externo = /^https?:/.test(link[2])
      return (
        <a key={i} href={link[2]} {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {link[1]}
        </a>
      )
    }
    return parte.replace(/&nbsp;/g, ' ')
  })
}
