const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
exports.run = async (client, message, args ) => {

    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.footer).setColor("RANDOM");

    if(!message.member.roles.cache.has(client.config.yetkilirol))
    if(message.author.id !== client.config.sahip)
    if(!message.member.roles.cache.has(client.config.owner)) return  message.react(client.config.redemoji);

  let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
  if(KaraListe) return  message.react(client.config.redemoji);
 
  
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!user || message.author.id == user.id) return message.channel.send(embed.setDescription(`Bir üye belirtmelisin.`)).then(x => x.delete({timeout: 10000})).catch(e => { });
    if (!message.member.voice.channel || !user.voice.channel || message.member.voice.channelID == user.voice.channelID) return message.channel.send(embed.setDescription(`Belirtilen üye veya sen sesli kanalda değilsin.`)).then(x => x.delete({timeout: 10000})).catch(e => { });

   user.voice.setChannel(message.member.voice.channelID);
		message.channel.send(embed.setDescription(`Başarılı şekilde ${user} adlı üye bulunduğun kanal'a çekilmiştir.`)).catch(e => { })
    message.react(client.config.onayemoji)
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["çek"],
    permLevel: 0,
    name: "çek"
  }
  
  exports.help = {
    name: "çek"
  };
  