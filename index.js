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
  Esana_newsModule,
  Nasa_newsModule,
  Tech_newsModule,
  En_Tech_newsModule,
  post_EsanaPosted,
  post_HiruPosted,
  post_TechPosted,
  post_EnTechPosted,
  post_NasaPosted,
  get_EsanaPosted,
  get_HiruPosted,
  get_TechPosted,
  get_EnTechPosted,
  get_NasaPosted 
} = require('queen-news')

const{
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
   
  conn.ev.on("connection.update", async (update) => { Queen_Connect(conn, QueenWa, update, jidNormalizedUser, Boom, DisconnectReason, USER_NAME, PASSWORD);});

Hiru_newsModule( conn, post_HiruPosted, get_HiruPosted, GROUP_JID);

Esana_newsModule( conn, post_EsanaPosted, get_EsanaPosted, GROUP_JID);
/*
Nasa_newsModule( conn, post_NasaPosted, get_NasaPosted, NASA_GROUP_JID);   
*/
Tech_newsModule( conn, post_TechPosted, get_TechPosted, TECH_GROUP_JID);
   
En_Tech_newsModule( conn, post_EnTechPosted, get_EnTechPosted, TECH_GROUP_JID);
   
  conn.ev.on("messages.upsert", async (mek) => { Queen_Msg(conn, mek, PREFIX, OWNER, getContentType );});

}

QueenWa()
