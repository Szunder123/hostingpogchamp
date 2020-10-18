const { client } = require("../index.js");
client.on("guildMemberAdd", (member) => {
    console.log(`Dolaczyl na serwer ${member.displayName}`)
})