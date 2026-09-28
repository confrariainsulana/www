import { useRef, useState } from 'react'
import { contatos } from '../data/links'
import { EMAIL_VALIDO, enviarFormspree } from '../utils/formspree'
import { Lupulo } from './Icones'
import styles from './Contato.module.css'

const assuntos = ['Quero me associar', 'Lojinha', 'Parcerias e eventos', 'Outro']
const vazio = { nome: '', email: '', assunto: '', mensagem: '', _gotcha: '' }

function validar(dados) {
  const erros = {}
  if (!dados.nome.trim()) erros.nome = 'Conta pra gente o seu nome.'
  if (!dados.email.trim()) erros.email = 'Informe um e-mail para a resposta.'
  else if (!EMAIL_VALIDO.test(dados.email.trim())) erros.email = 'Esse e-mail parece incompleto. Confira, por exemplo: nome@email.com.'
  if (!dados.assunto) erros.assunto = 'Escolha um assunto.'
  if (!dados.mensagem.trim()) erros.mensagem = 'Escreva sua mensagem.'
  return erros
}

function Erro({ nome, erros }) {
  if (!erros[nome]) return null
  return (
    <p id={`erro-${nome}`} className={styles.erroCampo}>
      {erros[nome]}
    </p>
  )
}

// Mostra o texto como link quando houver URL; senão, como marcador pendente.
function ItemContato({ rotulo, item }) {
  const pendente = item.texto.startsWith('[COMPLETAR')
  return (
    <li>
      <span className={styles.rotulo}>{rotulo}</span>
      {pendente || !item.url ? (
        <span className={pendente ? 'completar' : undefined}>{item.texto}</span>
      ) : (
        <a href={item.url} target={item.url.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
          {item.texto}
        </a>
      )}
    </li>
  )
}

export default function Contato() {
  const [dados, setDados] = useState(vazio)
  const [erros, setErros] = useState({})
  const [status, setStatus] = useState('ocioso') // ocioso | enviando | sucesso | erro
  const [mensagemErro, setMensagemErro] = useState('')
  const formRef = useRef(null)

  const alterar = (e) => {
    const { name, value } = e.target
    setDados((d) => ({ ...d, [name]: value }))
    if (erros[name]) setErros((er) => ({ ...er, [name]: undefined }))
  }

  const enviar = async (e) => {
    e.preventDefault()
    const novosErros = validar(dados)
    setErros(novosErros)
    const primeiro = Object.keys(novosErros)[0]
    if (primeiro) {
      formRef.current?.elements[primeiro]?.focus()
      return
    }
    // Robôs costumam preencher o campo escondido: finge sucesso e não envia.
    if (dados._gotcha) {
      setStatus('sucesso')
      return
    }
    setStatus('enviando')
    try {
      await enviarFormspree({
        nome: dados.nome.trim(),
        email: dados.email.trim(),
        _replyto: dados.email.trim(),
        assunto: dados.assunto,
        _subject: `[Site] ${dados.assunto} – ${dados.nome.trim()}`,
        mensagem: dados.mensagem.trim(),
      })
      setStatus('sucesso')
      setDados(vazio)
    } catch (erro) {
      setStatus('erro')
      setMensagemErro(erro.message)
    }
  }

  const campo = (nome) => ({
    id: `contato-${nome}`,
    name: nome,
    value: dados[nome],
    onChange: alterar,
    'aria-invalid': erros[nome] ? true : undefined,
    'aria-describedby': erros[nome] ? `erro-${nome}` : undefined,
    className: styles.entrada,
  })

  return (
    <section id="contato" className="secao" aria-labelledby="contato-titulo">
      <div className={`container ${styles.grade}`}>
        <header className={styles.cabeca}>
          <h2 id="contato-titulo" className="titulo-secao">
            Fale com a gente
          </h2>
          <p className="lead">
            Dúvidas, parcerias, sugestões ou vontade de conhecer um encontro antes de se associar? Manda uma
            mensagem!
          </p>
        </header>

        <form ref={formRef} className={styles.form} onSubmit={enviar} noValidate>
          <p className={styles.obrigatorios}>Todos os campos são obrigatórios.</p>

          <div className={styles.linha}>
            <div className={styles.campo}>
              <label htmlFor="contato-nome">Nome</label>
              <input type="text" autoComplete="name" required {...campo('nome')} />
              <Erro nome="nome" erros={erros} />
            </div>
            <div className={styles.campo}>
              <label htmlFor="contato-email">E-mail</label>
              <input type="email" autoComplete="email" inputMode="email" required {...campo('email')} />
              <Erro nome="email" erros={erros} />
            </div>
          </div>

          <div className={styles.campo}>
            <label htmlFor="contato-assunto">Assunto</label>
            <select required {...campo('assunto')}>
              <option value="" disabled>
                Escolha um assunto
              </option>
              {assuntos.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <Erro nome="assunto" erros={erros} />
          </div>

          <div className={styles.campo}>
            <label htmlFor="contato-mensagem">Mensagem</label>
            <textarea rows="5" required {...campo('mensagem')} />
            <Erro nome="mensagem" erros={erros} />
          </div>

          {/* Honeypot: invisível para pessoas, atraente para robôs de spam */}
          <div className={styles.pote} aria-hidden="true">
            <label htmlFor="contato-gotcha">Não preencha este campo</label>
            <input
              id="contato-gotcha"
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              value={dados._gotcha}
              onChange={alterar}
            />
          </div>

          <button type="submit" className={`botao botao--laranja ${styles.enviar}`} disabled={status === 'enviando'}>
            {status === 'enviando' ? 'Enviando…' : 'Enviar mensagem'}
          </button>

          <div className={styles.status} role="status" aria-live="polite">
            {status === 'sucesso' && <p className={styles.sucesso}>Mensagem enviada! Logo a gente responde. 🍺</p>}
            {status === 'erro' && <p className={styles.falha}>{mensagemErro}</p>}
          </div>
        </form>

        <aside className={styles.lateral} aria-labelledby="contato-outros">
          <h3 id="contato-outros" className={styles.lateralTitulo}>
            Outros jeitos de chegar
          </h3>
          <ul className={styles.contatos}>
            <ItemContato rotulo="Instagram" item={contatos.instagram} />
            <ItemContato rotulo="E-mail" item={contatos.email} />
          </ul>
          <p className={styles.local}>
            <Lupulo className={styles.lupulo} />
            {contatos.local}
          </p>
        </aside>
      </div>
    </section>
  )
}
