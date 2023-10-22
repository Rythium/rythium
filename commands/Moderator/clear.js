const Discord = require("discord.js");

module.exports = {

    name: "clear",

    category: "mod",

    description: "üzenetek törlése",

    aliases: ['torles'],

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang) => {

      if(cmdlang === `magyar`) {

        if(!message.member.permissions.has("MANAGE_MESSAGES"))
        return message.reply(`${falseemoji} **|** Ehhez nincs jogod! \`MANAGE_MESSAGES\``);
        if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply(`${falseemoji} **|** Ehhez nincs jogom! \`MANAGE_MESSAGES\``)
        if (!isNaN(message.content.split(' ')[1])) {
        let amount = 0;
        if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
          amount = 1;} 
        else {
          amount = message.content.split(' ')[1];
        if (amount > 100) {
          amount = 100;}}
        await message.channel.bulkDelete(amount, true).then((_message) => {
      message.channel.send(`${trueemoji} **|** Az üzenetek törölve lettek!`).then((sent) => {
            setTimeout(function () {
      sent.delete();
      }, 5000);});});} 
        else {
      message.reply(`${falseemoji} **|** Hiba! Kérlek add meg a kivánt mennyiséget! (1-100)`)
        }

      } else {
        if(!message.member.permissions.has("MANAGE_MESSAGES"))
        return message.reply(`${falseemoji} **|** You don't have permission for that! \`MANAGE_MESSAGES\``);
        if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply(`${falseemoji} **|** I don't have permission for that \`MANAGE_MESSAGES\``)
        if (!isNaN(message.content.split(' ')[1])) {
        let amount = 0;
        if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
          amount = 1;} 
        else {
          amount = message.content.split(' ')[1];
        if (amount > 100) {
          amount = 100;}}
        await message.channel.bulkDelete(amount, true).then((_message) => {
      message.channel.send(`${trueemoji} **|**The messages have been deleted!`).then((sent) => {
            setTimeout(function () {
      sent.delete();
      }, 5000);});});} 
        else {
      message.reply(`${falseemoji} **|** Error! Please enter the desired quantity! (1-100)`)
        }
      }

    }

}