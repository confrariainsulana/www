import { useEffect, useState } from 'react'
import logo from '../assets/logo-pequeno.webp'
import texto from './estatuto.md?raw'
import { Inline, parseMarkdown } from './markdown'
import styles from './Estatuto.module.css'

// O conteúdo vem de src/estatuto/estatuto.md. Para alterar o Estatuto, edite só esse arquivo.
const blocos = parseMarkdown(texto)
const titulo = blocos.find((b) => b.tipo === 'h1')?.texto ?? 'Estatuto Social'
const capitulos = blocos.filter((b) => b.tipo === 'h2')
const corpo = blocos.filter((b) => b.tipo !== 'h1')

// Separa "Art. 20. — Etapas e sanções" em número e título.
function TituloArtigo({ texto }) {
  const partes = texto.match(/^(Art\.\s*\d+[º.]*)\s*—\s*(.+)$/)
  if (!partes) return texto
  return (
    <>
      <span className={styles.numeroArtigo}>{partes[1]}</span> {partes[2]}
    </>
  )
}

// "Capítulo V — Das sanções…" → rótulo pequeno + título
function TituloCapitulo({ texto }) {
  const partes = texto.match(/^((?:Capítulo|Anexo)\s+[IVXLC]+)\s*—\s*(.+)$/)
  if (!partes) return texto
  return (
    <>
      <span className={styles.rotuloCapitulo}>{partes[1]}</span>
      {partes[2]}
    </>
  )
}

function Bloco({ bloco }) {
  switch (bloco.tipo) {
    case 'h2':
      return (
        <h2 id={bloco.id} className={styles.capitulo}>
          <TituloCapitulo texto={bloco.texto} />
        </h2>
      )
    case 'h3':
      return (
        <h3 id={bloco.id} className={styles.artigo}>
          <TituloArtigo texto={bloco.texto} />
        </h3>
      )
    case 'p':
      return (
        <p className={styles.paragrafo}>
          <Inline texto={bloco.texto} />
        </p>
      )
    case 'lista':
      return (
        <ul className={styles.lista}>
          {bloco.itens.map((item, i) => (
            <li key={i}>
              <Inline texto={item.texto} />
              {item.sub.length > 0 && (
                <ul className={styles.sublista}>
                  {item.sub.map((s, j) => (
                    <li key={j}>
                      <Inline texto={s} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )
    case 'citacao':
      return (
        <div className={styles.destaque}>
          {bloco.filhos.map((filho, i) => (
            <Bloco key={i} bloco={filho} />
          ))}
        </div>
      )
    case 'tabela':
      return (
        <div className={styles.tabelaRolagem}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                {bloco.cabecalho.map((c, i) => (
                  <th key={i} scope="col">
                    <Inline texto={c} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloco.linhas.map((linha, i) => (
                <tr key={i}>
                  {linha.map((c, j) =>
                    j === 0 ? (
                      <th key={j} scope="row">
                        <Inline texto={c} />
                      </th>
                    ) : (
                      <td key={j}>
                        <Inline texto={c} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'assinaturas':
      return (
        <div className={styles.assinaturas}>
          {bloco.nomes.map((nome) => (
            <div key={nome} className={styles.assinatura}>
              <span className={styles.linhaAssinatura} aria-hidden="true" />
              {nome}
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}

// Sumário aberto no computador e fechado no celular (para não empurrar o texto para baixo).
const telaLarga = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 64rem)').matches

export default function Estatuto() {
  const [sumarioAberto, setSumarioAberto] = useState(telaLarga)

  // O texto é montado depois do carregamento, então o navegador não acha a âncora sozinho.
  // Links diretos como estatuto.html#art-20 rolam até o artigo aqui.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <>
      <a href="#conteudo" className="pular-link">
        Pular para o texto
      </a>

      <header className={styles.topo}>
        <div className={styles.topoInterno}>
          <img src={logo} alt="Logo da Confraria Insulana" width="96" height="96" className={styles.logo} />
          <div>
            <p className={styles.marca}>Confraria Insulana · Desde 2014</p>
            <h1 className={styles.titulo}>{titulo}</h1>
          </div>
          <button type="button" className={`botao botao--contorno ${styles.imprimir}`} onClick={() => window.print()}>
            Imprimir / salvar PDF
          </button>
        </div>
      </header>

      <div className={styles.grade}>
        <nav className={styles.sumario} aria-labelledby="sumario-titulo">
          <details
            open={sumarioAberto}
            onToggle={(e) => setSumarioAberto(e.currentTarget.open)}
            className={styles.sumarioCaixa}
          >
            <summary id="sumario-titulo" className={styles.sumarioTitulo}>
              Sumário
            </summary>
            <ol className={styles.sumarioLista}>
              {capitulos.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`}>{c.texto}</a>
                </li>
              ))}
            </ol>
          </details>
        </nav>

        <main id="conteudo" className={styles.papel}>
          {corpo.map((bloco, i) => (
            <Bloco key={i} bloco={bloco} />
          ))}

          <p className={styles.voltar}>
            <a href="#">Voltar ao topo ↑</a>
          </p>
        </main>
      </div>
    </>
  )
}
