import Header from './components/Header'
import Hero from './components/Hero'
import Confraria from './components/Confraria'
import Beneficios from './components/Beneficios'
import Associe from './components/Associe'
import Lojinha from './components/Lojinha'
import Contato from './components/Contato'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a href="#conteudo" className="pular-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Confraria />
        <Beneficios />
        <Associe />
        <Lojinha />
        <Contato />
      </main>
      <Footer />
    </>
  )
}
