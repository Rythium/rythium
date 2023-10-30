const Discord = require("discord.js");
module.exports = {
    name: "help",
    category: "alap",
    description: "help parancs",
    aliases: ['hölp'],
    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang) => { 

      if(cmdlang === `magyar`) {

        let lastdate = `2022.09.30. 22:10`
        let embed = new Discord.MessageEmbed()
  .setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL()})
  .setTitle(`<:rythium_logo:1007370415942938734> **|** Rythium help rendszer`)
  .setDescription(`\nPrefix: **${prefix}**\n\n**Nyelvváltoztatás:** ${prefix}language\n\n**Parancs segítség:** ${prefix}help <parancs neve>\n\n**Segítség jelölések:**\n<> - Kötelező megadni\n[] - Nem kötelező megadni\n\n**Útmutató:**\n\n📚 **|** Alap parancsok\n😂 **|** FUN parancsok\n🛠️ **|** Moderátor Parancsok\n⚙️ **|** Adminisztrátor parancsok\n💢 **|** Legújabb parancsok\n🗺️ **|** Kezdőlap (Jelenleg itt vagy!)\n\n🌐 **|** Utolsó frissítés: ${lastdate}`)
  .setThumbnail(bot.user.displayAvatarURL())
  .setTimestamp()
  .setFooter(`${bot.user.username} • Help`, `${bot.user.displayAvatarURL()}`)
  .setColor(embedszin)

  let reactionMessage = await message.reply(({embeds: [embed]}))

      try {
          await reactionMessage.react("📚");
          await reactionMessage.react("😂");
          await reactionMessage.react("🛠️");
          await reactionMessage.react("⚙️");
          await reactionMessage.react("💢");
          await reactionMessage.react("🗺️");
          
      } catch (err) {
          message.reply(`${falseemoji} **|** Hiba történt az emoji-k küldésekor!`);
          throw err;
      }

      const collector = reactionMessage.createReactionCollector(
          (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADD_REACTIONS"),
          { dispose: true}
      );

      collector.on("collect", (reaction, user) => {
          switch (reaction.emoji.name) {
              case "🛠️":
                  let modembed = new Discord.MessageEmbed()
                  .setTitle('🛠️ **|** Moderátor parancsok:')
                  .setDescription(`Ezek a parancsok a moderátorok számára van!`)
                  .setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL()})
                  .addFields(
                    { name: `${prefix}ban`, value: `Egy adott felhasználó kitiltása a szerverről.`, inline: true },
                    { name: `${prefix}kick`, value: `Egy adott felhasználó kidobása a szerverről.`, inline: true },
                    { name: `${prefix}say`, value: `Írj a bot nevében.`, inline: true },
                    //{ name: `${prefix}embedsay`, value: `Írj a bot nevében, embedben.`, inline: true },
                    { name: `${prefix}clear, ${prefix}torles`, value: `Egy adott mennyiségű üzenet törlése.`, inline: true },
                  )
                  .setColor(embedszin)
                  .setThumbnail(bot.user.displayAvatarURL())
                  .setTimestamp()
                  .setFooter(`${bot.user.username} • Help | Mod `, `${bot.user.displayAvatarURL()}`);
                  reactionMessage.edit(({embeds: [modembed]}))

                  break;

                  case "📚":
                  let altparancsokembed = new Discord.MessageEmbed()
                  .setTitle('📚 **|** Általános parancsok:')
                  .setDescription(`Ezekhez a parancsokhoz nem szükséges semmilyen küldönleges jog!`)
                  .setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL()})
                  .addFields(
                    { name: `${prefix}ping`, value: `Lekéri a bot válaszidejét.`, inline: true },
                    { name: `${prefix}passgen, ${prefix}passgenerator`, value: `Generál egy véletlenszerű jelszót.`, inline: true },
                    { name: `${prefix}geninvite`, value: `Meghívót készít egy adott bot-hoz.`, inline: true },
                    { name: `${prefix}javaslat`, value: `Javaslat/hiba küldése a tulajnak.`, inline: true },
                    { name: `${prefix}botinfo, ${prefix}boti`, value: `Rythium botról információk!`, inline: true },
                  )
                  .setColor(embedszin)
                  .setThumbnail(bot.user.displayAvatarURL())
                  .setTimestamp()
                  .setFooter(`${bot.user.username} • Help | Általános`, `${bot.user.displayAvatarURL()}`);
                  reactionMessage.edit(({embeds: [altparancsokembed]}))

              break;
              
              case "😂":
                  let funEmbed = new Discord.MessageEmbed()
                  .setTitle('😂 **|** FUN parancsok:')
                  .setDescription(`Vicces parancsok`)
                  .setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL()})
                  .addFields(
                    { name: `${prefix}meme`, value: `Lekér egy mémet.`, inline: true },
                    { name: `${prefix}cat`, value: `Lekér egy cicás képet.`, inline: true },
                  )
                  .setColor(embedszin)
                  .setThumbnail(bot.user.displayAvatarURL())
                  .setTimestamp()
                  .setFooter(`${bot.user.username} • Help | FUN`, `${bot.user.displayAvatarURL()}`);
                  reactionMessage.edit(({embeds: [funEmbed]}))

              break;

              case "⚙️":
                let adembed = new Discord.MessageEmbed()
                .setTitle('🛠️ **|** Adminisztrátor parancsok:')
                .setDescription(`Ezek a parancsok azok van akiknek van Adminisztrátor joguk!`)
                .setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL()})
                .addFields(
                  { name: `${prefix}setprefix, ${prefix}prefix`, value: `A bot prefix átállítása.`, inline: true },
                  { name: `${prefix}setwelcome, ${prefix}sw`, value: `Üdvözlő rendszer bekapcsolása.`, inline: true },
                  { name: `${prefix}autorole, ${prefix}ar`, value: `Autorole rendszer bekapcsolása.`, inline: true },
                  { name: `${prefix}template1, ${prefix}temp1`, value: `Alap csatornák és rangok létrehozása egy paranccsal.`, inline: true },
                  { name: `${prefix}kickall`, value: `Az összes tag kirugása a szerverről`, inline: true },
                  { name: `${prefix}ticket`, value: `Ticket rendszer bekapcsolása.`, inline: true },
                )
                .setColor(embedszin)
                .setThumbnail(bot.user.displayAvatarURL())
                .setTimestamp()
                .setFooter(`${bot.user.username} • Help | Administrator `, `${bot.user.displayAvatarURL()}`);
                reactionMessage.edit(({embeds: [adembed]}))

                break;

                case "💢":
                    let newembed = new Discord.MessageEmbed()
                    .setTitle('💢 **|** Legújabb parancsok:')
                    .setDescription(`Itt láthatóak azok a parancsok, amik mostanában kerültek bele a botba!`)
                    .setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL()})
                    .addFields(
                      { name: `${prefix}javaslat`, value: `Javaslat/hiba küldése a tulajnak. \`09.30.\``, inline: true },
                      { name: `${prefix}botinfo, ${prefix}boti`, value: `Rythium botról információk! \`10.01.\``, inline: true },
                      { name: `${prefix}template1, ${prefix}temp1`, value: `Alap csatornák és rangok létrehozása egy paranccsal. \`11.12.\``, inline: true },
                      { name: `${prefix}kickall`, value: `Az összes tag kirugása a szerverről \`11.24.\``, inline: true },
                      { name: `${prefix}autorole, ${prefix}ar`, value: `Autorole rendszer bekapcsolása. \`03.29.\``, inline: true },
                      { name: `${prefix}ticket`, value: `Ticket rendszer bekapcsolása. \`04.03.\``, inline: true },
                    )
                    .setColor(embedszin)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter(`${bot.user.username} • Help | New `, `${bot.user.displayAvatarURL()}`);
                    reactionMessage.edit(({embeds: [newembed]}))
    
                    break;
    

              case "🗺️":
                  reactionMessage.edit(({embeds: [embed]}))
              break;

          }
      });


    
    } else {

      let lastdate = `2022.09.30. 22:10`
      let embed = new Discord.MessageEmbed()
.setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL()})
.setTitle(`<:rythium_logo:1007370415942938734> **|** Rythium help system`)
.setDescription(`\nPrefix: **${prefix}**\n\n**Language change:** ${prefix}language\n\n**Command help:** ${prefix}help <command name>\n\n**Help marks:**\n<> - Required\n[] - Not required\n\n**Guide:**\n\n📚 **|** Basic commands\n😂 **|** FUN commands\n🛠️ **|** Moderator commands\n⚙️ **|** Administrator commands\n💢 **|** Latest commands\n🗺️ **|** Home page (You are here!)\n\n🌐 **|** Last updates: ${lastdate}`)
.setThumbnail(bot.user.displayAvatarURL())
.setTimestamp()
.setFooter(`${bot.user.username} • Help`, `${bot.user.displayAvatarURL()}`)
.setColor(embedszin)

