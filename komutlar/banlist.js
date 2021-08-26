const Discord = require("discord.js");

exports.run = (client, message, args) => {

  let guild = message.guild;

  guild

    .fetchBans()

    .then(modsal =>

      message.channel.send(

        `Sunucumuzda **${modsal.size}** Banlanmış Üye Bulunmaktadır.`

      )

    )

    .catch(console.error);

};

exports.conf = {

  enabled: true,

  runIn: ["bansay"],

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: "bansay",

  description: "Sunucudan banlanan kişilerin sayısını gösterir",

  usage: "bansay"

};

