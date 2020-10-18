const Discord = require("discord.js");
module.exports.run = async (client, message, args ) =>{

    var kanal = message.channel;
    let tresc= args.join(" ")
    const ePermErr = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setAuthor("❌ Brakuje permisji!")
    .setDescription(`Nie moge wysłać wiadomości o treści ${tresc}, na serwerze ${message.guild.name}, poniewaz brakuje ci permisji **MANAGE_MESSAGES**. `)
    .setTimestamp();


    if(!tresc){
        kanal.send(`Podaj tresc!`)
    }else if(message.member.hasPermission("MANAGE_MESSAGES")){
        kanal.send(tresc);
        message.delete()
    }else{
        message.author.send(ePermErr);
    }


}

module.exports.help = {
    name: "say"
}