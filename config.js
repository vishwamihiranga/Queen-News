const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });


module.exports = {
  PREFIX: ",", //set Prefix
  OWNER: "94702481115",//Enter Owner Number
  USER_NAME: "vishwa",//Enter Your UserName (contact Darkwinzo for get username and password +94775200935)
  PASSWORD: "$newscore#vishwax",//Enter Your Password
  GROUP_JID: ["120363335688758632@g.us"],//News Group Jid
};

