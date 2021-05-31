import dotenv from 'dotenv';
import Discord from 'discord.js';
import moment from 'moment'
import { Name, Personality, generateName, generatePersonality, generateIdentity } from './generators/npc_generator'
dotenv.config();
import { FullCharacter, generateMBCharacter } from './generators/scvm_generator'
import { ErrantFullCharacter, generateErrantCharacter } from './generators/errant_generator'
import { FullDeadGirlCharacter, generateDeadGirlCharacter, generateDeadGirlLoot } from './generators/dead_girl_generator'
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

  const result: string = `**Name:** ${stringName} \n**Gender:** ${gender} \
  \n**Pronoun:** ${pronoun} \n**Attraction:** ${romanticAttraction}/${sexualAttraction} \
  \n**Aesthetic:** ${aesthetic} \n**Quirk:** ${quirk} \n**Virtue:** ${virtue} \
  \n**Trouble:** ${trouble}`

  return result
}

function generateScvm(): string {
  const scvm_npc: FullCharacter = generateMBCharacter();

  const result: string = `**Name:** ${scvm_npc.name} \n**Class:** ${scvm_npc.className} \
  \n**Background:** ${scvm_npc.classDescription}  ${scvm_npc.origin} \
  \n**Traits:** You are ${scvm_npc.terribleTraitA}, and ${scvm_npc.terribleTraitB} \
  \n**Hit Points:** ${scvm_npc.hitPoints}  ||  **Omens:** d${scvm_npc.omens} \
  \n**Strength:** ${scvm_npc.strength} \
  \n**Agility:** ${scvm_npc.agility} \
  \n**Presence:** ${scvm_npc.presence} \ 
  \n**Toughness:** ${scvm_npc.toughness} \
  \n**Weapon:** ${scvm_npc.weapon} \
  \n**Armor:** ${scvm_npc.armor && scvm_npc.armor} \
  \n**Features** \
  \n${scvm_npc.features.map(p => `**${p.featureName}**: ${p.featureDesc}`).join('\n')} \
  \n \
  \n**Companions & Vehicles** \
  \n${scvm_npc.companionVehicles.join('\n')}
  \n \
  \n**Equipment (Carrying Capacity: ${scvm_npc.inventoryCount} )** \
  \n${scvm_npc.equipment.map((e: string, i: number) => `**${i + 1}**: ${e}`).join('\n')}`

  return result
}

function generateDeadGirl(): string {
  const dead_girl_npc: FullDeadGirlCharacter = generateDeadGirlCharacter();

  const result: string = `**Name:** ${dead_girl_npc.name} \n**Class:** ${dead_girl_npc.className} \
  \n**Background:** ${dead_girl_npc.classDescription} \
  \n**Traits:** You have ${dead_girl_npc.scar}, and ${dead_girl_npc.graveMark} \
  \n**Hit Points:** ${dead_girl_npc.hitPoints}  ||  **Omens:** ${dead_girl_npc.omens} \
  \n**Strength:** ${dead_girl_npc.strength} \
  \n**Agility:** ${dead_girl_npc.agility} \
  \n**Presence:** ${dead_girl_npc.presence} \ 
  \n**Toughness:** ${dead_girl_npc.toughness} \
  \n**Weapon:** ${dead_girl_npc.weapon} \
  \n**Armor:** ${dead_girl_npc.armor && dead_girl_npc.armor} \
  \n**Features** \
  \n${dead_girl_npc.features.map(p => `**${p.featureName}**: ${p.featureDesc}`).join('\n')} \
  \n \
  \n**Companions & Vehicles** \
  \n${dead_girl_npc.companionVehicles.join('\n')} \
  \n \
  \n**Equipment (Carrying Capacity: ${dead_girl_npc.inventoryCount} )** \
  \n${dead_girl_npc.equipment.map((e: string, i: number) => `**${i + 1}**: ${e}`).join('\n')}`

  return result
}

