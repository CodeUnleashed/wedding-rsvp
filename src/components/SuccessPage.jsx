import './SuccessPage.css'

export default function SuccessPage({ data }) {
  const isAttending = data.attending === 'yes'
  const guestCount = data.guests?.length || 0

  return (
    <div className="success-card">
      <div className="success-icon">{isAttending ? '🌼' : '✉️'}</div>
      <h2 className="success-heading">
        {isAttending ? "We'll see you there!" : "We'll miss you!"}
      </h2>
      {isAttending ? (
        <p className="success-body">
          Your RSVP has been received. We're so excited to celebrate with
          {guestCount > 1 ? ` your party of ${guestCount}` : ' you'}!
        </p>
      ) : (
        <p className="success-body">
          Thank you for letting us know. We're sorry you can't make it, but we appreciate you responding.
        </p>
      )}
      {data.email && (
        <p className="success-note">A confirmation will be sent to <strong>{data.email}</strong>.</p>
      )}
    </div>
  )
}
