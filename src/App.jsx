import { useState } from 'react'
import RSVPForm from './components/RSVPForm'
import SuccessPage from './components/SuccessPage'
import './App.css'

/* ── SVG: hanging blush rose ── */
function HangingFlower({ stemHeight = 28 }) {
  return (
    <svg width="28" height={stemHeight + 32} viewBox={`0 0 28 ${stemHeight + 32}`} xmlns="http://www.w3.org/2000/svg">
      <line x1="14" y1="0" x2="14" y2={stemHeight} stroke="#7a9a5a" strokeWidth="1.5"/>
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const px = 14 + Math.cos(rad) * 9
        const py = stemHeight + 14 + Math.sin(rad) * 9
        return <ellipse key={i} cx={px} cy={py} rx="4.5" ry="3" transform={`rotate(${angle}, ${px}, ${py})`} fill={i % 2 === 0 ? '#e8b4b8' : '#f5d5d8'} opacity="0.9"/>
      })}
      <circle cx="14" cy={stemHeight + 14} r="5" fill="#f0c8cb"/>
    </svg>
  )
}

/* ── SVG: gold lantern ── */
function Lantern({ height = 120 }) {
  return (
    <svg width="48" height={height} viewBox="0 0 48 120" xmlns="http://www.w3.org/2000/svg">
      <line x1="24" y1="0" x2="24" y2="12" stroke="#b8860b" strokeWidth="1.5"/>
      <circle cx="24" cy="8" r="2" fill="#b8860b"/>
      <path d="M14,18 Q24,12 34,18 L32,24 Q24,20 16,24 Z" fill="#c9a020"/>
      <path d="M16,24 Q10,50 12,80 Q24,88 36,80 Q38,50 32,24 Z" fill="#f5e6a0" opacity="0.85"/>
      {[0,1,2,3].map(i => (
        <path key={i} d={`M${16 + i*0.5},${30 + i*14} Q24,${26 + i*14} ${32 - i*0.5},${30 + i*14}`}
          fill="none" stroke="#b8860b" strokeWidth="0.8" opacity="0.6"/>
      ))}
      <ellipse cx="24" cy="55" rx="8" ry="14" fill="#fce88a" opacity="0.5"/>
      <path d="M12,80 Q24,88 36,80 L34,88 Q24,94 14,88 Z" fill="#c9a020"/>
      <line x1="24" y1="88" x2="24" y2="100" stroke="#b8860b" strokeWidth="1.5"/>
      <ellipse cx="24" cy="102" rx="4" ry="3" fill="#b8860b"/>
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={20 + i*2} y1="100" x2={19 + i*2.5} y2="112" stroke="#b8860b" strokeWidth="1" opacity="0.7"/>
      ))}
    </svg>
  )
}

/* ── SVG: rose bouquet with blush & cream tones ── */
function RoseBouquet({ flip = false }) {
  return (
    <svg width="110" height="200" viewBox="0 0 110 200" xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <path d="M55,200 Q50,160 40,130" fill="none" stroke="#7a9a5a" strokeWidth="2"/>
      <path d="M55,200 Q55,155 55,120" fill="none" stroke="#7a9a5a" strokeWidth="2"/>
      <path d="M55,200 Q60,160 70,130" fill="none" stroke="#7a9a5a" strokeWidth="2"/>
      <path d="M55,200 Q45,170 30,150" fill="none" stroke="#7a9a5a" strokeWidth="2"/>
      <path d="M55,200 Q65,170 80,150" fill="none" stroke="#7a9a5a" strokeWidth="2"/>
      <ellipse cx="45" cy="165" rx="10" ry="5" transform="rotate(-30,45,165)" fill="#6a8c4a" opacity="0.8"/>
      <ellipse cx="65" cy="170" rx="10" ry="5" transform="rotate(30,65,170)" fill="#6a8c4a" opacity="0.8"/>
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
              fill={i % 3 === 0 ? '#e8b4b8' : i % 3 === 1 ? '#f5d5d8' : '#fdf0e0'} opacity="0.92"/>
          })}
          <circle cx={cx} cy={cy} r="7" fill={i % 2 === 0 ? '#f0c8cb' : '#fce8c8'}/>
          <circle cx={cx} cy={cy} r="4" fill={i % 2 === 0 ? '#e8a0a8' : '#f0d8a0'}/>
        </g>
      ))}
      {[[35,155],[72,158]].map(([cx,cy],i) => (
        <g key={i}>
          {[0,72,144,216,288].map((a,j) => {
            const r=(a*Math.PI)/180
            return <ellipse key={j} cx={cx+Math.cos(r)*5} cy={cy+Math.sin(r)*5}
              rx="3" ry="2" transform={`rotate(${a},${cx+Math.cos(r)*5},${cy+Math.sin(r)*5})`}
              fill="#fff" opacity="0.9"/>
          })}
          <circle cx={cx} cy={cy} r="3" fill="#f8e8a0"/>
        </g>
      ))}
    </svg>
  )
}

