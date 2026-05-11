import { useState } from 'react'
import './RSVPForm.css'

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL
const SUBMIT_TOKEN = import.meta.env.VITE_SUBMIT_TOKEN

const emptyGuest = () => ({ firstName: '', lastName: '' })

export default function RSVPForm({ onSubmit }) {
  const [attending, setAttending] = useState(null)
  const [guests, setGuests] = useState([emptyGuest()])
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const allGuestsFilled = guests.every(g => g.firstName.trim() && g.lastName.trim())

  const addGuest = () => {
    if (guests.length < 10 && allGuestsFilled) setGuests([...guests, emptyGuest()])
  }

  const updateGuest = (index, field, value) => {
    setGuests(guests.map((g, i) => i === index ? { ...g, [field]: value } : g))
  }

  const removeGuest = (index) => {
    setGuests(guests.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Honeypot — real users never fill this field
    if (honeypot) return

    if (attending === null) {
      setError("Please let us know if you'll be attending.")
      return
    }

    const hasEmpty = guests.some(g => !g.firstName.trim() || !g.lastName.trim())
    if (hasEmpty) {
      setError('Please enter a first and last name for each guest.')
      return
    }


    if (!phone.trim() && !email.trim()) {
      setError('Please provide at least a phone number or email address.')
      return
    }

    const payload = {
      token: SUBMIT_TOKEN,
      attending,
      guests: guests.map(g => ({
        name: `${g.firstName.trim()} ${g.lastName.trim()}`.trim(),
      })),
      phone,
      email,
      submittedAt: new Date().toISOString(),
    }

    setLoading(true)
    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(payload),
        })
      }
      onSubmit(payload)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rsvp-card">
      <form onSubmit={handleSubmit} noValidate>

        {/* ── Attendance ── */}
        <section className="card-section">
          <h2 className="section-heading">WILL YOU BE ATTENDING?</h2>
          <p className="section-sub">Please let us know if you'll be able to join us<br />for this special celebration.</p>
          <div className="attend-btns">
            <button
              type="button"
              className={`attend-btn yes-btn ${attending === 'yes' ? 'active' : ''}`}
              onClick={() => setAttending('yes')}
            >
              <span className="btn-icon">✓</span> YES, I'LL BE THERE!
            </button>
            <button
              type="button"
              className={`attend-btn no-btn ${attending === 'no' ? 'active' : ''}`}
              onClick={() => { setAttending('no') }}
            >
              <span className="btn-icon">✕</span> SORRY, CAN'T MAKE IT
            </button>
          </div>
        </section>

        {/* ── Guest details ── */}
        {attending !== null && (
          <section className="card-section">
            <h2 className="section-heading">PLEASE SHARE YOUR DETAILS</h2>
            <p className="section-sub">{attending === 'yes' ? 'So we can save you a seat!' : 'So we know who won\'t be joining us.'}</p>

            <label className="field-label">{attending === 'yes' ? 'Guests Attending' : 'Guests'}</label>
            {guests.map((guest, i) => (
              <div key={i} className="guest-card">
                <div className="guest-row">
                  <input
                    type="text"
                    className="guest-input"
                    placeholder="First Name"
                    value={guest.firstName}
                    onChange={(e) => updateGuest(i, 'firstName', e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="guest-input"
                    placeholder="Last Name"
                    value={guest.lastName}
                    onChange={(e) => updateGuest(i, 'lastName', e.target.value)}
                    required
                  />
                  {guests.length > 1 && (
                    <button
                      type="button"
                      className="remove-guest"
                      onClick={() => removeGuest(i)}
                      aria-label="Remove guest"
                    >✕</button>
                  )}
                </div>
              </div>
            ))}

            {guests.length < 10 && (
              <button type="button" className="add-guest-btn" onClick={addGuest} disabled={!allGuestsFilled}>
                + ADD ANOTHER GUEST
              </button>
            )}
          </section>
        )}

        {/* ── Dots divider ── */}
        <div className="dots-divider">• • •</div>

        {/* ── Contact info ── */}
        <section className="card-section">
          <h2 className="section-heading">CONTACT INFORMATION</h2>

          <div className="field-group">
            <label className="field-label" htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              className="contact-input"
              placeholder="(204) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="contact-input"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </section>

        {error && <p className="error-msg">{error}</p>}

        {/* Honeypot — hidden from real users, bots will fill it */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="honeypot-field"
        />

        <button type="submit" className="submit-btn" disabled={loading || (attending !== null && !allGuestsFilled)}>
          {loading ? 'SENDING...' : 'SUBMIT RSVP'}
        </button>
      </form>
    </div>
  )
}
