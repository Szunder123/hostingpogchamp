const Discord = require("discord.js");
var fs = require("fs");
const config = require("./config.json");

const client = new Discord.Client();

require("./functions.js")(client);
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if(jsfile.length <= 0){
        console.log("Wystąpił błąd bota! Folder ./commands/ jest pusty!");
    }

    jsfile.forEach((f) =>{
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name,props)
    })
})


client.on("ready",() => {
    console.log("Bot is ready!");
    client.user.setActivity("YouTube: Szunder",{type: 'WATCHING'});
})

client.on("message", async message =>{
    const mentioned = new Discord.RichEmbed()
    .setColor('#FF0000')
    .setAuthor(client.user.username, client.avatarURL)
    .setTitle(`Wykryto wzmianke bota!`)
    .setDescription(`Prefix \`%\`\nAutor: \`Szunder\``)
    .setTimestamp();

    let nocmd = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setTitle(`Nie ma takiej komendy!`)
    .setDescription(`Nie ma takiej komendy! Liste komend sprawdzisz na stronie: https://dblista.pl/bots/730360173985792052`)
    .setColor(`#FF0000`)
    .setThumbnail(message.author.avatarURL)
    .setFooter(`Szunder`, client.user.displayAvatarURL)
    .setTimestamp();

    if(message.isMentioned(client.user)) return message.channel.send(mentioned);

    if(message.content === "ping")return message.channel.send("Pong!");

    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);
    if(!commandfile) return message.channel.send(nocmd)
});




client.login(config.token);

module.exports = {
    client: client
}