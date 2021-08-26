const Discord = require("discord.js");
const qdb = require("quick.db");
require("../index.js");

exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.has(client.config.owner))
    if(message.author.id !== client.config.sahip) return message.react(client.config.redemoji); 


    let embed = new Discord.MessageEmbed().setAuthor("Kara Liste Üyeleri").setFooter(client.config.footer).setColor("RANDOM");
    let data = qdb.get(`karaL`) || {};
    let arr = Object.keys(data);

    let bilgi = arr.map((value) => `\`${data[value].users}\` Atılma Zamanı: ${data[value].zaman}`).join("\n");

  let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
  if(KaraListe) return  message.react(client.config.redemoji);
 
  
  
    message.channel.send(embed.setDescription(`\n${bilgi}`));

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['klb'],
    permLevel: 0
};
exports.help = {
    name: 'klb',
    description: 'Karaliste',
    usage: 'klb'
};