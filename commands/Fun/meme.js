const Discord = require("discord.js");
const randomPuppy = require('random-puppy');
module.exports = {
    name: "meme",
    category: "Fun",
    description: "Random meme lekérése",
    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji) => {
        message.reply(`${falseemoji} **|** Sikertelen betöltés!`);
            /*const subreddits = ["dankmeme", "meme", "me_irl"]
            const random = subreddits[Math.floor(Math.random() * subreddits.length)]
        
            const memeIMG = await randomPuppy(random)
        
            message.reply(memeIMG)  

            var currentdate = new Date();*/
    }
}