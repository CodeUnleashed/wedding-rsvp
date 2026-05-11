import { useState } from 'react'
import RSVPForm from './components/RSVPForm'
import SuccessPage from './components/SuccessPage'
import './App.css'

/* ── SVG: single hanging flower for the top garland ── */
function HangingFlower({ stemHeight = 28 }) {
  return (
    <svg width="28" height={stemHeight + 32} viewBox={`0 0 28 ${stemHeight + 32}`} xmlns="http://www.w3.org/2000/svg">
      {/* stem */}
      <line x1="14" y1="0" x2="14" y2={stemHeight} stroke="#6a8c3a" strokeWidth="1.5"/>
      {/* petals */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const px = 14 + Math.cos(rad) * 9
        const py = stemHeight + 14 + Math.sin(rad) * 9
        return <ellipse key={i} cx={px} cy={py} rx="4.5" ry="3" transform={`rotate(${angle}, ${px}, ${py})`} fill="#c8763a" opacity="0.9"/>
      })}
      {/* center */}
      <circle cx="14" cy={stemHeight + 14} r="5" fill="#e8a030"/>
    </svg>
  )
}

/* ── SVG: tall ornate lantern ── */
function Lantern({ height = 120 }) {
  return (
    <svg width="48" height={height} viewBox="0 0 48 120" xmlns="http://www.w3.org/2000/svg">
      {/* chain */}
      <line x1="24" y1="0" x2="24" y2="12" stroke="#c8a050" strokeWidth="1.5"/>
      <circle cx="24" cy="8" r="2" fill="#c8a050"/>
      {/* top cap */}
      <path d="M14,18 Q24,12 34,18 L32,24 Q24,20 16,24 Z" fill="#d4a040"/>
      {/* body */}
      <path d="M16,24 Q10,50 12,80 Q24,88 36,80 Q38,50 32,24 Z" fill="#f0d080" opacity="0.85"/>
      {/* ribs */}
      {[0,1,2,3].map(i => (
        <path key={i} d={`M${16 + i*0.5},${30 + i*14} Q24,${26 + i*14} ${32 - i*0.5},${30 + i*14}`}
          fill="none" stroke="#c8a050" strokeWidth="0.8" opacity="0.6"/>
      ))}
      {/* glow */}
      <ellipse cx="24" cy="55" rx="8" ry="14" fill="#f8e080" opacity="0.5"/>
      {/* bottom cap */}
      <path d="M12,80 Q24,88 36,80 L34,88 Q24,94 14,88 Z" fill="#d4a040"/>
      {/* tassel */}
      <line x1="24" y1="88" x2="24" y2="100" stroke="#c8a050" strokeWidth="1.5"/>
      <ellipse cx="24" cy="102" rx="4" ry="3" fill="#c8a050"/>
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={20 + i*2} y1="100" x2={19 + i*2.5} y2="112" stroke="#c8a050" strokeWidth="1" opacity="0.7"/>
      ))}
    </svg>
  )
}

/* ── SVG: marigold bouquet ── */
function MarigoldBouquet({ flip = false }) {
  const scale = flip ? 'scale(-1,1)' : 'scale(1,1)'
  return (
    <svg width="110" height="200" viewBox="0 0 110 200" xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      {/* stems */}
      <path d="M55,200 Q50,160 40,130" fill="none" stroke="#5a7a2a" strokeWidth="2"/>
      <path d="M55,200 Q55,155 55,120" fill="none" stroke="#5a7a2a" strokeWidth="2"/>
      <path d="M55,200 Q60,160 70,130" fill="none" stroke="#5a7a2a" strokeWidth="2"/>
      <path d="M55,200 Q45,170 30,150" fill="none" stroke="#5a7a2a" strokeWidth="2"/>
      <path d="M55,200 Q65,170 80,150" fill="none" stroke="#5a7a2a" strokeWidth="2"/>
      {/* leaves */}
      <ellipse cx="45" cy="165" rx="10" ry="5" transform="rotate(-30,45,165)" fill="#6a8c2a" opacity="0.8"/>
      <ellipse cx="65" cy="170" rx="10" ry="5" transform="rotate(30,65,170)" fill="#6a8c2a" opacity="0.8"/>
      {/* marigold flowers — big orange */}
      {[
        [40,118],[55,108],[70,118],[28,142],[82,142]
      ].map(([cx,cy],i) => (
        <g key={i}>
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,j) => {
            const r = (a*Math.PI)/180
            const px = cx + Math.cos(r)*11
            const py = cy + Math.sin(r)*11
            return <ellipse key={j} cx={px} cy={py} rx="6" ry="4"
              transform={`rotate(${a},${px},${py})`}
              fill={i % 2 === 0 ? '#d4620a' : '#e07820'} opacity="0.92"/>
          })}
          <circle cx={cx} cy={cy} r="7" fill="#e8a030"/>
          <circle cx={cx} cy={cy} r="4" fill="#f0c040"/>
        </g>
      ))}
      {/* small white accent flowers */}
      {[[35,155],[72,158]].map(([cx,cy],i) => (
        <g key={i}>
          {[0,72,144,216,288].map((a,j) => {
            const r=(a*Math.PI)/180
            return <ellipse key={j} cx={cx+Math.cos(r)*5} cy={cy+Math.sin(r)*5}
              rx="3" ry="2" transform={`rotate(${a},${cx+Math.cos(r)*5},${cy+Math.sin(r)*5})`}
              fill="#fff" opacity="0.9"/>
          })}
          <circle cx={cx} cy={cy} r="3" fill="#f0d060"/>
        </g>
      ))}
    </svg>
  )
}

