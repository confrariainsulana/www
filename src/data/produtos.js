// TODO: trocar imagens e links pelos anúncios reais.
//  - Imagens: coloque a foto em src/assets/produtos/ (jpg, png, webp ou svg, de preferência quadrada, ~800×800),
//    importe no topo deste arquivo (ex.: import camisaNova from '../assets/produtos/camisa-nova.jpg')
//    e use o nome importado no campo `imagem`.
//  - Links: coloque em `urlMercadoLivre` a URL do anúncio no Mercado Livre.
//    Enquanto estiver vazio (''), o produto aparece como "Em breve" com o botão "Avise-me".
//  - Categorias válidas: 'camisas' | 'bones' | 'copos' | 'tap-handles'.
//  - Opcional: `alt` descreve a foto para leitores de tela (ex.: alt: 'Camisa preta com o logo laranja no peito').
//  - Para remover um produto, apague o bloco { ... } correspondente.

import camisaClassicaPreta from '../assets/produtos/camisa-classica-preta.svg'
import camisaLupuloRoxa from '../assets/produtos/camisa-lupulo-roxa.svg'
import boneTruckerPreto from '../assets/produtos/bone-trucker-preto.svg'
import boneLaranja from '../assets/produtos/bone-laranja.svg'
import copoTulipa from '../assets/produtos/copo-tulipa.svg'
import copoPint from '../assets/produtos/copo-pint.svg'
import tapHandleMadeira from '../assets/produtos/tap-handle-madeira.svg'
import tapHandleRoxo from '../assets/produtos/tap-handle-roxo.svg'

export const categorias = [
  { id: 'todos', rotulo: 'Todos' },
  { id: 'camisas', rotulo: 'Camisas' },
  { id: 'bones', rotulo: 'Bonés' },
  { id: 'copos', rotulo: 'Copos' },
  { id: 'tap-handles', rotulo: 'Tap handles' },
]

export const produtos = [
  {
    id: 'camisa-classica-preta',
    nome: 'Camisa Clássica Insulana – Preta',
    categoria: 'camisas',
    imagem: camisaClassicaPreta,
    urlMercadoLivre: '',
  },
  {
    id: 'camisa-lupulo-roxa',
    nome: 'Camisa Lúpulo – Roxa',
    categoria: 'camisas',
    imagem: camisaLupuloRoxa,
    urlMercadoLivre: '',
  },
  {
    id: 'bone-trucker-preto',
    nome: 'Boné Trucker – Preto',
    categoria: 'bones',
    imagem: boneTruckerPreto,
    urlMercadoLivre: '',
  },
  {
    id: 'bone-laranja',
    nome: 'Boné Insulana – Laranja',
    categoria: 'bones',
    imagem: boneLaranja,
    urlMercadoLivre: '',
  },
  {
    id: 'copo-tulipa',
    nome: 'Taça Tulipa Insulana',
    categoria: 'copos',
    imagem: copoTulipa,
    urlMercadoLivre: '',
  },
  {
    id: 'copo-pint',
    nome: 'Copo Pint Insulana',
    categoria: 'copos',
    imagem: copoPint,
    urlMercadoLivre: '',
  },
  {
    id: 'tap-handle-madeira',
    nome: 'Tap Handle – Madeira',
    categoria: 'tap-handles',
    imagem: tapHandleMadeira,
    urlMercadoLivre: '',
  },
  {
    id: 'tap-handle-roxo',
    nome: 'Tap Handle – Roxo',
    categoria: 'tap-handles',
    imagem: tapHandleRoxo,
    urlMercadoLivre: '',
  },
]
