const Discord = require("discord.js");

module.exports = {

    name: "botinfo",

    category: "Alap",

    description: "botról információk",

    aliases: ['boti'],

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang) => {

        if(cmdlang === `magyar`) {
    
        let owner = "<@762742605254754325>"
        let hoster = `<@762742605254754325>`
        let dev1 = `<@762742605254754325>`
        let dev2 = `<@690882474800054362>`
        let devemoji = `<:rythium_dev:1025831354186858528>`
        let servers = bot.guilds.cache.size
        let members = bot.users.cache.size
        let chs = bot.channels.cache.size
        let id = bot.user.id
        let d_js = "Discord.js@13.7.0"
        let apiping = bot.ws.ping
        let messageping = new Date() - message.createdAt
    
        let boti = new Discord.MessageEmbed()
        .setTitle("Információk Rythium botról:")
        .setColor(embedszin)
        .addFields(
            { name: `🤖 **|** Létrehozás`, value: `<t:${parseInt(bot.user.createdTimestamp / 1000)}:R>`, inline: true },
            { name: `🆔 **|** ID`, value: `${id}`, inline: true },
            { name: `${devemoji} **|** Developerek`, value: `${dev1}, ${dev2}`, inline: true },
            { name: `🌐 **|** Hoster`, value: `${hoster}`, inline: true },
            { name: `🖥️ **|** Discord.js Verzió`, value: `${d_js}`, inline: true },
            { name: `🌍 **|** Szerverek`, value: `${servers}`, inline: true },
            { name: `👥 **|** Felhasználók`, value: `${members}`, inline: true },
            { name: `📺 **|** Csatornák`, value: `${chs}`, inline: true },
            { name: `🌐 **|** Weboldal`, value: `__https://rythium.ml__`, inline: true },
            { name: `🏓 **|** Ping`, value: `${apiping}`, inline: true },
            { name: `📨 **|** Üzenetküldés`, value: `${messageping}`, inline: true },
          )
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(`${bot.user.username} • Botinfo `, `${bot.user.displayAvatarURL()}`);
    
        message.reply({ embeds: [boti] })

        } else {

            let owner = "<@762742605254754325>"
            let hoster = `<@762742605254754325>`
            let devemoji = `<:rythium_dev:1025831354186858528>`
            let servers = bot.guilds.cache.size
            let members = bot.users.cache.size
            let chs = bot.channels.cache.size
            let id = bot.user.id
            let d_js = "Discord.js@13.7.0"
            let apiping = bot.ws.ping
            let messageping = new Date() - message.createdAt
        
            let boti = new Discord.MessageEmbed()
            .setTitle("Információk Rythium botról:")
            .setColor(embedszin)
            .addFields(
                { name: `🤖 **|** Created at`, value: `<t:${parseInt(bot.user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: `🆔 **|** ID`, value: `${id}`, inline: true },
                { name: `${devemoji} **|** Developers`, value: `${dev1}, ${dev2}`, inline: true },
                { name: `🌐 **|** Hoster`, value: `${hoster}`, inline: true },
                { name: `🖥️ **|** Discord.js Version`, value: `${d_js}`, inline: true },
                { name: `🌍 **|** Servers`, value: `${servers}`, inline: true },
                { name: `👥 **|** Users`, value: `${members}`, inline: true },
                { name: `📺 **|** Channels`, value: `${chs}`, inline: true },
                { name: `🏓 **|** Ping`, value: `${apiping}`, inline: true },
                { name: `📨 **|** Messageing`, value: `${messageping}`, inline: true },
              )
            .setThumbnail(bot.user.displayAvatarURL())
            .setTimestamp()
            .setFooter(`${bot.user.username} • Botinfo `, `${bot.user.displayAvatarURL()}`);
        
            message.reply({ embeds: [boti] })

        }
    }

}