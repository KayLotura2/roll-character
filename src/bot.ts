import dotenv from 'dotenv';
import Discord from 'discord.js';
import {Name, Personality, Identity, generateName, generatePersonality, generateIdentity} from './generators/archetype_generator'
dotenv.config();
const client = new Discord.Client();
client.login(process.env.TOKEN);

function generateNPC(): string {
  // make a name
  const name: Name = generateName()
  const stringName: string = `${name.firstName} ${name.secondName} ${name.thirdName} ${name.fourthName}`
  // make a personality
  const personality: Personality = generatePersonality()
  const aesthetic: string = personality.aesthetic
  const quirk: string = personality.quirk
  const trouble: string = personality.trouble
  const virtue: string = personality.virtue
  // make an identity
  const identity = generateIdentity()
  const gender: string = identity.gender
  const pronoun: string = identity.pronoun
  const sexualAttraction: string = identity.sexualAttraction
  const romanticAttraction: string = identity.romanticAttraction


  return `**Name:** ${stringName} \n**Gender:** ${gender} \
\n**Pronoun:** ${pronoun} \n**Attraction:** ${romanticAttraction}/${sexualAttraction} \
 \n**Aesthetic:** ${aesthetic} \n**Quirk:** ${quirk} \n**Virtue:** ${virtue} \
\n**Trouble:** ${trouble}`
}


client.on('ready', () => {
  console.log('Here I am, rock you like a hurricane!');
});

client.on('message', (msg) => {
  const content = msg.content
  const channel = msg.channel as Discord.TextChannel
  if (content === '!npc') {
    const npc = generateNPC();
    channel.send(npc)
  }
})
