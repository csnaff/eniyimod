const Discord = require("discord.js");
const db = require ("quick.db")


exports.run = (client, message, args) => {
  if(!message.member.roles.cache.has("851774994153603082") && !message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "<a:no:867889353861759037>  Bu komutu kullanabilmek için `Emojileri yönet` yetkisine sahip olmalısınız"
    );
  let link = args[0];
  let isim = args[1];
  let guild = message.guild;
  if (!link)
    return message.channel.send("Emojinin alınacağı linki girmelisin.");
  if (!isim) return message.channel.send("Emojinin ismini belirlemedin");

  let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("Emoji Eklendi", message.guild.iconURL)
    .setDescription(` **${isim} İsmiyle Yeni Bir Emoji Oluşturuldu.**`)
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`);

  let KaraListe = db.fetch(`karaL.${message.author.id}`)
  if(KaraListe) return  message.react(client.config.redemoji);
 
  
  guild
    .emojis.create(`${link}`, `${isim}`)
    .then(emoji => message.channel.send(embed));
  message.react((client.config.onayemoji)).catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["addemoji", "emojioluştur", "ee"],
  permLevel: 0
};
exports.help = {
  name: "emojiekle",
  description: "Sunucuya emoji eklersiniz",
  usage: "emojiekle <link> <isim>"
};
