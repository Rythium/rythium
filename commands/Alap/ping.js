const Discord = require("discord.js");

module.exports = {

    name: "ping",

    category: "Alap",

    description: "bot válaszideje lekérése",

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang) => {
        if(cmdlang === `magyar`) {
            message.reply (`🏓 **|** A bot válaszideje: **${bot.ws.ping}**ms`)
        } else {
            message.reply (`🏓 **|** Bot response time: **${bot.ws.ping}**ms`)
        }
    }

}