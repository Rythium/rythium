const Discord = require("discord.js");

module.exports = {

    name: "kick",

    category: "Mod",

    description: "Kick parancs",

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang) => {
        
        if(cmdlang === `magyar`) {

        if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send(`${falseemoji} **|** Ehhez nincs jogod! \`KICK_MEMBERS\``)
        if(!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply(`${falseemoji} **|** Ehhez nincs jogom! \`KICK_MEMBERS\``)
        let kick_user =message.mentions.members.first();
        if(args[0]&& kick_user){
            if(args[1]){ 
            let kick_user2 = kick_user.user.tag
            var privikick = await kick_user.send(`Ki lettél dobva a **${message.guild.name}** szerverről, **${message.author.tag}** által! Indok: **${args.slice(1).join(" ")}**`)
            var kick = await message.reply(`${trueemoji}  **|** **${kick_user2}** sikeresen ki lett rúgva a szerverről! Indok: **${args.slice(1).join(" ")}**`);
            try{
                kick_user.kick()
            }
            catch(e){
            privikick.delete()
            kick.delete()
            message.reply(`${falseemoji} **|** Nem sikerült kidobni!`);
            }
            } else {
                let kick_user2 = kick_user.user.tag
                var privikick = await kick_user.send(`Ki lettél dobva a **${message.guild.name}** szerverről, **${message.author.tag}** által! Indok: \`Nincs indok csatolva!\``)
                var kick = await message.reply(`${trueemoji}  **|** **${kick_user2}** sikeresen ki lett rúgva a szerverről! Indok: \`Nincs indok csatolva!\``);
                try{
                    kick_user.kick()
                }
                catch(e){
                privikick.delete()
                kick.delete()
                message.reply(`${falseemoji} **|** Nem sikerült kidobni!`);
                }
            }
        } else {
            message.reply(`${falseemoji} **|** Adj meg egy felhasználót!`);
        }

    } else {
        if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send(`${falseemoji} **|** You don't have permission for that!! \`KICK_MEMBERS\``)
        if(!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply(`${falseemoji} **|** I don't have permission for that!! \`KICK_MEMBERS\``)
        let kick_user =message.mentions.members.first();
        if(args[0]&& kick_user){
            if(args[1]){ 
            let kick_user2 = kick_user.user.tag
            var privikick = await kick_user.send(`You have kicked from **${message.guild.name}** server, by: **${message.author.tag}**! Reason: **${args.slice(1).join(" ")}**`)
            var kick = await message.reply(`${trueemoji}  **|** **${ban_user2}** was kicked successfully! Reason: **${args.slice(1).join(" ")}**`);
            try{
                kick_user.kick()
            }
            catch(e){
            privikick.delete()
            kick.delete()
            message.reply(`${falseemoji} **|** Failed to kick!`);
            }
            } else {
                let kick_user2 = kick_user.user.tag
                var privikick = await kick_user.send(`You have kicked from **${message.guild.name}** server, by: **${message.author.tag}**! Reason: \`No reason attached!\``)
                var kick = await message.reply(`${trueemoji}  **|** **${ban_user2}** was kicked successfully! Reason: \`No reason attached!\``);
                try{
                    kick_user.kick()
                }
                catch(e){
                privikick.delete()
                kick.delete()
                message.reply(`${falseemoji} **|** Failed to kick!`);
                }
            }
        } else {
            message.reply(`${falseemoji} **|** Please mention a user!`);
        }
    }

    }

}