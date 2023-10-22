const Discord = require("discord.js");
const superagent = require('superagent');
module.exports = {
    name: "cat",
    category: "Fun",
    description: "Random kép lekérése cicákról ",
    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang) => {
            message.reply(`${falseemoji} **|** Sikertelen betöltés!`);
            /*let {body} = await superagent
            .get(`https://aws.random.cat/meow`)
         
            try{
            
                message.reply(body.file)  

            }

            catch(e){
                if(cmdlang === `magyar`) {
                message.reply(`${falseemoji} **|** Sikertelen betöltés!`);
            } else {
                message.reply(`${falseemoji} **|** I can't load the photo!`);
            }

            }*/
    }
}