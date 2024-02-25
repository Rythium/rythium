/* const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
var akaneko = require("akaneko");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nsfw")
    .setDescription("Get random nsfw images.")
    .addStringOption((option) =>
      option
        .setName("choice")
        .setDescription("Your choice")
        .setRequired(true)
        .addChoices(
          { name: "ass", value: "ass" },
          { name: "bdsm", value: "bdsm" },
          { name: "blowjob", value: "blowjob" },
          { name: "cum", value: "cum" },
          { name: "doujin", value: "doujin" },
          { name: "feet", value: "feet" },
          { name: "femdom", value: "femdom" },
          { name: "foxgirl", value: "foxgirl" },
          { name: "gifs", value: "gifs" },
          { name: "glasses", value: "glasses" },
          { name: "hentai", value: "hentai" },
          { name: "netorare", value: "netorare" },
          { name: "maid", value: "maid" },
          { name: "masturbation", value: "masturbation" },
          { name: "orgy", value: "orgy" },
          { name: "panties", value: "panties" },
          { name: "pussy", value: "pussy" },
          { name: "school", value: "school" },
          { name: "succubus", value: "succubus" },
          { name: "tentacles", value: "tentacles" },
          { name: "thighs", value: "thighs" },
          { name: "uglyBastard", value: "uglyBastard" },
          { name: "uniform", value: "uniform" },
          { name: "yuri", value: "yuri" },
          { name: "zettaiRyouiki", value: "zettaiRyouiki" }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("quantity")
        .setDescription("Quantity of images")
        .setMinValue(2)
        .setMaxValue(10)
        .setRequired(true)
    ),
  run: async (client, interaction, config, langUS) => {
    if (!interaction.channel.nsfw)
      return interaction.reply(
        `${config.xmark} **|** This isn't an NSFW channel`
      );

    let pchoice = interaction.options.getString("choice");
    let am = interaction.options.getInteger("quantity");
    var embeds = [];
    const hub = await akaneko.nsfw[pchoice]();
    const asd1Embed = new EmbedBuilder()
      .setTitle(`Cute, isn't it?`)
      .setColor(config.embedszin)
      .setImage(hub);
    embeds.push(asd1Embed);

    for (let i = 0; i < am - 1; i++) {
      const hub = await akaneko.nsfw[pchoice]();
      const asd1Embed = new EmbedBuilder()
        .setColor(config.embedszin)
        .setImage(hub);
      embeds.push(asd1Embed);
    }
    interaction.reply({ embeds });
  },
};
 */