import * as classJSON from '../SCVM/class.json';
import * as gearJSON from '../SCVM/gear.json';
import * as namesJSON from '../JSON/name.json';
import * as terribleTraitsJSON from '../SCVM/terribleTraits.json';
import { randomizer, dieRoll, diceRoll, randomizerCount, flipCoin } from './randomizers';

// Structure of typed gear, such as Weapons, Armor, and Scrolls
export type TypedGear = {
  [key: string]: string[]
}

// Gear for Mörk Borg can be Equipment (carried items), Companions, Vehicles, or a Bag. 
export type EquipmentCVB = {
  equipment: string[],
  companionVehicleBag: string[],
}

// Structure of named abilities or features
export type Power = {
  featureName: string,
  featureDesc: string,
  featureEquipmentCVB: EquipmentCVB
};

// Structure of a Mörk Borg class 
export type CharClass = {
  desc: string,
  title: string[],
  origins: string[],
  silver: {
    numberDice: number,
    dieSize: number,
    multiplier: number
  },
  scrollType: string,
  omensDie: number,
  weaponDie: number,
  armorDie: number,
  reRollScroll: false,
  aglMod: number,
  preMod: number,
  strMod: number,
  tghMod: number,
  HD: number,
  features: Power[],
  powers: {
    number: number,
    listy: Power[],
  }
};

// Structure of full CharClass Object
export type CharClassObj = {
  className: string,
  charClass: CharClass
};

// Structure for a Full Character
export type FullCharacter = {
  name: string,
  className: string,
  classDescription: string,
  terribleTraitA: string,
  terribleTraitB: string,
  origin: string,
  hitPoints: number,
  strength: number,
  agility: number,
  presence: number,
  toughness: number,
  features: Power[],
  omens: number,
  equipment: string[],
  companionVehicles: string[],
  weapon: string,
  armor: string,
  inventoryCount: number
};

// Types of Scrolls
export enum ScrollType {
  ANY = 'ANY',
  NORMAL = 'NORMAL',
  NONE = 'NONE',
  FUNGAL = 'FUNGAL',
  OCHRE = 'OCHRE',
  SACRED = 'SACRED',
  SALT = 'SALT',
  UNCLEAN = 'UNCLEAN'
}

// Pull in JSON Objects
const armor: TypedGear = (<any>gearJSON).armor;
const charClasses: CharClassObj[] = (<any>classJSON).charClasses;
const gearA: string[] = (<any>gearJSON).gearA;
const names: string[] = (<any>namesJSON).names;
const scrolls: TypedGear = (<any>gearJSON).scrolls
const terribleTraits: string[] = (<any>terribleTraitsJSON).terribleTraits
const weapons: TypedGear = (<any>gearJSON).weapons;

/**
 * Returns a character name
 */
export function generateName(): string {
    return randomizer(names);
  }

/**
 * Returns a random character class.
 * @returns CharClassObj
 */
export function generateCharClass(): CharClassObj {

  const result: CharClassObj = randomizer(charClasses);

  return result;
}

/**
 * Rolls 3d6, adds bonuses, and returns ability score.
 * @param bonus number
 * @returns number
 */
export function generateAbility(bonus: number): number {
  const threeDSix: number = diceRoll(3, 6);
  const abilityTotal: number = threeDSix + bonus;

  let result: number = 0

  switch (abilityTotal) {
    case 1: case 2: case 3: case 4:
      result = -3;
      break;
    case 5: case 6:
      result = -2;
      break;
    case 7: case 8:
      result = -1;
      break;
    case 9: case 10: case 11: case 12:
      result = 0;
      break;
    case 13: case 14:
      result = 1;
      break;
    case 15: case 16:
      result = 2;
      break;
    case 17: case 18: case 19: case 20:
      result = 3
      break;
  }

  return result;
}

/**
 * Generates Carrying Gear, like a sack or donkey, or nothing but yer mitts and wits.
 * @returns string
 */
export function generateGearA(): EquipmentCVB {
  let gearARoll = dieRoll(6)
  let result: EquipmentCVB = {
    equipment: [],
    companionVehicleBag: [
      `${gearA[gearARoll - 1]}`
    ]
  };
  if (gearARoll === 6) result.companionVehicleBag.push(`Donkey, ${generateName()} [ Atk/Def 10 | bite d2 | 6 HP| Morale 7 | no armor ]`);

  return result
}

/**
 * Generates Scroll
 * @param scrollType ScrollType
 * @returns string
 */
