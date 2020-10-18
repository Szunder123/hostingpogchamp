const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (client, message, args) =>{

    function czas(muteTime){
        const sec = Math.floor((ms /1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} dni, ${hrs.padStart(2, '0')} godzin, ${min.padStart(2,'0')} minut, ${sec.padStart(2,'0')} sekund.`;
    }

    let toMute = message.mentions.members.first();
    let muteRole = message.guild.roles.find('name', "Wyciszony");
    if(!toMute) return message.reply("Podaj uzytkownika do wyciszenia!");
    if(toMute.hasPermission("MANAGE_MESSAGES")) return message.reply("Podany uzytkownik ma za wysokie permisie")

    if(!muteRole){
        try{
            muteRole = await message.guild.createRole({
                name: "Wyciszony",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) =>{
                channel.overwritePermissions(muteRole,{
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                })
            })
        }catch(e){
            console.log(e.stack)
        }
    }

    let muteTime = args[1];
    if(!muteTime) return message.reply(`Nie podales na ile chcesz wyciszyć ${toMute}`)

    await(toMute.addRole(muteRole.id))
    message.reply(`${toMute.user.username} został wyciszony na ${czas(muteTime)}`)

    setTimeout(function(){
        toMute.removeRole(muteRole.id);
        message.channel.send(`${toMute.user.username} został odciszony`)
    }, ms(muteTime))

}

module.exports.help = {
    name: "mute",
}