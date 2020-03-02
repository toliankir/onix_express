const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = './scripts/token.json';

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client) {
    return new Promise((resolve) => {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', async (code) => {
            rl.close();
            const { tokens } = await oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokens);
            // Store the token to disk for later program executions
            fs.promises.writeFile(TOKEN_PATH, JSON.stringify(tokens));
            console.log('Token stored to', TOKEN_PATH);
            resolve(oAuth2Client);
        });
    });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback, ...callbackArgs) {
    /* eslint-disable */
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    /* eslint-enable */
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    try {
        const token = await fs.promises.readFile(TOKEN_PATH);
        oAuth2Client.setCredentials(JSON.parse(token));
        return callback(oAuth2Client, callbackArgs);
    } catch (error) {
        return callback(await getAccessToken(oAuth2Client), callbackArgs);
    }
}

async function uploadFile(auth, args) {
    const drive = google.drive({ version: 'v3', auth });
    const fileMetadata = {
        name: args[1],
    };
    const media = {
        mimeType: 'image/png',
        body: fs.createReadStream(args[0]),
    };
    const file = await drive.files.create({
        resource: fileMetadata,
        media,
        fields: 'id',
    });
    const webViewLink = await drive.files.get({
        fileId: file.data.id,
        fields: 'webViewLink',
    });
    return webViewLink.data.webViewLink;
}


async function upload(srcFile, storeFilename) {
    const credentialsFile = './scripts/credentials.json';
    try {
        const content = await fs.promises.readFile(credentialsFile);
        return authorize(JSON.parse(content), uploadFile, srcFile, storeFilename);
    } catch (error) {
        throw new Error(`Credentials file dosen't exist: ${credentialsFile}`);
    }
}

module.exports = {
    upload,
};
