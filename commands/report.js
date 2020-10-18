const Discord = require('discord.js');
const client = new Discord.Client()

module.exports.run = async (client, message, args) =>{

    message.delete();

    let reportowanyUser = message.mentions.members.first();

    if(!reportowanyUser) return message.reply('Nie widze takiego uzytkownika.')

    if(reportowanyUser.hasPermission("MANAGE_MESSAGES") || reportowanyUser.user.bot) return;

    if(!args[1]) return message.reply('podaj powod');

    const channel = message.guild.channels.find(c => c.name === "raports");

    if(!channel) return message.reply('wystapil blad');

    const reportEmbed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
    .setAuthor("Zgłoszony użytkownik", reportowanyUser.user.displayAvatarURL)
    .setThumbnail('http://cdn.rxpvp.pl/xmuffionex/AWPLOGO.gif')
    .setDescription(`**> Użytkownik:** ${reportowanyUser} (${reportowanyUser.user.id})\n**> Zgłoszony przez:** ${message.member}\n**> Zgłoszony w:** ${message.channel}\n**> Powód:** ${args.slice(1).join(" ")}`);

    return channel.send(reportEmbed);

}

module.exports.help = {
    name: "report"
}