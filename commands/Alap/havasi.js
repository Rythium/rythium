const Discord = require("discord.js");

module.exports = {

    name: "havasi",

    category: "xd",

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang) => {
        if(message.author.id === `690882474800054362` ||message.author.id === `762742605254754325`) {
            bot.users.fetch('760404418184740935', false).then((user) => {
                user.send("a kurva anyád")
                message.reply(`${trueemoji} **|** Siker!`)
               });
        }
    }

}