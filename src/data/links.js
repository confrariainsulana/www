// Links e contatos usados em todo o site. Edite aqui, sem mexer nos componentes.

// Formulário de associação (Google Forms). Use sempre a URL terminada em /viewform.
export const FORMULARIO_ASSOCIACAO =
  'https://docs.google.com/forms/d/18H5ogaQKTUy4VfPajuLgHzqWMqG7IapTzwh0zFsxY3E/viewform'

// Formulário de contato (Formspree). O ID vem da variável VITE_FORMSPREE_ID (veja .env.example).
export const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || ''
export const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID || 'SEU_ID'}`

// Redes e contato da confraria.
// `texto` é o que aparece no site; `url` é para onde o link leva.
export const contatos = {
  instagram: {
    texto: 'https://www.instagram.com/confrariainsulana/',
    url: 'https://www.instagram.com/confrariainsulana/',
  },
  email: { texto: 'confrariainsulana1@gmail.com', url: 'mailto:confrariainsulana1@gmail.com' },
  local: 'Ilha do Governador · Rio de Janeiro',
}

// Itens do menu (âncoras das seções).
export const navegacao = [
  { href: '#confraria', rotulo: 'A Confraria' },
  { href: '#beneficios', rotulo: 'Benefícios' },
  { href: '#associe-se', rotulo: 'Associe-se' },
  { href: '#lojinha', rotulo: 'Lojinha' },
  { href: '#contato', rotulo: 'Contato' },
]
