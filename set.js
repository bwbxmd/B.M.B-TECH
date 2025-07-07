const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUpKQ00ycTdFL01PV0U3SklIa2s4OW82dE5lK1FmZUJkamJTM0p2Rk5WRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUNEbnBkR2F0a0o1N3VhVjF4ZDBQa0RVbkhmVDEvUTU4V2xVcVliWlJuOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPRW5pNGMrL0lpRVl0S3FYZG00cmdIYUVYckhoL21jKzlkTlR3aU54VEVJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqK0k4clJwU1ovaGcxa0xUZXM3YnkreEJ3QTU2SFJoWCs3eW1qYzArK2dBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFEUHI0UURCUFIrdkp1USt5dVB1N3Rwdk5LUTFVRCt2N0dSNkJJUFA5SEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVUaUJSQU1kSDFQaExoNkxKMWdhbGpUQmdENTk3ZmJ4R0ZYUHcrbkpQV0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0tFZzBkVDlCZGpBSEplYnorUTQxdEZVRStuanArSGIwSitPck0vaEsyZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVElrdmx6T1RidVFMZk1HWEk5WVprSmpyVUJjTXhUejFqM3ZzdktBbmxUOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllkZGFHa1hYUG8zTEhKck1DQlhlNjRiY1FCVGg3blRYZEhCVFRtSjgxN3BMY25VdHZ4RzBoMEUzeFRmWStGMndZeXZlWU5zRXd0Sng3L0tVaEFkUmhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY3LCJhZHZTZWNyZXRLZXkiOiIvQjZISmY4dTM1RE4rL09xUnBGM3Zickt0b1JJbWx1Qzd3TkVreXZpeTl3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTYyOTIyNjAwN0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyRDgwNkFBMzU1Rjk5MUYyRTZFQjc0QUM4MkExNjAzNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxOTA2MzAxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2MjkyMjYwMDdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRkNDRDRERjE0RTRBRDdGMzY3MEEzNTNDNTMxOEE5ODYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTkwNjMyMX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiTlBRWDRLVlEiLCJtZSI6eyJpZCI6IjI1NTYyOTIyNjAwNzo3MUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjEyNzQ3MDg3MTMwMjM0NDo3MUBsaWQiLCJuYW1lIjoiTVdMLiBNQUpFTlpJIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKaVM1ZFVCRU9YdnI4TUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJOWExINTVDOTVEbE1XVlNZaGVGUDMwZFhKTGZnVk9KL0tHWWFwMWJSRG5zPSIsImFjY291bnRTaWduYXR1cmUiOiJMY1hJZjQ3dFlkNEFqZWpTOWhOaW83N2E3OGhKU1U4b1JoQzBabUlYSHQzVWhucjl2NVFlV3Roc3E3QjZJWGJDSmk4WS9ZbnV5cERxbG1zbENKZnhEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRElvK0I3U2FjREg4amlGQ25yZTg2U3pQa1NSTjZmM0RqVnhpcytOT2NYTnhYS1pveThJdzJqVWdMRjRXak00ZjZ4NEpFb1ozZ1dlVEo5UXZudDZVaXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2MjkyMjYwMDc6NzFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVFZ5eCtlUXZlUTVURmxVbUlYaFQ5OUhWeVMzNEZUaWZ5aG1HcWRXMFE1NyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUxOTA2Mjk1LCJsYXN0UHJvcEhhc2giOiIzZ1BVSmsiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU4xTiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "MWL. MAJENZI",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255629226007",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'MWL. MAJENZI',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'no',               
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

