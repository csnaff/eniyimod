const Discord= require("discord.js");
const qdb = require("quick.db");
require("../index.js");

exports.run = async (client, message, args) => {
 
    if(!message.guild) return;
    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.footer).setColor("RANDOM");

   
    if(!message.member.roles.cache.has(client.config.yetkilirol))
    if(message.author.id !== client.config.sahip)
    if(!message.member.roles.cache.has(client.config.owner)) return  message.react(client.config.redemoji);

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return  message.react(client.config.redemoji);

    if(!message.member.voice.channel)return message.channel.send(embed.setDescription(`<a:Heaven_Hayr:876940416874868768> Bir ses kanalında **bulunmuyorsun!**`)).then(x => x.delete({timeout: 10000}));


    let kanal = message.member.voice.channel.id

    if(!kanal) return message.channel.send(embed.setDescription(`<a:Heaven_Hayr:876940416874868768> Bir ses kanalında **bulunmuyorsun!**`))
    if(!message.guild.channels.cache.get(kanal).members.array().filter(x => x.id !== message.member.id).size <= 0) return message.channel.send(embed.setDescription(`<a:Heaven_Hayr:876940416874868768> Bulunduğun kanalda senden başkası **bulunmuyor!**`)).catch(e => { })

    let firstChannelMembers = message.guild.channels.cache.get(kanal).members.array().filter(x => x.id !== message.member.id);

    firstChannelMembers.forEach((x, i) => {
    setTimeout(async () => {
        x.voice.setMute(false)
    }, i*200)
    })
   
  await message.channel.send(embed.setDescription(`**${message.guild.channels.cache.get(kanal).name}** Adlı kanaldaki \`${firstChannelMembers.length}\` üyelerin susturulmasını kaldırdım!`)).catch(e => { })
  message.react(client.config.onayemoji)
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['allunmute'],
    permLevel: 0
};
exports.help = {
    name: 'allunmute',
    description: 'Mute Kaldır',
    usage: 'allunmute'
};