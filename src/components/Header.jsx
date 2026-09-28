import { useEffect, useState } from 'react'
import logo from '../assets/logo-pequeno.webp'
import { navegacao } from '../data/links'
import styles from './Header.module.css'

export default function Header() {
  const [aberto, setAberto] = useState(false)
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  // Fecha o menu com Esc e ao voltar para o layout de desktop.
  useEffect(() => {
    if (!aberto) return
    const aoTeclar = (e) => {
      if (e.key === 'Escape') {
        setAberto(false)
        document.getElementById('botao-menu')?.focus()
      }
    }
    const mq = window.matchMedia('(min-width: 60em)')
    const aoMudar = () => mq.matches && setAberto(false)
    document.addEventListener('keydown', aoTeclar)
    mq.addEventListener('change', aoMudar)
    return () => {
      document.removeEventListener('keydown', aoTeclar)
      mq.removeEventListener('change', aoMudar)
    }
  }, [aberto])

  const fechar = () => setAberto(false)

  return (
    <header className={`${styles.header} ${rolou || aberto ? styles.solido : ''}`}>
      <div className={`container ${styles.barra}`}>
        <a href="#topo" className={styles.marca} onClick={fechar}>
          <img src={logo} alt="" width="44" height="44" className={styles.logo} />
          <span className={styles.nomeMarca}>Confraria Insulana</span>
        </a>

        <button
          id="botao-menu"
          type="button"
          className={styles.hamburguer}
          aria-expanded={aberto}
          aria-controls="menu-principal"
          onClick={() => setAberto((v) => !v)}
        >
          <span className="sr-only">{aberto ? 'Fechar menu' : 'Abrir menu'}</span>
          <span className={styles.linhas} aria-hidden="true" />
        </button>

        <nav
          id="menu-principal"
          aria-label="Principal"
          className={`${styles.nav} ${aberto ? styles.navAberto : ''}`}
        >
          <ul className={styles.lista}>
            {navegacao
              .filter((item) => item.href !== '#associe-se')
              .map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.link} onClick={fechar}>
                    {item.rotulo}
                  </a>
                </li>
              ))}
            <li>
              <a href="#associe-se" className={`botao botao--laranja ${styles.cta}`} onClick={fechar}>
                Associe-se
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
