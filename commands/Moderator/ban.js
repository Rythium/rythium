const Discord = require("discord.js");

module.exports = {

    name: "ban",

    category: "Moderator",

    description: "Ban parancs",

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang) => {

        if(cmdlang === `magyar`) {

        if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`${falseemoji} **|** Ehhez nincs jogod! \`BAN_MEMBERS\``)
        if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply(`${falseemoji} **|** Ehhez nincs jogom! \`BAN_MEMBERS\``)
        let ban_user =message.mentions.members.first();
        if(args[0]&& ban_user){
            if(args[1]){ 
            let ban_user2 = ban_user.user.tag
            var priviban = await ban_user.send(`Ki lettél tiltva a **${message.guild.name}** szerverről, **${message.author.tag}** által! Indok: **${args.slice(1).join(" ")}**`)
            var ban = await message.reply(`${trueemoji}  **|** **${ban_user2}** sikeresen ki lett tiltva a szerverről! Indok: **${args.slice(1).join(" ")}**`);
            try{
                ban_user.ban()
            }
            catch(e){
            priviban.delete()
            ban.delete()
            message.reply(`${falseemoji} **|** Failed to ban!`);
            }
            } else {
                let ban_user2 = ban_user.user.tag
                var priviban = await ban_user.send(`Ki lettél tiltva a **${message.guild.name}** szerverről, **${message.author.tag}** által! Indok: \`Nincs indok csatolva!\``)
                var ban = await message.reply(`${trueemoji}  **|** **${ban_user2}** sikeresen ki lett tiltva a szerverről! Indok: \`Nincs indok csatolva!\``);
                try{
                    ban_user.ban()
                }
                catch(e){
                priviban.delete()
                ban.delete()
                message.reply(`${falseemoji} **|** Failed to ban!`);
                }
            }
        } else {
            message.reply(`${falseemoji} **|** Adj meg egy felhasználót!`);
        }
       
        } else {
            if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`${falseemoji} **|** You don't have permission for that! \`BAN_MEMBERS\``)
            if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply(`${falseemoji} **|** I don't have permission for that! \`BAN_MEMBERS\``)
            let ban_user =message.mentions.members.first();
            if(args[0]&& ban_user){
                if(args[1]){ 
                let ban_user2 = ban_user.user.tag
                var priviban = await ban_user.send(`You have banned from **${message.guild.name}** server, by: **${message.author.tag}**! Reason: **${args.slice(1).join(" ")}**`)
                var ban = await message.reply(`${trueemoji}  **|** **${ban_user2}** was banned successfully! Reason: **${args.slice(1).join(" ")}**`);
                try{
                    ban_user.ban()
                }
                catch(e){
                priviban.delete()
                ban.delete()
                message.reply(`${falseemoji} **|** Failed to ban!`);
                }
                } else {
                    let ban_user2 = ban_user.user.tag
                    var priviban = await ban_user.send(`You have banned from **${message.guild.name}** server, by: **${message.author.tag}**! Reason: \`No reason attached!\``)
                    var ban = await message.reply(`${trueemoji}  **|** **${ban_user2}** was banned successfully! Reason: \`No reason attached!\``);
                    try{
                        ban_user.ban()
                    }
                    catch(e){
                    priviban.delete()
                    ban.delete()
                    message.reply(`${falseemoji} **|** Failed to ban!`);
                    }
                }
            } else {
                message.reply(`${falseemoji} **|** Please mention a user!`);
            }
           
        }
    }

}