export function generateScroll(scrollType: string): string {
  let result: string = 'Scroll Error...'
  if (scrollType == 'NONE') { return result };
  if (scrollType == 'ANY') { scrollType = randomizer(['UNCLEAN', 'SACRED', 'FUNGAL', 'OCHRE', 'SALT']) };

  switch (scrollType) {
    case ('NORMAL'):
      const holyScroll = flipCoin();
      if (holyScroll) {
        result = `Sacred Scroll of ${randomizer(scrolls.sacredScrolls)}`;
      } else {
        result = `Unclean Scroll of ${randomizer(scrolls.uncleanScrolls)}`;
      }
      break;
    case ('UNCLEAN'):
      result = `Unclean Scroll of ${randomizer(scrolls.uncleanScrolls)}`;
      break;
    case ('SACRED'):
      result = `Sacred Scroll of ${randomizer(scrolls.sacredScrolls)}`;
      break;
    case ('FUNGAL'):
      result = `Fungal Scroll of ${randomizer(scrolls.fungalScrolls)}`;
      break;
    case ('OCHRE'):
      result = `Ochre Tablet of ${randomizer(scrolls.ochreTablets)}`;
      break;
    case ('SALT'):
      result = `Salty Scroll of ${randomizer(scrolls.saltyWaterScrolls)}`;
      break;
  }
  console.log(result)
  return result
}

/**
 * Produces a viable religion for Setting...
 * @returns string
 */
export function generateReligion(): string {
  let result: string = 'religion Error...'
  const trveFaith = flipCoin();

  if (trveFaith) {
    result = 'The One Trve Faith';
  } else {
    // TODO: Move this to JSON
    const otherReligions: string[] = [
      'a curiously observant wick-head',
      'a false goblin idol',
      'a particularly strong pale-one',
      'a strange deamon of some sort',
      'an earthbound cult leader who claims to be a god',
      'IT, the Deep Leviathan of Salt',
      'MIND, The Unknowable Ochre Thinker',
      'MOON, keeper of dark secrets, arcane change, and miserable fungus',
      'some eldritch dead god long forgotten',
      'SUN, THESUNTHESUNTHESUN',
      'THEY, the Blasphemous one-headed Basilisk',
    ]
    result = randomizer(otherReligions);
  }
  return result;
}

/**
 * Generates Gear B: Some random junk you start with. 
 * @param presence number
 * @param scrollType string
 * @returns EquipmentCVB
 */
export function generateGearB(presence: number, scrollType: string): EquipmentCVB {

  let result: EquipmentCVB = {
    equipment: [],
    companionVehicleBag: []
  }
  let gearBRoll: number;

  if (scrollType == 'NONE') {
    gearBRoll = dieRoll(19);
  } else {
    gearBRoll = dieRoll(20);
  }

  switch (gearBRoll) {
    case 1:
      result.equipment.push('Rope (30ft)');
      break;
    case 2:
      const torchCount: number = 4 + presence
      result.equipment.push('Torches (x5)');
      if (torchCount > 5) {
        result.equipment.push(`Torches (x${torchCount - 5}`);
      }
      break;
    case 3:
      result.equipment.push('Lantern filled with 5 hours worth of oil');
      result.equipment.push(`Jar with (x${1 + presence}) hours of lantern oil`);
      break;
    case 4:
      result.equipment.push('Magnesium Strip');
      break;
    case 5:
      result.equipment.push('Sharp Needle');
      break;
    case 6:
      result.equipment.push(`Medicine Chest (${presence + 4} uses): Stops bleeding/infection and +d6 HP`);
      break;
    case 7:
      result.equipment.push('Metal file and lockpicks');
      break;
    case 8:
      result.equipment.push('Bear Trap: Presence DR 14 to spot, 1d8 damage');
      break;
    case 9:
      result.equipment.push('Bomb: sealed bottle, d10 damage');
      break;
    case 10:
      result.equipment.push(`Bottle of Red Poison (${dieRoll(4)} doses): Toughness DR12 or d10 damage`)
      break;
    case 11:
      result.equipment.push(`Silver Symbol of ${generateReligion()}`);
      break;
    case 12:
      result.equipment.push('Blanket');
      break;
    case 13:
      result.equipment.push('Firesteal');
      break;
    case 14:
      result.equipment.push(`Ergot Chew (${dieRoll(4) + 1} uses)`);
      break;
    case 15:
      result.equipment.push(`Salt (${dieRoll(4) + 1} uses)`);
      break;
    case 16:
      result.equipment.push(`Wooden Symbol of ${generateReligion()}`);
      break;
    case 17:
      result.equipment.push(`Chalk (${dieRoll(6)} sticks)`);
      break;
    case 18:
      result.equipment.push('Manacles');
      break;
    case 19:
      result.equipment.push(`Bottle of Black Poison (${dieRoll(4)} doses): Toughness DR14 or d6 damage + can't see for one hour.`);
      break;
    case 20:
      result.equipment.push(generateScroll(scrollType));
      break;
  }
  return result
}

