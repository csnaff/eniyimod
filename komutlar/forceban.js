const Discord = require("discord.js");
const qdb = require("quick.db");

exports.run = async (client, message, args) => {
    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.footer).setColor("RANDOM");

    if(!message.member.roles.cache.has(client.config.owner))
    if(!message.member.roles.cache.has(client.config.banforceban))
    if(message.author.id !== client.config.sahip) return  message.react(client.config.redemoji);

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return  message.react(client.config.redemoji);

    let user = message.guild.members.cache.get(args[0]);
    if(!user || isNaN(user)) return message.react(client.config.redemoji)
    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi"
    if (message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send(`Senden Üstün Veye Aynı Rolde Olan Bir Yetkiliye Ban Atamazsın!`).then(x => x.delete({timeout: 5000})).catch(e => { });


    qdb.add(`banAtma.${message.member.id}`, 1)
    client.channels.cache.get(client.config.banlog).send(embed.setDescription(`${user} (\`${user.id}\`) adlı kişi kalıcı olarak sunucudan uzaklaştırıldı.`)).catch(e => { })
    user.ban().catch(e => { });
    qdb.set(`fBan.${user.id}`, `fban`) 
    message.react("<a:Heaven_Evet:876940339326361601>")
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['forceban'],
    permLevel: 0
};
exports.help = {
    name: 'forceban',
    description: 'Belirtilen üyeye kalıcı olarak ban atar',
    usage: 'forceban'
};