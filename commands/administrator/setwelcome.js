const Discord = require("discord.js");
const fs = require("fs");


module.exports = {

    name: "setwelcome",

    category: "administrator",

    description: "üdvözlő üzenet beállítása",

    aliases: ['sw'],

    run: async ({message, falseemoji, trueemoji, dbmanage}) => { //hol van a true emoji? idk ctrl + Z
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** Ehhez nincs jogod! \`ADMINISTRATOR\``);
        if(!message.guild.me.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** Ehhez nincs jogom! \`ADMINISTRATOR\``);



        let swchannel = message.mentions.channels.first();
        if(args[0] === `ki`) {
            message.reply(`${trueemoji} **|** Üdvözlő rendszer kikapcsolva!`)
            var user = await bot.users.fetch('762742605254754325', false)
                user.send(`Üdvözlő rendszer beállítva erre a szerverre: **${message.guild.name}** | **${message.guild.id}** | \`Nincs csatorna beállítva!\``);
            
                dbmanage.setNew("swchannel", `\`Nincs csatorna beállítva!\``, message.channel.guild.id);

        } else {
            if(args[0] === `be`) {
                if(args[1]&& swchannel){ 
                    message.reply(`${trueemoji} **|** Üdvözlő rendszer beállítva!`)
                    swchannel = `${swchannel.id}`


                    dbmanage.setNew("swchannel", swchannel, message.channel.guild.id);

                        bot.users.fetch('762742605254754325', false).then((user) => {
                            user.send(`Üdvözlő rendszer beállítva erre a szerverre: **${message.guild.name}** | **${message.guild.id}** | **${channelid}**`);
                           });
                } else {
                    message.reply(`${falseemoji} **|** Kérlek adj meg egy csatornát!`)
                }
            } else {
                var channelid = dbmanage.getNew("swchannel", message.channel.guild.id)
            if(!channelid || channelid === `\`Nincs csatorna beállítva!\`` || !args[0] === `ki` || !args[0] === `be`) {
                let swinfo = new Discord.MessageEmbed()
                .setTitle('👋 **|** Üdvüzlő rendszer információi:')
                .setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL()})
                .addField("Csatorna", `\`Nincs csatorna beállítva!\``, false)
                .addField("Üzenet", '👋 **|** Üdv ${member}, a ${member.guild.name} szerveren!', false)
                .addField(`Rendszer beállítása`, `${prefix}setwelcome be #csatorna`, false)
                .setColor(embedszin)
                .setTimestamp()
                .setFooter(`${bot.user.username} • Üdvözlő rendszer info`, `${bot.user.displayAvatarURL()}`);
                message.reply(({embeds: [swinfo]}))
            } else {
                let channelid = setwelcome[message.guild.id].swchannel;
                let swinfo1 = new Discord.MessageEmbed()
                .setTitle('👋 **|** Üdvüzlő rendszer információi:')
                .setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL()})
                .addField("Csatorna", `<#${channelid}>`, false)
                .addField("Üzenet", '👋 **|** Üdv ${member}, a ${member.guild.name} szerveren!', false)
                .addField(`Rendszer kikapcsolása`, `${prefix}setwelcome ki`, false)
                .setColor(embedszin)
                .setTimestamp()
                .setFooter(`${bot.user.username} • Üdvözlő rendszer info`, `${bot.user.displayAvatarURL()}`);
                message.reply(({embeds: [swinfo1]}))
            }
        
            }
    }
    }

}