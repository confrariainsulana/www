import { beneficios } from '../data/beneficios'
import { IconeBeneficio, SeparadorLupulo } from './Icones'
import styles from './Beneficios.module.css'

export default function Beneficios() {
  return (
    <section id="beneficios" className="secao secao--alt" aria-labelledby="beneficios-titulo">
      <div className="container">
        <header className={styles.cabeca}>
          <h2 id="beneficios-titulo" className="titulo-secao">
            Por que se associar
          </h2>
          <SeparadorLupulo className={styles.separador} />
        </header>

        <ul className={styles.grade}>
          {beneficios.map((b) => (
            <li key={b.id} className={styles.cartao}>
              <IconeBeneficio nome={b.icone} className={styles.icone} />
              <h3 className={styles.titulo}>{b.titulo}</h3>
              <p className={styles.texto}>{b.texto}</p>
            </li>
          ))}
        </ul>

        <p className={styles.rodape}>
          Curtiu? Veja <a href="#associe-se">os valores da contribuição e como se associar</a>.
        </p>
      </div>
    </section>
  )
}
