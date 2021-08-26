const Discord = require("discord.js");
const { oneLine, stripIndents } = require('common-tags');
const db = require ("quick.db")
module.exports.run = async (client, message, args) => {

  

  if(!["855071116553224284"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
let guild = (client.config.sunucuid); 
const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
let count = 0;
for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
var msg = message;

  let KaraListe = db.fetch(`karaL.${message.author.id}`)
  if(KaraListe) return  message.react(client.config.redemoji);
 
  
  
var sessayı = count.toString().replace(/ /g, "    ")
var üs1 = sessayı.match(/([0-9])/g)
sessayı = sessayı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs1) {
sessayı = sessayı.replace(/([0-9])/g, d => {
return {
    '0': (client.config.sayı0),
    '1': (client.config.sayı1),
    '2': (client.config.sayı2),
    '3': (client.config.sayı3),
    '4': (client.config.sayı4),                       
    '5': (client.config.sayı5),
    '6': (client.config.sayı6),
    '7': (client.config.sayı7),
    '8': (client.config.sayı8),
    '9': (client.config.sayı9)}[d];})}


var toplamuye = message.member.guild.memberCount.toString().replace(/ /g, "    ")
var üs2 = toplamuye.match(/([0-9])/g)
toplamuye = toplamuye.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs2) {
toplamuye = toplamuye.replace(/([0-9])/g, d => {
return {
    '0': (client.config.sayı0),
    '1': (client.config.sayı1),
    '2': (client.config.sayı2),
    '3': (client.config.sayı3),
    '4': (client.config.sayı4),                       
    '5': (client.config.sayı5),
    '6': (client.config.sayı6),
    '7': (client.config.sayı7),
    '8': (client.config.sayı8),
    '9': (client.config.sayı9)}[d];})}

var taglılar = 0;
let tag = (client.config.tag);
message.guild.members.cache.forEach(member => {
if(member.user.username.includes(tag)) {
taglılar = taglılar+1}})

var taglılar = taglılar.toString().replace(/ /g, "    ")
var üs3 = taglılar.match(/([0-9])/g)
taglılar = taglılar.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs3) {
taglılar = taglılar.replace(/([0-9])/g, d => {
return {
    '0': (client.config.sayı0),
    '1': (client.config.sayı1),
    '2': (client.config.sayı2),
    '3': (client.config.sayı3),
    '4': (client.config.sayı4),                       
    '5': (client.config.sayı5),
    '6': (client.config.sayı6),
    '7': (client.config.sayı7),
    '8': (client.config.sayı8),
    '9': (client.config.sayı9)}[d];})}

  
  



  
var cevirimici = message.guild.members.cache.filter(m => m.presence.status !== "offline").size.toString().replace(/ /g, "    ")
var üs4= cevirimici.match(/([0-9])/g)
cevirimici = cevirimici.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs4) {
cevirimici = cevirimici.replace(/([0-9])/g, d => {
return {
    '0': (client.config.sayı0),
    '1': (client.config.sayı1),
    '2': (client.config.sayı2),
    '3': (client.config.sayı3),
    '4': (client.config.sayı4),                       
    '5': (client.config.sayı5),
    '6': (client.config.sayı6),
    '7': (client.config.sayı7),
    '8': (client.config.sayı8),
    '9': (client.config.sayı9)}[d];})}




  
         const embed1 = new Discord.MessageEmbed()
            .setColor('BLACK')
            .setDescription(`\`>\` Sunucuda toplam **${toplamuye}** üye bulunmakta.(**${cevirimici}** online)
            \`>\` Sunucuda toplam tagımızı alan **${taglılar}** üye bulunmakta.
            \`>\` Sunucuda sesli sohbetlerde toplam **${sessayı}** üye bulunmakta`)
            .setTimestamp()
        msg.channel.send(embed1);
  
  }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["total",'toplam','say','info'],
  permLevel: 0
};
exports.help = {
  name: 'say'
}
