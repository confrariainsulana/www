import logo from '../assets/logo.webp'
import { Respingo, Silhueta } from './Icones'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="topo" className={styles.hero} aria-labelledby="hero-titulo">
      <Respingo className={styles.respingoA} />
      <Respingo className={styles.respingoB} variante={2} />
      <Silhueta className={styles.silhueta} />

      <div className={`container ${styles.grade}`}>
        <div className={styles.palco}>
          <div className={styles.sol} aria-hidden="true" />
          <div className={styles.bolacha}>
          <img
            src={logo}
            alt="Logo da Confraria Insulana: letreiro laranja em letras góticas, taça de stout com símbolo de lúpulo abraçada por um tentáculo de polvo, pá de brassagem, growlers e a inscrição Desde 2014"
            width="640"
            height="640"
            fetchpriority="high"
            className={styles.logo}
          />
          </div>
        </div>

        <div className={styles.texto}>
          <h1 id="hero-titulo" className={`gotica ${styles.titulo}`}>
            <span className={styles.seja}>Seja um</span>
            <span className={styles.associado}>associado!</span>
          </h1>

          <p className={styles.sub}>
            Faça parte da Confraria Insulana e fortaleça a nossa comunidade de cervejeiros caseiros. Além de
            apoiar nossas atividades, você recebe benefícios exclusivos.
          </p>

          <div className={styles.botoes}>
            <a href="#associe-se" className="botao botao--laranja">
              Quero me associar
            </a>
            <a href="#confraria" className="botao botao--contorno">
              Conheça a confraria
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
