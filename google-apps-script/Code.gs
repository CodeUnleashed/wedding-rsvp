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
