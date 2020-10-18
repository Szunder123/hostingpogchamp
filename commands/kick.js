const Discord = require("discord.js");


module.exports.run = async (_client, message, args) => {

    
    
    let bUser = message.guild.member(message.mentions.users.first());
    let bUserErrEmbed = new Discord.RichEmbed()
    .setAuthor("Wystąpił błąd.", message.author.iconURL)
    .setColor("#FF0000")
    .setDescription("Nie możesz wyrzucić podanego użytkownika, ponieważ ma za wysokie uprawnienia lub nie ma go na serwerze")
    .setThumbnail(message.guild.iconURL)
    .setFooter("Błąd użytkownika.")
    .setTimestamp();

    let bPermErr = new Discord.RichEmbed()
    .setAuthor("❌ Brakuje permisji!", message.author.iconURL)
    .setColor("#FF0000")
    .setDescription("Brakuje ci uprawnienia `KICK_MEMBERS`, aby wyrzucić "+ bUser)
    .setTimestamp();
    if(!bUser) return message.channel.send(bUserErrEmbed);
    let bReason = args.join(" ").slice(22);
    
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(bPermErr);
    if(bUser.hasPermission("KICK_MEMBERS")) return message.channel.send(bUserErrEmbed);
    

    let bSucces = new Discord.RichEmbed()
    .setColor("#00FF00")
    .addField("Wyrzucił:", message.author.username, true)
    .addField("Wyrzucony:", bUser,true)
    .addField("Wyrzucony za:", bReason, true)
    .addField("Wyrzucony o:", message.createdAt,false)
    .setTitle("Wyrzucanie użytkowników.")
    .setTimestamp();
    message.guild.member(bUser).kick(bReason);
    message.channel.send(bSucces);

    

}

module.exports.help = {
    name: "kick",

}