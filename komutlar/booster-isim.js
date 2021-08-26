const Discord = require("discord.js");
const config = require("../ayarlar.json")
const db = require ("quick.db")

exports.run = async (client, message, args) => {
let isim = args.slice(0).join(' ');
 
if(![(client.config.booster)].some(role => message.member.roles.cache.get(role))) 
return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Komutu kullanmak için sunucumuza takviye yapmalısın.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

if(!isim) return message.channel.send(new Discord.MessageEmbed().setTimestamp().setColor('0x800d0d').setDescription(`Bir İsim Belirtmelisin.`))
 
  let KaraListe = db.fetch(`karaL.${message.author.id}`)
  if(KaraListe) return  message.react(client.config.redemoji);
 
message.guild.members.cache.get(message.author.id).setNickname(`${message.author.username.includes((client.config.tag)) ? (client.config.tag) : (client.config.tag2)} ${isim}`)
return message.channel.send(new Discord.MessageEmbed().setDescription(`<@${message.author.id}> Kullanıcı Adın Değiştirildi.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
 


}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['b'],
    permLevel: 0
}
 
exports.help = {
    name: 'me',
    description: '.',
    usage: 'me'
}