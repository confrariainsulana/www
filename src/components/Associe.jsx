import { planos } from '../data/beneficios'
import { FORMULARIO_ASSOCIACAO } from '../data/links'
import { Lupulo, Respingo } from './Icones'
import styles from './Associe.module.css'

const passos = ['Preencha o formulário', 'A diretoria entra em contato', 'Bem-vindo à Confraria!']

function Preco({ plano }) {
  return (
    <p className={styles.preco}>
      {plano.valorCheio && (
        <s className={styles.cheio}>
          <span className="sr-only">De </span>
          {plano.valorCheio}
          <span className="sr-only"> por</span>
        </s>
      )}
      <span className={styles.valor}>
        <span className={styles.moeda}>R$</span>
        {plano.valor}
        <span className={styles.centavos}>,{plano.centavos}</span>
      </span>
      <span className={styles.periodo}>{plano.periodo}</span>
    </p>
  )
}

export default function Associe() {
  return (
    <section id="associe-se" className={`secao ${styles.associe}`} aria-labelledby="associe-titulo">
      <Respingo className={styles.respingo} />
      <div className={`container ${styles.conteudo}`}>
        <header className={styles.cabeca}>
          <h2 id="associe-titulo" className="titulo-secao">
            Faça parte da Confraria
          </h2>
          <p className="lead">Escolha a forma de contribuição que combina com você.</p>
        </header>

        <ul className={styles.planos}>
          {planos.map((plano) => (
            <li
              key={plano.id}
              className={`${styles.plano} ${plano.destaque ? styles.planoDestaque : ''}`}
            >
              {plano.selo && <span className={styles.selo}>{plano.selo}</span>}
              {plano.destaque && <span className={styles.melhor}>Melhor opção</span>}
              <Lupulo className={styles.lupulo} />
              <h3 className={styles.nome}>{plano.nome}</h3>
              <Preco plano={plano} />
              <p className={styles.textoPlano}>{plano.texto}</p>
            </li>
          ))}
        </ul>

        <h3 className={styles.subtitulo}>Como funciona</h3>
        <ol className={styles.passos}>
          {passos.map((passo, i) => (
            <li key={passo} className={styles.passo}>
              <span className={styles.numero} aria-hidden="true">
                {i + 1}
              </span>
              {passo}
            </li>
          ))}
        </ol>

        <div className={styles.acao}>
          <a
            href={FORMULARIO_ASSOCIACAO}
            target="_blank"
            rel="noopener noreferrer"
            className={`botao botao--verde ${styles.botaoGrande}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={styles.iconeBotao}>
              <path
                fill="currentColor"
                d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 1.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm14 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 13.5c-3.3 0-6 2-6 4.5V20h12v-2c0-2.5-2.7-4.5-6-4.5zM4.5 14.5C2.5 14.8 1 16 1 17.5V20h3.5v-2c0-1.3.4-2.5 1.2-3.4l-1.2-.1zm15 0-1.2.1c.8.9 1.2 2.1 1.2 3.4v2H23v-2.5c0-1.5-1.5-2.7-3.5-3z"
              />
            </svg>
            Torne-se um associado
            <span className="sr-only">(abre o formulário em nova aba)</span>
          </a>
        </div>

        <p className={`gotica ${styles.lema}`}>Boa cerveja gera grandes histórias.</p>
      </div>
    </section>
  )
}
