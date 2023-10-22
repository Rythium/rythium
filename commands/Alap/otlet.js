const Discord = require("discord.js");

module.exports = {

    name: "javaslat",

    category: "Alap",

    description: "ötlet/javaslat küldése",

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji) => {

        let channel = bot.channels.cache.get('1050432713263427645');

        let ötlet = args.join(" ");

            if(ötlet) {
        let ötletEmbed = new Discord.MessageEmbed()
        .setColor(embedszin)
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setThumbnail(message.author.displayAvatarURL())
        .addFields([
            {name: `👤 **|** Javaslatadó:`, value: `${message.author.tag}`, inline: false},
            {name: `👀 **|** Javaslat:`, value: `${ötlet}`, inline: false}
        ])

        .setTimestamp()
        .setFooter(`${bot.user.username} • Javaslat`, `${bot.user.displayAvatarURL()}`);
            
        message.reply(`${trueemoji} **|** Javaslatod elküldve!`)

        let ötletreaction = await channel.send({ embeds: [ötletEmbed] });
        ötletreaction.react(trueemoji)
        ötletreaction.react(falseemoji)

         } else {
        message.reply(`${falseemoji} **|** Írj javaslatot!`)


        }
    }

}