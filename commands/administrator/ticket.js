const Discord = require("discord.js");
const fs = require("fs");

module.exports = {

    name: "ticket",

    category: "Alap",

    aliases: ['t'],

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang, autorole, ticket) => {

        if (cmdlang === `magyar`) {

            if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** Ehhez nincs jogod! \`ADMINISTRATOR\``)
            if (!message.guild.me.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** Ehhez nincs jogom! \`ADMINISTRATOR\``)
            let tchannel = message.mentions.channels.first();
            let channelid = ticket[message.guild.id].tchannel;
            if (args[0] === `ki`) {
                message.reply(`${trueemoji} **|** Ticket rendszer kikapcsolva!`)
                bot.users.fetch('762742605254754325', false).then((user) => {
                    user.send(`Ticket rendszer beállítva erre a szerverre: **${message.guild.name}** | **${message.guild.id}** | \`Nincs csatorna beállítva!\``);
                });

                ticket[message.guild.id].tchannel = "\`Nincs csatorna beállítva!\`"
                require("../../dbmanage.js").set("./db.json", JSON.stringify(ticket, null, 4));
            } else {
                if (args[0] === `send`) {
                    if (args[1] && tchannel) {
                        message.reply(`${trueemoji} **|** Ticket üzenet elküldve!`)
                        ticket[message.guild.id].tchannel = `${tchannel.id}`

                        require("../../dbmanage.js").set("./db.json", JSON.stringify(ticket, null, 4));

                        tchannel.send(`%ticketset`)

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
                            .addField(`Rendszer beállítása`, `${prefix}ticket send #csatorna`, false)
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
        } else {

            if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** You don't have permission for that! \`ADMINISTRATOR\``)
            if (!message.guild.me.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** I don't have permission for that \`ADMINISTRATOR\``)
            let tchannel = message.mentions.channels.first();
            let channelid = ticket[message.guild.id].tchannel;
            if (args[0] === `off`) {
                message.reply(`${trueemoji} **|** Ticket system deactivated!`)
                bot.users.fetch('762742605254754325', false).then((user) => {
                    user.send(`Ticket rendszer beállítva erre a szerverre: **${message.guild.name}** | **${message.guild.id}** | \`Nincs csatorna beállítva!\``);
                });
                ticket[message.guild.id].tchannel = `\`Nincs csatorna beállítva!\``


                require("../../dbmanage.js").set("./db.json", JSON.stringify(ticket, null, 4));
            } else {
                if (args[0] === `send`) {
                    if (args[1] && tchannel) {
                        message.reply(`${trueemoji} **|** Ticket message sent!`)
                        ticket[message.guild.id].tchannel = `${tchannel.id}`


                        require("../../dbmanage.js").set("./db.json", JSON.stringify(ticket, null, 4));

                        tchannel.send(`%ticketset`)

                        channelid = ticket[message.guild.id].tchannel;
                        bot.users.fetch('762742605254754325', false).then((user) => {
                            user.send(`Ticket rendszer beállítva erre a szerverre: **${message.guild.name}** | **${message.guild.id}** | **${channelid}**`);
                        });
                    } else {
                        message.reply(`${falseemoji} **|** Please enter a channel!`)
                    }
                } else {
                    if (!ticket[message.guild.id] || channelid === `\`Nincs csatorna beállítva!\`` || !args[0] === `ki` || !args[0] === `be`) {
                        let tinfo = new Discord.MessageEmbed()
                            .setTitle('🎫 **|** Ticket system information:')
                            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                            .addField("Channel", `\`No channel set!\``, false)
                            .addField(`System setup`, `${prefix}ticket send #channel`, false)
                            .setColor(embedszin)
                            .setTimestamp()
                            .setFooter(`${bot.user.username} • Ticket system info`, `${bot.user.displayAvatarURL()}`);
                        message.reply(({ embeds: [tinfo] }))
                    } else {
                        let channelid = ticket[message.guild.id].tchannel;
                        let tinfo1 = new Discord.MessageEmbed()
                            .setTitle('🎫 **|** Ticket system information:')
                            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                            .addField("Channel", `<#${channelid}>`, false)
                            .addField(`System deactivate`, `${prefix}ticket off`, false)
                            .setColor(embedszin)
                            .setTimestamp()
                            .setFooter(`${bot.user.username} • Ticket system info`, `${bot.user.displayAvatarURL()}`);
                        message.reply(({ embeds: [tinfo1] }))
                    }

                }
            }
        }
    }
}