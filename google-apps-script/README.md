# Google Sheets Integration

## Setup (5 minutes)

1. Create a new Google Sheet
2. Go to **Extensions > Apps Script**
3. Delete the default code and paste the contents of `Code.gs`
4. Click **Save**, then **Deploy > New Deployment**
5. Set type to **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy** and copy the Web App URL
7. Paste the URL into `src/components/RSVPForm.jsx`:
   ```js
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID/exec'
   ```

That's it! Responses will appear in a sheet called "RSVPs" automatically.