/**
 * Generates Gear C: Some random junk you start with. 
 * @param presence number
 * @param scrollType string
 * @returns EquipmentCVB
 */
export function generateGearC(presence: number, scrollType: string): EquipmentCVB {

  let result: EquipmentCVB = {
    equipment: [],
    companionVehicleBag: []
  };
  let gearCRoll: number;

  if (scrollType == 'NONE') {
    gearCRoll = dieRoll(19);
  } else {
    gearCRoll = dieRoll(20);
  }

  switch (gearCRoll) {
    case 1:
      result.equipment.push(`Life Elixir (${dieRoll(4)} doses): heals d6 HP and removes infection`);
      break;
    case 2:
      result.companionVehicleBag.push(`Small but vicious dog only obeys you, ${generateName()} [Atk/Def 12 | bite d4 | ${dieRoll(6) + 2} HP | No armor ]`);
      break;
    case 3:
      const monkeyRoll = dieRoll(4);
      for (let i = 0; i < monkeyRoll; i++) {
        result.companionVehicleBag.push(`A monkey who loves but ignores you, ${generateName()} [Atk/Def 12 | punch d4 | ${dieRoll(4) + 2} HP | No armor ]`);
      }
      break;
    case 4:
      result.equipment.push(`Exquisite perfume (${dieRoll(4)} doses): worth 25s`);
      break;
    case 5:
      result.equipment.push('Toolbox: 10 nails, tongs, hammer, small saw and drill');
      break;
    case 6:
      result.equipment.push(`Heavy Chain (15ft)`);
      break;
    case 7:
      result.equipment.push('Grappling Hook');
      break;
    case 8:
      result.equipment.push('Shield: -1 HP damage or have the shield break to ignore one attack');
      break;
    case 9:
      result.equipment.push('Crowbar');
      break;
    case 10:
      result.equipment.push(`Lard (${dieRoll(4 + 1)} doses): each dose can serve as up to 5 rough meals`)
      break;
    case 11:
      result.equipment.push('Tent');
      break;
    case 12:
      const ratRoll = dieRoll(6);
      for (let i = 0; i < ratRoll; i++) {
        result.companionVehicleBag.push(`A tame rat, ${generateName()} [Atk/Def 12 | punch d4 | 2 HP | No armor ], could make a rough meal`);
      }
      break;
    case 13:
      result.equipment.push('Mirror');
      break;
    case 14:
      result.equipment.push('mirror');
      break;
    case 15:
      result.equipment.push('Meat Cleaver d4');
      break;
    case 16:
      result.equipment.push('Small sack of Caltrops');
      break;
    case 17:
      result.equipment.push('Hammer d4');
      break;
    case 18:
      result.equipment.push('Wooden Stake d4');
      break;
    case 19:
      result.equipment.push('Heavy Iron Lock');
      break;
    case 20:
      result.equipment.push(generateScroll(scrollType));
      break;
  }
  return result
}

/**
 * Generates Weapon.
 * @param weaponDie: number
 * @param presence: number
 * @returns string
 */
export function generateWeapon(weaponDie: number, presence: number): string {
  const weaponRoll: number = dieRoll(weaponDie);
  let result: string = '';

  switch (weaponRoll) {
    case 1:
      result = weapons.femur[0];
      break;
    case 2: case 3: case 4:
      result = randomizer(weapons.d4Weapons);
      break;
    case 5: case 6:
      result = randomizer(weapons.d6Weapons);
      break;
    case 7:
      result = `${weapons.bow[0]} and ${10 + presence} arrows`;
    case 8:
      result = randomizer(weapons.d8Weapons);
    case 9:
      result = `${weapons.crossbow[0]} and ${10 + presence} bolts`;
    case 10:
      result = weapons.zweihander[0];
      break;
  }
  return result
}

/**
 * Generates Armor.
 * @param armorDie: number
 * @returns string
 */
export function generateArmor(armorDie: number): string  {
  const armorRoll: number = dieRoll(armorDie);
  const result = randomizer(armor[`tier${armorRoll - 1}`]);

  return result
}

/**
 * Takes in the base-classes' silver info, rolls for silver and converts it to 50 silver pouches.
 * @param numberDice: number
 * @param dieSize: number
 * @param multiplier: number
 * 
 * @returns string[]
 */
