import { FORMSPREE_ID, FORMSPREE_URL } from '../data/links'

export const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const ERRO_SEM_CONFIGURACAO =
  'O formulário ainda não foi configurado (falta o VITE_FORMSPREE_ID). Fale com a gente pelo Instagram ou e-mail na seção Contato.'
export const ERRO_ENVIO =
  'Não foi possível enviar agora. Verifique sua conexão e tente de novo, ou fale com a gente pelo Instagram ou e-mail.'

// Envia os campos para o Formspree sem sair da página.
// Lança um Error com mensagem pronta para mostrar ao usuário.
export async function enviarFormspree(campos) {
  if (!FORMSPREE_ID) throw new Error(ERRO_SEM_CONFIGURACAO)
  let resposta
  try {
    resposta = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(campos),
    })
  } catch {
    throw new Error(ERRO_ENVIO)
  }
  if (!resposta.ok) throw new Error(ERRO_ENVIO)
}
