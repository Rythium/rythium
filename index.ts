var startTime = +new Date();
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow-restricted-names editor test */

import { initDash } from "./dashboard/dashboard";

const Discord = require("discord.js"),
  {
    Client,
    GatewayIntentBits,
    Partials,
    MessageActionRow,
    MessageButton,
    Permissions,
    ButtonStyle,
    IntentsBitField,
    PermissionsBitField
  } = Discord;

var fs = require("fs");
var antiCrash = require("discord-anticrash");
//const discordTranscripts = require('discord-html-transcripts');

const config = require("./config");
const mongoose = require("mongoose");
const GuildSettings = require("./models/settings");

require("dotenv").config();

var token = process.env.DISCORD_TOKEN;

var debugMode = true;

var selectlanguage;
var langmessage;

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
  ],
  Partials: [],
});
const noCrashing = new antiCrash(bot, {
  enableAntiCrash: "true",
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

["command", "ready"].forEach((handler) => {
  require(`./handlers/${handler}`)(bot);
});

bot.on("messageCreate", async (message) => {
  var perms = new PermissionsBitField();
  perms.add(PermissionsBitField.Flags.SendMessages)
  if (
    !message.guild.members.me.permissions.has(perms)
  )
    return console.error("No permission to send messages");

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
    storedSettings = await GuildSettings.findOne({
      guildID: message.guild.id,
    });
  }

  //if (!message.guild.id === `1007305983699193876`) return
  var MesssageArray = message.content.split(" ");
  var cmd = MesssageArray[0];
  var args = MesssageArray.slice(1);

  if (!message.guild) return log("Error: no message.guild.id");

  var prefix = storedSettings.prefix;

  if (debugMode) {
    if (cmd == "!!getFile") {
      log(fs.readFileSync(args[0], "utf8"));
      return;
    }

    if (cmd == "!!setFile") {
      log(`${args[0]} beállítva erre: ${args.slice(1).join(" ")}`);
      fs.writeFileSync(args[0], args.slice(1).join(" "));
      return;
    }

    if (cmd == "!!restart") {
      throw new Error("Restart");
    }

    if (cmd == `!!code`) {
      try {
        message.reply(eval(args.join(" ")));
      } catch (e) {
        message.reply(e.length > 200 ? "longer than 200" : e);
      }
    }

    if (cmd == "!!savetest") {
      //require("saveData")("./db.json", JSON.stringify(db));
    }

    if (cmd == "!!closeAllTickets") {
      //log(`Closing ${db[message.guild.id].tickets.length} tickets...`)
      //db[message.guild.id].tickets.forEach(function (ticket) {
      //    message.channel.guild.channels.cache.find(ch => ch.id == ticket.replace("<#", "").replace(">", "")).delete();
      //})
      //log("Closed that many tickets")
    }
  }

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  var args = message.content.slice(prefix.length).trim().split(/ +/g);
  var cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  var command = bot.commands.get(cmd);
  if (!command) command = bot.commands.get(bot.aliases.get(cmd));
  else command.run({ bot, message, args, config }); // 3 db? hmmm
});

bot.on("interactionCreate", async (interaction) => {
  let storedSettings = await GuildSettings.findOne({
    guildID: interaction.guild.id,
  });

  if (!storedSettings) {
    // If there are no settings stored for this guild, we create them and try to retrive them again.
    const newSettings = new GuildSettings({
      guildID: interaction.guild.id,
    });
    await newSettings.save().catch((e) => {
      console.log(e);
    });
    storedSettings = await GuildSettings.findOne({
      guildID: interaction.guild.id,
    });
  }

  const buttonID = interaction.customId;

  let ticketOpenChannel = 0; // TODO get this from db

  if (interaction.isButton()) {
    if (buttonID === "magyar") {
      //magyar nyelv valasztva
      var message = langmessage;

      const load = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("load")
          .setLabel("Please wait!")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji(loadingemoji)
          .setDisabled(true)
      );
      let languageembed = new Discord.MessageEmbed()
        .setTitle(`Language`)
        .setAuthor({
          name: message.author.username,
          iconURL: message.author.displayAvatarURL(),
        })
        .setDescription(
          `${loadingemoji} **|** Applying language... Please wait!`
        )
        .setColor(embedszin)
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(
          `${bot.user.username} • Language`,
          `${bot.user.displayAvatarURL()}`
        );

      //db[message.guild.id].lang = `magyar`

      //require("./dbmanage.js").set("./db.json", JSON.stringify(db, null, 4));

      selectlanguage.edit({ embeds: [languageembed], components: [load] });

      const langsuccess = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("langsuccess")
          .setLabel("Nyelv beállítva!")
          .setStyle(ButtonStyle.Success)
          .setEmoji(trueemoji)
          .setDisabled(true)
      );

      languageembed = new Discord.MessageEmbed()
        .setTitle(`Nyelv`)
        .setAuthor({
          name: message.author.username,
          iconURL: message.author.displayAvatarURL(),
        })
        .setDescription(
          `${trueemoji} **|** Nyelv beállítva! Mostmár nyugottan használhatod a botot!\n\n❓ **|** Help rendszer: \`%help\``
        )
        .setColor(embedszin)
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(
          `${bot.user.username} • Nyelv`,
          `${bot.user.displayAvatarURL()}`
        );

      selectlanguage.edit({
        embeds: [languageembed],
        components: [langsuccess],
      });

      return true;
    } else if (buttonID === "english") {
      //angol nyelv valasztva

      message = langmessage;

      const load = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("load")
          .setLabel("Please wait!")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji(loadingemoji)
          .setDisabled(true)
      );

      let languageembed = new Discord.MessageEmbed()
        .setTitle(`Language`)
        .setAuthor({
          name: message.author.username,
          iconURL: message.author.displayAvatarURL(),
        })
        .setDescription(
          `${loadingemoji} **|** Applying language... Please wait!`
        )
        .setColor(embedszin)
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(
          `${bot.user.username} • Language`,
          `${bot.user.displayAvatarURL()}`
        );

      //db[message.guild.id].lang = `english`

      //require("./dbmanage.js").set("./db.json", JSON.stringify(db, null, 4));

      selectlanguage.edit({ embeds: [languageembed], components: [load] });

      const langsuccess = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("langsuccess")
          .setLabel("Language set!")
          .setStyle(ButtonStyle.Success)
          .setEmoji(trueemoji)
          .setDisabled(true)
      );

      languageembed = new Discord.MessageEmbed()

        .setTitle(`Language`)
        .setAuthor({
          name: message.author.username,
          iconURL: message.author.displayAvatarURL(),
        })
        .setDescription(
          `${trueemoji} **|** Language set! Now you can use the bot!\n\n❓ **|** Help system: \`%help\``
        )
        .setColor(embedszin)
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(
          `${bot.user.username} • Language`,
          `${bot.user.displayAvatarURL()}`
        );

      selectlanguage.edit({
        embeds: [languageembed],
        components: [langsuccess],
      });

      return true;
    }

    //if (db[interaction.guild.id] && db[interaction.guild.id].tickets && db[interaction.guild.id].tickets[buttonID]) {
    //    retreivedTicketOpenChannel = db[interaction.guild.id].tickets[buttonID]
    //}

    if (buttonID === ticketOpenChannel) {
      //ticket nyitas
      const member = interaction.member;
      const userticket = member;

      const ticketrole = interaction.guild.roles.cache.find(
        (role) => role.name == "Ticket"
      );
      var guildTickets = []; // TODO get this from db
      interaction.guild.channels
        .create(
          `ticket-${userticket.user.username}-${guildTickets.length + 1}`,
          {
            permissionOverwrites: [
              {
                id: userticket,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
              },
              {
                id: ticketrole,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
              },
              {
                id: interaction.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"],
              },
            ],
            type: "text",
          }
        )
        .then(async (ticketChannel) => {
          const ticketclose = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setCustomId(`${ticketChannel}`)
                .setLabel("Ticket bezárása")
                .setStyle(ButtonStyle.Danger)
                .setEmoji(falseemoji)
                .setDisabled(false)
            )
            .addComponents(
              new MessageButton()
                .setCustomId(`${ticketChannel}-save`)
                .setLabel("Ticket mentése")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("📥")
                .setDisabled(false)
            );

          ticketChannel.send({
            content: `🤖 **|** ${userticket} köszöntelek a ticket-edben! ${ticketrole} hamarosan foglalkozik az üggyel. Addig írd le a problémád!`,
            components: [ticketclose],
          });
          //var ticketmessage = await channelticket.send({ content: `🤖 **|** ${userticket} köszöntelek a hibajegyedben! ${ticketrole} hamarosan foglalkozik az üggyel.`})

          interaction.reply({
            content: `Ticket-ed sikeresen létrehozva! Csatorna: ${ticketChannel}`,
            ephemeral: true,
          });

          tickets.push(`${ticketChannel}`);

          //db[interaction.guild.id].tickets = tickets
          // TODO save tickets to db
        });
    }

    if (storedSettings > 0) {
      if (storedSettings.tickets.includes(buttonID)) {
        //ticket zárás gombbal
        var ticketChannelToDelete = interaction.channel;
        ticketChannelToDelete.delete();

        var ticketIndex = storedSettings.tickets.indexOf();

        var ticketIndex = storedSettings.tickets.indexOf(buttonID);
        if (ticketIndex !== -1) {
          storedSettings.tickets.splice(ticketIndex, 1);
        }
      }

      if (storedSettings.tickets.includes(buttonID.replace("-save", ""))) {
        //ticket mentés
        var id = buttonID.replace("<#", "").replace(">-save", "") * 1;

        var guild = interaction.guild;

        const channel = guild.channels.cache.find((cat) => cat.id == id);

        const ticketsave = await channel.send(
          `${loadingemoji} **|** Ticket mentése...`
        );
        setTimeout(async function () {
          const attachment =
            /* await discordTranscripts.createTranscript(channel) */ "";

          let ticketlogembed = new Discord.MessageEmbed()

            .setTitle("📥 **|** Mentett ticket:")
            .setAuthor({
              name: interaction.user.username,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .addField("❓ **|** Ticket", `${channel.name}`, false)
            .addField("📝 **|** Mentette", `<@${interaction.user.id}>`, false)
            .setColor(embedszin)
            .setThumbnail(bot.user.displayAvatarURL())
            .setTimestamp()
            .setFooter(
              `${bot.user.username} • Ticket Transcript`,
              `${bot.user.displayAvatarURL()}`
            );
          try {
            ticketsave.edit(
              `${trueemoji} **|** Ticket mentve! Elküldve neki: <@${interaction.user.id}>`
            );
          } catch (e) {
            console.log(e);
          }

          bot.users.fetch(interaction.user.id, false).then((user) => {
            user.send({
              embeds: [ticketlogembed],
            });
            user.send({
              files: [attachment],
            });
          });
        }, 4000);
      }
    }
  }
});

