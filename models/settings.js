// We grab Schema and model from mongoose library.
const {
  welcomech,
  autorole,
  tchannel,
  tickets,
  lang,
} = require("../defaults.json");
const { Schema, model } = require("mongoose");

// We declare new schema.
const guildSettingSchema = new Schema({
  guildID: {
    type: String,
  },
  swchannel: {
    type: String,
    default: swchannel,
  },
  lang: {
    type: String,
    default: "magyar",
  },
});

// We export it as a mongoose model.
module.exports = model("guild_settings", guildSettingSchema);
