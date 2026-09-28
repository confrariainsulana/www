// Desenhos em SVG usados pelo site (lúpulo, respingos, ícones dos benefícios, silhueta da Ilha).
// Todos são decorativos (aria-hidden), exceto quando recebem `titulo`.

export function Lupulo({ className, titulo }) {
  return (
    <svg
      className={className}
      viewBox="-16 -22 32 45"
      fill="currentColor"
      aria-hidden={titulo ? undefined : true}
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      focusable="false"
    >
      <path d="M0-20c6 4 9 10 9 16-4-1-7-3-9-6-2 3-5 5-9 6 0-6 3-12 9-16z" />
      <path d="M-10-2c3 2 6 5 7 9-4 1-8 0-11-2 0-3 2-5 4-7zM10-2c-3 2-6 5-7 9 4 1 8 0 11-2 0-3-2-5-4-7z" />
      <path d="M-11 8c3 1 6 4 7 8-4 1-7 0-10-2 1-2 2-4 3-6zM11 8c-3 1-6 4-7 8 4 1 7 0 10-2-1-2-2-4-3-6z" />
      <path d="M0 4c3 3 4 7 3 12-1 3-2 4-3 5-1-1-2-2-3-5-1-5 0-9 3-12z" />
    </svg>
  )
}

// Respingo de tinta (grunge). Use `variante` 1 ou 2 para formas diferentes.
export function Respingo({ className, variante = 1 }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="currentColor" aria-hidden="true" focusable="false">
      {variante === 1 ? (
        <>
          <path d="M96 38c14-6 22 14 34 10s20-18 30-6-6 26 4 36 30 4 30 20-22 12-26 24 14 30 0 38-22-10-34-4-10 32-26 30-8-26-20-30-28 14-38 2 10-24 2-34-30-2-30-18 24-12 26-26-16-24-4-34 22 8 32 0 8-32 24-38z" />
          <circle cx="30" cy="40" r="7" />
          <circle cx="178" cy="160" r="5" />
          <circle cx="20" cy="150" r="4" />
          <circle cx="160" cy="24" r="3" />
          <circle cx="104" cy="186" r="6" />
        </>
      ) : (
        <>
          <path d="M60 70c10-18 30-4 40-14s4-30 20-30 12 22 24 28 28-6 32 8-16 18-14 30 20 18 12 30-22 0-30 8 2 26-12 30-16-16-28-14-18 20-30 12 2-20-6-28-26 0-26-14 18-14 18-26-18-8-12-20z" />
          <circle cx="186" cy="60" r="6" />
          <circle cx="24" cy="100" r="5" />
          <circle cx="40" cy="176" r="8" />
          <circle cx="150" cy="186" r="3" />
        </>
      )}
    </svg>
  )
}

// Silhueta da Ilha: morros e a ponte ao pôr do sol (inspirada no flyer).
export function Silhueta({ className }) {
  const pilares = Array.from({ length: 23 }, (_, i) => 40 + i * 60)
  return (
    <svg
      className={className}
      viewBox="0 0 1440 220"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#2a1233"
        d="M0 150c80-30 140-60 220-58s110 40 170 36 90-70 170-72 110 60 180 62 60-30 130-26 120 50 190 48 120-40 200-40 110 30 180 30v100H0z"
      />
      <g fill="#140a18">
        <path d="M0 132h1440v8H0z" />
        <path d="M0 126c180-26 540-26 720 0s540 26 720 0v6c-180 26-540 26-720 0S180 106 0 132z" />
        {pilares.map((x) => (
          <rect key={x} x={x} y="132" width="8" height="60" />
        ))}
        <path fill="#1a0d1f" d="M0 188h1440v32H0z" />
      </g>
    </svg>
  )
}

// Ícones dos cartões de benefícios.
const tracos = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const icones = {
  // panela de brassagem com vapor
  panela: (
    <>
      <path {...tracos} d="M10 22h28v16a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4z" />
      <path {...tracos} d="M6 22h36M10 28H6M42 28h-4" />
      <path {...tracos} d="M17 16c-2-3 2-4 0-8M24 16c-2-3 2-4 0-8M31 16c-2-3 2-4 0-8" />
      <path {...tracos} d="M30 34h4" />
    </>
  ),
  // turma reunida
  turma: (
    <>
      <circle {...tracos} cx="24" cy="15" r="6" />
      <path {...tracos} d="M13 40c0-7 5-12 11-12s11 5 11 12" />
      <circle {...tracos} cx="10" cy="19" r="4.5" />
      <path {...tracos} d="M3 37c0-5 3-8 7-8 2 0 3 .5 4.5 1.5" />
      <circle {...tracos} cx="38" cy="19" r="4.5" />
      <path {...tracos} d="M45 37c0-5-3-8-7-8-2 0-3 .5-4.5 1.5" />
    </>
  ),
  // etiqueta de desconto
  desconto: (
    <>
      <path {...tracos} d="M6 24 24 6h16a2 2 0 0 1 2 2v16L24 42a2 2 0 0 1-3 0L6 27a2 2 0 0 1 0-3z" />
      <circle {...tracos} cx="34" cy="14" r="2.5" />
      <path {...tracos} d="m18 30 10-10M18.5 21.5h.01M27.5 29.5h.01" strokeWidth="3" />
    </>
  ),
  // urna de votação
  voto: (
    <>
      <path {...tracos} d="M8 26h32v14a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2z" />
      <path {...tracos} d="M16 26V8h16v18" />
      <path {...tracos} d="m19 17 3.5 3.5L29 13" />
      <path {...tracos} d="M8 32h32" />
    </>
  ),
}

export function IconeBeneficio({ nome, className }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {icones[nome]}
    </svg>
  )
}

export function SeparadorLupulo({ className }) {
  return (
    <div className={`separador ${className || ''}`} aria-hidden="true">
      <span />
      <Lupulo className="separador__lupulo" />
      <span />
    </div>
  )
}
