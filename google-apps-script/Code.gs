// Google Apps Script - paste this into your Google Sheet's Script Editor
// Tools > Script Editor, then deploy as a Web App

const SHEET_NAME = 'RSVPs'

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)

    // Token is stored in Script Properties (File > Project properties > Script properties)
    // Key: SUBMIT_TOKEN, Value: your secret token
    const expectedToken = PropertiesService.getScriptProperties().getProperty('SUBMIT_TOKEN')
    if (!expectedToken || data.token !== expectedToken) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON)
    }

    const sheet = getOrCreateSheet()
    const status = data.attending === 'yes' ? 'Attending' : 'Declined'

    // One row per guest regardless of attending status
    data.guests.forEach((guest, i) => {
      sheet.appendRow([
        data.submittedAt,
        data.email,
        data.phone,
        status,
        i + 1,
        guest.name,
      ])
    })

    // Send confirmation email if an email address was provided
    if (data.email) {
      sendConfirmationEmail(data, status)
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function sendConfirmationEmail(data, status) {
  const guestNames = data.guests.map(g => g.name).join(', ')
  const isAttending = status === 'Attending'

  const subject = isAttending
    ? "We can't wait to see you! - RSVP Confirmation"
    : "Thank you for letting us know - RSVP Confirmation"

  const body = isAttending
    ? `Thank you for your RSVP!\n\n`
      + `We're so excited to celebrate with you on September 6, 2026 at 4pm.\n\n`
      + `Guests: ${guestNames}\n`
      + `Venue: Hawthorn Estates, 76024 Rd 33 E, East Selkirk, MB\n\n`
      + `See you there!\n`
      + `— Simranpreet & Qail`
    : `Thank you for letting us know.\n\n`
      + `We're sorry you won't be able to make it on September 6, 2026, `
      + `but we truly appreciate you taking the time to respond.\n\n`
      + `Guests: ${guestNames}\n\n`
      + `With love,\n`
      + `— Simranpreet & Qail`

  const htmlBody = isAttending
    ? `<div style="font-family: Georgia, serif; color: #3a2a1a; max-width: 500px; margin: 0 auto; padding: 24px;">`
      + `<h2 style="font-family: cursive; color: #b8860b; font-weight: normal;">Thank you for your RSVP!</h2>`
      + `<p>We're so excited to celebrate with you on <strong>September 6, 2026 at 4pm</strong>.</p>`
      + `<p><strong>Guests:</strong> ${guestNames}</p>`
      + `<p><strong>Venue:</strong> Hawthorn Estates<br>76024 Rd 33 E, East Selkirk, MB</p>`
      + `<p style="margin-top: 24px;">See you there!<br><em>— Simranpreet & Qail</em></p>`
      + `</div>`
    : `<div style="font-family: Georgia, serif; color: #3a2a1a; max-width: 500px; margin: 0 auto; padding: 24px;">`
      + `<h2 style="font-family: cursive; color: #b8860b; font-weight: normal;">Thank you for letting us know</h2>`
      + `<p>We're sorry you won't be able to make it on <strong>September 6, 2026</strong>, `
      + `but we truly appreciate you taking the time to respond.</p>`
      + `<p><strong>Guests:</strong> ${guestNames}</p>`
      + `<p style="margin-top: 24px;">With love,<br><em>— Simranpreet & Qail</em></p>`
      + `</div>`

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: body,
    htmlBody: htmlBody,
    name: 'Simranpreet & Qail',
  })
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow([
      'Submitted At',
      'Email',
      'Phone',
      'Attending?',
      'Guest #',
      'Guest Name',
    ])
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold')
  }

  return sheet
}
