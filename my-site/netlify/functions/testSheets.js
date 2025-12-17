const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');

exports.handler = async () => {
  try {
    const auth = new GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.DB_SPREADSHEET_ID;

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'UserMaster!A1:D5',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        data: res.data.values,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: err.message,
      }),
    };
  }
};
