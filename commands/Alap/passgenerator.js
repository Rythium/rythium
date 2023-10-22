const Discord = require("discord.js");

module.exports = {

    name: "passgenerator",

    category: "Alap",

    description: "random jelszó generálása",

    aliases: ['passgen'],

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji) => {

        var passgenkerdesspec = await message.reply(`❓️ **|** Szeretnél a jelszódba speciális karaktereket?\n\n✅ **|** Igen (**.**, **:**, **-**, **%**, **@**, **&**)\n❌ **|** Nem`)

        passgenkerdesspec.react("✅")
        passgenkerdesspec.react("❌")
      
        const filter = (reaction,user) => {
          return user.id === message.author.id;
      }
      
      const collector = passgenkerdesspec.createReactionCollector({
          filter,
          max: 1,
          time: 1000 * 60,
      })
      
      var passgenemojispec
      
      collector.on('collect', async(reaction) =>{
      
      passgenemojispec = reaction.emoji.name
      
        if(reaction.emoji.name === '✅') {
      
            var textspec = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.:-%@&";
          
            for (var i = 0; i < 15; i++)
              textspec += possible.charAt(Math.floor(Math.random() * possible.length));
      
            passgenkerdesspec.delete()
      
            var passgenkerdes = await message.reply(`❓️ **|** Hova szeretnéd kérni a jelszót?\n\n🔽 **|** Ide (${message.channel})\n📩 **|** Privátban`)
      
      passgenkerdes.react("🔽")
      passgenkerdes.react("📩")
      
      const filter = (reaction,user) => {
        return user.id === message.author.id;
      }
      
      const collector = passgenkerdes.createReactionCollector({
        filter,
        max: 1,
        time: 1000 * 60,
      })
      
      var passgenemoji
      
      collector.on('collect',(reaction) =>{
      
      passgenemoji = reaction.emoji.name
      
      if(reaction.emoji.name === '🔽') {
      
      passgenkerdes.delete()
      
      message.reply(`${trueemoji} **|** Generált jelszód: \`${textspec}\``);
      
      }
      
      if(reaction.emoji.name === '📩') {
      
        passgenkerdes.delete()
      
        try { 
      
        message.reply(`${trueemoji} **|** Generált jelszódat elküldtem privátban!`);
      
        message.author.send(`${trueemoji} **|** Generált jelszód: \`${textspec}\``);
      
      } catch  {
        message.reply(`${falseemoji} **|** Nem tudtam elküldeni neked a privát üzenetet!`);
      }
      
       }
      })
      
      collector.on('end',(collected) =>{
      
      if(passgenemoji === '🔽' || passgenemoji === '📩') {
      
      console.log(passgenemoji)
      
      } else {
      
      passgenkerdes.delete()
      
      message.reply(`${falseemoji} **|** Nem válaszöltál eléggé gyorsan, az időd lejárt!`);
      
      }
      
      })
      
        }
      
        if(reaction.emoji.name === '❌') {
      
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          
            for (var i = 0; i < 15; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
      
            passgenkerdesspec.delete()
      
            var passgenkerdes = await message.reply(`❓️ **|** Hova szeretnéd kérni a jelszót?\n\n🔽 **|** Ide (${message.channel})\n📩 **|** Privátban`)
      
      passgenkerdes.react("🔽")
      passgenkerdes.react("📩")
      
      const filter = (reaction,user) => {
        return user.id === message.author.id;
      }
      
      const collector = passgenkerdes.createReactionCollector({
        filter,
        max: 1,
        time: 1000 * 60,
      })
      
      var passgenemoji
      
      collector.on('collect',(reaction) =>{
      
      passgenemoji = reaction.emoji.name
      
      if(reaction.emoji.name === '🔽') {
      
      passgenkerdes.delete()
      
      message.reply(`${trueemoji} **|** Generált jelszód: \`${text}\``);
      
      }
      
      if(reaction.emoji.name === '📩') {
      
        passgenkerdes.delete()
      
        try { 
      
        message.reply(`${trueemoji} **|** Generált jelszódat elküldtem privátban!`);
      
        message.author.send(`${trueemoji} **|** Generált jelszód: \`${text}\``);
      
      } catch  {
        message.reply(`${falseemoji} **|** Nem tudtam elküldeni neked a privát üzenetet!`);
      }
      
       }
      })
      
      collector.on('end',(collected) =>{
      
      if(passgenemoji === '🔽' || passgenemoji === '📩') {
      
      console.log(passgenemoji)
      
      } else {
      
      passgenkerdes.delete()
      
      message.reply(`${trueemoji} **|** Nem válaszoltál eléggé gyorsan, az időd lejárt!`);
      
      }
      
      })
      
      
         }
      })
      
      collector.on('end',(collected) =>{
      
      if(passgenemojispec === '✅' || passgenemojispec === '❌') {
      
        console.log(passgenemojispec)
      
      } else {
      
        passgenkerdesspec.delete()
      
        message.reply(`${falseemoji} **|** Nem válaszoltál eléggé gyorsan, az időd lejárt!`);
      
      }
      
      })

    }

}