import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/global.css'
import Estatuto from './Estatuto.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Estatuto />
  </StrictMode>,
)
