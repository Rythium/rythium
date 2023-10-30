const { getUserBanner } = require("discord-banner");
const { createCanvas } = require('canvas')

module.exports = (async (id) => {

    var banner = await getUserBanner(id, {
      token: require("../config.json").token,
    })

    //console.log(banner)

    var out = "";

    if (!banner.url || banner.url == null) {

      const canvas = createCanvas(1, 1)
      const context = canvas.getContext('2d')


      context.fillStyle = banner.color
      context.fillRect(0, 0, 1, 1)

      out = canvas.toDataURL()
    } else {
      out = banner.url
    }


    return out;

  })