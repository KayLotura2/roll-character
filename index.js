import generateIdentity from "src/generators/archetype_generator"
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  console.log(generateIdentity())
});



bot.on('message', msg => {
  if (msg.content === '!npc') {
    msg.channel.send('I am building you an npc {NPC Goes Here}');
  }
});
