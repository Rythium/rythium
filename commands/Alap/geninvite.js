const Discord = require("discord.js");
module.exports = {
    name: "geninvite",
    category: "alap",
    description: "létrehoz egy invite-ot",
    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang) => {

        if(cmdlang === `magyar`) {

        var botuser = message.mentions.users.first();

        if(args[0]&& botuser){
    
        message.reply(`${trueemoji} **|** Itt tudod meghívni **${botuser.username}**-ot a szerveredre: **https://discord.com/oauth2/authorize?client_id=${botuser.id}&scope=bot&permissions=8**`);

        } else {

            message.reply(`${falseemoji} **|** Kérlek említs meg egy botot!`);
        }
    } else {
        
        var botuser = message.mentions.users.first();

        if(args[0]&& botuser){
    
        message.reply(`${trueemoji} **|** Here you can invite **${botuser.username}** to your server: **https://discord.com/oauth2/authorize?client_id=${botuser.id}&scope=bot&permissions=8**`);

        } else {

            message.reply(`${falseemoji} **|** Please mention a bot!`);
        }
    }
    }
}