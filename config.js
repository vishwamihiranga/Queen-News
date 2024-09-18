const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });


module.exports = {
  PREFIX: ".", //set Prefix
  OWNER: "94775200935",//Enter Owner Number
  USER_NAME: "****",//Enter Your UserName (contact Darkwinzo for get username and password +94775200935)
  PASSWORD: "********",//Enter Your Password
  GROUP_JID: ["*******"],//News Group Jid
};

