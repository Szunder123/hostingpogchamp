const { RichEmbed } = require('discord.js');

module.exports.run = async(client, message, args)=>{

    let errEmbed = new RichEmbed()
    .setColor('#FF0000')
    .setTitle(`❌ Błąd składni.`)
    .setDescription(`Przepraszam, jednak twoje polecenie jest nie pełne. Proszę abyś podał tekst do ankiety.`)
    .setFooter('SzunderBOT')
    .setTimestamp();

    let permEmbed = new RichEmbed()
    .setColor(`#FF0000`)
    .setTitle(`❌ Błąd uprawnien`)
    .setDescription(`Przepraszam, brakuje ci permisji \`MANAGE_MESSAGES\``)
    .setFooter(`SzunderBOT`)
    .setTimestamp();

    var x = message.channel;
    
    if(!message.member.hasPermission('MANAGE_MESSAGES')) x.send(permEmbed);
    
    let tresc = args.join(" ");
    if(!tresc) x.send(errEmbed);

    let ankieta = new RichEmbed()
    .setColor('#00FF00')
    .setAuthor('Ankieta', `https://images-ext-1.discordapp.net/external/paR8KRmQGtAV28lvGxiGp2wBztm0DqmF6w5_R-oiVZc/%3Fv%3D1/https/cdn.discordapp.com/emojis/555818949296521256.gif`)
    .setDescription(tresc)
    .setFooter(`Invoked by ${message.author.id}`)
    .setTimestamp();

    x.send(ankieta).then(async embedMessage =>{
        await embedMessage.react('👍')
        await embedMessage.react('👎')
    })

}

module.exports.help = {
    name: "ankieta"
}