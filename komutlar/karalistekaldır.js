const Discord = require("discord.js");
const qdb = require("quick.db");
require("../index.js");
exports.run = async (client, message, args) => {
    if(!message.guild) return;
    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.footer).setColor("RANDOM");



    if(!message.member.roles.cache.has(client.config.owner))
    if(!message.member.roles.cache.has(client.config.karalisteyetkili))
    if(message.author.id !== client.config.sahip) return message.react(client.config.redemoji);

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.react(client.config.redemoji);

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.react(client.config.redemoji);

    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi.";

    
    qdb.delete(`karaL.${user.id}`)

    client.channels.cache.get(client.config.karalistelog).send(embed.setDescription(`
    __**Kara Listeden Kaldırıldı**__

    **Yetkili** : ${message.member} - (\`${message.member.user.username} - ${message.member.id}\`) 
    **Üye** : ${user} - (\`${user.user.username} - ${user.id}\`)
    **Sebep** : ${reason}
    `)).catch(e => { })

   user.send(embed.setDescription(`${message.guild.name} adlı sunucudan kara listeden kaldırıldın bota erişimin tekrardan açılmıştır.`)).catch(e => { })
   message.react(client.config.onayemoji)
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['klk'],
    permLevel: 0
};
exports.help = {
    name: 'klk',
    description: 'Karaliste',
    usage: 'klk'
};
  
