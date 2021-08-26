const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
 if (!message.member.roles.cache.has((client.config.commander)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
 let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
 if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().addField((client.config.sunucuadı) , `Bir kullanıcı etiketlemelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
 
  member.roles.add((client.config.ekip)); //rol
   
   
  let KaraListe = db.fetch(`karaL.${message.author.id}`)
  if(KaraListe) return  message.react(client.config.redemoji);
 

   const kanal = message.guild.channels.cache.find(c => c.id == (client.config.rollog));
   const embed1 = new Discord.MessageEmbed()
    .addField(
      (client.config.sunucuadı),
      `**Rol verilen üye =>** ${member.user} \n **Rol veren yetkili =>** ${message.author} \n **Verilen rol =>** <@&${client.config.ekip}> `
    )
    .setColor("BLACK")
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();
  let embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .addField(
      (client.config.sunucuadı),
      `<a:heaven_Evet:876940339326361601> ${member.user} **adlı üyeye <@&${client.config.ekip}> rolu verildi**`
    )
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();
  return message.channel.send(embed).then(kanal.send(embed1));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ekip"],
  kategori: "Yetkili Komutları",
  permLevel: 0
};
exports.help = {
  name: "ekip",
  description: "Sunucuya ne dersin ?",
  usage: "ekip "
};
