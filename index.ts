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
    PermissionsBitField,
    Collection
  } = Discord;

var fs = require("fs");
var path = require("path")
//var antiCrash = require("discord-anticrash");
//const discordTranscripts = require('discord-html-transcripts');

const config = require("./config");
const mongoose = require("mongoose");
const GuildSettings = require("./models/settings");

require("dotenv").config();

var token = process.env.DISCORD_TOKEN;

const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v10');

const rest = new REST({ version: "10" }).setToken(token);

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
//const noCrashing = new antiCrash(bot, {
//  enableAntiCrash: "true",
//});

mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

bot.config = config;

bot.commands = new Collection()
bot.slashcommands = new Collection()
bot.commandaliases = new Collection()

bot.categories = fs.readdirSync("./commands/");

var log;

["command", "ready"].forEach((handler) => {
  require(`./handlers/${handler}`)(bot);
});

const slashcommands = [];
fs.readdirSync("./commands/slash").forEach(async (file) => {
  if (path.extname(file) != ".js") return;
  const command = await require(`./commands/slash/${file}`);
  slashcommands.push(command.data.toJSON());
  bot.slashcommands.set(command.data.name, command);
});

fs.readdirSync('./events').forEach(async file => {
  if (path.extname(file) != ".js") return;

	const event = await require(`./events/${file}`);
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args));
	} else {
		bot.on(event.name, (...args) => event.execute(...args));
	}
})

bot.on("messageCreate", async (message) => {
  var perms = new PermissionsBitField();
  perms.add(PermissionsBitField.Flags.SendMessages);
  if (!message.guild.members.me.permissions.has(perms))
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

  var args = message.content.split(" ");
  var cmd = args[0];
  args = args.slice(1);

  if (!message.guild) return log("Error: no message.guild.id");

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

    if (cmd == `!!code`) {
      try {
        message.reply(eval(args.join(" ")));
      } catch (e) {
        message.reply(e.length > 200 ? "longer than 200" : e);
      }
    }

    if (cmd == "!!closeAllTickets") {
      log(`Closing ${storedSettings.tickets.length} tickets...`)
      storedSettings.tickets.forEach(function (ticket) {
          message.channel.guild.channels.cache.find(ch => ch.id == ticket.replace("<#", "").replace(">", "")).delete();
      })
      log("Closed that many tickets")
    }
  }
});

bot.on("ready", async () => {
  log = (t) => {
    if (t.length < 2000)
      bot.channels.cache.get(process.env.LOGCH).send("```" + t + "```");
    else log(`ERR: tekszt longör den 2000 chars`);
  };

    var unused_var_1 = await rest.put(Routes.applicationCommands(bot.user.id), {
      body: slashcommands,
    });
    


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

  let channelid = storedSettings.welcomech;

  if (!channelid) {
    log(
      `Member has joined, but don't have channel id to send the message. Guild: "${guild}"`
    );
  } else {
    const joinchannel = bot.channels.cache.get(channelid);
    joinchannel.send(`Üdv ${member}, a **${member.guild.name}** szerveren!`);
  }

  let roleid = storedSettings.role;

  if (!storedSettings.autorole) {
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
