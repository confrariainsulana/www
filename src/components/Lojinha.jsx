import { useState } from 'react'
import { categorias, produtos } from '../data/produtos'
import AviseMe from './AviseMe'
import { Lupulo, SeparadorLupulo } from './Icones'
import styles from './Lojinha.module.css'

const rotuloCategoria = Object.fromEntries(categorias.map((c) => [c.id, c.rotulo]))

function Imagem({ produto }) {
  return (
    <img
      src={produto.imagem}
      alt={produto.alt || `Imagem do produto ${produto.nome}`}
      loading="lazy"
      decoding="async"
      width="400"
      height="400"
      className={styles.imagem}
    />
  )
}

// Produto à venda: o cartão inteiro leva ao anúncio do Mercado Livre.
function ProdutoAVenda({ produto }) {
  return (
    <a href={produto.urlMercadoLivre} target="_blank" rel="noopener noreferrer" className={styles.produto}>
      <Imagem produto={produto} />
      <span className={styles.info}>
        <span className={styles.categoria}>{rotuloCategoria[produto.categoria]}</span>
        <span className={styles.nome}>{produto.nome}</span>
        <span className={styles.comprar}>
          Comprar no Mercado Livre
          <span className="sr-only"> (abre em nova aba)</span>
        </span>
      </span>
    </a>
  )
}

// Produto ainda sem anúncio: mostra "no fermentador" e o botão Avise-me.
function ProdutoEmBreve({ produto, aoPedirAviso }) {
  return (
    <div className={`${styles.produto} ${styles.emBreve}`}>
      <div className={styles.moldura}>
        <Imagem produto={produto} />
        <span className={`gotica ${styles.fita}`}>Em breve</span>
      </div>
      <div className={styles.info}>
        <span className={styles.categoria}>{rotuloCategoria[produto.categoria]}</span>
        <span className={styles.nome}>{produto.nome}</span>
        <span className={styles.status}>
          <Lupulo className={styles.statusIcone} />
          Ainda no fermentador
        </span>
        <button type="button" className={styles.avise} onClick={() => aoPedirAviso(produto.id)}>
          Avise-me
          <span className="sr-only"> quando {produto.nome} chegar</span>
        </button>
      </div>
    </div>
  )
}

export default function Lojinha() {
  const [filtro, setFiltro] = useState('todos')
  const [avisoPara, setAvisoPara] = useState(null)
  const visiveis = filtro === 'todos' ? produtos : produtos.filter((p) => p.categoria === filtro)

  return (
    <section id="lojinha" className="secao secao--alt" aria-labelledby="lojinha-titulo">
      <div className="container">
        <header className={styles.cabeca}>
          <h2 id="lojinha-titulo" className="titulo-secao">
            Lojinha da Confraria
          </h2>
          <p className="lead">Vista a camisa (literalmente). Toda compra ajuda a manter a confraria viva.</p>
          <SeparadorLupulo />
        </header>

        <div className={styles.filtros} role="group" aria-label="Filtrar produtos por categoria">
          {categorias.map((c) => (
            <button
              key={c.id}
              type="button"
              className={styles.filtro}
              aria-pressed={filtro === c.id}
              onClick={() => setFiltro(c.id)}
            >
              {c.rotulo}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {visiveis.length} {visiveis.length === 1 ? 'produto' : 'produtos'} em{' '}
          {filtro === 'todos' ? 'todas as categorias' : rotuloCategoria[filtro]}
        </p>

        <ul className={styles.grade}>
          {visiveis.map((p) => (
            <li key={p.id}>
              {p.urlMercadoLivre ? (
                <ProdutoAVenda produto={p} />
              ) : (
                <ProdutoEmBreve produto={p} aoPedirAviso={setAvisoPara} />
              )}
            </li>
          ))}
        </ul>
      </div>

      {avisoPara && (
        <AviseMe key={avisoPara} produtos={produtos} produtoId={avisoPara} aoFechar={() => setAvisoPara(null)} />
      )}
    </section>
  )
}