function generateErrant(): string {
  const errant: ErrantFullCharacter = generateErrantCharacter();

  const result: string = `**Name:** ${errant.name}    **Pronouns:** ${errant.pronouns}    **Age:** ${errant.age} \
  \n**Archetype:** ${errant.archetype}    **Alignment:** ${errant.alignment}    **Failed Profession:** ${errant.failedProfession} \
  \n**Ancestry:** ${errant.ancestry}    **Keepsake:** ${errant.keepsake} \
  \n \
  \n**PHYS:** ${errant.phys}  **SKILL:** ${errant.skill}  **MIND:** ${errant.mind}  **PRES:** ${errant.pres} \
  \n**Damage Die**: ${errant.damageDie}    **Speed:** ${errant.speed}   **Encumberance:** ${errant.encumbrance}\
  \n**Hit Points**: ${errant.phys}    **Favour:** ${errant.pres - 8} \
  \n \
  \n**Features** \
  \n${errant.features.map(f => `${f}`).join('\n')} \
  \n \
  \n**Languages** \
  \n${errant.languages.map(lang => `${lang}`).join('\n')} \
  \n \
  \n**Equipment (Carrying Capacity: ${errant.phys} )** \
  \n${errant.inventory.map((e: string) => `${e}`).join('\n')}`

  return result
}

function getHelp(): string {
  const result: string = `**Roll-Character Help** \nRoll-Character generates random characters and npcs for various ttrpg purposes.\n \n \
User Commands \n \
  \`!help\`    calls for help, lists commands \n \
  \`!npc\`    generates a complex queer inclusive character. \n \
  \`!scvm\`    a teaser for ScvmBjörn, this generates a classless Mörk Borg character. \n \
  \`!errant\`    generates a character for Errant. \n \
  \`!exhumegirl\`    generates a dead-girl character for Dead Girls in Sarkash Forest.  \n \
  \`!exhumeloot [number]\`    generates loot, based on depth, for Dead Girls in Sarkash Forest. \n \n \
Thank you for using roll-character! \nFeel free to leave feedback at either of the following locations! \n \
    <https://kaylotura.itch.io/roll-character> \n \
    <https://github.com/KayLotura2/roll-character>`

  return result
}

client.on('ready', () => {
  console.log('Client Ready');
});

client.on('message', (msg: Discord.Message) => {
  const content = msg.content
  const channel = msg.channel as Discord.TextChannel;
  if (content === '!npc') {
    const npc = generateNPC();
    channel.send(npc);
    console.log(`${msg.guild} requested an npc at ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`)
  }
  if (content === '!scvm') {
    const scvm = generateScvm();
    channel.send(scvm);
    console.log(`${msg.guild} requested lowdown scvm at ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`)
  }
  if (content === '!exhumegirl') {
    const deadGirl = generateDeadGirl();
    channel.send(deadGirl);
    console.log(`${msg.guild} requested dead girl at ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`)
  }
  if (content.startsWith('!exhumeloot')) {
    const args: string[] = content.slice('!exhumeloot'.length).trim().split(' ');
    let parsed: number = parseInt(args[0]);
    let messageNote: string = ''
    if (isNaN(parsed) || parsed < 0 || parsed > 20) {
      parsed = 0
      messageNote = `"${args[0]}" is not a positive number between 0 and 20, returning Loot for Depth 0 \n`
    }
    const deadGirlLoot: string = `${messageNote} ${generateDeadGirlLoot(parsed)}`
    channel.send(deadGirlLoot);
    console.log(`${msg.guild} requested dead girl LOOT at ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`)
  }
  if (content === '!errant') {
    const errant = generateErrant();
    channel.send(errant);
    console.log(`${msg.guild} requested errant at ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`)
  }
  if (content === '!help') {
    const help = getHelp();
    channel.send(help);
    console.log(`${msg.guild} requested help at ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`)
  }
})
