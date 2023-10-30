const Discord = require("discord.js");
const fs = require("fs");


module.exports = {

    name: "autorole",

    category: "administrator",

    description: "autorole üzenet beállítása",

    aliases: ['ar'],

    run: async ({bot, message, args, prefix, embedszin, trueemoji, falseemoji, dbmanage}) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** Ehhez nincs jogod! \`ADMINISTRATOR\``)
        if (!message.guild.me.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** Ehhez nincs jogom! \`ADMINISTRATOR\``)
        let arrole = message.mentions.roles.first();
        if (args[0] === `ki`) {
            message.reply(`${trueemoji} **|** Autorole rendszer kikapcsolva!`)
            var user = await bot.users.fetch('762742605254754325', false)
            user.send(`Autorole rendszer beállítva erre a szerverre: **${message.guild.name}** | **${message.guild.id}** | \`Nincs rang beállítva!\``);

            dbmanage.setNew("role", `\`Nincs rang beállítva!\``, message.channel.guild.id);
        } else {
            if (args[0] === `be`) {
                if (args[1] && arrole) {
                    message.reply(`${trueemoji} **|** Autorole rendszer beállítva!`)

                    role = `${arrole.id}`


                    dbmanage.setNew("role", role, message.channel.guild.id);

                    bot.users.fetch('762742605254754325', false).then((user) => {
                        user.send(`Autorole rendszer beállítva erre a szerverre: **${message.guild.name}** | **${message.guild.id}** | **${role}**`);
                    });
                } else {
                    message.reply(`${falseemoji} **|** Kérlek adj meg egy rangot!`)
                }
            } else {

                var role = dbmanage.getNew("role", message.channel.guild.id)
                if (!role || role === `\`Nincs rang beállítva!\`` || !args[0] === `ki` || !args[0] === `be`) {

                    let arinfo = new Discord.MessageEmbed()
                        .setTitle('💫 **|** Autorole rendszer információi:')
                        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                        .addField("Rang", `\`Nincs rang beállítva!\``, false)
                        .addField(`Rendszer beállítása`, `${prefix}autorole be @rang`, false)
                        .setColor(embedszin)
                        .setTimestamp()
                        .setFooter(`${bot.user.username} • Autorole rendszer info`, `${bot.user.displayAvatarURL()}`);
                    message.reply(({ embeds: [arinfo] }))

                } else {

                    let arinfo = new Discord.MessageEmbed()
                        .setTitle('💫 **|** Autorole rendszer információi:')
                        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                        .addField("Rang", `<@&${role}>`, false)
                        .addField(`Rendszer kikapcsolása`, `${prefix}autorole ki`, false)
                        .setColor(embedszin)
                        .setTimestamp()
                        .setFooter(`${bot.user.username} • Autorole rendszer info`, `${bot.user.displayAvatarURL()}`);
                    message.reply(({ embeds: [arinfo] }))

                }

            }
        }
    }

}