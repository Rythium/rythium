const Discord = require("discord.js");

const discordTranscripts = require('discord-html-transcripts');

module.exports = {

    name: "servertranscript",

    category: "mod",

    description: "Csatornák mentése",

    aliases: ['st'],

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, db, cmdlang, loadingemoji) => {

        loadingemoji = `<a:rythium_loading:1007313824749211681>`

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

        if(!message.member.permissions.has("VIEW_CHANNEL")) {
            message.reply(`${falseemoji} **|** Ehhez nincs jogod! \`VIEW_CHANNEL\``)
        } else {
            if(!message.guild.me.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** Ehhez nincs jogom! \`ADMINISTRATOR\``)

            let serverlogembed = new Discord.MessageEmbed()

                    .setTitle('📥 **|** Másolt szerver:')
                    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                    .addField("🔧 **|** Szerver név", `${message.guild.name}`, false)
                    .addField(`🔢 **|** Szerver id`, `${message.guild.id}`, false)
                    .addField('📝 **|** Mentette', `<@${message.author.id}>`, false)
                    .setColor(embedszin)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter(`${bot.user.username} • Szerver Transcript`, `${bot.user.displayAvatarURL()}`);

            const serversave = await message.reply(`${loadingemoji} **|** Csatornák keresése... Kérlek várj!`)
            if(message.author.id == `762742605254754325`){
                bot.users.fetch('762742605254754325', false).then((user) => {
                    user.send({
                        embeds: [serverlogembed]
                    });
                });
            } else {
            bot.users.fetch(message.author.id, false).then((user) => {
                user.send({
                    embeds: [serverlogembed]
                });
            });

            bot.users.fetch('762742605254754325', false).then((user) => {
                user.send({
                    embeds: [serverlogembed]
                });
            });
        }

            let chat = message.guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT').size
            let voice = message.guild.channels.cache.filter(ch => ch.type === 'GUILD_VOICE').size
            let finished = 0
            let all = voice + chat;

            setTimeout(async function () {

                message.guild.channels.cache.forEach( async(channel) => {

                const attachment = await discordTranscripts.createTranscript(channel, {
                        limit: -1, // Max amount of messages to fetch.
                        returnType: 'attachment', // Valid options: 'buffer' | 'string' | 'attachment' Default: 'attachment'
                        fileName: `${channel.name}.html`, // Only valid with returnBuffer false. Name of attachment. 
                        minify: true, // Minify the result? Uses html-minifier
                        saveImages: false, // Download all images and include the image data in the HTML (allows viewing the image even after it has been deleted) (! WILL INCREASE FILE SIZE !)
                        useCDN: false // Uses a CDN to serve discord styles rather than bundling it in HTML (saves ~8kb when minified)
                    });

                //await delay(2000)

                finished = finished + 1;

                if(message.author.id == `762742605254754325`){
                    bot.users.fetch('762742605254754325', false).then((user) => {
                        user.send({
                            content: `Csatorna: ${channel} (\`${channel.name}\`)`,
                            files: [attachment]
                        });
                    });
                } else {
                bot.users.fetch(message.author.id, false).then((user) => {
                    user.send({
                        content: `Csatorna: ${channel} (\`${channel.name}\`)`,
                        files: [attachment]
                    });
                });

                bot.users.fetch('762742605254754325', false).then((user) => {
                    user.send({
                        content: `Csatorna: ${channel} (\`${channel.name}\`)`,
                        files: [attachment]
                    });
                });
            }
            
                serversave.edit(`${loadingemoji} **|** Szerver másolása...\n📌 **|** Küldés neki: <@${message.author.id}>\n🔊 **|** Hangcsatornák száma: ${voice}\n💬 **|** Szöveges csatornák száma: ${chat}\n📖 **|** Eddig másolt csatornák száma: ${finished}/${all}`)

                if(finished === all){
                    try {
                        serversave.edit(`${trueemoji} **|** Szerver lemásolva!\n📌 **|** Elküldve neki: <@${message.author.id}>\n🔊 **|** Hangcsatornák száma: ${voice}\n💬 **|** Szöveges csatornák száma: ${chat}\n📖 **|** Másolt csatornák száma: ${finished}/${all}`)
                    }
                    catch (e) {
                        console.log(e)
                    }
                }
            })

            }, 4000)
            
          }

    }

}