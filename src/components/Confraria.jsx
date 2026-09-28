import { Respingo, SeparadorLupulo } from './Icones'
import styles from './Confraria.module.css'

export default function Confraria() {
  return (
    <section id="confraria" className={`secao ${styles.confraria}`} aria-labelledby="confraria-titulo">
      <Respingo className={styles.respingo} variante={2} />
      <div className={`container ${styles.grade}`}>
        <header className={styles.cabeca}>
          <h2 id="confraria-titulo" className="titulo-secao">
            A Confraria
          </h2>
          <p className={`pincel ${styles.desde}`}>Desde 2014 na Ilha</p>
          <SeparadorLupulo />
        </header>

        <div className={styles.historia}>
          <p>
            Tudo começou em 2014, na Ilha do Governador, quando um grupo de amigos apaixonados por cerveja
            decidiu trocar as panelas solitárias por uma brassagem em boa companhia.{' '}
            <span className="completar">[COMPLETAR: como/onde foi o primeiro encontro]</span>. Dali nasceu a
            Confraria Insulana.
          </p>
          <p>
            De lá pra cá, a confraria virou ponto de encontro de quem faz, estuda e aprecia cerveja na Ilha. Tem
            brassagem coletiva, degustação, troca de receitas e muita conversa boa. Aqui ninguém guarda segredo
            de receita: o que um aprende, ensina pro outro.
          </p>
          <p>
            Somos uma associação sem fins lucrativos, tocada por voluntários. Cada sócio tem voz e ajuda a
            escolher os rumos da confraria. Porque, como a gente gosta de dizer,{' '}
            <strong className={styles.lema}>boa cerveja gera grandes histórias</strong>.
          </p>
        </div>
      </div>
    </section>
  )
}