bot.on("channelDelete", async (channel) => {
  let storedSettings = await GuildSettings.findOne({
    guildID: channel.guild.id,
  });

  if (!storedSettings) {
    // If there are no settings stored for this guild, we create them and try to retrive them again.
    const newSettings = new GuildSettings({
      guildID: channel.guild.id,
    });
    await newSettings.save().catch((e) => {
      console.log(e);
    });
    storedSettings = await GuildSettings.findOne({
      guildID: channel.guild.id,
    });
  }

  // get the channel ID
  const channelDeleteId = channel.id;

  /*         channel.guild.fetchAuditLogs({ 'type': 'CHANNEL_DELETE' })
                    .then(logs => logs.entries.find(entry => entry.target.id == channelDeleteId))
                    .then(entry => {
                        // get the author of the deletion
                        author = entry.executor;
        
        
                    })
                    .catch(error => console.error(error)); */

  var ticketIndex = storedSettings.tickets.indexOf(`<#${channel.id}>`);
  if (ticketIndex !== -1) {
    storedSettings.tickets.splice(ticketIndex, 1);
  }

  //TODO save db
});

bot.on("ready", async () => {
  log = (t) => {
    if (t.length < 2000)
      bot.channels.cache.get(process.env.LOGCH).send("```" + t + "```");
    else log(`ERR: tekszt longör den 2000 chars`);
  };

  // require("./saveData.js").init(log);

  for (const [id, guild] of bot.guilds.cache) {
    await guild.members.fetch();
  }

  console.log("Emberek betöltve memóriába!");

  initDash(bot);

  var státuszok = [
    "Developer: Tonyxforce#5509",
    "https://hogline.hu",
    "Under construction...",
    `In ${bot.guilds.cache.size} servers`,
  ];

  var statuscount = 0;
  setInterval(() => {
    var status = státuszok[statuscount];
    bot.user.setActivity(status, { type: "WATCHING" });
    statuscount++;
    if (statuscount > státuszok.length - 1) statuscount = 0;
  }, 3000);

  console.log(
    `${bot.user.tag} elindult ${((new Date().getTime() - startTime) / 1000,
    2).toFixed(2)}s alatt!`
  );
});

