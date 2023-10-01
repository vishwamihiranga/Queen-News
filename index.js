const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  getContentType,
  jidNormalizedUser,
  Browsers,
  jidDecode
} = require('@whiskeysockets/baileys')

const fs = require('fs')
const pino = require('pino')
const qrcode = require('qrcode-terminal')
const { Boom } = require('@hapi/boom')
const util = require('util')

const {
  Queen_Connect,
  Queen_Msg,
  
  Hiru_newsModule,
  Derana_newsModule,
  Esana_newsModule,
  Nasa_newsModule,
  Tech_newsModule,
  En_Tech_newsModule,
  Notice_newsModule,
  
  post_EsanaPosted,
  post_HiruPosted,
  post_DeranaPosted,
  post_TechPosted,
  post_EnTechPosted,
  post_NasaPosted,
  post_NoticePosted,
  
  get_EsanaPosted,
  get_HiruPosted,
  get_DeranaPosted,
  get_TechPosted,
  get_EnTechPosted,
  get_NasaPosted,
  get_NoticePosted
} = require('queen-news')

const {
  OWNER,
  PREFIX,
  USER_NAME,
  PASSWORD,
  GROUP_JID,
  NASA_GROUP_JID,
  TECH_GROUP_JID
} = require("./config")

async function QueenWa() {
  const { state, saveCreds } = await useMultiFileAuthState(
    __dirname + "/session"
  );

  const conn = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: pino({ level: "silent" }),
    browser: Browsers.macOS("Desktop"),
    downloadHistory: false,
    syncFullHistory: false,
  });


  conn.ev.on('creds.update', saveCreds);

  conn.ev.on("connection.update", async (update) => { Queen_Connect(conn, QueenWa, update, jidNormalizedUser, Boom, DisconnectReason, USER_NAME, PASSWORD); });
/*
  Hiru_newsModule(conn, post_HiruPosted, get_HiruPosted, GROUP_JID);
*/
  Derana_newsModule( conn,post_DeranaPosted, get_DeranaPosted, GROUP_JID);
  
  Esana_newsModule( conn, post_EsanaPosted, get_EsanaPosted, GROUP_JID);
  
  Nasa_newsModule( conn, post_NasaPosted, get_NasaPosted, NASA_GROUP_JID);   
  
  Tech_newsModule( conn, post_TechPosted, get_TechPosted, TECH_GROUP_JID);
     
  En_Tech_newsModule( conn, post_EnTechPosted, get_EnTechPosted, TECH_GROUP_JID);
  //-----------//
  Notice_newsModule( conn, post_NoticePosted, get_NoticePosted, GROUP_JID);
  //-----------//
  
  conn.ev.on("messages.upsert", async (mek) => { Queen_Msg(conn, mek, PREFIX, OWNER, getContentType); });

}

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => console.log(`Queen-News Server listening on port http://localhost:8000`));
setTimeout(() => {
  QueenWa()
}, 7000);