function generateSilver(numberDice: number, dieSize: number, multiplier: number): string[] {

  const result: string[] = [];
  const silverCount: number = (diceRoll(numberDice, dieSize) * multiplier)
  const silverQuotient = Math.floor(silverCount / 50);
  const silverRemainder = silverCount % 50;
  for (let i = 0; i < silverQuotient; i++) {
    result.push('A small pouch of 50 silver coins');
  }
  if (silverRemainder > 0) {
    result.push(`A small pouch of ${silverRemainder} silver coins`)
  }

  return result
}

/**
 * Edits EquipmentCVB, returning an array of strings with !variables! replaced; !name!, !scroll!, !weapon!
 * @param string[],
 * @returns string[]
 */
 function gearBangVarReplacement(gearList: string[], presence: number): string[] {

  const result: string[] = gearList.map(gearItem => {
    const nameReplaced: string = gearItem.replace('!name!', `${generateName()}`);
    const scrollReplaced: string = nameReplaced.replace('!scroll!', `${generateScroll('ANY')}`);
    const weaponReplaced = scrollReplaced.replace('!weapon!', generateWeapon(8, presence));
    return weaponReplaced; 
  });

  return result;
}

/**
 * Build a full character.
 */
export function generateMBCharacter(): FullCharacter {
  const baseName: string = `${generateName()} ${generateName()}`;
  const baseClassObj: CharClassObj = generateCharClass();
  const baseClass: CharClass = baseClassObj.charClass;
  const currentTitle: string = randomizer(baseClass.title)
  const titledName: string = `${currentTitle} ${baseName}`;
  const baseClassName: string = baseClassObj.className;
  const classDesc: string = baseClass.desc;
  const charTerTraits: string[] = randomizerCount(terribleTraits, 2);
  const classOrigin: string = randomizer(baseClass.origins);
  const strength: number = generateAbility(baseClass.strMod);
  const agility: number = generateAbility(baseClass.aglMod);
  const presence: number = generateAbility(baseClass.preMod);
  const toughness: number = generateAbility(baseClass.tghMod);
  const hitPoints: number = dieRoll(baseClass.HD) + toughness;
  const charScrollType: string = baseClass.scrollType;
  const omens: number = baseClass.omensDie;
  const silverPouches: string[] = generateSilver(baseClass.silver.numberDice, baseClass.silver.dieSize, baseClass.silver.multiplier);
  const foodCount: number = dieRoll(4);
  const charGearA: EquipmentCVB = generateGearA();
  const charGearB: EquipmentCVB = generateGearB(presence, charScrollType);
  const charGearC: EquipmentCVB = generateGearC(presence, charScrollType);
  const charWeapon: string = generateWeapon(baseClass.weaponDie, presence);
  const charArmor: string = generateArmor(baseClass.armorDie);
  const inventoryCount: number = 8 + strength;
  const currentPowers: Power[] = randomizerCount(baseClass.powers.listy, baseClass.powers.number);
  const totalFeatures: Power[] = baseClass.features.concat(currentPowers);

  // Compile Gear
  let charEquipment: string[] = [
    charWeapon, 
    charArmor,
    `Food (${foodCount} Days)`,
    'Water Skin',
    ...charGearA.equipment,
    ...charGearB.equipment,
    ...charGearC.equipment
  ];
  totalFeatures.forEach(f => charEquipment.push(...f.featureEquipmentCVB.equipment))
  charEquipment.push(...silverPouches)

  // Compile Bags, Companions, and Vehicles
  let charCVB: string[] = [
    ...charGearA.companionVehicleBag,
    ...charGearB.companionVehicleBag,
    ...charGearC.companionVehicleBag,
  ]

  totalFeatures.forEach(f => charCVB.push(...f.featureEquipmentCVB.companionVehicleBag));
  // Replace Bang Variables (!var!) in gear strings
  charEquipment = gearBangVarReplacement(charEquipment, presence);
  charCVB = gearBangVarReplacement(charCVB, presence);

  // Now put it all together
  const result: FullCharacter = {
    name: titledName,
    className: baseClassName,
    classDescription: classDesc,
    terribleTraitA: charTerTraits[0],
    terribleTraitB: charTerTraits[1],
    origin: classOrigin,
    hitPoints: hitPoints,
    strength: strength,
    agility: agility,
    presence: presence,
    toughness: toughness,
    features: totalFeatures,
    omens: omens,
    equipment: charEquipment,
    companionVehicles: charCVB,
    weapon: charWeapon,
    armor: charArmor,
    inventoryCount: inventoryCount
  }

  console.log(result);

  return result
}

// generateMBCharacter();
