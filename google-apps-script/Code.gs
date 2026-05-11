// Google Apps Script - paste this into your Google Sheet's Script Editor
// Tools > Script Editor, then deploy as a Web App

const SHEET_NAME = 'RSVPs'
const SUBMIT_TOKEN = 'mQk9x#wR2!vLpZ7n' // must match the token in RSVPForm.jsx

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)

    // Reject requests with a missing or wrong token
    if (data.token !== SUBMIT_TOKEN) {
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

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
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
