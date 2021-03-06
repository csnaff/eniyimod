  
const Discord= require("discord.js");
require("../index.js");

exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(client.config.redemoji)
    let enAltYetkiliRolü = message.guild.roles.cache.get(client.config.altyetkili)
    let yetkililer = message.guild.members.cache.filter(s => s.roles.highest.position >= enAltYetkiliRolü.position && !s.user.bot)
    let sestekiyt = yetkililer.filter(s => s.voice.channel)
    let unsesyt = yetkililer.filter(s => !s.voice.channel)
    let aktifyt = yetkililer.filter(s => s.presence.status !== 'offline')
    let offlineyt = yetkililer.filter(s => s.presence.status === 'offline')
    let aktifunsesyt = yetkililer.filter(s => s.presence.status !== 'offline').filter(x => !x.voice.channel)



    if (args[0] === "say") {
        const sayembed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`
    Sunucumuzdaki toplam yetkili sayısı: **${yetkililer.size}**
    Sunucumuzdaki aktif yetkili sayısı: **${aktifyt.size}**
    Sunucumuzdaki sesteki yetkili sayısı: **${sestekiyt.size}**
    Sunucumuzdaki aktif olup seste olmayan yetkili sayısı: **${aktifunsesyt.size}**
    `)
        message.channel.send(sayembed).then(m => m.delete({ timeout: 10000 }) && message.delete({ timeout: 9999 }))
    }
    if (args[0] === "dm") {
        message.channel.send(new Discord.MessageEmbed().setDescription(`${aktifunsesyt.size} Yetkiliye ses çağrısı yapılıyor.`).setColor('RANDOM')).then(async(msg) => {
            aktifunsesyt.array().forEach(async(luced) => {
                setTimeout(async() => {
                    msg.edit(new Discord.MessageEmbed().setDescription(`${luced} Yetkilisine özelden mesaj atıldı.`))
                    luced.send(`Aktifsin fakat seste değilsin lütfen ses kanalına gir.\n ${message.guild.name}`).catch(err => message.channel.send(`${luced} Aktifsin fakat seste değilsin lütfen ses kanalına gir.`) && msg.edit(new Discord.MessageEmbed().setDescription(`${luced} kullanıcısına özelden mesaj gönderilemediği için kanala etiketlendi.`)))
                }, luced * 1500)
            })

        })

    }
    if (!args[0]) {
        message.channel.send(new Discord.MessageEmbed().setDescription(`
    Yetkili komutları:

    \`•\` **!yetkili say**
    Yetkililer hakkında detaylı bilgili verir.

    \`•\` **!yetkili dm**
    Aktif olup seste olmayan yetkililere dm atar.
    `)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 6999 }))
    }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yetkili"],
  kategori: "Yetkili Komutları",
  permLevel: 0
};
exports.help = {
  name: "yt",
  description: "Sunucuya ne dersin ?",
  usage: "yetkili "
};
