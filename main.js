const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const snekfetch = require('snekfetch');
const { token, prefix } = require('./configs/config.json');
const { red, green, blue, yellow, magenta } = require('./configs/colors.json');
const config = require('./configs/config.json');
const randomColor = "#000000".replace(/0/g, function() {
  return (~~(Math.random() * 16)).toString(16);
});

bot.on('ready', () => {
  console.log(`${bot.user.tag} tika startēts!`);
  bot.user.setStatus('online')


     // Status //
    let statuses = [
      `Advanced-RP.lv | -status`
    ];
    setInterval(function(){
        let status = statuses[Math.floor(Math.random() * statuses.length)]
        bot.user.setActivity(status, {type: "PLAYING"});
    }, 4000);

  //       Command handler       //
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
         return console.log("Komandas netika atrastas!");
    }
    console.log(`\n${jsfile} tika ielādēti!\n`)

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
            });
        });
    });
});


bot.on("message", async message => {
    
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);


    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if(commandfile) commandfile.run(bot, message, args);
});
  
bot.login(token);
