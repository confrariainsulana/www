import logo from '../assets/logo-pequeno.webp'
import { navegacao } from '../data/links'
import styles from './Footer.module.css'

export default function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className={styles.rodape}>
      <div className={`container ${styles.grade}`}>
        <div className={styles.marca}>
          <img src={logo} alt="Logo da Confraria Insulana" width="72" height="72" loading="lazy" className={styles.logo} />
          <p>
            <strong className={styles.nome}>Confraria Insulana</strong>
            <span>Desde 2014 · Ilha do Governador, RJ</span>
          </p>
        </div>

        <nav aria-label="Rodapé">
          <ul className={styles.links}>
            {navegacao.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.rotulo}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.legal}>
          <p className={styles.aviso}>Beba com moderação. Venda proibida para menores de 18 anos.</p>
          <p>© {ano} Confraria Insulana</p>
        </div>
      </div>
    </footer>
  )
}
