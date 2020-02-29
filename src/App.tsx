import React from 'react';
import './index.css';
import {Name, Personality, generateName, generatePersonality} from './generators/archetype_generator'

export type Npc = {
  name: Name,
  personality: Personality
  ancestry: string,
  archetype: string,
  armorClass: number
}

const name1 = generateName()
const personality1 = generatePersonality()

const  Npc1: Npc = {
  name: name1,
  personality: personality1,
  ancestry: "Horse",
  archetype: "Hamburglar",
  armorClass: 17
}

function generateNPC(): Npc {
  return Npc1
}

const myNpc: Npc = generateNPC()

const reloader = () => window.location.reload()

export const App = () => {
  return <div className="App">
      <header className="App-header">
        <h2>
          {myNpc.name.firstName} {myNpc.name.secondName} {myNpc.name.thirdName} {myNpc.name.fourthName}
        </h2>
        <ul>
          <li>{myNpc.personality.quirk} </li>
          <li>{myNpc.personality.ideal} </li>
          <li>{myNpc.personality.flaw} </li>
          <li>{myNpc.ancestry} </li>
          <li>{myNpc.archetype} </li>
          <li>{myNpc.armorClass} </li>
        </ul>
        <button onClick={reloader}>New NPC!</button>
        <br/>
        Careful, once you load a new one, this one is lost forever.
      </header>
    </div>
}

export default App;
