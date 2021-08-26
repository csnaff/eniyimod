const Discord = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {

    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.footer).setColor("RANDOM");


    if(!message.member.roles.cache.has(ayarlar.owner))
    if(!message.member.roles.cache.has(client.config.karalisteyetkili))
    if(message.author.id !== client.config.sahip) return message.react(client.config.redemoji);

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.react(client.config.redemoji);
 
    let tarih = moment(Date.now()).format('DD-MM-YYYY')
  
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.react(client.config.redemoji);

    if(message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send(`Senden aynı yetkide verya üstün olan bir yetkiliyi kara listeye atamazsın!`).then(x => x.delete({timeout: 5000})).catch(e => { });

    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi.";

    qdb.add(`karaLP_${user.id}`, +1)
    
    qdb.set(`karaL.${user.id}`, {
        yetkili: message.member.user.username,
        zaman: tarih,
        users: user.user.username
    })

    client.channels.cache.get(client.config.karalistelog).send(embed.setDescription(`
    __**Kara Liste Eklendi**__
  
    **Yetkili** : ${message.member} - (\`${message.member.user.username} - ${message.member.id}\`) 
    **Üye** : ${user} - (\`${user.user.username} - ${user.id}\`)
    **Sebep** : ${reason}
    `)).catch(e => { })

    user.send(embed.setDescription(`Hey dostum **${message.guild.name}** adlı sunucuda kara listeye eklendin ve bota erişimin kısıtlandı.`)).catch(e => { })
    message.react(client.config.onayemoji)
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kl'],
    permLevel: 0
};
exports.help = {
    name: 'kl',
    description: 'Karaliste',
    usage: 'kl'
};