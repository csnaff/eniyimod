const Discord= require("discord.js");
require("../index.js")
const db = require("quick.db")
exports.run = async(client, message, args) => {
    let embed = new Discord.MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

    if (!message.member.roles.cache.has(client.config.botCommands) && !message.member.hasPermission(8)) return message.react(client.config.redemoji)

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    if (!user) return message.react(client.config.redemoji)
    if (!user.voice.channel) return message.react(client.config.redemoji)

    let kanal = user.voice.channel
    let mik = user.voice.selfMute ? "\`Kapalı\`" : "\`Açık\`"
    let kulak = user.voice.selfDeaf ? "\`Kapalı\`" : "\`Açık\`"
    let yayın = user.voice.streaming ? "\`Açık\`" : "\`Kapalı\`"
    let cam = user.voice.selfVideo ? "\`Açık\`" : "\`Kapalı\`"
    let kanalinfo = user.voice.channel.userLimit
    let kanaldakiler = message.guild.members.cache.filter(x => x.voice.channel && x.voice.channel.id === kanal.id).size
    let voiceTime = await db.get(`voiceTime_${user.id}_${message.guild.id}`)
    let time = client.tarihHesapla(voiceTime)
    if (kanal && user.voice.channel) {
        message.channel.send(embed.setDescription(`
${user} Adlı kullanıcı \`${kanal.name}\` adlı ses kanalında.
Mikrofonu: ${mik}
Kulaklığı: ${kulak}
Yayın Bilgisi: ${yayın}
Kamera Bilgisi: ${cam}
Kanal Bilgisi: \`${kanaldakiler}/${kanalinfo}\`

Kullanıcı sese ${time} katılmış.
`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    }
};
exports.conf = {
 enabled: true, 
  guildOnly: true, 
  aliases: ["nerede"], 
  permLevel: 0 
};

exports.help = {
  name: "nerede" 
};