    const Discord = require("discord.js")
    const db = require ("quick.db")
    
    exports.run = async(client, message, args) => {
      
        if (message.author.id !== client.config.sahip)
    if (!message.member.roles.cache.has(client.config.owner))
      return message.react(client.config.emoji.red);
      
      let KaraListe = db.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.react(client.config.redemoji);
      
    message.channel.send(new Discord.MessageEmbed().setTitle("Sunucu Sayısal İstatistikleri").setColor("#36393f").setDescription(`
    \`•\` Sunucuda toplam  **${message.guild.memberCount}** Üye
    \`•\` Son 1 Saatte Giren Üyeler  **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 3600000).size}**
    \`•\` Son 1 Günde Giren Üyeler  **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 86400000).size}**
    \`•\` Son 1 Haftada Giren Üyeler **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 604800000).size}**
    \`•\` Son 1 Ayda Giren Üyeler **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 2629800000).size}**`)
    .setThumbnail(message.guild.iconURL)
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp())
  };
  
  module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    kategori: "sunucu"
  };
  
  module.exports.help = {
    name: "istatistik",
    description: "istatistik",
    usage: "istatistik"
  };