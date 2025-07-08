const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUV0VzhNVkJkVHpNYnA3NzBoYm9OaU1KbzFRV3lHOVF2eFY0QkhrSUptWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZWh4ejhEZ2ltR1pHS0hnZ05BTUNnQ3o3N2Y5UEhLbkdQWmpIS2VEZzZoND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBSnJ4Y2dSNkxiS2dFb09kWURnMTJESllDTFJjU1o2VkpCc29tcVozdFhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCRWI1TFdHYm92M0F1eW5TRFdDRE9oSE9oK0pRUk5xQ0hvNXBIYkNhUHpzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNEdTRnSE9lcXpybi9SeUpDb2VDeTNkUW93TVRrWSsxSFg4a2lMSFRxbkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitQUEVrS3l1SmdIbTR2MEhWTHVvNkphbE5HalgrZ29MNkVpVjZTM1lsQjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkkzUi9qWWlPMUF3K3Q1VVB3WVowQU5ZRGZBVzF6d3hNZzJTNVJxRDVYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOFZiSWljdzUxdDB3WXJkQTlhdm93TUdndkE4NU9qbzdKMXVpVDhXV2pDWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9TQkYzTHl6U2ZSamJ3bktxbFA2S3pFRnpIbFFMWXlva1N6N3JNUW5YbUR0Qy9sQ0JmbGZZOHBTSG9kZWZsMEN1OExpTFp1WllLU3B3d1RwVzM1WGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzIsImFkdlNlY3JldEtleSI6IkRpaG85VzR6aUhVNG1QanBLMlZOcnVqb3pXa2NBajhGd2xNM0FCbWR1UUk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NjI5MjI2MDA3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjVCRUMwOUJFM0Q1MzE2REJDOTY1MzJBNzU2MzY1OTdFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTE5NTY3Mjh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NTYyOTIyNjAwN0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyQjcyQzIwOTMxQjhENTBBNEIwMEU4Mzk5Nzk1QjNBNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxOTU2NzUzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJQRzROS0dHQiIsIm1lIjp7ImlkIjoiMjU1NjI5MjI2MDA3Ojc0QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTI3NDcwODcxMzAyMzQ0Ojc0QGxpZCIsIm5hbWUiOiJNV0wuIE1BSkVOWkkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0p1UzVkVUJFT2I1c3NNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik5YTEg1NUM5NURsTVdWU1loZUZQMzBkWEpMZmdWT0ovS0dZYXAxYlJEbnM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IllSN3RRcVlKZnc1OU95TktESXFiUnlNZkNQKzB4NEhDajlIODZNUEJ0NzZhUHpmeU03VElDTVo1S3hkUkFNR0JEVVhUTGFhVnhpYUR4OENOeSs2SkFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJERitFcjJzRGNEbElyUm5kVmtRNjNQL1c4VEl1MWJxZjNXeXV2K201RzFDR0RHZzViODNnSDdBV1hwRE9YVnA1WnJVd3JDWG9UdkJJZ3p0Si9rbDRoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTYyOTIyNjAwNzo3NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUVnl4K2VRdmVRNVRGbFVtSVhoVDk5SFZ5UzM0RlRpZnlobUdxZFcwUTU3In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTE5NTY3MjQsImxhc3RQcm9wSGFzaCI6IjNnUFVKayIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTjFUIn0=',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "MAJENZI",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255629226007",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
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

