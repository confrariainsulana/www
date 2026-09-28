import { useState } from 'react'
import { categorias, produtos } from '../data/produtos'
import { SeparadorLupulo } from './Icones'
import styles from './Lojinha.module.css'

const rotuloCategoria = Object.fromEntries(categorias.map((c) => [c.id, c.rotulo]))

export default function Lojinha() {
  const [filtro, setFiltro] = useState('todos')
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
              <a
                href={p.urlMercadoLivre}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.produto}
              >
                <img
                  src={p.imagem}
                  alt={p.alt || `Imagem do produto ${p.nome}`}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="400"
                  className={styles.imagem}
                />
                <span className={styles.info}>
                  <span className={styles.categoria}>{rotuloCategoria[p.categoria]}</span>
                  <span className={styles.nome}>{p.nome}</span>
                  <span className={styles.comprar}>
                    Comprar no Mercado Livre
                    <span className="sr-only"> (abre em nova aba)</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
