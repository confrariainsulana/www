import { useEffect, useRef, useState } from 'react'
import { EMAIL_VALIDO, enviarFormspree } from '../utils/formspree'
import campos from './Contato.module.css'
import styles from './AviseMe.module.css'

const vazio = { produto: '', quantidade: '1', telefone: '', email: '', _gotcha: '' }

function validar(dados) {
  const erros = {}
  if (!dados.produto) erros.produto = 'Escolha o produto.'
  const qtd = Number(dados.quantidade)
  if (!Number.isInteger(qtd) || qtd < 1 || qtd > 99) erros.quantidade = 'Informe uma quantidade de 1 a 99.'
  const digitos = dados.telefone.replace(/\D/g, '')
  if (!digitos) erros.telefone = 'Informe um telefone para contato.'
  else if (digitos.length < 10 || digitos.length > 13) erros.telefone = 'Confira o telefone com DDD, por exemplo: (21) 99999-9999.'
  if (!dados.email.trim()) erros.email = 'Informe um e-mail para contato.'
  else if (!EMAIL_VALIDO.test(dados.email.trim())) erros.email = 'Esse e-mail parece incompleto. Confira, por exemplo: nome@email.com.'
  return erros
}

function Erro({ nome, erros }) {
  if (!erros[nome]) return null
  return (
    <p id={`avise-erro-${nome}`} className={campos.erroCampo}>
      {erros[nome]}
    </p>
  )
}

// Janela para o visitante pedir aviso quando um produto da lojinha chegar.
// Montada só enquanto está aberta; `produtoId` é o produto que vem selecionado.
export default function AviseMe({ produtos, produtoId, aoFechar }) {
  const dialogRef = useRef(null)
  const formRef = useRef(null)
  const [dados, setDados] = useState({ ...vazio, produto: produtoId })
  const [erros, setErros] = useState({})
  const [status, setStatus] = useState('ocioso') // ocioso | enviando | sucesso | erro
  const [mensagemErro, setMensagemErro] = useState('')

  // Abre como modal ao montar e devolve o foco ao botão que abriu ao desmontar.
  useEffect(() => {
    const origem = document.activeElement
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
    // Ao desmontar, o <dialog> sai do DOM junto; não chamamos close() para não disparar onClose de novo.
    return () => origem?.focus?.()
  }, [])

  const nomeDoProduto = (id) => produtos.find((p) => p.id === id)?.nome || ''

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
    if (dados._gotcha) {
      setStatus('sucesso')
      return
    }

    const nome = nomeDoProduto(dados.produto)
    setStatus('enviando')
    try {
      await enviarFormspree({
        _subject: `[Lojinha] Avise-me: ${nome} (${dados.quantidade} un.)`,
        assunto: 'Lojinha – Avise-me',
        produto: nome,
        quantidade: Number(dados.quantidade),
        telefone: dados.telefone.trim(),
        email: dados.email.trim(),
        _replyto: dados.email.trim(),
      })
      setStatus('sucesso')
    } catch (erro) {
      setStatus('erro')
      setMensagemErro(erro.message)
    }
  }

  const campo = (nome) => ({
    id: `avise-${nome}`,
    name: nome,
    value: dados[nome],
    onChange: alterar,
    'aria-invalid': erros[nome] ? true : undefined,
    'aria-describedby': erros[nome] ? `avise-erro-${nome}` : undefined,
    className: campos.entrada,
  })

  return (
    <dialog
      ref={dialogRef}
      className={styles.janela}
      aria-labelledby="avise-titulo"
      onClose={aoFechar}
      // Clique fora do cartão (no fundo escurecido) fecha a janela.
      onClick={(e) => e.target === dialogRef.current && aoFechar()}
    >
      <div className={styles.cartao}>
        <button type="button" className={styles.fechar} onClick={aoFechar}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Fechar</span>
        </button>

        {status === 'sucesso' ? (
          <div className={styles.sucesso} role="status">
            <h2 id="avise-titulo" className={`gotica ${styles.titulo}`}>
              Anotado!
            </h2>
            <p>
              Assim que <strong>{nomeDoProduto(dados.produto)}</strong> sair do fermentador, a gente avisa você. 🍺
            </p>
            <button type="button" className="botao botao--laranja" onClick={aoFechar} autoFocus>
              Fechar
            </button>
          </div>
        ) : (
          <>
            <h2 id="avise-titulo" className={`gotica ${styles.titulo}`}>
              Avise-me quando chegar
            </h2>
            <p className={styles.intro}>
              Deixe seu contato e a quantidade que você quer. Quando o produto estiver disponível, a gente fala com
              você.
            </p>

            <form ref={formRef} className={styles.form} onSubmit={enviar} noValidate>
              <div className={campos.campo}>
                <label htmlFor="avise-produto">Produto</label>
                <select {...campo('produto')}>
                  {produtos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                </select>
                <Erro nome="produto" erros={erros} />
              </div>

              <div className={campos.campo}>
                <label htmlFor="avise-quantidade">Quantidade</label>
                <input type="number" inputMode="numeric" min="1" max="99" step="1" {...campo('quantidade')} />
                <Erro nome="quantidade" erros={erros} />
              </div>

              <div className={campos.campo}>
                <label htmlFor="avise-telefone">Telefone / WhatsApp</label>
                <input type="tel" autoComplete="tel" placeholder="(21) 99999-9999" {...campo('telefone')} />
                <Erro nome="telefone" erros={erros} />
              </div>

              <div className={campos.campo}>
                <label htmlFor="avise-email">E-mail</label>
                <input type="email" autoComplete="email" inputMode="email" {...campo('email')} />
                <Erro nome="email" erros={erros} />
              </div>

              <div className={campos.pote} aria-hidden="true">
                <label htmlFor="avise-gotcha">Não preencha este campo</label>
                <input
                  id="avise-gotcha"
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={dados._gotcha}
                  onChange={alterar}
                />
              </div>

              <button type="submit" className={`botao botao--laranja ${styles.enviar}`} disabled={status === 'enviando'}>
                {status === 'enviando' ? 'Enviando…' : 'Quero ser avisado'}
              </button>

              <div role="status" aria-live="polite">
                {status === 'erro' && <p className={campos.falha}>{mensagemErro}</p>}
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  )
}
