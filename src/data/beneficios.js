// Cartões da seção "Por que se associar".
// `icone` aceita: 'panela' | 'turma' | 'desconto' | 'voto' (desenhos em src/components/Icones.jsx).

export const beneficios = [
  {
    id: 'evolua',
    icone: 'panela',
    titulo: 'Evolua no hobby',
    texto:
      'Nosso principal objetivo é difundir a cultura cervejeira. Seja para dar os primeiros passos na produção da sua própria cerveja ou para levar suas receitas a outro nível, aqui você encontra informação, ferramentas e gente disposta a ajudar.',
  },
  {
    id: 'aprenda',
    icone: 'turma',
    titulo: 'Aprenda com quem já faz',
    texto:
      'Na Confraria ninguém brassa sozinho. Desde o início, cultivamos a solidariedade, a troca de experiências e o espírito de comunidade. Tem dúvida sobre fermentação, água ou receita? Pergunta no grupo que alguém já passou por isso.',
  },
  {
    id: 'socio',
    icone: 'desconto',
    titulo: 'Benefícios de sócio',
    texto:
      'Sócios ativos têm desconto nos festivais e nos encontros bimestrais (para você e um acompanhante), além de desconto em camisas, bonés, chaveiros e outros produtos da confraria. E ainda tem compras coletivas de insumos, eventos e tours.',
  },
  {
    id: 'associacao',
    icone: 'voto',
    titulo: 'Uma associação de verdade',
    texto:
      'Somos uma associação civil sem fins lucrativos. Todos aqui são voluntários, e são os próprios associados que escolhem seus representantes. Sua voz conta.',
  },
]

// Planos de contribuição (seção "Faça parte da Confraria").
export const planos = [
  {
    id: 'mensal',
    nome: 'Contribuição mensal',
    valor: '35',
    centavos: '00',
    periodo: 'por mês',
    texto: 'Apoie as atividades da confraria e aproveite todos os benefícios.',
    destaque: false,
  },
  {
    id: 'anual',
    nome: 'Contribuição anual',
    valor: '399',
    centavos: '00',
    valorCheio: 'R$ 420,00',
    periodo: 'por ano',
    selo: '5% de desconto',
    texto: 'Pague o ano inteiro com 5% de desconto e garanta seus benefícios por mais tempo.',
    destaque: true,
  },
]
