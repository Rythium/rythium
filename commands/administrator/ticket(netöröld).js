const Discord = require("discord.js");
const fs = require("fs");

module.exports = {

    name: "ticket_not_used",

    category: "Alap",

    aliases: ['t'],

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang, autorole, ticket) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** Ehhez nincs jogod! \`ADMINISTRATOR\``)
        if (!message.guild.me.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** Ehhez nincs jogom! \`ADMINISTRATOR\``)
        let tchannel = message.mentions.channels.first();
        let channelid = ticket[message.guild.id].tchannel;
        if (args[0] === `ki`) {
            message.reply(`${trueemoji} **|** Ticket rendszer kikapcsolva!`)
            bot.users.fetch('762742605254754325', false).then((user) => {
                user.send(`Ticket rendszer beállítva erre a szerverre: **${message.guild.name}** | **${message.guild.id}** | \`Nincs csatorna beállítva!\``);
            });
            ticket[message.guild.id].tchannel = `\`Nincs csatorna beállítva!\``

            require("./dbmanage.js").set("./db.json", JSON.stringify(ticket, null, 4));
        } else {
            if (args[0] === `be`) {
                if (args[1] && tchannel) {
                    message.reply(`${trueemoji} **|** Ticket rendszer beállítva!`)
                    ticket[message.guild.id].tchannel = `${tchannel.id}`
                    
                    require("./dbmanage.js").set("./db.json", JSON.stringify(ticket, null, 4));

                    tchannel.send(`${prefix}ticketset`)

                    channelid = ticket[message.guild.id].tchannel;
                    bot.users.fetch('762742605254754325', false).then((user) => {
                        user.send(`Ticket rendszer beállítva erre a szerverre: **${message.guild.name}** | **${message.guild.id}** | **${channelid}**`);
                    });
                } else {
                    message.reply(`${falseemoji} **|** Kérlek adj meg egy csatornát!`)
                }
            } else {
                if (!ticket[message.guild.id] || channelid === `\`Nincs csatorna beállítva!\`` || !args[0] === `ki` || !args[0] === `be`) {
                    let tinfo = new Discord.MessageEmbed()
                        .setTitle('🎫 **|** Ticket rendszer információi:')
                        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                        .addField("Csatorna", `\`Nincs csatorna beállítva!\``, false)
                        .addField(`Rendszer beállítása`, `${prefix}ticket be #csatorna`, false)
                        .setColor(embedszin)
                        .setTimestamp()
                        .setFooter(`${bot.user.username} • Ticket rendszer info`, `${bot.user.displayAvatarURL()}`);
                    message.reply(({ embeds: [tinfo] }))
                } else {
                    let channelid = ticket[message.guild.id].tchannel;
                    let tinfo1 = new Discord.MessageEmbed()
                        .setTitle('🎫 **|** Ticket rendszer információi:')
                        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                        .addField("Csatorna", `<#${channelid}>`, false)
                        .addField(`Rendszer kikapcsolása`, `${prefix}ticket ki`, false)
                        .setColor(embedszin)
                        .setTimestamp()
                        .setFooter(`${bot.user.username} • Ticket rendszer info`, `${bot.user.displayAvatarURL()}`);
                    message.reply(({ embeds: [tinfo1] }))
                }

            }
        }
    }
}