/* ── SVG: Mughal arch frame (gold, pointed top) ── */
function MughalArch() {
  return (
    <svg className="arch-outline" viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      {/* Main arch — pointed Mughal style */}
      <path d="M30,300 L30,140 Q30,60 170,20 Q310,60 310,140 L310,300"
        fill="none" stroke="#b8860b" strokeWidth="2" opacity="0.5"/>
      {/* Inner arch */}
      <path d="M50,300 L50,150 Q50,75 170,38 Q290,75 290,150 L290,300"
        fill="none" stroke="#b8860b" strokeWidth="1" opacity="0.3"/>
      {/* Top ornament — finial */}
      <circle cx="170" cy="16" r="4" fill="#b8860b" opacity="0.6"/>
      <path d="M166,12 Q170,4 174,12" fill="#b8860b" opacity="0.5"/>
      {/* Pillar caps */}
      <rect x="24" y="290" width="14" height="3" fill="#b8860b" opacity="0.4" rx="1"/>
      <rect x="302" y="290" width="14" height="3" fill="#b8860b" opacity="0.4" rx="1"/>
      {/* Corner decorations */}
      <circle cx="45" cy="135" r="3" fill="#b8860b" opacity="0.3"/>
      <circle cx="295" cy="135" r="3" fill="#b8860b" opacity="0.3"/>
    </svg>
  )
}

/* ── SVG: bottom decorative border ── */
function BottomBorder() {
  return (
    <svg viewBox="0 0 500 60" xmlns="http://www.w3.org/2000/svg" className="bottom-border-svg">
      <path d="M0,30 Q125,0 250,30 Q375,60 500,30" fill="none" stroke="#b8860b" strokeWidth="1" opacity="0.3"/>
      <path d="M0,35 Q125,5 250,35 Q375,65 500,35" fill="none" stroke="#e8b4b8" strokeWidth="1" opacity="0.3"/>
      {/* Small rose accent left */}
      {[0,60,120,180,240,300].map((a,i) => {
        const r = (a*Math.PI)/180
        return <ellipse key={i} cx={125 + Math.cos(r)*6} cy={15 + Math.sin(r)*6} rx="3" ry="2"
          transform={`rotate(${a},${125 + Math.cos(r)*6},${15 + Math.sin(r)*6})`}
          fill="#e8b4b8" opacity="0.6"/>
      })}
      <circle cx="125" cy="15" r="4" fill="#f0c8cb" opacity="0.6"/>
      {/* Small rose accent right */}
      {[0,60,120,180,240,300].map((a,i) => {
        const r = (a*Math.PI)/180
        return <ellipse key={i} cx={375 + Math.cos(r)*6} cy={45 + Math.sin(r)*6} rx="3" ry="2"
          transform={`rotate(${a},${375 + Math.cos(r)*6},${45 + Math.sin(r)*6})`}
          fill="#f5d5d8" opacity="0.6"/>
      })}
      <circle cx="375" cy="45" r="4" fill="#fce8c8" opacity="0.6"/>
      {/* Center diamond */}
      <path d="M247,28 L250,24 L253,28 L250,32 Z" fill="#b8860b" opacity="0.5"/>
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
          <div className="bouquet-wrap"><RoseBouquet /></div>
          <div className="lantern-wrap lantern-lower"><Lantern height={100} /></div>
        </div>

        {/* Center */}
        <main className="center-content">
          <header className="invitation-header">
            <p className="family-names">We cordially invite you</p>
            <p className="invite-line">to the wedding reception of</p>

            <div className="arch-frame">
              <MughalArch />
              <div className="arch-text">
                <h1 className="bride-name">Simranpreet Kaur</h1>
                <p className="parents-line">(Daughter of Gurdas Singh Sekhon &amp; Harvinder Kaur Sekhon)</p>
                <p className="ampersand">&amp;</p>
                <h1 className="groom-name">Qail Mukhi</h1>
                <p className="parents-line">(Son of Fahim Mukhi &amp; Salima Mukhi)</p>
              </div>
            </div>

            <p className="invite-line">which will be conducted on</p>
            <p className="wedding-date">September 6, 2026 at 4pm</p>
            <p className="invite-line">at</p>
            <p className="venue-name">Hawthorn Estates</p>
            <p className="venue-address"><a href="https://maps.google.com/?q=76024+Rd+33+E+East+Selkirk+MB" target="_blank" rel="noopener noreferrer" className="venue-link">76024 Rd 33 E, East<br />Selkirk, MB</a></p>

            <div className="rsvp-divider">
              <span className="divider-line" />
              <span className="divider-diamond">◆</span>
              <span className="divider-text">KINDLY RSVP</span>
              <span className="divider-diamond">◆</span>
              <span className="divider-line" />
            </div>
            <p className="respond-by">Please respond by July 30, 2026</p>
          </header>

          {submitted
            ? <SuccessPage data={submittedData} />
            : <RSVPForm onSubmit={handleSubmit} />
          }

          <div className="bottom-border-wrap"><BottomBorder /></div>
        </main>

        {/* Right side */}
        <div className="side-col side-right">
          <div className="lantern-wrap"><Lantern /></div>
          <div className="bouquet-wrap"><RoseBouquet flip /></div>
          <div className="lantern-wrap lantern-lower"><Lantern height={100} /></div>
        </div>
      </div>

    </div>
  )
}
