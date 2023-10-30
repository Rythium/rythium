var startTime = +new Date;
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow-restricted-names editor test */



var orig_req = require;

function timed_require(x) {
    const start = Date.now();
    const mod = orig_req(x);
    console.log(`required ${x} in ${Date.now() - start}ms`);
    return mod;
  }

  require = timed_require;

(async () => {
  
    var Discord = require("discord.js");
    var { Intents, MessageActionRow, MessageButton, Client, Permissions } = Discord
    var fs = require("fs");
    var antiCrash = require('discord-anticrash')
    //const discordTranscripts = require('discord-html-transcripts');


    const config = require("./config");
    const mongoose = require("mongoose");
    const GuildSettings = require("./models/settings");
    //const Dashboard = require("./dashboard/dashboard");


    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


    require("dotenv").config();

    var token = process.env.DISCORD_TOKEN;



    var debugMode = true;


    var selectlanguage
    var langmessage

    const bot = new Client(
        {
            intents: new Intents(
                [
                    "GUILDS",
                    "GUILD_MEMBERS",
                    "GUILD_MESSAGES",
                    "GUILD_MESSAGE_REACTIONS",
                    "DIRECT_MESSAGES",
                    "DIRECT_MESSAGE_REACTIONS",
                ]
            )
        }
    );
    const noCrashing = new antiCrash(bot, {
        enableAntiCrash: 'true',
    });

    mongoose.connect(process.env.MONGOURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    bot.config = config;


    var tickets = [];

    let embedszin = config.embedszin;
    let trueemoji = config.trueemoji;
    let falseemoji = config.falseemoji;
    let loadingemoji = config.loadingemoji;
    let arrow_left = config.arrow_left;
    let ryhium_logo = config.ryhium_logo;


    ////////////////////handler////////////////////  \/
    bot.commands = new Discord.Collection();
    bot.aliases = new Discord.Collection();

    bot.categories = fs.readdirSync("./commands/");

    var log;

    ["command", "ready"].forEach(handler => {
        require(`./handlers/${handler}`)(bot)
    });

    bot.on("messageCreate", async message => {
        if (!message.channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) return console.error("No permission to send messages");


        // Retriving the guild settings from database.
        let storedSettings = await GuildSettings.findOne({
            guildID: message.guild.id,
        });

        if (!storedSettings) {
            // If there are no settings stored for this guild, we create them and try to retrive them again.
            const newSettings = new GuildSettings({
                guildID: message.guild.id,
            });
            await newSettings.save().catch((e) => {
                console.log(e);
            });
            storedSettings = await GuildSettings.findOne({ guildID: message.guild.id });
        }


        //if (!message.guild.id === `1007305983699193876`) return
        var MesssageArray = message.content.split(" ");
        var cmd = MesssageArray[0];
        var args = MesssageArray.slice(1);

        if (!message.guild) return log("Error: no message.guild.id")

        var prefix = storedSettings.prefix

        if (debugMode) {
            if (cmd == "!!getFile") {
                log(fs.readFileSync(args[0], "utf8"))
                return;
            }

            if (cmd == "!!setFile") {
                log(`${args[0]} beállítva erre: ${args.slice(1).join(" ")}`)
                fs.writeFileSync(args[0], args.slice(1).join(" "));
                return
            }

            if (cmd == "!!restart") {
                throw new Error("Restart")
            }


            if (cmd == `!!code`) {
                try {
                    message.reply(eval(args.join(" ")))
                } catch (e) {
                    message.reply(e.length > 200 ? "longer than 200" : e)
                }
            }

            if (cmd == "!!savetest") {
                require("saveData")("./db.json", JSON.stringify(db));
            }

            if (cmd == "!!closeAllTickets") {
                log(`Closing ${db[message.guild.id].tickets.length} tickets...`)
                db[message.guild.id].tickets.forEach(function (ticket) {
                    message.channel.guild.channels.cache.find(ch => ch.id == ticket.replace("<#", "").replace(">", "")).delete();
                })
                log("Closed that many tickets")
            }

        }

        if (!message.content.startsWith(prefix)) return;

        if (!message.member) message.member = await message.guild.fetchMember(message)

        var args = message.content.slice(prefix.length).trim().split(/ +/g);
        var cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;

        var command = bot.commands.get(cmd);
        if (!command)
            command = bot.commands.get(bot.aliases.get(cmd));
        else
            command.run(bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, db, cmdlang, db, db, loadingemoji); // 3 db? hmmm



    })


    bot.on('interactionCreate', async interaction => {
        return; // !!#TODO remove this after testing


        //log(db)

        const buttonID = interaction.customId;

        var retreivedTicketOpenChannel

        //let ticketOpenChannel = db[interaction.guild.id].tchannel //crash

        if (interaction.isButton()) {

            if (buttonID === 'magyar') { //magyar nyelv valasztva
                message = langmessage

                const load = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('load')
                            .setLabel('Please wait!')
                            .setStyle('SECONDARY')
                            .setEmoji(loadingemoji)
                            .setDisabled(true)
                    );
                let languageembed = new Discord.MessageEmbed()
                    .setTitle(`Language`)
                    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                    .setDescription(`${loadingemoji} **|** Applying language... Please wait!`)
                    .setColor(embedszin)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter(`${bot.user.username} • Language`, `${bot.user.displayAvatarURL()}`);

                db[message.guild.id].lang = `magyar`

                require("./dbmanage.js").set("./db.json", JSON.stringify(db, null, 4));

                selectlanguage.edit({ embeds: [languageembed], components: [load] });

                const langsuccess = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('langsuccess')
                            .setLabel('Nyelv beállítva!')
                            .setStyle('SUCCESS')
                            .setEmoji(trueemoji)
                            .setDisabled(true)
                    );

                languageembed = new Discord.MessageEmbed()
                    .setTitle(`Nyelv`)
                    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                    .setDescription(`${trueemoji} **|** Nyelv beállítva! Mostmár nyugottan használhatod a botot!\n\n❓ **|** Help rendszer: \`%help\``)
                    .setColor(embedszin)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter(`${bot.user.username} • Nyelv`, `${bot.user.displayAvatarURL()}`);

                selectlanguage.edit({ embeds: [languageembed], components: [langsuccess] });

                return true;
            } else if (buttonID === 'english') {//angol nyelv valasztva

                message = langmessage

                const load = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('load')
                            .setLabel('Please wait!')
                            .setStyle('SECONDARY')
                            .setEmoji(loadingemoji)
                            .setDisabled(true)
                    );

                let languageembed = new Discord.MessageEmbed()
                    .setTitle(`Language`)
                    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                    .setDescription(`${loadingemoji} **|** Applying language... Please wait!`)
                    .setColor(embedszin)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter(`${bot.user.username} • Language`, `${bot.user.displayAvatarURL()}`);

                db[message.guild.id].lang = `english`

                require("./dbmanage.js").set("./db.json", JSON.stringify(db, null, 4));

                selectlanguage.edit({ embeds: [languageembed], components: [load] });

                const langsuccess = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('langsuccess')
                            .setLabel('Language set!')
                            .setStyle('SUCCESS')
                            .setEmoji(trueemoji)
                            .setDisabled(true)
                    );

                languageembed = new Discord.MessageEmbed()

                    .setTitle(`Language`)
                    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                    .setDescription(`${trueemoji} **|** Language set! Now you can use the bot!\n\n❓ **|** Help system: \`%help\``)
                    .setColor(embedszin)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter(`${bot.user.username} • Language`, `${bot.user.displayAvatarURL()}`);



                selectlanguage.edit({ embeds: [languageembed], components: [langsuccess] });

                return true;
            }

            require("./dbmanage.js").set("./db.json", JSON.stringify(db, null, 4));





            if (db[interaction.guild.id] && db[interaction.guild.id].tickets && db[interaction.guild.id].tickets[buttonID]) {
                retreivedTicketOpenChannel = db[interaction.guild.id].tickets[buttonID]
            }


            if (buttonID === ticketOpenChannel) { //ticket nyitas
                const member = interaction.member;
                const userticket = member;

                const ticketrole = interaction.guild.roles.cache.find(role => role.name == 'Ticket')
                interaction.guild.channels.create(`ticket-${userticket.user.username}-${db[interaction.guild.id].tickets.length + 1}`, {

                    permissionOverwrites: [{
                        id: userticket,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                    }, {
                        id: ticketrole,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                    }, {
                        id: interaction.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                    },],
                    type: 'text',
                }).then(async ticketChannel => {
                    const ticketclose = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId(`${ticketChannel}`)
                                .setLabel('Ticket bezárása')
                                .setStyle('DANGER')
                                .setEmoji(falseemoji)
                                .setDisabled(false)
                        )
                        .addComponents(
                            new MessageButton()
                                .setCustomId(`${ticketChannel}-save`)
                                .setLabel('Ticket mentése')
                                .setStyle('PRIMARY')
                                .setEmoji('📥')
                                .setDisabled(false)
                        )



                    ticketChannel.send({ content: `🤖 **|** ${userticket} köszöntelek a ticket-edben! ${ticketrole} hamarosan foglalkozik az üggyel. Addig írd le a problémád!`, components: [ticketclose] })
                    //var ticketmessage = await channelticket.send({ content: `🤖 **|** ${userticket} köszöntelek a hibajegyedben! ${ticketrole} hamarosan foglalkozik az üggyel.`})

                    interaction.reply({
                        content: `Ticket-ed sikeresen létrehozva! Csatorna: ${ticketChannel}`,
                        ephemeral: true
                    })



                    tickets.push(`${ticketChannel}`)

                    db[interaction.guild.id].tickets = tickets

                    require("./dbmanage.js").set("./db.json", JSON.stringify(db, null, 4));

                })
            }



            if (db[interaction.guild.id] && db[interaction.guild.id].tickets && db[interaction.guild.id].tickets.length > 0) {
                if (db[interaction.guild.id].tickets.includes(buttonID)) { //ticket zárás gombbal
                    var ticketChannelToDelete = interaction.channel
                    ticketChannelToDelete.delete()

                    var ticketIndex = db[interaction.guild.id].tickets.indexOf()

                    //tej érdekel? igenigen  hány kg? 28dm3 akkor 42km iegn iegn iegn OMG lol bruh 

                    var ticketIndex = db[interaction.guild.id].tickets.indexOf(buttonID);
                    if (ticketIndex !== -1) {
                        db[interaction.guild.id].tickets.splice(ticketIndex, 1);
                    }
                }

                if (db[interaction.guild.id].tickets.includes(buttonID.replace("-save", ""))) { //ticket mentés
                    var id = buttonID.replace("<#", "").replace(">-save", "") * 1

                    guild = interaction.guild

                    const channel = guild.channels.cache.find(cat => cat.id == id)

                    const ticketsave = await channel.send(`${loadingemoji} **|** Ticket mentése...`)
                    setTimeout(async function () {

                        const attachment = await discordTranscripts.createTranscript(channel);

                        let ticketlogembed = new Discord.MessageEmbed()

                            .setTitle('📥 **|** Mentett ticket:')
                            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
                            .addField('❓ **|** Ticket', `${channel.name}`, false)
                            .addField('📝 **|** Mentette', `<@${interaction.user.id}>`, false)
                            .setColor(embedszin)
                            .setThumbnail(bot.user.displayAvatarURL())
                            .setTimestamp()
                            .setFooter(`${bot.user.username} • Ticket Transcript`, `${bot.user.displayAvatarURL()}`);
                        try {
                            ticketsave.edit(`${trueemoji} **|** Ticket mentve! Elküldve neki: <@${interaction.user.id}>`)
                        }
                        catch (e) {
                            console.log(e)
                        }

                        bot.users.fetch(interaction.user.id, false).then((user) => {
                            user.send({
                                embeds: [ticketlogembed]
                            });
                            user.send({
                                files: [attachment]
                            });
                        });
                    }, 4000)

                }
            }

        }
    });

    bot.on('channelDelete', async (channel) => {
        return// !!#TODO remove this after testing

        // get the channel ID
        const channelDeleteId = channel.id;

        /*         channel.guild.fetchAuditLogs({ 'type': 'CHANNEL_DELETE' })
                    .then(logs => logs.entries.find(entry => entry.target.id == channelDeleteId))
                    .then(entry => {
                        // get the author of the deletion
                        author = entry.executor;
        
        
                    })
                    .catch(error => console.error(error)); */

        db = require("./dbmanage.js").get();


        var ticketIndex = db[channel.guild.id].tickets.indexOf(`<#${channel.id}>`);
        if (ticketIndex !== -1) {
            db[channel.guild.id].tickets.splice(ticketIndex, 1);
        }

        require("./dbmanage.js").set("./db.json", JSON.stringify(db, null, 4));

    })


    bot.on("ready", async () => {
        log = (t) => {
            if (t.length < 2000)
                bot.channels.cache.get(process.env.LOGCH).send("```" + t + "```")
            else
                log(`ERR: tekszt longör den 2000 chars`)
        }

       // require("./saveData.js").init(log);


        for (const [id, guild] of bot.guilds.cache) {
            await guild.members.fetch();
        }

        console.log("Emberek betöltve memóriába!")

        //Dashboard(bot);


        var státuszok = [
            "Developer: Tonyxforce#5509",
            "https://hogline.hu",
            "Under construction...",
            `In ${bot.guilds.cache.size} servers`
        ]

        var statuscount = 0;
        setInterval(() => {
            var status = státuszok[statuscount]
            bot.user.setActivity(status, { type: "WATCHING" })
            statuscount++
            if (statuscount > státuszok.length - 1) statuscount = 0
        }, 3000);



        console.log(`${bot.user.tag} elindult ${((+new Date - startTime) / 1000, 2).toFixed(2)}s alatt!`)
    })


    bot.on('guildMemberAdd', member => {
        return //!!#TODO remove this after testing

        let guild = member.guild;
        let channelid = db[guild.id].swchannel;
        if (!db[guild.id] || channelid === `\`Nincs csatorna beállítva!\``) {
            //bot.users.fetch('890618177728446514', false).then((user) => {
            log(`Member has joined, but don't have channel id to send the message. Guild: "${guild}"`);
            //});
        } else {
            const joinchannel = bot.channels.cache.get(channelid);
            joinchannel.send(`Üdv ${member}, a **${member.guild.name}** szerveren!`);

        }
        setTimeout(function () {
            let roleid = db[guild.id].role;
            if (!db[guild.id] || roleid === `\`Nincs rang beállítva!\``) {
                //bot.users.fetch('890618177728446514', false).then((user) => {
                log(`Member has joined, but don't have role id to add the role. Guild: "${guild}"`);
                //});
            } else {
                member.roles.add(roleid);
            }
        }, 5000);
    });
    bot.on("error", console.error);
    bot.on("warn", console.warn);


    bot.login(token);
})()