let reactionMessage = await message.reply(({embeds: [embed]}))

    try {
        await reactionMessage.react("📚");
        await reactionMessage.react("😂");
        await reactionMessage.react("🛠️");
        await reactionMessage.react("⚙️");
        await reactionMessage.react("💢");
        await reactionMessage.react("🗺️");
        
    } catch (err) {
        message.reply(`${falseemoji} **|** There was an error sending emojis!`);
        throw err;
    }

    const collector = reactionMessage.createReactionCollector(
        (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADD_REACTIONS"),
        { dispose: true}
    );

    collector.on("collect", (reaction, user) => {
        switch (reaction.emoji.name) {
            case "🛠️":
                let modembed = new Discord.MessageEmbed()
                .setTitle('🛠️ **|** Moderator commands:')
                .setDescription(`These commands are for moderators!`)
                .setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL()})
                .addFields(
                  { name: `${prefix}ban`, value: `Banning a specific user from the server.`, inline: true },
                  { name: `${prefix}kick`, value: `Kicking a specific user from the server.`, inline: true },
                  { name: `${prefix}say`, value: `Write on behalf of the bot.`, inline: true },
                  //{ name: `${prefix}embedsay`, value: `Write on behalf of the bot in embed.`, inline: true },
                  { name: `${prefix}clear`, value: `Delete a certain amount of messages.`, inline: true },
                )
                .setColor(embedszin)
                .setThumbnail(bot.user.displayAvatarURL())
                .setTimestamp()
                .setFooter(`${bot.user.username} • Help | Mod `, `${bot.user.displayAvatarURL()}`);
                reactionMessage.edit(({embeds: [modembed]}))

                break;

                case "📚":
                let altparancsokembed = new Discord.MessageEmbed()
                .setTitle('📚 **|** General commands:')
                .setDescription(`These commands do not require any special permission!`)
                .setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL()})
                .addFields(
                  { name: `${prefix}ping`, value: `Get the response time of the bot.`, inline: true },
                  { name: `${prefix}passgen, ${prefix}passgenerator`, value: `Generate a random password. \`Only working with Hungarian language\``, inline: true },
                  { name: `${prefix}geninvite`, value: `Creates an invite for a specific bot.`, inline: true },
                  { name: `${prefix}javaslat`, value: `Send a suggestion/error to the owner. \`Only working with Hungarian language\``, inline: true },
                  { name: `${prefix}botinfo, ${prefix}boti`, value: `Information about the Rythium bot!`, inline: true },
                )
                .setColor(embedszin)
                .setThumbnail(bot.user.displayAvatarURL())
                .setTimestamp()
                .setFooter(`${bot.user.username} • Help | Általános`, `${bot.user.displayAvatarURL()}`);
                reactionMessage.edit(({embeds: [altparancsokembed]}))

            break;
            
            case "😂":
                let funEmbed = new Discord.MessageEmbed()
                .setTitle('😂 **|** FUN commands:')
                .setDescription(`Funny commands`)
                .setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL()})
                .addFields(
                  { name: `${prefix}meme`, value: `Get a meme.`, inline: true },
                  { name: `${prefix}cat`, value: `Get a picture of a cat.`, inline: true },
                )
                .setColor(embedszin)
                .setThumbnail(bot.user.displayAvatarURL())
                .setTimestamp()
                .setFooter(`${bot.user.username} • Help | FUN`, `${bot.user.displayAvatarURL()}`);
                reactionMessage.edit(({embeds: [funEmbed]}))

            break;

            case "⚙️":
              let adembed = new Discord.MessageEmbed()
              .setTitle('🛠️ **|** Administrator commands:')
              .setDescription(`These commands are for those who have Administrator permission!`)
              .setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL()})
              .addFields(
                { name: `${prefix}setprefix, ${prefix}prefix`, value: `Change the bot's prefix.`, inline: true },
                { name: `${prefix}setwelcome, ${prefix}sw`, value: `Turn on the welcome system.`, inline: true },
                { name: `${prefix}autorole, ${prefix}ar`, value: `Turn on the Autorole system.`, inline: true },
                { name: `${prefix}template1, ${prefix}temp1`, value: `Create basic channels and ranks with one command.`, inline: true },
                { name: `${prefix}kickall`, value: `Kick all of the members from the server.`, inline: true },
                { name: `${prefix}ticket`, value: `Turn on the Ticket system.`, inline: true },
              )
              .setColor(embedszin)
              .setThumbnail(bot.user.displayAvatarURL())
              .setTimestamp()
              .setFooter(`${bot.user.username} • Help | Administrator `, `${bot.user.displayAvatarURL()}`);
              reactionMessage.edit(({embeds: [adembed]}))

              break;

              case "💢":
                  let newembed = new Discord.MessageEmbed()
                  .setTitle('💢 **|** Latest commands:')
                  .setDescription(`Here you can see the commands that have recently been added to the bot!`)
                  .setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL()})
                  .addFields(
                    { name: `${prefix}javaslat`, value: `Send a suggestion/error to the owner. \`Only working with Hungarian language\` \`09.30.\``, inline: true },
                    { name: `${prefix}botinfo, ${prefix}boti`, value: `Information about the Rythium bot! \`10.01.\``, inline: true },
                    { name: `${prefix}template1, ${prefix}temp1`, value: `Create basic channels and ranks with one command. \`11.12.\``, inline: true },
                    { name: `${prefix}kickall`, value: `Kick all of the members from the server. \`11.24.\``, inline: true },
                    { name: `${prefix}autorole, ${prefix}ar`, value: `Turn on the Autorole system. \`03.29.\``, inline: true },
                    { name: `${prefix}ticket`, value: `Turn on the Ticket system. \`04.03.\``, inline: true },
                  )
                  .setColor(embedszin)
                  .setThumbnail(bot.user.displayAvatarURL())
                  .setTimestamp()
                  .setFooter(`${bot.user.username} • Help | New `, `${bot.user.displayAvatarURL()}`);
                  reactionMessage.edit(({embeds: [newembed]}))
  
                  break;
  

            case "🗺️":
                reactionMessage.edit(({embeds: [embed]}))
            break;

        }
    });

    }



      let arg = args.join(" ");

      if(arg){
        if(!arg === `javaslat` || !arg === `geninvite` || !arg === `ban`){
            reactionMessage.delete()
            message.reply(`${falseemoji} **|** Nem található ehhez a parancshoz leírás!`)
        }
      }

      if(arg === `javaslat`) {
        reactionMessage.delete()
        message.reply(`❓ **|** Javaslat parancs használata: \`${prefix}${arg} <javaslatod>\``)
      }

      if(arg === `geninvite`) {
        reactionMessage.delete()
        message.reply(`❓ **|** Geninvite parancs használata: \`${prefix}${arg} <@bot>\``)
      }

      if(arg === `ban`) {
        reactionMessage.delete()
        message.reply(`❓ **|** Ban parancs használata: \`${prefix}${arg} <@felhasználó> [indok]\``)
      }

      if(arg === `kick`) {
        reactionMessage.delete()
        message.reply(`❓ **|** Kick parancs használata: \`${prefix}${arg} <@felhasználó> [indok]\``)
      }

      if(arg === `say`) {
        reactionMessage.delete()
        message.reply(`❓ **|** Say parancs használata: \`${prefix}${arg} <szöveg>\``)
      }

      if(arg === `embedsay`) {
        reactionMessage.delete()
        message.reply(`❓ **|** Embedsay parancs használata: \`${prefix}${arg} <szöveg>\`:`)
      }

      if(arg === `clear`) {
        reactionMessage.delete()
        message.reply(`❓ **|** Clear parancs használata: \`${prefix}${arg} <1-100>\``)
      }

      if(arg === `setprefix` || arg === `prefix`) {
        reactionMessage.delete()
        message.reply(`❓ **|** Setprefix parancs használata: \`${prefix}${arg} <új prefix>\``)
      }

      if(arg === `setwelcome` || arg === `sw`) {
        reactionMessage.delete()
        message.reply(`❓ **|** Setwelcome parancs használata: \`${prefix}${arg} <be/ki> <#csatorna> \``)
      }

    }
}