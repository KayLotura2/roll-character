import React from 'react';
import './index.css';
import {Name, Personality, Identity, generateName, generatePersonality, generateIdentity} from './generators/archetype_generator'

export type Npc = {
  name: Name,
  personality: Personality
  identity: Identity
}

function generateNPC(): Npc {
  const name1 = generateName()
  const personality1 = generatePersonality()
  const identity1 = generateIdentity()

  const  Npc1: Npc = {
    name: name1,
    personality: personality1,
    identity: identity1
  }
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
        <div> {`${myNpc.identity.gender}, uses ${myNpc.identity.pronoun} pronouns`} </div>
        <div> {`${myNpc.identity.romanticAttraction}\ ${myNpc.identity.sexualAttraction}`} </div>
        <ul>
          <li>{myNpc.personality.quirk} </li>
          <li>{myNpc.personality.ideal} </li>
          <li>{myNpc.personality.flaw} </li>
        </ul>
        <button onClick={reloader}>New NPC!</button>
        <br/>
        Careful, once you load a new one, this one is lost forever.
      </header>
    </div>
}

export default App;
