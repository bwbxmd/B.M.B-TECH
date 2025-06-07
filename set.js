const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0JJT2xhOFYwaVlHYXNwbGRWM2hJRlBHTVlXUndDY2QwV1A1QTFtVVMwZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVHFRU2xSYXNZTjRkc0sxQ1ZnRGVvY3pKdVdybGMwUGREREJoeGFOTGRYTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RFdCMVdzYUpKbUF1a1A5ZHIzZ0xsUmVaWVYwQldvSmdGdGdLRmY3WkU0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzcXBIekhwRGtXWHppQ2Z1Z0k4cGRJQUVCS0E3MDBOZjZiN2N4cFNhYWxvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRLVXA0bUl4SDltYmVWanh2YU03TXJ4blJZeHIvN210aWY0bjVUcUJDM0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ing0VCtOZDZnVlpxeW1BQzROQTRqVWJvcUpIRnFpNS9MZjd4MzY3NU1Vd009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkMwS1dldGlXVzFFY0NjT2lVSXhkTWlYZkJDMm5iOHBKZzlIcENlK0NVaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidW9vTU53QW9CRFZoS1hQWUd1bkcrK3pnUFVNQzlMS2I3R2t3VjNKRXBFMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjE5VmFmVnFDMEJIT1dIT1pOM2ZXTTUwUlhyQVZzMWxlSUh5SVF0RFpOeVd2ejkxRjZOTllGV1hjenZOblU0Y1FjUjl0SHRicFRoNEIvSmdjMTlwWkJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA1LCJhZHZTZWNyZXRLZXkiOiJNM0tIYmNrYUk4UGlmMENUbW1nSTB0bmNtWFhhWXZiOVE0NFh2YU9NWTljPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzUwNTg1MDM1MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUI0NTYxMUZDREVGNTlEREVERSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5Mjg2NDQyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzM1MDU4NTAzNTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0EyOEEzMEJGMjQ0OEUwM0U1M0QifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTI4NjQ0N30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjMzNTA1ODUwMzUyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBQjU5MUU1NjIxNDkyMDQxQTUyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDkyODY0NTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzMzUwNTg1MDM1MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTQxMTM1QzZCQzg3NDZGNEQzRSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5Mjg2NDYzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzM1MDU4NTAzNTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0E5RDdBMzI4OTU4OEE2OTY4MDUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTI4NjQ2NH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiNFlCNU1WMTIiLCJtZSI6eyJpZCI6IjIzMzUwNTg1MDM1Mjo2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkZyZWRhIiwibGlkIjoiOTA4NDc4MzYxNDc3ODE6NkBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xpMDdja0hFSnY4ajhJR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im1wQkxNYVBBbzhQQjZvYTJyaGJySXNMNGlES0h3YlFCVmhwSkVzc1dCVnM9IiwiYWNjb3VudFNpZ25hdHVyZSI6InRmazRaS3pwM2RWdGlMa28wQVZveW1JellVaWZsT3A3MTJkVjBhWHdpNnVlUkRkN1o4ZFZ1S2tRcWpaZlBhSlMxRjZ0TVZoaDQ4VlAzR2pCaHZ5M2d3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJkWUsxeWFGd1lPelN1djVWdVZ3UUt5Y01pc256TFQxSEpaOTNIY05HOURvZzJCcG0xR3RPWHNwdHZ0WXY3dXZBYStDWmRQVWJyTnEzTjY5SGM0YXZCQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzUwNTg1MDM1Mjo2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpxUVN6R2p3S1BEd2VxR3RxNFc2eUxDK0lneWg4RzBBVllhU1JMTEZnVmIifX1dLCJwbGF0Zm9ybSI6InNtYmkiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0OTI4NjQ0MCwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFES0kifQ==',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
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

