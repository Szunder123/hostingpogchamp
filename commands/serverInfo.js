const Discord = require("discord.js");

module.exports.run = async (_client, message) =>{

    if(!message.guild.afkChannelID){
        message.guild.afkChannelID = "Gildia nie ma kanalu AFK!"
    }

    const infoEmbed = new Discord.RichEmbed()
    .setColor("#00FF00")
    .setAuthor("Informacje o serwerze " + message.guild.name,message.guild.iconURL)
    .addField("ID gildi:", message.guild.id,true)
    .addField("ID kanału AFK:", message.guild.afkChannelID, true)
    .addField("Utworzony:", message.guild.createdAt, true)
    .addField("Właściciel:", message.guild.owner, true)
    .addField("Ilość członków:", message.guild.memberCount, true)
    .setTimestamp();

    message.channel.send(infoEmbed);
}

module.exports.help = {
    name: "server-info"
}