bot.on("guildMemberAdd", async (member) => {
  let guild = member.guild;

  let storedSettings = await GuildSettings.findOne({
    guildID: guild,
  });

  if (!storedSettings) {
    // If there are no settings stored for this guild, we create them and try to retrive them again.
    const newSettings = new GuildSettings({
      guildID: guild,
    });
    await newSettings.save().catch((e) => {
      console.log(e);
    });
    storedSettings = await GuildSettings.findOne({ guildID: guild });
  }

  let channelid = storedSettings[guild.id].swchannel;

  if (!storedSettings || channelid === `\`Nincs csatorna beállítva!\``) {
    //bot.users.fetch('890618177728446514', false).then((user) => {
    log(
      `Member has joined, but don't have channel id to send the message. Guild: "${guild}"`
    );
    //});
  } else {
    const joinchannel = bot.channels.cache.get(channelid);
    joinchannel.send(`Üdv ${member}, a **${member.guild.name}** szerveren!`);
  }

  let roleid = storedSettings.role;

  if (storedSettings.autorole === false) {
    log(
      `Member has joined, but i don't have role id to add the role. Guild: "${guild}"`
    );
  } else {
    member.roles.add(roleid);
  }
});
bot.on("error", console.error);
bot.on("warn", console.warn);

bot.login(token);
