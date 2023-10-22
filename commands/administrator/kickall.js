/*const Discord = require("discord.js");

module.exports = {

    name: "kickall",

    category: "Alap",

    description: "asd",

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang) => {
        //if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** Ehhez nincs jogod! \`ADMINISTRATOR\``)
        //if(!message.guild.me.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** Ehhez nincs jogom! \`ADMINISTRATOR\``)
        if(cmdlang === `magyar`) {
                message.guild.members.cache.forEach( async(member) => {
                    try{
                        member.kick()
                    }
                    catch(e){
                    console.log("allkick hiba!")
                    }
                    member.send(`Ki lettél dobva a **${message.guild.name}** szerverről, <@822121552505077762> által! Indok:  \`Kickall parancs\``)
                    message.reply(`${trueemoji}  **|** **${member.user.tag}** sikeresen ki lett rúgva a szerverről!`);
                 })
    } else {
        message.guild.members.cache.forEach( async(member) => {
            member.kick()
            member.send(`You have kicked from **${message.guild.name}** server, by: **${message.author.tag}**! Indok:  \`Kickall command\``)
            message.reply(`${trueemoji}  **|** **${ban_user2}** was kicked successfully!`);
         })
    }

}
}*/