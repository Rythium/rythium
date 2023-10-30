const Discord = require("discord.js");

module.exports = {

    name: "say",

    category: "mod",

    description: "Beszélj a bot nevében",

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang) => {

        
        if(cmdlang === `magyar`) {

        if(!message.member.permissions.has("MANAGE_MESSAGES")) {
            message.reply(`${falseemoji} **|** Ehhez nincs jogod! \`MANAGE_MESSAGES\``)
        } else {
            if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply(`${falseemoji} **|** Ehhez nincs jogom! \`MANAGE_MESSAGES\``)
            let szöveg = args.join(" ");
            if(szöveg) {
            message.delete()
            message.channel.send(szöveg)
            } else {
                message.reply(`${falseemoji} **|** Írj szöveget!`)
            }
          }

        } else {
            if(!message.member.permissions.has("MANAGE_MESSAGES")) {
                message.reply(`${falseemoji} **|** You don't have permission for that!! \`MANAGE_MESSAGES\``)
            } else {
                if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply(`${falseemoji} **|** I don't have permission for that!! \`MANAGE_MESSAGES\``)
                let szöveg = args.join(" ");
                if(szöveg) {
                message.delete()
                message.channel.send(szöveg)
                } else {
                    message.reply(`${falseemoji} **|** Write a text!`)
                }
              }
        }

    }

}