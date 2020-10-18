var fs = require("fs");

module.exports =() =>{
    fs.readdir("./events/", (err, files) => {
        if(err) return console.log("Wystąpił błąd z plikiem functions.js");

        let jsfiles = files.filter(f => f.split(".").pop() === "js");

        if(jsfiles <= 0) return console.log("Katalog `events` jest pusty!");
        console.log(`Ładowanie ${jsfiles.length} eventów. Prosze czekać`);

        jsfiles.forEach((f, i) => {
            require("./events/"+ f);
            console.log(`» ${i +1}. ${f} został załadowany!`);
        });
    })
}