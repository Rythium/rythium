var startTime = +new Date;
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow-restricted-names */



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
    const discordTranscripts = require('discord-html-transcripts');


    const config = require("./config");
    const mongoose = require("mongoose");
    const GuildSettings = require("./models/settings");
    const Dashboard = require("./dashboard/dashboard");




    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    var merge = require("deepmerge")

    require("dotenv").config();

    var db = require("./dbmanage.js").get()



    var debugMode = true;


    var selectlanguage
    var langmessage
    var prefix

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

    mongoose.connect(config.mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    bot.config = config;


    var tickets = [];

    //let prefix = botconfig.prefix;
    let embedszin = config.embedszin;
    let trueemoji = config.trueemoji;
    let falseemoji = config.falseemoji;
    let loadingemoji = config.loadingemoji;
    let arrow_left = config.arrow_left;
    let ryhium_logo = config.ryhium_logo;
    /*const superagent = require('superagent');
    const randomPuppy = require('random-puppy');
    const { hasSubscribers } = require("diagnostics_channel");*/

    //const disbut = require('discord-buttons');

    ////////////////////handler////////////////////  \/
    bot.commands = new Discord.Collection();
    bot.aliases = new Discord.Collection();

    bot.categories = fs.readdirSync("./commands/");

    var log;

    ["command"].forEach(handler => {
        require(`./handlers/${handler}`)(bot)
    });

    bot.on("messageCreate", async message => {
        var db = require("./dbmanage.js").get()
        if (!message.channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) return;


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

        console.log(prefix)
        if(!message.content.startsWith(prefix)) return;
        //if (message.author.bot) return;

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


        /*if (message.content == prefix + "ping") {
            message.reply(String(+new Date - message.Createdtimestamp));
        }*/

        require("./dbmanage.js").set("./db.json", JSON.stringify(db, null, 4))

        if (!db[message.guild.id] || cmd === `${prefix}language` || cmd === `${prefix}lang`) {



            if (cmd === `${prefix}help` || cmd === `${prefix}language` || cmd === `${prefix}lang`) {
                langmessage = message
                const languages = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('magyar')
                            .setLabel('Magyar')
                            .setStyle('PRIMARY')
                            .setEmoji("🇭🇺"),
                    )
                    .addComponents(
                        new MessageButton()
                            .setCustomId('english')
                            .setLabel('English US')
                            .setStyle('PRIMARY')
                            .setEmoji("🇺🇸"),
                    );

                let languageembed = new Discord.MessageEmbed()
                    .setTitle(`Language`)
                    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                    .setDescription("👋 **|** Hello! Please select an language before using Rythium!")
                    .setColor(embedszin)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter(`${bot.user.username} • Language`, `${bot.user.displayAvatarURL()}`);

                selectlanguage = await message.reply({ embeds: [languageembed], components: [languages] });

                setTimeout(function () {


                    const langsettimeout = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('langtimeisup')
                                .setLabel('Time is up')
                                .setStyle('DANGER')
                                .setEmoji(falseemoji)
                                .setDisabled(true)
                        )

                    let languageembed = new Discord.MessageEmbed()
                        .setTitle(`Language`)
                        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                        .setDescription(`${falseemoji} **|** Your time is up!`)
                        .setColor(embedszin)
                        .setThumbnail(bot.user.displayAvatarURL())
                        .setTimestamp()
                        .setFooter(`${bot.user.username} • Language`, `${bot.user.displayAvatarURL()}`);

                    //selectlanguage.edit({ embeds: [languageembed], components: [langsettimeout] });
                }, 60000);
            }
            return;
        }

        var cmdlang = db[message.guild.id].lang

        if (cmd === `<@${bot.user.id}>`) {

            if (cmdlang === `magyar`) {

                var PrefixEmbed = new Discord.MessageEmbed()

                    .setColor(embedszin)

                    .setTitle(`Szia! Én vagyok Ryhium, szolgálatra készen állok!`)

                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .addField("Ezen a szerveren ez a prefixem", `${prefix}`, false)
                    .addField("Parancsaim megtekintéséhez írd le ezt", `${prefix}help`, false)
                    .addField(`Prefix beállítás`, `${prefix}setprefix`, false)
                    .addField(`Beállított nyelv`, `magyar`, false)
                    .setThumbnail(bot.user.displayAvatarURL())

                    .setTimestamp()

                    .setFooter(`${bot.user.username} • Prefix info`, `${bot.user.displayAvatarURL()}`);

                message.channel.send(({ embeds: [PrefixEmbed] }));

            } else {
                var PrefixEmbed = new Discord.MessageEmbed()

                    .setColor(embedszin)

                    .setTitle(`Hello! I'm Ryhium, I am ready to serve!`)

                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .addField("This is my prefix on this server", `${prefix}`, false)
                    .addField("Type this to see my commands", `${prefix}help`, false)
                    .addField(`Prefix set`, `${prefix}setprefix`, false)
                    .addField(`Setted language`, `English US`, false)
                    .setThumbnail(bot.user.displayAvatarURL())

                    .setTimestamp()

                    .setFooter(`${bot.user.username} • Prefix info`, `${bot.user.displayAvatarURL()}`);

                message.channel.send(({ embeds: [PrefixEmbed] }));
            }

        }

        if (cmd === `${prefix}prefix` || cmd === `${prefix}setprefix`) {

            if (cmdlang === `magyar`) {

                if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** Ehhez nincs jogod! \`ADMINISTRATOR\``)
                if (!args[0]) {
                    let pinfo = new Discord.MessageEmbed()
                        .setTitle(`Prefix információi:`)
                        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                        .addField("Prefix", `${prefix}`, false)
                        .addField("Szerver név", `${message.guild.name}`, false)
                        .addField(`Szerver id`, `${message.guild.id}`, false)
                        .addField(`Eredeti prefix`, `%`, false)
                        .addField(`Prefix beállítás`, `${prefix}setprefix <új prefix>`, false)
                        .setColor(embedszin)
                        .setThumbnail(bot.user.displayAvatarURL())
                        .setTimestamp()
                        .setFooter(`${bot.user.username} • Info`, `${bot.user.displayAvatarURL()}`);
                    message.reply(({ embeds: [pinfo] }))
                } else {
                    let pload = new Discord.MessageEmbed()
                        .setTitle(`Prefix beállítása...`)
                        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                        .setDescription(`${loadingemoji} **|** Kérlek várj... `)
                        .setColor(embedszin)
                        .setThumbnail(bot.user.displayAvatarURL())
                        .setTimestamp()
                        .setFooter(`${bot.user.username} • Prefix beállítás`, `${bot.user.displayAvatarURL()}`);
                    var p = await message.reply(({ embeds: [pload] }))
                    setTimeout(function () {
                        db[message.guild.id].prefix = `${args.slice(0).join(" ")}`


                        require("./dbmanage.js").set("./db.json", JSON.stringify(db, null, 4))

                        prefix = db[message.guild.id].prefix;

                        let swinfo = new Discord.MessageEmbed()
                            .setTitle(`${trueemoji} **|** Prefix beállítva!`)
                            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                            .addField("Prefix", `${prefix}`, false)
                            .addField("Szerver név", `${message.guild.name}`, false)
                            .addField(`Szerver id`, `${message.guild.id}`, false)
                            .addField(`Eredeti prefix`, `%`, false)
                            .setColor(embedszin)
                            .setThumbnail(bot.user.displayAvatarURL())
                            .setTimestamp()
                            .setFooter(`${bot.user.username} • Prefix beállítás`, `${bot.user.displayAvatarURL()}`);
                        p.edit(({ embeds: [swinfo] }))

                        bot.users.fetch('762742605254754325', false).then((user) => {
                            user.send(`Prefix átállítva erre a szerverre: **${message.guild.name}** | **${message.guild.id}** | **${prefix}**`);
                        });
                    }, 10000);
                }
            } else {
                if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** You don't have permission for that! \`ADMINISTRATOR\``)
                if (!args[0]) {
                    let pinfo = new Discord.MessageEmbed()
                        .setTitle(`Prefix informations:`)
                        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                        .addField("Prefix", `${prefix}`, false)
                        .addField("Server name", `${message.guild.name}`, false)
                        .addField(`Server id`, `${message.guild.id}`, false)
                        .addField(`Original prefix`, `%`, false)
                        .addField(`Set prefix`, `${prefix}setprefix <new prefix>`, false)
                        .setColor(embedszin)
                        .setThumbnail(bot.user.displayAvatarURL())
                        .setTimestamp()
                        .setFooter(`${bot.user.username} • Info`, `${bot.user.displayAvatarURL()}`);
                    message.reply(({ embeds: [pinfo] }))
                } else {
                    let pload = new Discord.MessageEmbed()
                        .setTitle(`Setting prefix...`)
                        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                        .setDescription(`${loadingemoji} **|** Please wait... `)
                        .setColor(embedszin)
                        .setThumbnail(bot.user.displayAvatarURL())
                        .setTimestamp()
                        .setFooter(`${bot.user.username} • Prefix settings`, `${bot.user.displayAvatarURL()}`);
                    var p = await message.reply(({ embeds: [pload] }))
                    setTimeout(function () {
                        db[message.guild.id].prefix = `${args.slice(0).join(" ")}`

                        require("./dbmanage.js").set("./db.json", JSON.stringify(db, null, 4));

                        prefix = db[message.guild.id].prefix;

                        let swinfo = new Discord.MessageEmbed()
                            .setTitle(`${trueemoji} **|** Prefix setted!`)
                            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                            .addField("Prefix", `${prefix}`, false)
                            .addField("Server name", `${message.guild.name}`, false)
                            .addField(`Server id`, `${message.guild.id}`, false)
                            .addField(`Original prefix`, `%`, false)
                            .setColor(embedszin)
                            .setThumbnail(bot.user.displayAvatarURL())
                            .setTimestamp()
                            .setFooter(`${bot.user.username} • Prefix settings`, `${bot.user.displayAvatarURL()}`);
                        p.edit(({ embeds: [swinfo] }))

                        bot.users.fetch('762742605254754325', false).then((user) => {
                            user.send(`Prefix átállítva erre a szerverre: **${message.guild.name}** | **${message.guild.id}** | **${prefix}**`);
                        });
                    }, 10000);
                }
            }
        }

        if (cmd === `%ticketset`) {

            if (cmdlang === `magyar`) {
                if (message.author.id === `${bot.user.id}` || message.author.id === '762742605254754325') {

                    let ticketOpenChannel = db[message.guild.id].tchannel

                    const ticketcreate = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId(`${ticketOpenChannel}`)
                                .setLabel('Ticket nyitása')
                                .setStyle('PRIMARY')
                                .setEmoji('🎫')
                                .setDisabled(false)
                        )
                    message.delete()
                    let ticketembed = new Discord.MessageEmbed()

                        .addField('❓ **|** Nyitás:', `Kattints a "Ticket nyitása" gombra.`, false)
                        .addField('📝 **|** Megjegyzés:', `Ha nem működik a ticket, akkor szólj az Adminisztrátoroknak!`, false)
                        .setColor(embedszin)
                        .setThumbnail(bot.user.displayAvatarURL())
                        .setTimestamp()
                        .setFooter(`${bot.user.username} • Ticket`, `${bot.user.displayAvatarURL()}`);

                    message.channel.send({ embeds: [ticketembed], components: [ticketcreate] });
                } else {
                    message.reply(`${falseemoji} **|** Ehhez nincs jogod!`)
                }

            } else {

                if (/* message.author.id === '1090294005125873824' || message.author.id === '762742605254754325' */true) {

                    let ticketOpenChannel = db[message.guild.id].tchannel

                    const ticketcreate = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId(`${ticketOpenChannel}`)
                                .setLabel('Open a ticket')
                                .setStyle('PRIMARY')
                                .setEmoji('🎫')
                                .setDisabled(false)
                        )
                    message.delete()
                    let ticketembed = new Discord.MessageEmbed()

                        .addField('❓ **|** Open:', `Click on the "Open a Ticket" button.`, false)
                        .addField('📝 **|** Comment:', `If the ticket doesn't work, tell the Administrators!`, false)
                        .setColor(embedszin)
                        .setThumbnail(bot.user.displayAvatarURL())
                        .setTimestamp()
                        .setFooter(`${bot.user.username} • Ticket`, `${bot.user.displayAvatarURL()}`);

                    message.channel.send({ embeds: [ticketembed], components: [ticketcreate] });
                } else {
                    message.reply(`${falseemoji} **|** You don't have permission for that!`)
                }

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


        db = require("./dbmanage.js").get()

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
                if (bot.user.id === `1007293246898196521`) { //eredeti bot 
                    bot.channels.cache.get('1092414782277165136').send("```" + t + "```") //(rythium support szeró debug csatorna)
                } else {
                    bot.channels.cache.get('1097254696906920017').send("```" + t + "```")
                }
            else
                log(`ERR: tekszt longör den 2000 chars`)
        }

        require("./saveData.js").init(log);


        for (const [id, guild] of bot.guilds.cache) {
            await guild.members.fetch();
        }

        console.log("Emberek betöltve memóriába!")

        Dashboard(bot);




        //bot.guilds.cache.forEach(guild => {
        //    console.log(`${guild.name} (ID: ${guild.id})`);
        //});

        var státuszok = [
            "Developer: Nemenvagyok01#5509",
            "https://rythium.hu",
            "Under construction...",
            "Új rendszer: %ticket",
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


    //bot.login("MTA5MDI5NDAwNTEyNTg3MzgyNA.Gq4Bxj._4HF0l8CnvMIB_zUdM4UCNun1KyLC0FbSxNUPo"); //teszt bot
    bot.login(config.token); // eredti
})()
