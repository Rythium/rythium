module.exports = (bot)=>{
    bot.on("ready", ()=>{
        console.log(`${bot.user.tag} started!`)
    })
}