const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`Komutlar Yüklendi.`);
  console.log(`(${client.user.username}) Bot Hazır`);
  client.user.setStatus("idle");
  client.user.setPresence({ activity: { name: "Arawn 🖤  H E Λ V E И" }, status: "ondnline" });
  client.channels.cache.get((client.config.seskanal)).join() // ses kanalı İD
    console.log(`Aktif`);

};