/* ── SVG: bottom gate arch ── */
function BottomGate() {
  return (
    <svg viewBox="0 0 500 130" xmlns="http://www.w3.org/2000/svg" className="gate-svg">
      {/* left pillar */}
      <rect x="60" y="40" width="18" height="90" fill="#e8c080" opacity="0.5"/>
      <rect x="56" y="36" width="26" height="8" fill="#d4a050" opacity="0.5"/>
      {/* right pillar */}
      <rect x="422" y="40" width="18" height="90" fill="#e8c080" opacity="0.5"/>
      <rect x="418" y="36" width="26" height="8" fill="#d4a050" opacity="0.5"/>
      {/* left inner arch */}
      <path d="M100,130 L100,70 Q100,30 140,30 Q180,30 180,70 L180,130"
        fill="none" stroke="#c8763a" strokeWidth="2" opacity="0.45"/>
      {/* right inner arch */}
      <path d="M320,130 L320,70 Q320,30 360,30 Q400,30 400,70 L400,130"
        fill="none" stroke="#c8763a" strokeWidth="2" opacity="0.45"/>
      {/* center arch */}
      <path d="M180,130 L180,60 Q180,10 250,10 Q320,10 320,60 L320,130"
        fill="none" stroke="#c8763a" strokeWidth="2.5" opacity="0.5"/>
      {/* top ornament */}
      <circle cx="250" cy="8" r="5" fill="#c8763a" opacity="0.5"/>
      <circle cx="238" cy="18" r="3" fill="#c8763a" opacity="0.4"/>
      <circle cx="262" cy="18" r="3" fill="#c8763a" opacity="0.4"/>
      {/* curtain drapes */}
      <path d="M180,130 Q200,80 220,130" fill="#e8c08030" stroke="#c8a05040" strokeWidth="1"/>
      <path d="M280,130 Q300,80 320,130" fill="#e8c08030" stroke="#c8a05040" strokeWidth="1"/>
    </svg>
  )
}

export default function App() {
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)

  const handleSubmit = (data) => {
    setSubmittedData(data)
    setSubmitted(true)
  }

  const stemHeights = [35, 20, 30, 18, 28, 22, 32, 16, 26, 20, 34, 18, 28, 24]

  return (
    <div className="app">

      {/* ── Top garland ── */}
      <div className="garland-bar">
        <div className="garland-rope" />
        <div className="garland-flowers">
          {stemHeights.map((h, i) => (
            <div key={i} className="hanging-flower-wrap">
              <HangingFlower stemHeight={h} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="page-wrapper">

        {/* Left side */}
        <div className="side-col side-left">
          <div className="lantern-wrap"><Lantern /></div>
          <div className="bouquet-wrap"><MarigoldBouquet /></div>
          <div className="lantern-wrap lantern-lower"><Lantern height={100} /></div>
        </div>

        {/* Center */}
        <main className="center-content">
          <header className="invitation-header">
            <p className="family-names">The Mukhi &amp; Sekhon Family</p>
            <p className="invite-line"><em>Invite you to</em></p>
            <p className="invite-line"><em>the Wedding Reception of</em></p>

            <div className="arch-frame">
              <svg className="arch-outline" viewBox="0 0 340 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M20,280 L20,120 Q20,20 170,20 Q320,20 320,120 L320,280"
                  fill="none" stroke="#c8a06080" strokeWidth="2"/>
              </svg>
              <div className="arch-text">
                <h1 className="bride-name">Qail Mukhi</h1>
                <p className="ampersand">&amp;</p>
                <h1 className="groom-name">Simranpreet Kaur</h1>
              </div>
            </div>

            <p className="wedding-date">September 6, 2026</p>

            <div className="rsvp-divider">
              <span className="divider-line" />
              <span className="divider-diamond">◆</span>
              <span className="divider-text">KINDLY RSVP</span>
              <span className="divider-diamond">◆</span>
              <span className="divider-line" />
            </div>
            <p className="respond-by">Please respond by May 30, 2026</p>
          </header>

          {submitted
            ? <SuccessPage data={submittedData} />
            : <RSVPForm onSubmit={handleSubmit} />
          }

          <div className="gate-wrap"><BottomGate /></div>
        </main>

        {/* Right side */}
        <div className="side-col side-right">
          <div className="lantern-wrap"><Lantern /></div>
          <div className="bouquet-wrap"><MarigoldBouquet flip /></div>
          <div className="lantern-wrap lantern-lower"><Lantern height={100} /></div>
        </div>
      </div>

    </div>
  )
}
