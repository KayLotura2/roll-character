## Roll Character

Roll Character is a simple discord bot that generates dynamic NPCS.

### How to Use

Click this link to invite [roll-character](https://t.co/9X0A9QqWst?amp=1) as a discord bot into your server.  
When it's in your server it will respond to the command `!npc` with a randomly generated NPC.

### To Run Your Own Instance of Roll Character

In the project directory:  
  
create a file named `.env`  
inside that file write `TOKEN={Your Bot's Token}`  
then run `npm run dev`  

This will spin up an instance of roll-character.  
Your terminal should read `Client Ready.`

For information about what names, qualities, genders, and pronouns are included check out `src/JSON` for the files with all that information.

### Notes On What's In the Bot

#### Gender Descriptors
Androgynous, Butch, Cis, Daddly, Demi, Fem, Fluid, Gender-apathic, Gender-queer, Goblin, Goth, Gray, Hard, Intersex, Masculine, Masculine, Motherly, Non-binary, Non-conforming, Nurturing, Pangender, Soft, Sparkle, Trans

#### Base Genders
Agender, Androgyne, Boy, Disaster, Enby, Epicine, Gender-Questioning, Girl, Goth, Man, Nuetrois, Queer, Woman

#### Pronouns
Ae/Aer, Ey/Em, Fae/Faer, He/Him, It/It, She/Her, Sie/Sie, Tey/Ter, They/Them, Ve/Ver, Xe/Xem, Zie/Zim

#### Attraction Descriptors
Demi-, Fray-, Gray-

#### Attraction Roots
A, Bi, Hetero, Homo, Pan, Poly

#### Percentages: Names (1-4)
100% First name  
85% First and Second name  
50% First, Second, and Third name  
15% First, Second, Third, and Fourth name

#### Percentages: Number of Genders
90% One Gender  
5% Two Genders  
5% 2-5 Genders (~1.25% each)

#### Percentages: Gender Descriptor
~50% Has a Gender Descriptor

#### Percentages: Pronoun informed by Gender
71% chance that pronoun is the "common" choice for a given gender  
25% chance for an extra pronoun  
2% chance for no pronouns  
2% chance for any pronouns

#### Percentages: Split Attraction Model
50% Split Attraction Generation  
50% Attraction Descriptor  

### License

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>
