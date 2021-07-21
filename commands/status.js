const Gamedig = require('gamedig');
const { MessageEmbed } = require("discord.js");
const randomColor = "#000000".replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });

module.exports.run = async (bot, message, args) => {
	message.delete();
    Gamedig.query({type: 'mtasa',host: '91.134.254.77',port: '22083'}).then((state) => {

            let players = state.players.map(player => player.name);
            let playerscore = state.players.map(player => player.score);

            let mtaEmbed = new MessageEmbed()
            .setColor(randomColor)
            .setAuthor('Advanced Roleplay 🔎')
            .addField(`≫ IP Adrese`, `${state.connect}`, true)
            .addField(`≫ Spēlētāju Skaits:`, `${state.players.length} no ${state.maxplayers}`)
            .addField(`≫ Spēlētāju Vārdi:`, players, true)
            .addField(`≫ Spēlētāju Stundas:`, playerscore, true)
            .setTimestamp(new Date())
            .setFooter(`${message.author.username}`, message.author.displayAvatarURL());
            message.channel.send(mtaEmbed).then(m => m.delete({timeout: 35000}));

        }).catch((error) => {

              let {guild} = message;
              let errorchat = bot.channels.cache.get('841949711774777381')

              let embed = new MessageEmbed()
              .setColor(randomColor)
              .setAuthor("⛔Jauns errors!⛔")
              .setTitle("mtarp.js")
              .setDescription(`No: **${guild.name}**\n Errors: **${error}**`)
              .setTimestamp(new Date());

              if (error == 'RangeError [EMBED_FIELD_VALUE]: MessageEmbed field values may not be empty.'){
              	message.reply(" - Šobrīd iekš MTA:RP servera nav neviens spēlētājs!")
              } else if (error == 'Failed all 1 attempts'){
                  console.log(error)
              	message.reply("Notika kļūda ar serveri/botu. Sazinies ar **N I K I T A#7777** lai uzzinātu vairāk!")
              }  else if (error == 'Failed all 2 attempts'){
                  console.log(error)
             	 message.reply("Notika kļūda ar serveri/botu. Sazinies ar **N I K I T A#7777** lai uzzinātu vairāk!")
              } else message.reply("Notika kļūda, sazinies ar **N I K I T A#7777**").then(errorchat.send(embed));
        });
}

module.exports.config = {
     name: "status",
     usage: "%status",
     aliases: ["status", "status" ]
}
