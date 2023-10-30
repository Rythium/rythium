const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');

var loadmsg

module.exports = {

    name: "template1",

    category: "Alap",

    aliases: ['temp1'],

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, db, cmdlang, loadingemoji) => { 

        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** Ehhez nincs jogod! \`ADMINISTRATOR\``)
        if(!message.guild.me.permissions.has("ADMINISTRATOR")) return message.reply(`${falseemoji} **|** Ehhez nincs jogom! \`ADMINISTRATOR\``)

        if(cmdlang === `magyar`) {

            if(args[0] === `igen`){ 

                let guildid = message.guild.id;

                let channelid = message.channel.id

                let guild = bot.guilds.cache.get(guildid);
                guild.channels.cache.forEach( async(channel) => {
                    if(channel.id === channelid) {
                        loadmsg = await message.reply(`⚙️ **|** Template1 betöltése... Kérlek várj! Kérlek ne nyúlj a szerverhez!\n❓ **|** Csatornák törlése...\n${trueemoji} **|** ⬜⬜⬜⬜⬜`)
                    } else {
                    channel.delete()
                    }
                })

                setTimeout(function () {

                setTimeout(function () {

                loadmsg.edit(`⚙️ **|** Template1 betöltése... Kérlek várj! Kérlek ne nyúlj a szerverhez!\n❓ **|** Rangok törlése...\n${trueemoji} **|** 🟩⬜⬜⬜⬜`)

                    guild.roles.cache.forEach( async(role) => {
                       role.delete()
                    })

                    setTimeout(function () {
                        loadmsg.edit(`⚙️ **|** Template1 betöltése... Kérlek várj! Kérlek ne nyúlj a szerverhez!\n❓ **|** Rangok létrehozása...\n${trueemoji} **|** 🟩🟩⬜⬜⬜`)

                        guild.roles.create({ name: 'Tulaj', color: '#ed0c2a'});

                        guild.roles.create({ name: 'Bot', color: 'PURPLE'});

                        guild.roles.create({ name: 'Admin', color: '#ed0c9b'});

                        guild.roles.create({ name: 'Mod', color: 'BLUE'});

                        guild.roles.create({ name: 'Ticket', color: 'YELLOW'});

                        guild.roles.create({ name: 'Tag', color: 'GREEN'});

                        setTimeout(function () {

                            loadmsg.edit({ content: `⚙️ **|** Template1 betöltése... Kérlek várj! Kérlek ne nyúlj a szerverhez!\n❓ **|** Akarod, hogy beállítsam a jogokat?`});
            
                    loadmsg.react("✅")
                    loadmsg.react("❌")
                  
                    const filter = (reaction,user) => {
                      return user.id === message.author.id;
                  }
                  
                  const collector = loadmsg.createReactionCollector({
                      filter,
                      max: 1,
                      time: 1000 * 60,
                  })
                  
                  collector.on('collect', async(reaction) =>{
                  
                    if(reaction.emoji.name === '✅' || message.author.id === bot.id) {
            
                        loadmsg.reactions.removeAll()
            
                        loadmsg.edit(`⚙️ **|** Template1 betöltése... Kérlek várj! Kérlek ne nyúlj a szerverhez!\n❓ **|** Jogok beállítása...\n${trueemoji} **|** 🟩🟩🟩⬜⬜`)
            
                        let tulajrole = guild.roles.cache.find(r => r.name === "Tulaj");
            
                        tulajrole.setPermissions(["ADMINISTRATOR"])

                        let botrole = guild.roles.cache.find(r => r.name === "Bot");
            
                        botrole.setPermissions(["ADMINISTRATOR"])
            
                        let Tulaj = message.author.id
                        message.member.roles.add(tulajrole);
            
                        let adminrole = guild.roles.cache.find(r => r.name === "Admin");
            
                        adminrole.setPermissions(['BAN_MEMBERS', 'KICK_MEMBERS', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'EMBED_LINKS', 'ATTACH_FILES', 'MENTION_EVERYONE', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MANAGE_MESSAGES', 'MOVE_MEMBERS',   ])

                        let modrole = guild.roles.cache.find(r => r.name === "Mod");
            
                        modrole.setPermissions(['KICK_MEMBERS', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'EMBED_LINKS', 'ATTACH_FILES', 'MENTION_EVERYONE', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MANAGE_MESSAGES', 'MOVE_MEMBERS',   ])
            
                        let tagrole = guild.roles.cache.find(r => r.name === "Tag");
            
                        tagrole.setPermissions(['CREATE_INSTANT_INVITE'])
            
                        let allrole = guild.roles.everyone
            
                        allrole.setPermissions(['CREATE_INSTANT_INVITE'])

                        guild.members.cache.forEach( async(member) => {

                            member.roles.add(tagrole);

                            })
            
                        //channelperms
            
                        loadmsg.edit(`⚙️ **|** Template1 betöltése... Kérlek várj! Kérlek ne nyúlj a szerverhez!\n❓ **|** Csatornák létrehozása...\n${trueemoji} **|** 🟩🟩🟩🟩⬜`)

                        setTimeout(function () {

                        message.guild.channels.create("===📢Információk📢===", { type: "GUILD_CATEGORY" })
                        message.guild.channels.create("===💥Általános💥===", { type: "GUILD_CATEGORY" })
                        message.guild.channels.create("===⛔staff részleg⛔===", { type: "GUILD_CATEGORY" })

                        setTimeout(function () {
        
                        infocategory = guild.channels.cache.find(cat=> cat.name == `===📢Információk📢===`)
        
                        altcategory = guild.channels.cache.find(cat=> cat.name == `===💥Általános💥===`)
        
                        staffcategory = guild.channels.cache.find(cat=> cat.name == `===⛔staff részleg⛔===`)
        
                        message.guild.channels.create('📗╿Szabályok', {
                            type: 'GUILD_TEXT',
                            parent: infocategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('👋╿Belépő', {
                            type: 'GUILD_TEXT',
                            parent: infocategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('📢╿Hírek', {
                            type: 'GUILD_TEXT',
                            parent: infocategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('💖╿Boostok', {
                            type: 'GUILD_TEXT',
                            parent: infocategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('🤝╿Partnerek', {
                            type: 'GUILD_TEXT',
                            parent: infocategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('🌐╿Csevegő', {
                            type: 'GUILD_TEXT',
                            parent: altcategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('📟╿Bot-parancsok', {
                            type: 'GUILD_TEXT',
                            parent: altcategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('🔉╿Társalgó 1', {
                            type: 'GUILD_VOICE',
                            parent: altcategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM', 'USE_VAD'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('🔉╿Társalgó 2', {
                            type: 'GUILD_VOICE',
                            parent: altcategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM', 'USE_VAD'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('⛔╿Staff-chat', {
                            type: 'GUILD_TEXT',
                            parent: staffcategory.id,
                            permissionOverwrites: [
                                {
                                    id: modrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM',],},{
                                    id: adminrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM',],
                             },
                            ],
                        });
        
                        message.guild.channels.create('⛔╿Teszt-parancsok', {
                            type: 'GUILD_TEXT',
                            parent: staffcategory.id,
                            permissionOverwrites: [
                                {
                                    id: modrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM',],},{
                                    id: adminrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM',],
                             },
                            ],
                        });
        
                        message.guild.channels.create('🔉╿Staff társalgó', {
                            type: 'GUILD_VOICE',
                            parent: staffcategory.id,
                            permissionOverwrites: [
                                {
                                    id: modrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM', 'USE_VAD'],},{
                                    id: adminrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM', 'USE_VAD'],
                                },
                            ],
                        });

                        setTimeout(function () {
            
                            loadmsg.edit(`⚙️ **|** Template1 betöltve! Nem sikerült a Bot(ok)ra adni a ${botrole} rangot adni, kérlek cserél le a ${tagrole} rangot!\n❓ **|** Most már használható a szerver!\n${trueemoji} **|** 🟩🟩🟩🟩🟩`)

                        }, 10000); 

                    }, 3000); 
        
                    }, 10000);
                    }
            
                    if(reaction.emoji.name === '❌') {
            
                            loadmsg.reactions.removeAll()
                            loadmsg.edit(`⚙️ **|** Template1 betöltése... Kérlek várj! Kérlek ne nyúlj a szerverhez!\n❓ **|** Csatornák létrehozása...\n${trueemoji} **|** 🟩🟩🟩⬜⬜`)

                            message.guild.channels.create("===📢Információk📢===", { type: "GUILD_CATEGORY" })
                            message.guild.channels.create("===💥Általános💥===", { type: "GUILD_CATEGORY" })
                            message.guild.channels.create("===⛔staff részleg⛔===", { type: "GUILD_CATEGORY" })
            
                            setTimeout(function () {
            
                            infocategory = guild.channels.cache.find(cat=> cat.name == `===📢Információk📢===`)
            
                            altcategory = guild.channels.cache.find(cat=> cat.name == `===💥Általános💥===`)
            
                            staffcategory = guild.channels.cache.find(cat=> cat.name == `===⛔staff részleg⛔===`)
            
                            message.guild.channels.create('📗╿Szabályok', {
                                type: 'GUILD_TEXT',
                                parent: infocategory.id,
                                /*permissionOverwrites: [
                                    {
                                        id: message.guild.roles.everyone,
                                        allow: ['VIEW_CHANNEL'],
                                    },
                                ],*/
                            });
            
                            message.guild.channels.create('👋╿Belépő', {
                                type: 'GUILD_TEXT',
                                parent: infocategory.id,
                            });
            
                            message.guild.channels.create('📢╿Hírek', {
                                type: 'GUILD_TEXT',
                                parent: infocategory.id,
                            });
            
                            message.guild.channels.create('💖╿Boostok', {
                                type: 'GUILD_TEXT',
                                parent: infocategory.id,
                            });
            
                            message.guild.channels.create('🤝╿Partnerek', {
                                type: 'GUILD_TEXT',
                                parent: infocategory.id,
                            });
            
                            message.guild.channels.create('🌐╿Csevegő', {
                                type: 'GUILD_TEXT',
                                parent: altcategory.id,
                            });
            
                            message.guild.channels.create('📟╿Bot-parancsok', {
                                type: 'GUILD_TEXT',
                                parent: altcategory.id,
                            });
            
                            message.guild.channels.create('🔉╿Társalgó 1', {
                                type: 'GUILD_VOICE',
                                parent: altcategory.id,
                            });
            
                            message.guild.channels.create('🔉╿Társalgó 2', {
                                type: 'GUILD_VOICE',
                                parent: altcategory.id,
                            });
            
                            message.guild.channels.create('⛔╿Staff-chat', {
                                type: 'GUILD_TEXT',
                                parent: staffcategory.id,
                            });
            
                            message.guild.channels.create('⛔╿Teszt-parancsok', {
                                type: 'GUILD_TEXT',
                                parent: staffcategory.id,
                            });
            
                            message.guild.channels.create('🔉╿Staff társalgó', {
                                type: 'GUILD_VOICE',
                                parent: staffcategory.id,
                            });
            
            
                            loadmsg.edit(`⚙️ **|** Template1 betöltése... Kérlek várj! Kérlek ne nyúlj a szerverhez!\n❓ **|** Simítás... Mindjárt kész!\n${trueemoji} **|** 🟩🟩🟩🟩⬜`)
            
                            setTimeout(function () {
            
                            loadmsg.edit(`⚙️ **|** Template1 betöltve!\n❓ **|** Most már használható a szerver!\n${trueemoji} **|** 🟩🟩🟩🟩🟩`)

                        }, 10000);
            
                        }, 10000);
                    }
                })
                        
                    }, 5000);

        }, 5000);

            }, 2000);

            }, 5000);

            } else {

                message.reply({ content: `⚙️ **|** Template 1\n\n❗**|** **Figyelem!** Ez a parancs kitörli az összes csatornát és újakat hoz létre! \nHa kívánod folytatni, akkor írd be a \`${prefix}template1 igen\` parancsot.`,  files: ["./images/templates/temp1/magyar/csatornak.png", "./images/templates/temp1/magyar/rangok.png"] })

            }

        } else {
            //angol//////////////////////////////////
            if(args[0] === `yes`){ 

                let guildid = message.guild.id;

                let channelid = message.channel.id

                let guild = bot.guilds.cache.get(guildid);
                guild.channels.cache.forEach( async(channel) => {
                    if(channel.id === channelid) {
                        if(message.author.id === bot.id){
                        loadmsg = await message.reply(`⚙️ **|** Loading Template1... Please wait! Please do not touch the server!\n❓ **|** Deleting channels...\n${trueemoji} **|** ⬜⬜⬜⬜⬜`)
                        }
                    } else {
                    channel.delete()
                    }
                })

                setTimeout(function () {

                setTimeout(function () {

                loadmsg.edit(`⚙️ **|** Loading Template1... Please wait! Please do not touch the server!\n❓ **|** Deleting ranks...\n${trueemoji} **|** 🟩⬜⬜⬜⬜`)

                    guild.roles.cache.forEach( async(role) => {
                       role.delete()
                    })

                    setTimeout(function () {
                        loadmsg.edit(`⚙️ **|** Loading Template1... Please wait! Please do not touch the server!\n❓ **|** Createing ranks...\n${trueemoji} **|** 🟩🟩⬜⬜⬜`)

                        guild.roles.create({ name: 'Owner', color: '#ed0c2a'});

                        guild.roles.create({ name: 'Bot', color: 'PURPLE'});

                        guild.roles.create({ name: 'Admin', color: '#ed0c9b'});

                        guild.roles.create({ name: 'Mod', color: 'BLUE'});

                        guild.roles.create({ name: 'Ticket', color: 'YELLOW'});

                        guild.roles.create({ name: 'Member', color: 'GREEN'});

                        setTimeout(function () {

                            loadmsg.edit({ content: `⚙️ **|** Loading Template1... Please wait! Please do not touch the server!\n❓ **|** You want me to set the permissions?`});
            
                    loadmsg.react("✅")
                    loadmsg.react("❌")
                  
                    const filter = (reaction,user) => {
                      return user.id === message.author.id;
                  }
                  
                  const collector = loadmsg.createReactionCollector({
                      filter,
                      max: 1,
                      time: 1000 * 60,
                  })
                  
                  collector.on('collect', async(reaction) =>{
                  
                    if(reaction.emoji.name === '✅' || message.author.id === bot.id) {
            
                        loadmsg.reactions.removeAll()
            
                        loadmsg.edit(`⚙️ **|** Loading Template1... Please wait! Please do not touch the server!\n❓ **|** Setting Perms...\n${trueemoji} **|** 🟩🟩🟩⬜⬜`)
            
                        let tulajrole = guild.roles.cache.find(r => r.name === "Owner");
            
                        tulajrole.setPermissions(["ADMINISTRATOR"])

                        let botrole = guild.roles.cache.find(r => r.name === "Bot");
            
                        botrole.setPermissions(["ADMINISTRATOR"])
            
                        let Tulaj = message.author.id
                        message.member.roles.add(tulajrole);
            
                        let adminrole = guild.roles.cache.find(r => r.name === "Admin");
            
                        adminrole.setPermissions(['BAN_MEMBERS', 'KICK_MEMBERS', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'EMBED_LINKS', 'ATTACH_FILES', 'MENTION_EVERYONE', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MANAGE_MESSAGES', 'MOVE_MEMBERS',   ])

                        let modrole = guild.roles.cache.find(r => r.name === "Mod");
            
                        modrole.setPermissions(['KICK_MEMBERS', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'EMBED_LINKS', 'ATTACH_FILES', 'MENTION_EVERYONE', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MANAGE_MESSAGES', 'MOVE_MEMBERS',   ])
            
                        let tagrole = guild.roles.cache.find(r => r.name === "Member");
            
                        tagrole.setPermissions(['CREATE_INSTANT_INVITE'])
            
                        let allrole = guild.roles.everyone
            
                        allrole.setPermissions(['CREATE_INSTANT_INVITE'])

                        guild.members.cache.forEach( async(member) => {

                            member.roles.add(tagrole);

                            })
            
                        //channelperms
            
                        loadmsg.edit(`⚙️ **|** Loading Template1... Please wait! Please do not touch the server!\n❓ **|** Creating Channels...\n${trueemoji} **|** 🟩🟩🟩🟩⬜`)

                        setTimeout(function () {

                            message.guild.channels.create("===📢Informations📢===", { type: "GUILD_CATEGORY" })
                            message.guild.channels.create("===💥General💥===", { type: "GUILD_CATEGORY" })
                            message.guild.channels.create("===⛔staff section⛔===", { type: "GUILD_CATEGORY" })
            
                            setTimeout(function () {
            
                            infocategory = guild.channels.cache.find(cat=> cat.name == `===📢Informations📢===`)
            
                            altcategory = guild.channels.cache.find(cat=> cat.name == `===💥General💥===`)
            
                            staffcategory = guild.channels.cache.find(cat=> cat.name == `===⛔staff section⛔===`)
        
                        message.guild.channels.create('📗╿Rules', {
                            type: 'GUILD_TEXT',
                            parent: infocategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('👋╿Join', {
                            type: 'GUILD_TEXT',
                            parent: infocategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('📢╿News', {
                            type: 'GUILD_TEXT',
                            parent: infocategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('💖╿Boosts', {
                            type: 'GUILD_TEXT',
                            parent: infocategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('🤝╿Partners', {
                            type: 'GUILD_TEXT',
                            parent: infocategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('🌐╿Chat', {
                            type: 'GUILD_TEXT',
                            parent: altcategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('📟╿Bot-commands', {
                            type: 'GUILD_TEXT',
                            parent: altcategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('🔉╿Voice 1', {
                            type: 'GUILD_VOICE',
                            parent: altcategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM', 'USE_VAD'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('🔉╿Voice 2', {
                            type: 'GUILD_VOICE',
                            parent: altcategory.id,
                            permissionOverwrites: [
                                {
                                    id: tagrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM', 'USE_VAD'],
                                },
                            ],
                        });
        
                        message.guild.channels.create('⛔╿Staff-chat', {
                            type: 'GUILD_TEXT',
                            parent: staffcategory.id,
                            permissionOverwrites: [
                                {
                                    id: modrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM',],},{
                                    id: adminrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM',],
                             },
                            ],
                        });
        
                        message.guild.channels.create('⛔╿Test-commands', {
                            type: 'GUILD_TEXT',
                            parent: staffcategory.id,
                            permissionOverwrites: [
                                {
                                    id: modrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM',],},{
                                    id: adminrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM',],
                             },
                            ],
                        });
        
                        message.guild.channels.create('🔉╿Staff voice', {
                            type: 'GUILD_VOICE',
                            parent: staffcategory.id,
                            permissionOverwrites: [
                                {
                                    id: modrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM', 'USE_VAD'],},{
                                    id: adminrole,
                                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'SPEAK', 'CONNECT', 'STREAM', 'USE_VAD'],
                                },
                            ],
                        });

                        setTimeout(function () {
            
                            loadmsg.edit(`⚙️ **|** Template1 loaded! Failed to assign the rank ${botrole} to the bot(s), please replace the rank ${tagrole}\n❓ **|** The server can now be used!\n${trueemoji} **|** 🟩🟩🟩🟩🟩`)

                        }, 10000); 

                    }, 3000); 
        
                    }, 10000);
                    }
            
                    if(reaction.emoji.name === '❌') {
            
                            loadmsg.reactions.removeAll()
                            loadmsg.edit(`⚙️ **|** Loading Template1... Please wait! Please do not touch the server!\n❓ **|** Creating Channels...\n${trueemoji} **|** 🟩🟩🟩⬜⬜`)

                            message.guild.channels.create("===📢Informations📢===", { type: "GUILD_CATEGORY" })
                            message.guild.channels.create("===💥General💥===", { type: "GUILD_CATEGORY" })
                            message.guild.channels.create("===⛔staff section⛔===", { type: "GUILD_CATEGORY" })
            
                            setTimeout(function () {
            
                            infocategory = guild.channels.cache.find(cat=> cat.name == `===📢Informations📢===`)
            
                            altcategory = guild.channels.cache.find(cat=> cat.name == `===💥General💥===`)
            
                            staffcategory = guild.channels.cache.find(cat=> cat.name == `===⛔staff section⛔===`)
            
                            message.guild.channels.create('📗╿Rules', {
                                type: 'GUILD_TEXT',
                                parent: infocategory.id,
                                /*permissionOverwrites: [
                                    {
                                        id: message.guild.roles.everyone,
                                        allow: ['VIEW_CHANNEL'],
                                    },
                                ],*/
                            });
            
                            message.guild.channels.create('👋╿Join', {
                                type: 'GUILD_TEXT',
                                parent: infocategory.id,
                            });
            
                            message.guild.channels.create('📢╿News', {
                                type: 'GUILD_TEXT',
                                parent: infocategory.id,
                            });
            
                            message.guild.channels.create('💖╿Boosts', {
                                type: 'GUILD_TEXT',
                                parent: infocategory.id,
                            });
            
                            message.guild.channels.create('🤝╿Partners', {
                                type: 'GUILD_TEXT',
                                parent: infocategory.id,
                            });
            
                            message.guild.channels.create('🌐╿Chat', {
                                type: 'GUILD_TEXT',
                                parent: altcategory.id,
                            });
            
                            message.guild.channels.create('📟╿Bot-commands', {
                                type: 'GUILD_TEXT',
                                parent: altcategory.id,
                            });
            
                            message.guild.channels.create('🔉╿Voice 1', {
                                type: 'GUILD_VOICE',
                                parent: altcategory.id,
                            });
            
                            message.guild.channels.create('🔉╿voice 2', {
                                type: 'GUILD_VOICE',
                                parent: altcategory.id,
                            });
            
                            message.guild.channels.create('⛔╿Staff-chat', {
                                type: 'GUILD_TEXT',
                                parent: staffcategory.id,
                            });
            
                            message.guild.channels.create('⛔╿Test-commands', {
                                type: 'GUILD_TEXT',
                                parent: staffcategory.id,
                            });
            
                            message.guild.channels.create('🔉╿Staff voice', {
                                type: 'GUILD_VOICE',
                                parent: staffcategory.id,
                            });
            
            
                            loadmsg.edit(`⚙️ **|** Loading Template1... Please wait! Please do not touch the server!\n❓ **|** Smoothing... Almost done!\n${trueemoji} **|** 🟩🟩🟩🟩⬜`)
            
                            setTimeout(function () {
            
                            loadmsg.edit(`⚙️ **|** Template1 loaded!\n❓ **|** The server can now be used!\n${trueemoji} **|** 🟩🟩🟩🟩🟩`)

                        }, 10000);
            
                        }, 10000);
                    }
                })
                        
                    }, 5000);

        }, 5000);

            }, 2000);

            }, 5000);

            } else {

                message.reply({ content: `⚙️ **|** Template 1\n\n❗**|** **Warning!** This command deletes all channels and creates new ones! \nIf you want to continue, type \`${prefix}template1 yes\` command.`,  files: ["./images/templates/temp1/english/channels.png", "./images/templates/temp1/english/roles.png"] })

            }

        }

    }

}