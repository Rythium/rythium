const Discord = require("discord.js");

module.exports = {

    name: "rule",

    category: "Alap",

    description: "bot válaszideje lekérése",

    run: async (bot, message, args, prefix, embedszin, trueemoji, falseemoji, arrow_left, setwelcome, cmdlang) => {
        if (!message.author.id === `762742605254754325`) return

        let xdembed = new Discord.MessageEmbed()
        .setTitle(':globe_with_meridians: **| Általános Szabályzat**')
        .setDescription(`1.1. - A szabályzat nem ismerete nem mentesít fel a büntetés alól.\n1.2. - A szabályzat mindenkire vonatkozik, senkivel sincsen kivételezés, még a Staffokkal sem.\n1.3. - A büntetést bármilyen módszerrel megkerülni tilos, és büntetés duplázás jár érte.\n1.4. - A szerverre belépve automatikusan elfogadod a szabályzatot.\n1.5. - Tilos a szervert, staff tagokat vagy <@758390170482901033>-t bárhol (discoron kívül is) lejáratni. (Például: lejárató videók készítése)\n1.6. - Amennyiben hibát vagy hiányosságot találsz a szerveren, kötelességed azonnal jelenteni a szerver staffok felé!\n1.7. - A Discord neved vagy beceneved nem tartalmazhat sértő, trágár vagy 18+ tartalmat!\n1.8. - Más személyes vagy privát adataivival visszaélni tilos. (Például: lakcím, telefonszám)`)
        .setColor(embedszin)
        .setThumbnail(bot.user.displayAvatarURL())

        let xd2embed = new Discord.MessageEmbed()
        .setTitle(':speech_balloon: **| Szöveges csatornákra vonatkozó Szabályzat**')
        .setDescription(`2.1. - Ne káromkodj vagy használj trágár kifejezéseket, szavakat.
        2.2. - Ne szidd vagy provokáld a többi szerver tagot, illetve a staffokat.\n2.3. - Ne ossz meg 18+, felnőtt vagy nem oda illő tartalmat.\n2.4. - Ne spammelj. (Értsd: ugyan az, vagy nagyon hasonló üzenet többszöri kiírása egymás után folyamatosan.)\n2.5. - Ne kéregess. (Például: Nitró, rang)\n2.6. - Tilos másik tagokat, vagy a szerver munkatársait zaklatni.\n2.7. - Ne küldj be scam, token grabber, vagy bármilyen adatlopó file-t vagy linket.\n2.8. - Tilos szándékosan megkerülni a káromkodásszűrőt!\n2.9. - Ne kérdőjelezd meg a staffok döntését.\n2.10. - Ne használd feleslegesen vagy indokolatlanul a caps lockot (nagybetűket)\n2.11. - Tilos bármilyen rasszista megnyilvánulás!`)
        .setColor(embedszin)

        let xd3embed = new Discord.MessageEmbed()
        .setTitle('🔉 **| Hangcsatornákra vonatkozó szabályzat**')
        .setDescription(`3.1. - A hangcsatornákban ne kiabálj.
        3.2. - Ne adj ki nem odaillő, 18+os hangot.
        3.3. - A kamerát csak saját felelősségre kapcsold be.
        3.4. - Ne káromkodj vagy használj trágár kifejezéseket, szavakat.
        3.7. - Ne szidd vagy provokáld a többi tagot vagy a staffokat.
        3.13. - Tilos bármilyen rasszista megnyílvánulás.`)
        .setColor(embedszin)

        let xd4embed = new Discord.MessageEmbed()
        .setTitle('💢 **| FAQ**')
        .setDescription(`- **Mikor kaphatok <@&1108467466830618735> rangot?** Amikor eléred a 20. levelt!`)
        .setColor(embedszin)
        .setFooter(`${bot.user.username} • Rules by <@762742605254754325>`, `${bot.user.displayAvatarURL()}`);

        message.channel.send(({embeds: [xdembed, xd2embed, xd3embed, xd4embed]}))

        message.delete()

    }

}