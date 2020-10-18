const Discord = require("discord.js");
const superagent = require("superagent");


module.exports.run = async (client, message) =>{



    let {body} = await superagent
    .get('https://nekobot.xyz/api/image?type=food').catch((err) => {
    message.channel.send("Błąd z API!");
    return console.log(err);
    });

    try{
        let embed = new Discord.RichEmbed()
        .setColor(body.color)
        .setImage(body.message);
        message.channel.send(embed)
    } catch(err){
        message.channel.send("Wystąpił nieoczekiwany błąd z botem!");
        return console.log(err);
    }

}

module.exports.help = {
    name: "food",
}