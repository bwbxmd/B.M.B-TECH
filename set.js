const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia01sZFMwUjdKaU9zY2JOa0J3TnJIYkplTDUzTzF2Y0doTmQ5OFZNcExtOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZjNCWDEzUE5mUXhCbDhmRFlJcWZyM2ljTFpFdHNZQk84b3o4S3dMdVEzRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPS0tqd202eUU2VjhESkl4UFE4MnUreENGNlEycG85M3RYZXBLRTZCWUhZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxWUxaSlhxaWliWjhIZTFMWkY1R0VKcWFKRUx1R1N3eTJ3T0g2WW9yYlJjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRCK0Y2VkxTNUhqdHp4SXVsV2FMNUhLeHo5UWlOYTVYcGpNVm1ZZlIrRnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBRUGVMSzNaK040SDhPcU1jb3gyVnFyeUZtZzByRlQzYzcwbmpsRlB5MDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUtJakpxakQ4SUNrMWQrOE1LNXFKZTF3NWIyL3hRY1diSy8zUG4wWVVtVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ28zNGpFS0NHU2pVUzVxb3lBZWIvaUdha2pFcTVzbFJBUDc2UGRNTTIyWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlYvOGxsc3NFNDdMN2RLMk9Kc3A0bGxoT3pEMVQrUy9XcWN0aXFQVjJQamZEYW9iYzE5cUNZL1dBTjVEdjVHcWpIaVhPcmM1NnFQMUJvR3NXOTVVRERRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDAsImFkdlNlY3JldEtleSI6IlNSTkxCMXdqbUc1azJCWEJTK0dwbUFCZHlUbEJlcTRyZGhwdkt4WUJPNzQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NzQxNzUyMDIwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjM4MEMwQjI2QzdEOEFENDVEMDA1Q0NBNEE1ODZEOUQ4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDgxMDAzNjB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NTc0MTc1MjAyMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5OTREQzJGQTQxRUI2OUQ2NDVBQkM0MTY5NkU0MUJCMiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4MTAwMzYzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI3WFhRWENORSIsIm1lIjp7ImlkIjoiMjU1NzQxNzUyMDIwOjM2QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTMyOTc3MTAzMjA4NDU2OjM2QGxpZCIsIm5hbWUiOiLwn5GL8J+Ri/CfkYsifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xDNG5hSUVFUFBKeDhFR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IllQT25WcCtXWGxpZHN4SFhrbFoxRHhhSk5FcmQrR3NFZGxqUEpFUHloRXc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IksxSDVWMHNETXJCK1BrYkNGOWhoMk1ycjJHckM0bTY1RTdOQ1NnQmQ3bnpuVGxnYlloV2NzalhGYUVtWGdxUk9RWlBRelVpcWhXN20wUHJxKzQxNERRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJUVTVWMmtsMFZINWRHOVc1Y3JXZmovWG5SMGFGSGw4YUtac3pZNlVZOVA2T3lqOXBYaFc2Qmd6cDVzaDdWclhWNkNOUDVCRXc0dEZTaTdIOEVDT3REUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTc0MTc1MjAyMDozNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXRHpwMWFmbGw1WW5iTVIxNUpXZFE4V2lUUkszZmhyQkhaWXp5UkQ4b1JNIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDgxMDAzNTMsImxhc3RQcm9wSGFzaCI6IjNnUFVKayIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQWpkIn0=',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ",              
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
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
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

