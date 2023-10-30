const Discord = require("discord.js");
const fs = require("fs");

module.exports = {

    name: "swfs",

    category: "Alap",

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, setwelcome) => {
        if(!message.author.id === `762742605254754325`) return
        message.reply(fs.readFileSync("setwelcome.json"))

    }

}