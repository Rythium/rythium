/*const Discord = require("discord.js");

module.exports = {

    name: "embedsay",

    category: "mod",

    description: "Beszélj a bot nevében embedben",

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang) => {

        if(cmdlang === `magyar`) {

        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`${falseemoji} **|** Ehhez nincs jogod! \`MANAGE_MESSAGES\``)
            if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply(`${falseemoji} **|** Ehhez nincs jogom! \`MANAGE_MESSAGES\``)

            let szöveg = args.join(" ");

                if(szöveg){
                    let embedsayembed = new Discord.MessageEmbed()
                    .setDescription(`${szöveg}`)
                    .setColor(embedszin)
                    .setTimestamp()
                    .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL()}`);
                    message.channel.send(({embeds: [embedsayembed]}))
                    message.delete()
                } else {
                    message.reply(`${falseemoji} **|** Írj szöveget!`)
                }

        } else {
            if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`${falseemoji} **|** You don't have permission for that! \`MANAGE_MESSAGES\``)
            if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply(`${falseemoji} **|** I don't have permission for that! \`MANAGE_MESSAGES\``)

            let szöveg = args.join(" ");

                if(szöveg){
                    let embedsayembed = new Discord.MessageEmbed()
                    .setDescription(`${szöveg}`)
                    .setColor(embedszin)
                    .setTimestamp()
                    .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL()}`);
                    message.channel.send(({embeds: [embedsayembed]}))
                    message.delete()
                } else {
                    message.reply(`${falseemoji} **|** Write a text!`)
                }
        }

    }

}*/