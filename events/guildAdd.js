const { client } = require("../index.js");

client.on("guildCreate", (server) => {
    console.log(`Dołączono na ${server.name}`);
})