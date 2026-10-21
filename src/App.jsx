import React, { useState, useRef, useEffect } from 'react';
import { Swords } from 'lucide-react';

// ===================== DESIGN TOKENS =====================
const COLORS = {
  ink: '#211D1A', panel: '#2B2521', paper: '#EDE6D6', ash: '#9C9184',
  hairline: '#45392F', jade: '#3E8577', jadeBright: '#4FA393',
  hpGood: '#4FA393', hpMid: '#D9B54A', hpLow: '#C0503D',
};
const FONT_DISPLAY = "'Big Shoulders Display', sans-serif";
const FONT_BODY = "'Work Sans', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

// ===================== MOVES =====================
const MOVES = {
  'Tackle':{type:'Normal',power:40}, 'Scratch':{type:'Normal',power:40}, 'Pound':{type:'Normal',power:40},
  'Quick Attack':{type:'Normal',power:40}, 'Body Slam':{type:'Normal',power:70}, 'Hyper Beam':{type:'Normal',power:95},
  'Swift':{type:'Normal',power:60}, 'Headbutt':{type:'Normal',power:55}, 'Slam':{type:'Normal',power:65}, 'Double Edge':{type:'Normal',power:75}, 'Horn Attack':{type:'Normal',power:50},
  'Transform':{type:'Normal',power:0},
  'Ember':{type:'Fire',power:40}, 'Flamethrower':{type:'Fire',power:80}, 'Fire Fang':{type:'Fire',power:55},
  'Fire Punch':{type:'Fire',power:65}, 'Flame Wheel':{type:'Fire',power:60}, 'Fire Blast':{type:'Fire',power:90},
  'Water Gun':{type:'Water',power:40}, 'Bubble':{type:'Water',power:40}, 'Aqua Tail':{type:'Water',power:65},
  'Hydro Pump':{type:'Water',power:90}, 'Water Pulse':{type:'Water',power:60}, 'Surf':{type:'Water',power:75},
  'Thunder Shock':{type:'Electric',power:40}, 'Thunderbolt':{type:'Electric',power:80}, 'Spark':{type:'Electric',power:55},
  'Thunder Punch':{type:'Electric',power:65}, 'Volt Tackle':{type:'Electric',power:70}, 'Discharge':{type:'Electric',power:60}, 'Thunder':{type:'Electric',power:100},
  'Vine Whip':{type:'Grass',power:45}, 'Razor Leaf':{type:'Grass',power:55}, 'Solar Beam':{type:'Grass',power:85},
  'Leafage':{type:'Grass',power:40}, 'Magical Leaf':{type:'Grass',power:60}, 'Seed Bomb':{type:'Grass',power:65},
  'Powder Snow':{type:'Ice',power:35}, 'Ice Beam':{type:'Ice',power:80}, 'Icy Wind':{type:'Ice',power:45},
  'Ice Fang':{type:'Ice',power:60}, 'Ice Punch':{type:'Ice',power:65}, 'Blizzard':{type:'Ice',power:95},
  'Karate Chop':{type:'Fighting',power:45}, 'Low Kick':{type:'Fighting',power:50}, 'Close Combat':{type:'Fighting',power:85},
  'Brick Break':{type:'Fighting',power:65}, 'Focus Blast':{type:'Fighting',power:90},
  'Poison Sting':{type:'Poison',power:35}, 'Sludge Bomb':{type:'Poison',power:75}, 'Acid':{type:'Poison',power:45},
  'Poison Jab':{type:'Poison',power:60}, 'Gunk Shot':{type:'Poison',power:70},
  'Mud Slap':{type:'Ground',power:30}, 'Earthquake':{type:'Ground',power:90}, 'Bulldoze':{type:'Ground',power:50},
  'Dig':{type:'Ground',power:60}, 'Mud Bomb':{type:'Ground',power:55}, 'Bone Club':{type:'Ground',power:55},
  'Gust':{type:'Flying',power:40}, 'Wing Attack':{type:'Flying',power:50}, 'Air Slash':{type:'Flying',power:70},
  'Aerial Ace':{type:'Flying',power:55}, 'Peck':{type:'Flying',power:35}, 'Hurricane':{type:'Flying',power:85},
  'Confusion':{type:'Psychic',power:45}, 'Psychic':{type:'Psychic',power:80}, 'Psybeam':{type:'Psychic',power:60},
  'Zen Headbutt':{type:'Psychic',power:65}, 'Psycho Cut':{type:'Psychic',power:55}, 'Psystrike':{type:'Psychic',power:95},
  'Bug Bite':{type:'Bug',power:40}, 'Struggle Bug':{type:'Bug',power:35}, 'X-Scissor':{type:'Bug',power:65},
  'Signal Beam':{type:'Bug',power:60}, 'Megahorn':{type:'Bug',power:85},
  'Rock Throw':{type:'Rock',power:45}, 'Rock Slide':{type:'Rock',power:70}, 'Stone Edge':{type:'Rock',power:85},
  'Rollout':{type:'Rock',power:40}, 'Rock Tomb':{type:'Rock',power:50},
  'Lick':{type:'Ghost',power:35}, 'Shadow Ball':{type:'Ghost',power:75}, 'Shadow Punch':{type:'Ghost',power:55},
  'Astonish':{type:'Ghost',power:35}, 'Shadow Claw':{type:'Ghost',power:60}, 'Shadow Force':{type:'Ghost',power:95},
  'Dragon Rage':{type:'Dragon',power:35}, 'Dragon Breath':{type:'Dragon',power:55}, 'Dragon Claw':{type:'Dragon',power:75},
  'Twister':{type:'Dragon',power:45}, 'Dragon Pulse':{type:'Dragon',power:80}, 'Draco Meteor':{type:'Dragon',power:100},
  'Bite':{type:'Dark',power:60}, 'Crunch':{type:'Dark',power:70}, 'Feint Attack':{type:'Dark',power:55},
  'Snarl':{type:'Dark',power:45}, 'Dark Pulse':{type:'Dark',power:75},
  'Iron Tail':{type:'Steel',power:65}, 'Metal Claw':{type:'Steel',power:45}, 'Flash Cannon':{type:'Steel',power:80},
  'Gyro Ball':{type:'Steel',power:60}, 'Steel Wing':{type:'Steel',power:55}, 'Meteor Mash':{type:'Steel',power:90},
  'Fairy Wind':{type:'Fairy',power:45}, 'Moonblast':{type:'Fairy',power:80}, 'Draining Kiss':{type:'Fairy',power:55},
  'Disarming Voice':{type:'Fairy',power:45}, 'Play Rough':{type:'Fairy',power:70},
  // Signature finishers for the VS Computer gym aces (no draftable Pokémon carries these)
  'Rock Wrecker':{type:'Rock',power:100}, 'Petal Dance':{type:'Grass',power:90}, 'Cross Poison':{type:'Poison',power:70},
};

// ===================== TYPE CHART =====================
const TYPE_CHART = {
  Normal:   { strong:[], weak:['Rock','Steel'], immune:['Ghost'] },
  Fire:     { strong:['Grass','Ice','Bug','Steel'], weak:['Fire','Water','Rock','Dragon'] },
  Water:    { strong:['Fire','Ground','Rock'], weak:['Water','Grass','Dragon'] },
  Electric: { strong:['Water','Flying'], weak:['Electric','Grass','Dragon'], immune:['Ground'] },
  Grass:    { strong:['Water','Ground','Rock'], weak:['Fire','Grass','Poison','Flying','Bug','Dragon','Steel'] },
  Ice:      { strong:['Grass','Ground','Flying','Dragon'], weak:['Fire','Water','Ice','Steel'] },
  Fighting: { strong:['Normal','Ice','Rock','Dark','Steel'], weak:['Poison','Flying','Psychic','Bug','Fairy'], immune:['Ghost'] },
  Poison:   { strong:['Grass','Fairy'], weak:['Poison','Ground','Rock','Ghost'], immune:['Steel'] },
  Ground:   { strong:['Fire','Electric','Poison','Rock','Steel'], weak:['Grass','Bug'], immune:['Flying'] },
  Flying:   { strong:['Grass','Fighting','Bug'], weak:['Electric','Rock','Steel'] },
  Psychic:  { strong:['Fighting','Poison'], weak:['Psychic','Steel'], immune:['Dark'] },
  Bug:      { strong:['Grass','Psychic','Dark'], weak:['Fire','Fighting','Poison','Flying','Ghost','Steel','Fairy'] },
  Rock:     { strong:['Fire','Ice','Flying','Bug'], weak:['Fighting','Ground','Steel'] },
  Ghost:    { strong:['Psychic','Ghost'], weak:['Dark'], immune:['Normal'] },
  Dragon:   { strong:['Dragon'], weak:['Steel'], immune:['Fairy'] },
  Dark:     { strong:['Psychic','Ghost'], weak:['Fighting','Dark','Fairy'] },
  Steel:    { strong:['Ice','Rock','Fairy'], weak:['Fire','Water','Steel','Electric'] },
  Fairy:    { strong:['Fighting','Dragon','Dark'], weak:['Fire','Poison','Steel'] },
};

function getEffectiveness(moveType, defenderTypes) {
  let mult = 1;
  const chart = TYPE_CHART[moveType];
  if (!chart) return mult;
  for (const dType of defenderTypes) {
    if (chart.immune && chart.immune.includes(dType)) return 0;
    if (chart.strong.includes(dType)) mult *= 2;
    else if (chart.weak.includes(dType)) mult *= 0.5;
  }
  return mult;
}

// ===================== POKEMON DB =====================
function mon(name, types, hp, atk, def, spd, attack, counter, dodge, finishing, evo) {
  return { name, types, stats:{hp,atk,def,spd}, moves:{attack,counter,dodge}, finishing, evolvesTo: evo || null };
}

const POKEMON_DB = [
  mon('Bulbasaur', ['Grass','Poison'], 45,49,49,45, ['Vine Whip','Acid'],['Tackle','Headbutt'],['Razor Leaf','Poison Jab'], ['Solar Beam'], {name:'Ivysaur', types:['Grass','Poison'], mult:1.3, evolvesTo:{name:'Venusaur', types:['Grass','Poison'], mult:1.4}}),
  mon('Charmander', ['Fire'], 39,52,43,65, ['Ember','Slam'],['Scratch','Fire Fang'],['Flamethrower','Aerial Ace'], ['Fire Blast'], {name:'Charmeleon', types:['Fire'], mult:1.3, evolvesTo:{name:'Charizard', types:['Fire','Flying'], mult:1.4}}),
  mon('Squirtle', ['Water'], 44,48,65,43, ['Water Gun','Ice Fang'],['Tackle','Bite'],['Aqua Tail','Body Slam'], ['Hydro Pump'], {name:'Wartortle', types:['Water'], mult:1.3, evolvesTo:{name:'Blastoise', types:['Water'], mult:1.4}}),
  mon('Pikachu', ['Electric'], 35,55,40,90, ['Thunder Shock','Iron Tail'],['Quick Attack','Slam'],['Thunderbolt','Swift'], ['Thunder'], {name:'Raichu', types:['Electric'], mult:1.3}),
  mon('Eevee', ['Normal'], 55,55,50,55, ['Tackle','Zen Headbutt'],['Quick Attack','Swift'],['Bite','Headbutt'], ['Hyper Beam'], {branch:[
    {name:'Vaporeon', types:['Water'], note:'A Water Stone glimmers in the light.'},
    {name:'Jolteon', types:['Electric'], note:'A Thunder Stone crackles with energy.'},
    {name:'Flareon', types:['Fire'], note:'A Fire Stone glows warm to the touch.'},
    {name:'Espeon', types:['Psychic'], note:'Their bond deepens as dawn breaks.'},
    {name:'Umbreon', types:['Dark'], note:'Their bond deepens under the moonlit sky.'},
    {name:'Leafeon', types:['Grass'], note:'The scent of fresh leaves drifts through the air.'},
    {name:'Glaceon', types:['Ice'], note:'A crystalline chill spreads through the air.'},
    {name:'Sylveon', types:['Fairy'], note:'Ribbons of soft light swirl warmly around them.'},
  ], mult:1.4}),
  mon('Pidgey', ['Normal','Flying'], 40,45,40,56, ['Gust','Quick Attack'],['Tackle','Peck'],['Wing Attack','Aerial Ace'], ['Hyper Beam'], {name:'Pidgeotto', types:['Normal','Flying'], mult:1.25, evolvesTo:{name:'Pidgeot', types:['Normal','Flying'], mult:1.35}}),
  mon('Rattata', ['Normal'], 35,56,35,72, ['Quick Attack','Bite'],['Tackle','Headbutt'],['Body Slam','Swift'], ['Hyper Beam'], {name:'Raticate', types:['Normal'], mult:1.3}),
  mon('Ekans', ['Poison'], 35,60,44,55, ['Poison Sting','Crunch'],['Bite','Poison Jab'],['Acid','Gunk Shot'], ['Sludge Bomb'], {name:'Arbok', types:['Poison'], mult:1.3}),
  mon('Sandshrew', ['Ground'], 50,75,85,40, ['Mud Slap','Rock Tomb'],['Scratch','Bite'],['Dig','Rock Slide'], ['Earthquake'], {name:'Sandslash', types:['Ground'], mult:1.3}),
  mon('Vulpix', ['Fire'], 38,41,40,65, ['Ember','Powder Snow'],['Quick Attack','Fire Fang'],['Flamethrower','Confusion'], ['Fire Blast'], {name:'Ninetales', types:['Fire'], mult:1.35}),
  mon('Growlithe', ['Fire'], 55,70,45,60, ['Ember','Crunch'],['Bite','Fire Fang'],['Flame Wheel','Headbutt'], ['Fire Blast'], {name:'Arcanine', types:['Fire'], mult:1.4}),
  mon('Poliwag', ['Water'], 40,50,40,90, ['Water Gun','Ice Punch'],['Bubble','Karate Chop'],['Body Slam','Aqua Tail'], ['Hydro Pump'], {name:'Poliwhirl', types:['Water'], mult:1.25, evolvesTo:{name:'Poliwrath', types:['Water','Fighting'], mult:1.4}}),
  mon('Abra', ['Psychic'], 30,20,15,90, ['Confusion','Shadow Ball'],['Psybeam','Feint Attack'],['Psychic','Zen Headbutt'], ['Psystrike'], {name:'Kadabra', types:['Psychic'], mult:1.35, evolvesTo:{name:'Alakazam', types:['Psychic'], mult:1.4}}),
  mon('Machop', ['Fighting'], 70,80,50,35, ['Karate Chop','Ice Punch'],['Low Kick','Rock Slide'],['Close Combat','Brick Break'], ['Focus Blast'], {name:'Machoke', types:['Fighting'], mult:1.3, evolvesTo:{name:'Machamp', types:['Fighting'], mult:1.4}}),
  mon('Geodude', ['Rock','Ground'], 40,80,100,20, ['Rock Throw','Mud Slap'],['Tackle','Bulldoze'],['Rock Slide','Mud Bomb'], ['Stone Edge'], {name:'Graveler', types:['Rock','Ground'], mult:1.3, evolvesTo:{name:'Golem', types:['Rock','Ground'], mult:1.4}}),
  mon('Gastly', ['Ghost','Poison'], 30,35,30,80, ['Lick','Sludge Bomb'],['Astonish','Shadow Punch'],['Shadow Ball','Acid'], ['Shadow Force'], {name:'Haunter', types:['Ghost','Poison'], mult:1.3, evolvesTo:{name:'Gengar', types:['Ghost','Poison'], mult:1.4}}),
  mon('Drowzee', ['Psychic'], 50,45,65,42, ['Confusion','Icy Wind'],['Headbutt','Body Slam'],['Psychic','Psybeam'], ['Psystrike'], {name:'Hypno', types:['Psychic'], mult:1.3}),
  mon('Magnemite', ['Electric','Steel'], 35,35,70,45, ['Thunder Shock','Flash Cannon'],['Metal Claw','Discharge'],['Thunderbolt','Gyro Ball'], ['Thunder'], {name:'Magneton', types:['Electric','Steel'], mult:1.3}),
  mon('Onix', ['Rock','Ground'], 35,45,120,70, ['Rock Throw','Mud Slap'],['Tackle','Iron Tail'],['Rock Slide','Bulldoze'], ['Stone Edge','Earthquake'], {name:'Steelix', types:['Steel','Ground'], mult:1.35}),
  mon('Scyther', ['Bug','Flying'], 70,110,80,105, ['Quick Attack','Steel Wing'],['Wing Attack','Aerial Ace'],['X-Scissor','Bug Bite'], ['Megahorn','Hurricane'], {name:'Scizor', types:['Bug','Steel'], mult:1.35}),
  mon('Dratini', ['Dragon'], 41,64,45,50, ['Dragon Rage','Aqua Tail'],['Twister','Icy Wind'],['Dragon Claw','Iron Tail'], ['Draco Meteor'], {name:'Dragonair', types:['Dragon'], mult:1.3, evolvesTo:{name:'Dragonite', types:['Dragon','Flying'], mult:1.45}}),
  mon('Chikorita', ['Grass'], 45,49,65,32, ['Vine Whip','Headbutt'],['Tackle','Body Slam'],['Razor Leaf','Magical Leaf'], ['Solar Beam'], {name:'Bayleef', types:['Grass'], mult:1.25, evolvesTo:{name:'Meganium', types:['Grass'], mult:1.35}}),
  mon('Cyndaquil', ['Fire'], 39,52,43,65, ['Ember','Dig'],['Quick Attack','Fire Fang'],['Flamethrower','Flame Wheel'], ['Fire Blast'], {name:'Quilava', types:['Fire'], mult:1.3, evolvesTo:{name:'Typhlosion', types:['Fire'], mult:1.4}}),
  mon('Totodile', ['Water'], 50,65,64,43, ['Water Gun','Crunch'],['Bite','Ice Fang'],['Aqua Tail','Slam'], ['Hydro Pump'], {name:'Croconaw', types:['Water'], mult:1.3, evolvesTo:{name:'Feraligatr', types:['Water'], mult:1.4}}),
  mon('Hoothoot', ['Normal','Flying'], 60,30,30,50, ['Peck','Confusion'],['Tackle','Swift'],['Air Slash','Wing Attack'], ['Hyper Beam'], {name:'Noctowl', types:['Normal','Flying'], mult:1.25}),
  mon('Ledyba', ['Bug','Flying'], 40,20,30,55, ['Bug Bite','Aerial Ace'],['Gust','Signal Beam'],['X-Scissor','Struggle Bug'], ['Megahorn'], {name:'Ledian', types:['Bug','Flying'], mult:1.2}),
  mon('Spinarak', ['Bug','Poison'], 40,60,40,30, ['Bug Bite','Poison Jab'],['Poison Sting','Signal Beam'],['X-Scissor','Acid'], ['Megahorn'], {name:'Ariados', types:['Bug','Poison'], mult:1.25}),
  mon('Chinchou', ['Water','Electric'], 75,38,38,67, ['Water Gun','Spark'],['Thunder Shock','Bubble'],['Water Pulse','Discharge'], ['Hydro Pump'], {name:'Lanturn', types:['Water','Electric'], mult:1.3}),
  mon('Natu', ['Psychic','Flying'], 40,50,45,70, ['Peck','Zen Headbutt'],['Confusion','Air Slash'],['Psychic','Wing Attack'], ['Psystrike'], {name:'Xatu', types:['Psychic','Flying'], mult:1.25}),
  mon('Mareep', ['Electric'], 55,40,40,35, ['Thunder Shock','Headbutt'],['Tackle','Spark'],['Thunderbolt','Discharge'], ['Thunder'], {name:'Flaaffy', types:['Electric'], mult:1.25, evolvesTo:{name:'Ampharos', types:['Electric'], mult:1.35}}),
  mon('Hoppip', ['Grass','Flying'], 35,35,40,50, ['Gust','Magical Leaf'],['Leafage','Wing Attack'],['Air Slash','Seed Bomb'], ['Solar Beam'], {name:'Skiploom', types:['Grass','Flying'], mult:1.2, evolvesTo:{name:'Jumpluff', types:['Grass','Flying'], mult:1.3}}),
  mon('Wooper', ['Water','Ground'], 55,45,45,15, ['Water Gun','Mud Bomb'],['Mud Slap','Bubble'],['Earthquake','Water Pulse'], ['Hydro Pump'], {name:'Quagsire', types:['Water','Ground'], mult:1.3}),
  mon('Snubbull', ['Fairy'], 60,80,50,30, ['Fairy Wind','Bite'],['Tackle','Headbutt'],['Play Rough','Crunch'], ['Moonblast'], {name:'Granbull', types:['Fairy'], mult:1.3}),
  mon('Teddiursa', ['Normal'], 60,80,50,50, ['Scratch','Bite'],['Headbutt','Slam'],['Body Slam','Crunch'], ['Hyper Beam'], {name:'Ursaring', types:['Normal'], mult:1.35}),
  mon('Houndour', ['Dark','Fire'], 45,60,30,65, ['Ember','Crunch'],['Bite','Fire Fang'],['Flamethrower','Feint Attack'], ['Dark Pulse'], {name:'Houndoom', types:['Dark','Fire'], mult:1.3}),
  mon('Larvitar', ['Rock','Ground'], 50,64,50,41, ['Rock Throw','Mud Slap'],['Bite','Crunch'],['Rock Slide','Bulldoze'], ['Stone Edge'], {name:'Pupitar', types:['Rock','Ground'], mult:1.3, evolvesTo:{name:'Tyranitar', types:['Rock','Dark'], mult:1.45}}),
  mon('Ralts', ['Psychic','Fairy'], 30,25,25,40, ['Confusion','Disarming Voice'],['Fairy Wind','Zen Headbutt'],['Psychic','Draining Kiss'], ['Psystrike'], {name:'Kirlia', types:['Psychic','Fairy'], mult:1.25, evolvesTo:{name:'Gardevoir', types:['Psychic','Fairy'], mult:1.4}}),
  mon('Poochyena', ['Dark'], 35,55,35,35, ['Bite','Headbutt'],['Tackle','Snarl'],['Crunch','Double Edge'], ['Dark Pulse'], {name:'Mightyena', types:['Dark'], mult:1.3}),
  mon('Swinub', ['Ice','Ground'], 50,50,40,50, ['Powder Snow','Bulldoze'],['Mud Slap','Icy Wind'],['Ice Fang','Mud Bomb'], ['Blizzard'], {name:'Piloswine', types:['Ice','Ground'], mult:1.3}),
  mon('Oddish', ['Grass','Poison'], 45,50,55,30, ['Vine Whip','Sludge Bomb'],['Acid','Leafage'],['Razor Leaf','Poison Jab'], ['Solar Beam'], {name:'Gloom', types:['Grass','Poison'], mult:1.25, evolvesTo:{name:'Vileplume', types:['Grass','Poison'], mult:1.35}}),
  mon('Bellsprout', ['Grass','Poison'], 50,75,35,40, ['Vine Whip','Poison Jab'],['Acid','Magical Leaf'],['Razor Leaf','Gunk Shot'], ['Solar Beam'], {name:'Weepinbell', types:['Grass','Poison'], mult:1.25, evolvesTo:{name:'Victreebel', types:['Grass','Poison'], mult:1.35}}),
  mon('Meowth', ['Normal'], 40,45,35,90, ['Scratch','Feint Attack'],['Bite','Slam'],['Swift','Crunch'], ['Hyper Beam'], {name:'Persian', types:['Normal'], mult:1.3}),
  mon('Psyduck', ['Water'], 50,52,48,55, ['Water Gun','Zen Headbutt'],['Confusion','Bubble'],['Aqua Tail','Ice Punch'], ['Hydro Pump'], {name:'Golduck', types:['Water'], mult:1.3}),
  mon('Mankey', ['Fighting'], 40,80,35,70, ['Karate Chop','Crunch'],['Low Kick','Brick Break'],['Close Combat','Rock Slide'], ['Focus Blast'], {name:'Primeape', types:['Fighting'], mult:1.3}),
  mon('Doduo', ['Normal','Flying'], 35,85,45,75, ['Peck','Swift'],['Quick Attack','Wing Attack'],['Aerial Ace','Air Slash'], ['Hyper Beam'], {name:'Dodrio', types:['Normal','Flying'], mult:1.25}),
  mon('Shellder', ['Water'], 35,65,100,40, ['Water Gun','Ice Fang'],['Bite','Icy Wind'],['Aqua Tail','Powder Snow'], ['Hydro Pump'], {name:'Cloyster', types:['Water','Ice'], mult:1.35}),
  mon('Krabby', ['Water'], 35,105,90,50, ['Water Gun','Ice Punch'],['Bubble','Bite'],['Aqua Tail','Water Pulse'], ['Hydro Pump'], {name:'Kingler', types:['Water'], mult:1.3}),
  mon('Voltorb', ['Electric'], 40,30,50,100, ['Thunder Shock','Rollout'],['Tackle','Spark'],['Thunderbolt','Discharge'], ['Thunder'], {name:'Electrode', types:['Electric'], mult:1.3}),
  mon('Cubone', ['Ground'], 50,50,95,35, ['Bone Club','Rock Tomb'],['Mud Slap','Bulldoze'],['Rock Slide','Headbutt'], ['Earthquake'], {name:'Marowak', types:['Ground'], mult:1.3}),
  mon('Koffing', ['Poison'], 40,65,95,35, ['Acid','Flamethrower'],['Tackle','Poison Sting'],['Gunk Shot','Fire Punch'], ['Sludge Bomb'], {name:'Weezing', types:['Poison'], mult:1.3}),
  mon('Rhyhorn', ['Ground','Rock'], 80,85,95,25, ['Rock Throw','Mud Bomb'],['Mud Slap','Rock Tomb'],['Rock Slide','Bulldoze'], ['Earthquake'], {name:'Rhydon', types:['Ground','Rock'], mult:1.3}),
  mon('Horsea', ['Water'], 30,40,70,60, ['Water Gun','Icy Wind'],['Bubble','Twister'],['Aqua Tail','Water Pulse'], ['Hydro Pump'], {name:'Seadra', types:['Water'], mult:1.3, evolvesTo:{name:'Kingdra', types:['Water','Dragon'], mult:1.45}}),
  mon('Goldeen', ['Water'], 45,67,60,63, ['Water Gun','Icy Wind'],['Horn Attack','Bubble'],['Aqua Tail','Water Pulse'], ['Hydro Pump'], {name:'Seaking', types:['Water'], mult:1.25}),
  mon('Magikarp', ['Water'], 45,15,35,70, ['Tackle','Ice Fang'],['Water Gun','Bubble'],['Aqua Tail','Body Slam'], ['Hydro Pump'], {name:'Gyarados', types:['Water','Flying'], mult:1.9}),
  mon('Omanyte', ['Rock','Water'], 35,40,100,35, ['Water Gun','Rock Tomb'],['Rock Throw','Bubble'],['Aqua Tail','Icy Wind'], ['Stone Edge'], {name:'Omastar', types:['Rock','Water'], mult:1.3}),
  mon('Kabuto', ['Rock','Water'], 35,80,90,55, ['Rock Throw','Water Gun'],['Scratch','Aqua Tail'],['Rock Slide','Rock Tomb'], ['Stone Edge'], {name:'Kabutops', types:['Rock','Water'], mult:1.3}),
  mon('Sentret', ['Normal'], 35,46,34,20, ['Tackle','Bite'],['Quick Attack','Swift'],['Body Slam','Headbutt'], ['Hyper Beam'], {name:'Furret', types:['Normal'], mult:1.35}),
  mon('Phanpy', ['Ground'], 90,60,60,40, ['Tackle','Ice Fang'],['Mud Slap','Mud Bomb'],['Rock Slide','Rock Tomb'], ['Earthquake'], {name:'Donphan', types:['Ground'], mult:1.3}),
  mon('Slugma', ['Fire'], 40,40,40,20, ['Ember','Rock Tomb'],['Rock Throw','Fire Fang'],['Flamethrower','Rock Slide'], ['Fire Blast'], {name:'Magcargo', types:['Fire','Rock'], mult:1.25}),
  mon('Remoraid', ['Water'], 35,65,35,65, ['Water Gun','Signal Beam'],['Psybeam','Bubble'],['Water Pulse','Icy Wind'], ['Hydro Pump'], {name:'Octillery', types:['Water'], mult:1.3}),
  mon('Smoochum', ['Ice','Psychic'], 45,30,15,65, ['Powder Snow','Psybeam'],['Confusion','Icy Wind'],['Ice Beam','Zen Headbutt'], ['Blizzard'], {name:'Jynx', types:['Ice','Psychic'], mult:1.3}),
  mon('Ditto', ['Normal'], 48,48,48,48, ['Transform','Tackle'],['Swift','Slam'],['Body Slam','Quick Attack'], ['Hyper Beam','Earthquake'], null),
  mon('Aerodactyl', ['Rock','Flying'], 80,95,65,115, ['Wing Attack','Ice Fang'],['Rock Throw','Aerial Ace'],['Rock Slide','Crunch'], ['Stone Edge','Hurricane'], null),
  mon('Girafarig', ['Normal','Psychic'], 70,80,65,85, ['Confusion','Swift'],['Headbutt','Psybeam'],['Psychic','Crunch'], ['Hyper Beam','Psystrike'], null),
  mon('Shuckle', ['Bug','Rock'], 28,10,230,5, ['Rock Throw','Bug Bite'],['Struggle Bug','Rock Tomb'],['Rock Slide','X-Scissor'], ['Megahorn','Stone Edge'], null),
  mon('Sudowoodo', ['Rock'], 70,100,115,30, ['Rock Throw','Double Edge'],['Mud Slap','Rock Tomb'],['Rock Slide','Mud Bomb'], ['Stone Edge','Earthquake'], null),
  mon('Skarmory', ['Steel','Flying'], 65,80,140,70, ['Wing Attack','Steel Wing'],['Metal Claw','Aerial Ace'],['Air Slash','Gyro Ball'], ['Meteor Mash','Hurricane'], null),
  mon('Corsola', ['Water','Rock'], 55,55,95,35, ['Water Gun','Rock Tomb'],['Rock Throw','Bubble'],['Water Pulse','Aqua Tail'], ['Hydro Pump','Stone Edge'], null),
  mon('Delibird', ['Ice','Flying'], 45,55,45,75, ['Powder Snow','Aerial Ace'],['Peck','Icy Wind'],['Ice Beam','Wing Attack'], ['Blizzard','Hurricane'], null),
  mon('Riolu', ['Fighting'], 45,55,40,65, ['Karate Chop','Metal Claw'],['Low Kick','Iron Tail'],['Close Combat','Flash Cannon'], ['Focus Blast','Meteor Mash'], {name:'Lucario', types:['Fighting','Steel'], mult:1.45}),
  mon('Munchlax', ['Normal'], 100,70,45,20, ['Tackle','Ice Punch'],['Headbutt','Bite'],['Body Slam','Slam'], ['Hyper Beam','Earthquake'], {name:'Snorlax', types:['Normal'], mult:1.5}),
  mon('Rockruff', ['Rock'], 45,65,45,60, ['Rock Throw','Bite'],['Rock Tomb','Crunch'],['Rock Slide','Double Edge'], ['Stone Edge'], {name:'Lycanroc', types:['Rock'], mult:1.4}),
  mon('Absol', ['Dark'], 65,100,50,75, ['Crunch','Icy Wind'],['Bite','Rock Slide'],['Feint Attack','Shadow Ball'], ['Dark Pulse'], null),
  mon('Goomy', ['Dragon'], 32,40,15,25, ['Dragon Rage','Water Gun'],['Twister','Bubble'],['Dragon Breath','Water Pulse'], ['Draco Meteor'], {name:'Sliggoo', types:['Dragon'], mult:1.35, evolvesTo:{name:'Goodra', types:['Dragon'], mult:1.5}}),
  mon('Hitmonchan', ['Fighting'], 50,105,80,75, ['Karate Chop','Fire Punch'],['Low Kick','Thunder Punch'],['Close Combat','Ice Punch'], ['Focus Blast'], null),
  mon('Hitmonlee', ['Fighting'], 50,120,55,85, ['Low Kick','Rock Slide'],['Karate Chop','Mud Bomb'],['Close Combat','Bulldoze'], ['Focus Blast'], null),
];

const TYPE_COLORS = {
  Normal:'#9BA090', Fire:'#E2703E', Water:'#4C93C7', Electric:'#E8C93A', Grass:'#5FA65A',
  Ice:'#7FD1C8', Fighting:'#C0503D', Poison:'#9857A8', Ground:'#C9A15E', Flying:'#9FB2E8',
  Psychic:'#E86B98', Bug:'#9CB02A', Rock:'#AE9257', Ghost:'#6F5C96', Dragon:'#5D6FE8',
  Dark:'#5B4D42', Steel:'#8FA0AC', Fairy:'#E89CC6',
};

const BATTLE_STYLES = [
  { name: 'Aggressive', desc: 'Strikes first, strikes hard' },
  { name: 'Tactical', desc: 'Reads the field, waits for openings' },
  { name: 'Wildcard', desc: 'Unpredictable, thrives on chaos' },
];

// ===================== VS COMPUTER: GYM LEADERS & EXCLUSIVE ACES =====================
// The eight Kanto Gym Leaders in the order Ash earned their badges in the original anime, each one
// tougher than the last. The challenger always fields six. Brock, Misty, Lt. Surge and Sabrina field
// three (two drafted plus their ace); Erika, Koga, Blaine and Giovanni field a full six (two drafted,
// three signature Pokémon of their own, and their ace) -- see the VS COMPUTER: DRAFT section.
// The other dials: `skill` (how sharply the leader drafts and battles -- see the AI section),
// `trainedPct` (a flat stat boost on the leader's drafted and signature Pokémon, like facing
// higher-level teams) and the strength of the leader's ace. `loyalty` is personality rather than
// difficulty: how strongly a leader sticks to their own type in the draft (Erika is the purest
// Grass specialist of them all).
//
// The dials are set per gym so the OUTCOME climbs steadily, not so each dial climbs: team size and
// type matchups already make some gyms naturally harder (the Bug/Ghost/Dark counters to Sabrina's
// Psychic types are mostly weak Pokémon, while Ground makes short work of Lt. Surge). Tuned with
// simulated challenges against the way people actually play: a player who drafts six for type
// advantage (Water/Grass against Brock, and so on), plays sensibly, and brings their best-matched
// earned ace wins about 78% vs Brock, 68% Misty, 63% Lt. Surge, 57% Sabrina, 49% Erika, 45% Koga,
// 39% Blaine and 32% vs Giovanni. Drafting for stats as well as type pushes all of those higher.
//
// Each ace is a fully evolved Pokémon of its leader's type that NEVER appears in the two-player
// draft -- none of these species is in POKEMON_DB at any evolution stage. Beating a leader with a
// named (non-guest) trainer earns the badge, and the badge unlocks that ace to bring into future
// VS Computer battles. Aces are already fully evolved, so they never evolve mid-battle.
function gymAce(leaderId, p) { return { ...p, aceOf: leaderId }; }
const GYM_ACES = {
  brock:    gymAce('brock',    mon('Rhyperior',  ['Ground','Rock'],    76,90,94,28, ['Rock Slide','Bulldoze'],['Rock Tomb','Horn Attack'],['Megahorn','Dig'], ['Rock Wrecker','Earthquake'], null)),
  misty:    gymAce('misty',    mon('Starmie',    ['Water','Psychic'],  54,82,72,98,   ['Water Pulse','Psybeam'],['Swift','Ice Beam'],['Surf','Thunderbolt'], ['Hydro Pump','Psychic'], null)),
  surge:    gymAce('surge',    mon('Electivire', ['Electric'],         64,92,64,86,   ['Thunder Punch','Brick Break'],['Low Kick','Ice Punch'],['Discharge','Fire Punch'], ['Thunder','Hyper Beam'], null)),
  sabrina:  gymAce('sabrina',  mon('Mr. Mime',   ['Psychic','Fairy'],  58,100,88,94,  ['Psybeam','Disarming Voice'],['Confusion','Draining Kiss'],['Psychic','Shadow Ball'], ['Psystrike','Moonblast'], null)),
  erika:    gymAce('erika',    mon('Bellossom',  ['Grass'],            84,92,102,60,  ['Magical Leaf','Disarming Voice'],['Leafage','Draining Kiss'],['Seed Bomb','Moonblast'], ['Petal Dance','Solar Beam'], null)),
  koga:     gymAce('koga',     mon('Crobat',     ['Poison','Flying'],  94,108,92,132, ['Wing Attack','Bite'],['Poison Jab','Aerial Ace'],['Cross Poison','Air Slash'], ['Hurricane','Sludge Bomb'], null)),
  blaine:   gymAce('blaine',   mon('Magmortar',  ['Fire'],             80,122,84,95,  ['Fire Punch','Thunder Punch'],['Fire Fang','Brick Break'],['Flamethrower','Thunderbolt'], ['Fire Blast','Focus Blast'], null)),
  giovanni: gymAce('giovanni', mon('Nidoking',   ['Poison','Ground'],  96,116,92,98,  ['Poison Jab','Dig'],['Horn Attack','Ice Punch'],['Megahorn','Sludge Bomb'], ['Earthquake','Fire Blast'], null)),
};

// Signature Pokémon: the rest of a six-Pokémon leader's team, used only by that leader. Like the
// aces, none of these species appears in the two-player draft at any evolution stage, but unlike
// the aces they're never earned. Each shares the leader's type and, where possible, is one the
// leader used in the anime or the games. They don't evolve mid-battle.
function gymSignature(leaderId, p) { return { ...p, signatureOf: leaderId }; }
const GYM_SIGNATURES = {
  erika: [
    gymSignature('erika', mon('Tangela',    ['Grass'],            45,52,77,42,   ['Vine Whip','Rock Tomb'],['Leafage','Slam'],['Magical Leaf','Seed Bomb'], ['Solar Beam'], null)),
    gymSignature('erika', mon('Exeggutor',  ['Grass','Psychic'],  59,59,53,34,   ['Seed Bomb','Confusion'],['Headbutt','Psybeam'],['Zen Headbutt','Magical Leaf'], ['Solar Beam','Psychic'], null)),
    gymSignature('erika', mon('Roserade',   ['Grass','Poison'],   42,74,49,63,   ['Magical Leaf','Poison Jab'],['Leafage','Acid'],['Sludge Bomb','Shadow Ball'], ['Solar Beam'], null)),
  ],
  koga: [
    gymSignature('koga',  mon('Venomoth',   ['Bug','Poison'],     58,71,54,75,   ['Signal Beam','Psybeam'],['Bug Bite','Poison Sting'],['X-Scissor','Sludge Bomb'], ['Psychic'], null)),
    gymSignature('koga',  mon('Muk',        ['Poison'],           73,69,52,35,   ['Poison Jab','Rock Tomb'],['Acid','Bite'],['Gunk Shot','Fire Punch'], ['Sludge Bomb'], null)),
    gymSignature('koga',  mon('Tentacruel', ['Water','Poison'],   58,58,51,72,   ['Water Pulse','Poison Jab'],['Acid','Bubble'],['Surf','Sludge Bomb'], ['Hydro Pump','Ice Beam'], null)),
  ],
  blaine: [
    gymSignature('blaine', mon('Rapidash',  ['Fire'],             55,84,59,89,   ['Flame Wheel','Horn Attack'],['Ember','Quick Attack'],['Fire Fang','Body Slam'], ['Fire Blast'], null)),
    gymSignature('blaine', mon('Magmar',    ['Fire'],             53,77,53,75,   ['Fire Punch','Karate Chop'],['Ember','Brick Break'],['Flamethrower','Thunder Punch'], ['Fire Blast'], null)),
    gymSignature('blaine', mon('Torkoal',   ['Fire'],             49,60,98,14,   ['Ember','Body Slam'],['Fire Fang','Rock Tomb'],['Flamethrower','Rock Slide'], ['Fire Blast','Earthquake'], null)),
  ],
  giovanni: [
    gymSignature('giovanni', mon('Dugtrio',   ['Ground'],         49,89,53,106, ['Dig','Scratch'],['Mud Slap','Bulldoze'],['Rock Slide','Feint Attack'], ['Earthquake'], null)),
    gymSignature('giovanni', mon('Nidoqueen', ['Poison','Ground'], 60,61,58,51,  ['Poison Jab','Bulldoze'],['Body Slam','Ice Punch'],['Sludge Bomb','Thunder Punch'], ['Earthquake','Ice Beam'], null)),
    gymSignature('giovanni', mon('Hippowdon', ['Ground'],         59,62,66,29,  ['Bulldoze','Crunch'],['Bite','Rock Tomb'],['Dig','Stone Edge'], ['Earthquake'], null)),
  ],
};

const GYM_LEADERS = [
  { id: 'brock', name: 'Brock', city: 'Pewter City', badge: 'Boulder Badge', type: 'Rock',
    skill: 0.45, loyalty: 1.6, trainedPct: 0,
    style: { name: 'Gym Leader', desc: 'Rock-solid and patient, built to outlast' },
    taunt: `My Pokémon are as hard as the mountains around Pewter City. Let's see if you can crack them.` },
  { id: 'misty', name: 'Misty', city: 'Cerulean City', badge: 'Cascade Badge', type: 'Water',
    skill: 0.32, loyalty: 1.4, trainedPct: 0,
    style: { name: 'Gym Leader', desc: 'Fiery temper, fluid and relentless in battle' },
    taunt: `Water Pokémon are the most beautiful AND the toughest. Don't you dare go easy on me!` },
  { id: 'surge', name: 'Lt. Surge', city: 'Vermilion City', badge: 'Thunder Badge', type: 'Electric',
    skill: 0.40, loyalty: 1.2, trainedPct: 0,
    style: { name: 'Gym Leader', desc: 'Loud, brash, and lightning-fast' },
    taunt: `Ha! Lightning strikes fast, kid. Blink and you've already lost.` },
  { id: 'sabrina', name: 'Sabrina', city: 'Saffron City', badge: 'Marsh Badge', type: 'Psychic',
    skill: 0.20, loyalty: 1.0, trainedPct: 5,
    style: { name: 'Gym Leader', desc: 'Cold, calm, and always a step ahead' },
    taunt: `I already know how this battle ends. Show me anyway.` },
  { id: 'erika', name: 'Erika', city: 'Celadon City', badge: 'Rainbow Badge', type: 'Grass',
    skill: 0.27, loyalty: 2.0, trainedPct: 5,
    style: { name: 'Gym Leader', desc: 'Graceful and gentle, with roots that run deep' },
    taunt: `Oh my, a challenger. Then let my garden show you how strong gentle things can be.` },
  { id: 'koga', name: 'Koga', city: 'Fuchsia City', badge: 'Soul Badge', type: 'Poison',
    skill: 0.05, loyalty: 0.6, trainedPct: 7,
    style: { name: 'Gym Leader', desc: 'A ninja master who strikes from the shadows' },
    taunt: `A ninja strikes from where you least expect it. Poison works the very same way.` },
  { id: 'blaine', name: 'Blaine', city: 'Cinnabar Island', badge: 'Volcano Badge', type: 'Fire',
    skill: 0.26, loyalty: 0.4, trainedPct: 9,
    style: { name: 'Gym Leader', desc: 'A hot-headed genius who loves a riddle and a blaze' },
    taunt: `Hah! You've got fire in your eyes. Let's see if it survives the volcano!` },
  { id: 'giovanni', name: 'Giovanni', city: 'Viridian City', badge: 'Earth Badge', type: 'Ground',
    skill: 0.08, loyalty: 0.2, trainedPct: 10,
    style: { name: 'Gym Leader', desc: 'Ruthless, calculating, and utterly unshaken' },
    taunt: `Seven badges. Impressive. It ends here.` },
];

// ===================== VS COMPUTER: THE POKÉMON LEAGUE =====================
// After the eight gyms: the Kanto Elite Four (in their classic order), Champion Gary, and a final,
// special battle with Professor Oak. Each stays HIDDEN until it's earned: the Elite Four appear only
// once a named trainer holds all 8 badges (and are faced one at a time), Gary only once all four are
// beaten, and Professor Oak only once Gary is beaten. Every one of them fields a full six (two drafted
// plus four of their own, ace last). Their aces are never earned -- league wins are recorded as
// progress (and titles on the scoreboard) instead. Professor Oak is special: his lab, his ace Mew,
// and he lets a challenger bring up to three earned aces instead of one.
//
// Tuned like the gyms, so difficulty keeps climbing past Giovanni: a type-counter drafter wins about
// 32% vs Lorelei, 31% Bruno, 29% Agatha and 28% Lance. Gary and Oak have no single type to counter,
// so they're tuned against a player who drafts for type and stats: about 31% vs Gary and 25% vs
// Professor Oak (bringing three aces), the hardest battle in the game.
//
// Like the gym exclusives, the Elite Four's Pokémon never appear in the two-player draft at any
// evolution stage. Gary and Professor Oak use classic Kanto Pokémon fully evolved (Gary's Blastoise,
// Oak's starters), so a few of theirs are species a drafted Pokémon could evolve into mid-battle.
const LEAGUE = [
  { id: 'lorelei', kind: 'elite', name: 'Lorelei', poss: 'her', mark: 'L', type: 'Ice',
    skill: 0.25, loyalty: 1.0, trainedPct: 12,
    style: { name: 'Elite Four', desc: 'Cool, composed, and merciless as a blizzard' },
    taunt: `Welcome to the Pokémon League. No one leaves my chamber without feeling the cold.` },
  { id: 'bruno', kind: 'elite', name: 'Bruno', poss: 'his', mark: 'B', type: 'Fighting',
    skill: 0.50, loyalty: 1.0, trainedPct: 16,
    style: { name: 'Elite Four', desc: 'Pure strength, honed by endless training' },
    taunt: `My Pokémon and I have trained our whole lives for this. Hoo hah!` },
  { id: 'agatha', kind: 'elite', name: 'Agatha', poss: 'her', mark: 'A', type: 'Ghost',
    skill: 0.00, loyalty: 1.0, trainedPct: 19,
    style: { name: 'Elite Four', desc: 'A sharp-tongued veteran with tricks from the other side' },
    taunt: `Oak's precious trainers, always so sure of themselves. Let's see how you handle a real battle.` },
  { id: 'lance', kind: 'elite', name: 'Lance', poss: 'his', mark: 'L', type: 'Dragon',
    skill: 0.00, loyalty: 1.0, trainedPct: 19,
    style: { name: 'Elite Four', desc: 'The Dragon Master, proud and fearless' },
    taunt: `Dragons are mythical Pokémon, and they are not easily defeated. Show me your resolve.` },
  { id: 'gary', kind: 'champion', name: 'Gary', poss: 'his', mark: 'G', type: null, color: '#D9B54A',
    skill: 0.03, loyalty: 0, trainedPct: 21,
    style: { name: 'Champion', desc: 'Cocky, brilliant, and always one step ahead of his rival' },
    taunt: `Smell ya later? Not this time. I've been waiting for you at the top, and I'm not giving it up.` },
  { id: 'oak', kind: 'professor', name: 'Professor Oak', poss: 'his', mark: 'O', type: null, color: '#EDE6D6', maxAces: 3,
    skill: 0.52, loyalty: 0, trainedPct: 22,
    style: { name: 'Professor', desc: 'The world-famous Pokémon Professor, once a formidable trainer himself' },
    taunt: `So you've come all this way. Long ago I was a pretty fair trainer myself. Let's see what you've learned!` },
];

// Every opponent's ace and signature Pokémon live in the same two maps as the gym leaders' (keyed by
// opponent id), so the draft and battle code treats all of them alike.
Object.assign(GYM_ACES, {
  lorelei: gymAce('lorelei', mon('Lapras',    ['Water','Ice'],      115,75,84,53,   ['Water Pulse','Ice Fang'],['Body Slam','Icy Wind'],['Surf','Ice Beam'], ['Blizzard','Hydro Pump'], null)),
  bruno:   gymAce('bruno',   mon('Hariyama',  ['Fighting'],         121,100,50,42,  ['Brick Break','Rock Slide'],['Low Kick','Ice Punch'],['Close Combat','Thunder Punch'], ['Focus Blast','Earthquake'], null)),
  agatha:  gymAce('agatha',  mon('Dusknoir',  ['Ghost'],            48,107,145,48,  ['Shadow Punch','Ice Punch'],['Astonish','Fire Punch'],['Shadow Claw','Thunder Punch'], ['Shadow Force','Earthquake'], null)),
  lance:   gymAce('lance',   mon('Salamence', ['Dragon','Flying'],  92,130,77,96,  ['Dragon Claw','Fire Fang'],['Wing Attack','Crunch'],['Dragon Pulse','Aerial Ace'], ['Draco Meteor','Hurricane'], null)),
  gary:    gymAce('gary',    mon('Blastoise', ['Water'],            77,83,103,76,   ['Water Pulse','Bite'],['Aqua Tail','Ice Punch'],['Surf','Flash Cannon'], ['Hydro Pump','Blizzard'], null)),
  oak:     gymAce('oak',     mon('Mew',       ['Psychic'],          97,97,97,97, ['Psybeam','Shadow Claw'],['Swift','Ice Beam'],['Psychic','Thunderbolt'], ['Psystrike','Focus Blast'], null)),
});
Object.assign(GYM_SIGNATURES, {
  lorelei: [
    gymSignature('lorelei', mon('Dewgong',   ['Water','Ice'],    67,52,71,52,    ['Aqua Tail','Icy Wind'],['Headbutt','Powder Snow'],['Ice Beam','Water Pulse'], ['Blizzard'], null)),
    gymSignature('lorelei', mon('Walrein',   ['Ice','Water'],    70,58,58,42,   ['Ice Fang','Body Slam'],['Water Gun','Ice Punch'],['Surf','Crunch'], ['Blizzard','Hydro Pump'], null)),
    gymSignature('lorelei', mon('Weavile',   ['Dark','Ice'],     52,90,49,93,  ['Feint Attack','Ice Fang'],['Quick Attack','Ice Punch'],['Crunch','Icy Wind'], ['Blizzard','Dark Pulse'], null)),
  ],
  bruno: [
    gymSignature('bruno',   mon('Hitmontop', ['Fighting'],       36,69,80,51,   ['Low Kick','Quick Attack'],['Karate Chop','Rock Tomb'],['Close Combat','Dig'], ['Focus Blast'], null)),
    gymSignature('bruno',   mon('Heracross', ['Bug','Fighting'], 50,78,59,53,   ['Bug Bite','Brick Break'],['Horn Attack','Low Kick'],['X-Scissor','Rock Slide'], ['Megahorn','Close Combat'], null)),
    gymSignature('bruno',   mon('Medicham',  ['Fighting','Psychic'], 45,68,57,61, ['Karate Chop','Zen Headbutt'],['Confusion','Ice Punch'],['Brick Break','Psycho Cut'], ['Close Combat','Psychic'], null)),
  ],
  agatha: [
    gymSignature('agatha',  mon('Mismagius', ['Ghost'],          40,70,70,70, ['Astonish','Psybeam'],['Lick','Magical Leaf'],['Shadow Ball','Thunderbolt'], ['Shadow Force','Psychic'], null)),
    gymSignature('agatha',  mon('Banette',   ['Ghost'],          51,92,52,52,   ['Shadow Claw','Feint Attack'],['Lick','Shadow Punch'],['Shadow Ball','Thunder Punch'], ['Shadow Force'], null)),
    gymSignature('agatha',  mon('Sableye',   ['Dark','Ghost'],   47,70,70,47,    ['Astonish','Bite'],['Shadow Punch','Scratch'],['Shadow Claw','Crunch'], ['Dark Pulse','Shadow Ball'], null)),
  ],
  lance: [
    gymSignature('lance',   mon('Altaria',   ['Dragon','Flying'], 61,57,86,66,  ['Dragon Breath','Aerial Ace'],['Peck','Disarming Voice'],['Dragon Pulse','Air Slash'], ['Draco Meteor'], null)),
    gymSignature('lance',   mon('Flygon',    ['Ground','Dragon'], 54,68,54,68, ['Bulldoze','Dragon Breath'],['Bite','Dragon Claw'],['Dig','Rock Slide'], ['Earthquake','Draco Meteor'], null)),
    gymSignature('lance',   mon('Haxorus',   ['Dragon'],         44,85,52,56,   ['Dragon Claw','Scratch'],['Dragon Rage','Brick Break'],['Crunch','Iron Tail'], ['Draco Meteor'], null)),
  ],
  gary: [
    gymSignature('gary',    mon('Arcanine',  ['Fire'],           67,82,59,71,   ['Fire Fang','Crunch'],['Quick Attack','Flame Wheel'],['Flamethrower','Body Slam'], ['Fire Blast'], null)),
    gymSignature('gary',    mon('Alakazam',  ['Psychic'],        38,94,66,83,  ['Psybeam','Shadow Ball'],['Confusion','Swift'],['Psychic','Thunder Punch'], ['Psystrike','Focus Blast'], null)),
    gymSignature('gary',    mon('Pidgeot',   ['Normal','Flying'], 71,69,64,87,  ['Wing Attack','Quick Attack'],['Gust','Swift'],['Air Slash','Aerial Ace'], ['Hurricane','Hyper Beam'], null)),
  ],
  oak: [
    gymSignature('oak',     mon('Venusaur',  ['Grass','Poison'], 56,70,70,56,  ['Razor Leaf','Poison Jab'],['Vine Whip','Body Slam'],['Seed Bomb','Sludge Bomb'], ['Solar Beam'], null)),
    gymSignature('oak',     mon('Charizard', ['Fire','Flying'],  60,84,65,77,  ['Fire Fang','Wing Attack'],['Dragon Claw','Scratch'],['Flamethrower','Air Slash'], ['Fire Blast','Hurricane'], null)),
    gymSignature('oak',     mon('Tauros',    ['Normal'],         52,69,66,76,  ['Horn Attack','Zen Headbutt'],['Body Slam','Iron Tail'],['Double Edge','Rock Slide'], ['Hyper Beam','Earthquake'], null)),
  ],
});

const ALL_OPPONENTS = [...GYM_LEADERS, ...LEAGUE];
function opponentKind(o) { return (o && o.kind) || 'gym'; }
function opponentColor(o) { return o.color || TYPE_COLORS[o.type] || COLORS.ash; }
function opponentMaxAces(o) { return o.maxAces || 1; }
function leagueIndex(id) { return LEAGUE.findIndex(o => o.id === id); }
function sortLeague(ids) { return [...new Set(ids || [])].filter(id => leagueIndex(id) >= 0).sort((a, b) => leagueIndex(a) - leagueIndex(b)); }
const ELITE_FOUR_IDS = LEAGUE.filter(o => o.kind === 'elite').map(o => o.id);

// Hidden until earned (named trainers only -- guests never see the League):
//   Elite Four: all 8 badges. Champion: all four Elite Four beaten. Professor Oak: the Champion beaten.
function isLeagueVisible(o, badges, league, isGuest) {
  if (isGuest) return false;
  const b = badges || [], w = league || [];
  if (!GYM_LEADERS.every(l => b.includes(l.id))) return false;
  if (o.kind === 'elite') return true;
  if (o.kind === 'champion') return ELITE_FOUR_IDS.every(id => w.includes(id));
  if (o.kind === 'professor') return w.includes('gary');
  return false;
}
// The Elite Four are faced in order; Gary and Oak are open as soon as they're visible.
function isLeagueUnlocked(o, badges, league, isGuest) {
  if (!isLeagueVisible(o, badges, league, isGuest)) return false;
  if (o.kind !== 'elite') return true;
  const i = ELITE_FOUR_IDS.indexOf(o.id);
  return i === 0 || (league || []).includes(ELITE_FOUR_IDS[i - 1]);
}

function getLeader(id) { return ALL_OPPONENTS.find(l => l.id === id) || null; }
function gymIndex(id) { return GYM_LEADERS.findIndex(l => l.id === id); }
function sortBadges(badges) { return [...new Set(badges || [])].filter(id => gymIndex(id) >= 0).sort((a, b) => gymIndex(a) - gymIndex(b)); }
// Gyms open one at a time for a named trainer: beat a leader to unlock the next. Guests can't keep
// badges, so every gym is open to them as practice.
function isGymUnlocked(index, badges, isGuest) {
  if (isGuest || index === 0) return true;
  return (badges || []).includes(GYM_LEADERS[index - 1].id);
}

// ===================== DRAFT HELPERS =====================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function getMasterList(count = 12) { return shuffle(POKEMON_DB).slice(0, count); }
function getSnakeOrder(numPlayers, rounds) {
  const order = [];
  for (let r = 0; r < rounds; r++) {
    const round = Array.from({length:numPlayers}, (_,i)=>i);
    if (r % 2 === 1) round.reverse();
    order.push(...round);
  }
  return order;
}

// ===================== VS COMPUTER: DRAFT =====================
// In the gym challenge the challenger always fields a full team of six. A leader fields three or six:
// every leader drafts exactly two from the shared pool, their ace is always on the team, and the
// later leaders round out a full six with three signature Pokémon of their own (GYM_SIGNATURES).
// Keeping the leader's draft at two keeps the pool at 15 and the leader's team true to their type.
const GYM_CHALLENGER_TEAM_SIZE = 6;
const GYM_LEADER_DRAFT_PICKS = 2;

function gymSignatures(leaderId) { return GYM_SIGNATURES[leaderId] || []; }
function gymTeamSize(leader) { return GYM_LEADER_DRAFT_PICKS + 1 + gymSignatures(leader.id).length; }

// A gym's pool always holds a few Pokémon of the leader's specialty type (that's what a Gym Leader
// reaches for), topped up with random picks. Like the two-player draft, it's 15 Pokémon.
function getGymPool(leader, count = 15) {
  const shuffled = shuffle(POKEMON_DB);
  const onType = shuffled.filter(p => p.types.includes(leader.type)).slice(0, 3);
  const rest = shuffled.filter(p => !onType.includes(p)).slice(0, count - onType.length);
  return shuffle([...onType, ...rest]);
}

// Snake draft between the challenger (side 0, always first) and the leader (side 1): 0,1 then 1,0
// then 0,1..., and once one side is done the other finishes. The challenger drafts 6 minus however
// many earned aces they bring (1, or up to 3 against Professor Oak); the leader drafts 2.
// So: [0,1,1,0,0,0,0,0], or [0,1,1,0,0,0,0] with one ace. (A boolean works too: true = one ace.)
function getGymPickOrder(acesBrought) {
  const left = [GYM_CHALLENGER_TEAM_SIZE - Number(acesBrought || 0), GYM_LEADER_DRAFT_PICKS];
  const order = [];
  for (let round = 0; left[0] + left[1] > 0; round++) {
    for (const side of (round % 2 === 0 ? [0, 1] : [1, 0])) {
      if (left[side] > 0) { order.push(side); left[side] -= 1; }
    }
  }
  return order;
}

// Both teams before the draft: the challenger starts with their brought-along aces (an id, a list
// of ids, or none); the opponent starts with their signature Pokémon and their ace.
function buildGymStartRosters(leaderId, aceIds) {
  const ids = Array.isArray(aceIds) ? aceIds : (aceIds ? [aceIds] : []);
  return [
    ids.map(id => ({ ...GYM_ACES[id], earnedAce: true })),
    [...gymSignatures(leaderId), GYM_ACES[leaderId]],
  ];
}

// How hard a Pokémon hits another with its base kit -- used only for draft-time judgement.
function kitBestDamage(attacker, defender) {
  const moves = [...attacker.moves.attack, ...attacker.moves.counter].filter(m => MOVES[m] && MOVES[m].power > 0);
  if (moves.length === 0) return 0;
  return Math.max(...moves.map(m => MOVES[m].power * attacker.stats.atk / defender.stats.def / 3 * getEffectiveness(MOVES[m].type, defender.types)));
}

// A draft-time strength estimate. In this engine one side out-lasts the other when its
// HP x Attack x Defense is bigger, so the core is the cube root of that product (one number on
// the same scale as a stat). Speed adds dodge odds; an evolution line adds a little for the
// healed, boosted form it may become mid-fight. The weights were fitted to thousands of simulated
// 1v1 battles across the whole roster (rank correlation ~0.98 with actual win rates).
function draftValue(p) {
  const { hp, atk, def, spd } = p.stats;
  const core = Math.cbrt(hp * atk * def);
  let evo = p.evolvesTo;
  let growth = 1, evoBonus = 0, weight = 0.1;
  while (evo) {
    growth *= evo.mult;
    evoBonus += core * growth * weight;
    weight *= 0.25;
    evo = evo.branch ? null : evo.evolvesTo;
  }
  return (core + evoBonus) * (0.9 + 0.2 * spd / (spd + 40));
}

// Positive when p beats q in a straight exchange: the share of q's HP that p takes per hit,
// minus the reverse.
function matchupEdge(p, q) {
  return kitBestDamage(p, q) / q.stats.hp - kitBestDamage(q, p) / p.stats.hp;
}

// The leader's draft pick. Low skill: loyal to their own type, noisy. High skill: takes the
// strongest Pokémon left and counter-picks what the challenger has drafted.
function cpuDraftPick(pool, ownRoster, oppRoster, leader) {
  const skill = leader.skill;
  let best = null, bestScore = -Infinity;
  for (const p of pool) {
    const value = draftValue(p) / 25;
    const loyal = p.types.includes(leader.type) ? leader.loyalty : 0;
    const matchup = oppRoster.length > 0 ? oppRoster.reduce((s, o) => s + matchupEdge(p, o), 0) / oppRoster.length : 0;
    const noise = (Math.random() - 0.5) * 2.4 * (1 - skill);
    const score = value * (0.4 + 0.6 * skill) + loyal + matchup * 2.5 * skill + noise;
    if (score > bestScore) { bestScore = score; best = p; }
  }
  return best;
}

// Same judgement, used by the balance simulations to stand in for a human player.
function standInDraftPick(pool, ownRoster, oppRoster, skill) {
  return cpuDraftPick(pool, ownRoster, oppRoster, { skill, loyalty: 0, type: null });
}

// Gym-trained Pokémon: the leader's drafted picks and signature Pokémon get a flat stat boost (their
// ace doesn't -- it stays exactly the Pokémon a challenger earns). Shown openly on the team screen.
function applyGymTraining(p, pct, tag = 'GYM-TRAINED') {
  if (!pct) return p;
  const m = 1 + pct / 100;
  const s = p.stats;
  return { ...p, gymTrained: pct, trainedTag: tag, stats: { hp: Math.round(s.hp * m), atk: Math.round(s.atk * m), def: Math.round(s.def * m), spd: Math.round(s.spd * m) } };
}

// Once the gym draft is done: the challenger's brought-along ace moves to the back of their team,
// the leader's drafted picks and signature Pokémon get their gym training, and the leader settles
// their batting order.
function finalizeGymRosters(rosters, leader) {
  const human = [...rosters[0].filter(p => !p.aceOf), ...rosters[0].filter(p => p.aceOf)];
  const tag = opponentKind(leader) === 'gym' ? 'GYM-TRAINED' : 'LEAGUE-TRAINED';
  const cpu = cpuOrderRoster(rosters[1].map(p => (p.aceOf ? p : applyGymTraining(p, leader.trainedPct, tag))), human[0], leader);
  return [human, cpu];
}

// Final batting order for the leader: the ace is saved for last, and a sharp leader leads with
// whichever drafted pick fares best into the challenger's lead.
function cpuOrderRoster(roster, humanLead, leader) {
  const ace = roster.filter(p => p.aceOf);
  const others = roster.filter(p => !p.aceOf);
  if (others.length > 1 && humanLead && Math.random() < leader.skill) {
    others.sort((a, b) => matchupEdge(b, humanLead) - matchupEdge(a, humanLead));
  }
  return [...others, ...ace];
}

// ===================== BATTLE ENGINE =====================
function makeBattler(p) {
  return {
    name: p.name, types: [...p.types], stats: { ...p.stats },
    movesByRole: { attack: [...p.moves.attack], counter: [...p.moves.counter], dodge: [...p.moves.dodge] },
    finishingPool: [...p.finishing], learnedFinishing: [],
    evolvesTo: p.evolvesTo,
    maxHp: p.stats.hp, currentHp: p.stats.hp,
    fainted: false, hasEvolved: false, everActive: false,
    battleRecord: { damageDealt: 0, damageTaken: 0, hitsLanded: 0, critsLanded: 0, dodgesSucceeded: 0, koScored: 0, finishingMovesUsed: 0 },
  };
}

function rollMove(attacker, defender, moveName) {
  const move = MOVES[moveName];
  if (Math.random() < 0.05) return { move: moveName, missed: true, damage: 0, effectiveness: 1, crit: false };
  const eff = getEffectiveness(move.type, defender.types);
  const crit = Math.random() < 1 / 16;
  const variance = 0.85 + Math.random() * 0.15;
  let dmg = Math.round((move.power * attacker.stats.atk / defender.stats.def / 3) * eff * variance * (crit ? 1.5 : 1));
  dmg = eff === 0 ? 0 : Math.max(dmg, 1);
  return { move: moveName, missed: false, damage: dmg, effectiveness: eff, crit };
}

const DODGE_DAMPENING = 0.6;
function getDodgeChance(attacker, defender) {
  return DODGE_DAMPENING * (defender.stats.spd / (attacker.stats.spd + defender.stats.spd));
}

function dodgeChanceColor(pct) {
  const clamped = Math.max(0, Math.min(1, pct));
  const hue = Math.round(clamped * 120);
  return `hsl(${hue}, 55%, 48%)`;
}

function maybeEvolve(target) {
  // Gate on whether the CURRENT form has a next stage, not on "has it ever evolved" -- that's what
  // makes a second evolution reachable (Larvitar -> Pupitar -> Tyranitar), since after the first
  // evolution this carries the next stage's evolvesTo forward. A 1-evolution Pokemon's evolved form
  // has no evolvesTo of its own, so it still correctly caps at a single evolution.
  if (!target.evolvesTo || target.currentHp <= 0) return null;
  const hpPct = target.currentHp / target.maxHp;
  if (hpPct > 0.3 || Math.random() >= 0.5) return null;
  const evo = target.evolvesTo;
  const picked = evo.branch ? evo.branch[Math.floor(Math.random() * evo.branch.length)] : evo;
  const oldName = target.name;
  target.name = picked.name;
  target.types = picked.types;
  const mult = evo.mult;
  target.stats = {
    hp: Math.round(target.stats.hp * mult), atk: Math.round(target.stats.atk * mult),
    def: Math.round(target.stats.def * mult), spd: Math.round(target.stats.spd * mult),
  };
  target.maxHp = target.stats.hp;
  target.currentHp = target.maxHp;
  target.hasEvolved = true;
  target.evolvesTo = picked.evolvesTo || null;
  return { from: oldName, to: picked.name, note: picked.note || null };
}

// Checks whether this actor discovers a New Move RIGHT NOW, before their move resolves.
// If so, the finishing move REPLACES whatever the trainer chose for this action -- a big, instant
// bonus, not a quiet unlock for later. Returns which move actually gets used this turn.
function resolveActingMove(actor, chosenMove) {
  const available = actor.finishingPool.filter(m => !actor.learnedFinishing.includes(m));
  if (available.length > 0 && Math.random() < 0.30) {
    const newMove = available[Math.floor(Math.random() * available.length)];
    actor.learnedFinishing = [...actor.learnedFinishing, newMove];
    return { move: newMove, learnedFinishing: newMove };
  }
  return { move: chosenMove, learnedFinishing: null };
}

function applyTransform(attacker, target) {
  const oldName = attacker.name;
  attacker.name = target.name;
  attacker.types = [...target.types];
  attacker.stats = { ...attacker.stats, atk: target.stats.atk, def: target.stats.def, spd: target.stats.spd };
  attacker.movesByRole = {
    attack: [...target.movesByRole.attack], counter: [...target.movesByRole.counter], dodge: [...target.movesByRole.dodge],
  };
  attacker.finishingPool = [...target.finishingPool];
  attacker.learnedFinishing = [];
  return { from: oldName, into: target.name };
}

// ===================== LOCAL FLAVOR-TEXT POOLS =====================
// Every mechanical beat gets its story text from these pools, generated locally and instantly --
// no network call, so nothing here can time out or fail. Variety comes from combining a random
// sentence template with a random type-flavored phrase and the specific move name involved, so the
// same move reads differently exchange to exchange without needing a hand-written pool per move.
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Tracks recently-used entries per named pool so the SAME line/phrase doesn't repeat within a few
// beats of itself (the raw pool size alone wasn't enough -- a 16-entry pool can still land on the
// same pick twice within a handful of draws by pure chance). Reset once per battle in initBattle().
let recentPicks = {};
function resetVarietyTracking() { recentPicks = {}; }
function pickVaried(poolKey, arr, avoidCount = 3) {
  if (arr.length <= 1) return arr[0];
  const recent = recentPicks[poolKey] || [];
  const cap = Math.min(avoidCount, arr.length - 1);
  const avoidSet = new Set(recent.slice(-cap));
  const candidateIndices = arr.map((_, i) => i).filter(i => !avoidSet.has(i));
  const chosenIndex = candidateIndices.length > 0
    ? candidateIndices[Math.floor(Math.random() * candidateIndices.length)]
    : Math.floor(Math.random() * arr.length);
  recentPicks[poolKey] = [...recent, chosenIndex].slice(-(cap + 2));
  return arr[chosenIndex];
}
function fillTemplate(tpl, vars) {
  return tpl.replace(/\{(\w+)\}/g, (_, key) => (vars[key] !== undefined ? vars[key] : `{${key}}`));
}

const TYPE_FLAVOR = {
  Normal: ['a clean, no-nonsense blow', 'raw, straightforward force', 'a solid, textbook strike', 'plain, honest power', `a full-force, unadorned hit`, `sheer momentum, nothing fancy`, `an uncomplicated wall of impact`, `raw kinetic force, plain and simple`],
  Fire: ['a wash of searing heat', 'a burst of scorching flame', 'a blaze that scorches the air', 'a wave of blistering heat', `a lick of orange flame`, `heat that shimmers the air itself`, `a roaring tongue of fire`, `an ember-bright flash of warmth`],
  Water: ['a crashing wall of water', 'a surge that knocks the wind out', 'a churning rush of force', 'a torrent that sweeps in', `a soaking deluge`, `a wave that swallows everything in its path`, `a relentless flood of force`, `water that hits like a solid wall`],
  Electric: ['a crackle of raw voltage', 'a flash of biting current', 'a jolt that arcs through the air', 'a spark that snaps and hisses', `a blinding flash of static charge`, `a buzz of current that sets hair on end`, `a bolt that splits the air`, `electricity that hums with menace`],
  Grass: ['a whip-crack of green force', 'a sudden lash of vines and leaves', 'a surge from the earth itself', 'a snap like a coiled spring', `a rustle of leaves turned weapon`, `thorny growth erupting on impact`, `a green blur of motion`, `nature itself lashing out`],
  Ice: ['a bite of numbing cold', 'a crystalline burst of frost', 'a chill that stops them cold', 'a freezing wave that bites deep', `a shard of glittering frost`, `cold that steals the breath away`, `a glacial wall of chill`, `frost spreading in an instant`],
  Fighting: ['a bone-jarring strike', 'a blow with real weight behind it', 'raw physical power', 'a strike that lands with a thud', `a punishing, full-body blow`, `a strike that rattles teeth`, `brute force, plain and simple`, `a hit that echoes off the arena floor`],
  Poison: ['a sickly, creeping strike', 'a toxic burst that lingers', 'a venomous hit that stings', 'a corrosive splash that clings', `a noxious cloud that clings to the skin`, `a strike that leaves a queasy sting`, `something foul and biting`, `a toxin that spreads on contact`],
  Ground: ['a shuddering impact', 'a strike that shakes the ground', 'a heavy, grounded blow', 'a tremor that rattles bones', `a strike that kicks up a wall of dust`, `earth itself thrown into the fight`, `a jolt felt through the whole arena`, `a crushing, earthbound blow`],
  Flying: ['a swift strike from above', 'a blur of wind and motion', 'a strike that cuts through the air', 'a gust-driven blow', `a whistling strike from the wind itself`, `a sudden downdraft of force`, `motion too fast to track`, `a strike carried on a rush of air`],
  Psychic: ['a strange, unseen force', 'a ripple of bending energy', 'a strike that seems to warp the air', 'a pulse of eerie pressure', `a wave of pressure with no visible source`, `something unseen pressing in hard`, `a strike that bends the light around it`, `an unsettling ripple through the mind`],
  Bug: ['a swarming flurry', 'a sharp, skittering strike', 'a sudden, buzzing assault', 'a quick, needling hit', `a flurry of quick, precise strikes`, `a skittering blur closing the distance`, `a sharp, chitinous impact`, `something fast and relentless`],
  Rock: ['a crushing, weighty impact', 'a blow like a falling boulder', 'raw, jagged force', 'a grinding, heavy strike', `a strike with the weight of stone behind it`, `a jagged, unforgiving impact`, `force like a rockslide`, `a blow that cracks and echoes`],
  Ghost: ['an eerie, chilling strike', 'a blow that seems to pass through', 'a spectral wave of dread', 'a hit that leaves a cold shiver', `a strike from somewhere just out of sight`, `something cold and unseen making contact`, `a wave of dread that precedes the hit`, `an impact that feels wrong, somehow`],
  Dragon: ['a strike that feels ancient and immense', 'raw, primal force', 'a surge of overwhelming power', 'a blow with the weight of legend behind it', `a strike that seems to shake the very air`, `overwhelming, elemental force`, `power that feels older than the arena itself`, `a hit with real gravity behind it`],
  Dark: ['a strike from the shadows', 'a sudden, merciless blow', 'an attack with real bite to it', 'a cold, calculated hit', `a strike that gives no warning`, `something sharp and without mercy`, `a blow struck without hesitation`, `an attack that feels personal`],
  Steel: ['a clanging, metallic impact', 'a blow like struck iron', 'unyielding, armored force', 'a hit that rings like a struck bell', `a strike hard and unyielding as steel`, `an impact that rings out across the field`, `force with no give to it at all`, `a blow that could dent armor`],
  Fairy: ['a shimmering burst of light', 'a strange, glimmering force', 'an unexpectedly powerful strike', 'a soft glow that hits harder than it looks', `a burst of light that lands harder than expected`, `something delicate-looking with real bite`, `a shimmer that belies its power`, `a glowing strike that catches everyone off guard`],
};

const ROLE_VERBS = {
  attack: ['unleashes', 'lets loose with', 'fires off', 'goes on the offensive with', 'charges in with', `launches`, `opens with`, `commits to`, `throws everything into`, `brings the fight with`],
  counter: ['answers back with', 'fires right back with', 'retaliates using', 'strikes back with', 'refuses to back down, countering with', `meets the attack with`, `snaps back with`, `has an answer ready with`, `doesn't flinch, countering with`, `turns the tables with`],
  dodge_punish: ['capitalizes with', 'seizes the opening with', 'punishes the gap with', 'makes them pay with', 'answers the dodge with', `wastes no time, following up with`, `takes full advantage with`, `closes the gap with`, `makes the opening count with`, `strikes back instantly with`],
};

const HIT_TEMPLATES = {
  neutral: [
    '{attacker} {verb} {move} — {flavor} sends {defender} staggering.',
    '{move}! It connects clean — {flavor} catches {defender} off guard.',
    'With a sharp cry, {attacker} {verb} {move} — {flavor} finds its mark on {defender}.',
    '{defender} takes the hit as {attacker} {verb} {move}, {flavor} landing true.',
    '{attacker} doesn\'t hold back — {move} connects, {flavor} rocking {defender}.',
    'No hesitation from {attacker}: {move} lands, {flavor} striking {defender} hard.',
    '{attacker} {verb} {move}, and {flavor} hits home against {defender}.',
    'A shout rings out as {attacker}\'s {move} connects — {flavor}, right on target.',
    `{move} lands clean — {flavor} catches {defender} off guard.`,
    `No wasted motion: {attacker} {verb} {move}, and {flavor} gets the job done.`,
    `{attacker} times it perfectly — {move} connects with {flavor}, right on {defender}.`,
    `{defender} braces, but {attacker}'s {move} still gets through — {flavor}, plain and simple.`,
    `{move} finds its target — {flavor} leaves {defender} reeling from {attacker}'s assault.`,
    `Direct hit — {attacker}'s {move} lands with {flavor}, right where it counts.`,
    `{attacker} commits fully, and {move} connects — {flavor} against {defender}.`,
    `The gap closes fast: {attacker} {verb} {move}, {flavor} landing square on {defender}.`,
  ],
  superEffective: [
    '{attacker} {verb} {move} — {flavor}, and it\'s devastating! {defender} reels from the blow.',
    'A perfect read! {attacker}\'s {move} connects with {flavor}, and {defender} can\'t shake it off.',
    '{move} tears through {defender}\'s defenses — {flavor}, and it shows immediately.',
    '{attacker} {verb} {move} right where it hurts — {flavor} drops {defender} to one knee.',
    'The crowd gasps as {attacker}\'s {move} lands with {flavor} — {defender} is in real trouble now.',
    'That\'s exactly the matchup {attacker} wanted — {move} connects with {flavor}, and {defender} staggers hard.',
    `{attacker} found the exact right angle — {move} lands with {flavor}, and {defender} feels it in full.`,
    `This is the matchup nightmares are made of for {defender}: {move} connects with {flavor}, devastating.`,
    `{move} couldn't have landed better — {flavor} tears through {defender}'s guard completely.`,
    `{defender} has no answer for this — {attacker}'s {move} connects with {flavor}, and it shows.`,
    `Everyone in the arena feels that one: {move} lands with {flavor}, staggering {defender} badly.`,
    `{attacker} exploits the opening perfectly — {move} hits with {flavor}, overwhelming {defender}.`,
  ],
  notVeryEffective: [
    '{attacker} {verb} {move} — {flavor}, but {defender} shrugs most of it off.',
    '{move} connects, {flavor}, though {defender} barely seems to notice.',
    '{attacker} lands the hit, {flavor}, but it\'s not enough to really trouble {defender}.',
    '{defender} takes {move} in stride — {flavor}, but the damage is minor.',
    'Not the ideal matchup — {attacker}\'s {move} lands with {flavor}, but {defender} takes it well.',
    `{attacker} lands {move} — {flavor}, though {defender} was built to take exactly this kind of hit.`,
    `It connects, {flavor}, but {defender}'s defenses are made for this matchup.`,
    `{move} finds its mark, {flavor}, though the damage is disappointingly small.`,
    `{attacker} gives it everything, but {move} only manages {flavor} against {defender}'s resilience.`,
    `Not the tool for this job — {attacker}'s {move} lands with {flavor}, but barely dents {defender}.`,
  ],
  noEffect: [
    '{attacker} {verb} {move} — {flavor}, but it passes right through {defender}. No effect at all.',
    '{move} connects, but {defender} simply isn\'t affected — {flavor}, wasted entirely.',
    '{attacker}\'s {move} does nothing against {defender} this time — {flavor}, for nothing.',
    'Wrong tool for the job — {defender} shakes off {attacker}\'s {move} completely.',
    `{attacker}'s {move} connects, {flavor} — but {defender} simply shrugs it off entirely, unaffected.`,
    `Wasted effort — {move} lands with {flavor}, yet {defender} isn't affected in the slightest.`,
    `{defender} stands completely unbothered as {attacker}'s {move} does nothing at all, {flavor} or not.`,
    `A total mismatch: {attacker}'s {move} has zero effect on {defender}, despite {flavor}.`,
  ],
  miss: [
    '{attacker} {verb} {move} — but it doesn\'t connect.',
    '{move} goes wide — {attacker} overcommitted, missing {defender} entirely.',
    'Not this time — {attacker}\'s {move} fails to land.',
    '{attacker} {verb} {move}, but the attack comes up short.',
    'Close, but no — {defender} is left untouched as {move} misses.',
    `{attacker} commits to {move} — and whiffs completely.`,
    `{defender} isn't even where {attacker} expected — {move} misses by a mile.`,
    `{move} sails past harmlessly; {attacker} overcommitted.`,
    `A step too slow — {attacker}'s {move} never finds {defender}.`,
    `{attacker} {verb} {move}, but the timing is off, and it misses entirely.`,
  ],
  dodged: [
    '{attacker} {verb} {move} — but {defender} reads it perfectly and slips away untouched!',
    '{move} never stands a chance — {defender} is already gone before it lands.',
    'A flash of movement, and {defender} simply isn\'t there anymore — {attacker}\'s {move} hits nothing but air.',
    '{defender} sees it coming and dodges clean out of the way of {attacker}\'s {move}.',
    'Incredible reflexes — {defender} evades {attacker}\'s {move} with room to spare.',
    `{defender} isn't sticking around for this one — {attacker}'s {move} meets empty air.`,
    `Gone before it lands — {defender} slips {attacker}'s {move} with room to spare.`,
    `{attacker} {verb} {move}, but {defender} was already three steps ahead.`,
    `A blur of motion, and {defender} is simply elsewhere — {move} finds nothing.`,
    `{defender} reads the whole thing coming and steps clean out of {attacker}'s {move}.`,
  ],
};

const CRIT_SUFFIXES = [
  'A critical hit!',
  'Right in the sweet spot — critical hit!',
  'That one lands perfectly — critical hit!',
  'A devastating critical strike!',
  'Textbook form — critical hit!',
  `A flawless critical hit!`,
  `Maximum impact — critical hit!`,
  `That's going to leave a mark — critical hit!`,
  `Picture-perfect critical hit!`,
  `Right on the button — critical hit!`,
];

const NEW_MOVE_TEMPLATES = [
  '{attacker} suddenly glows with newfound power — a New Move! {move} bursts out, catching everyone off guard.',
  'Something shifts in {attacker} — raw instinct takes over, and {move} erupts as a New Move nobody saw coming.',
  '"What was THAT?!" {attacker} has just unleashed {move} — a New Move, discovered in the heat of battle.',
  '{attacker} feels it before anyone else does — a surge of power, and {move} tears out as a brand New Move.',
  'This wasn\'t the plan — but {attacker} discovers {move} mid-battle, unleashing it instantly as a New Move.',
  'A flash of instinct, and {attacker} discovers {move}! The New Move erupts, overriding everything.',
  `Out of nowhere, {attacker} finds {move} — a New Move even its own trainer didn't see coming!`,
  `The air itself seems to shift as {attacker} taps into something new: {move}, unleashed as a New Move!`,
  `{attacker} has been holding this back without even knowing it — {move} bursts free as a New Move!`,
  `A roar from the crowd as {attacker} unveils {move} — a New Move discovered in the heat of the moment!`,
  `Nobody called this: {attacker} suddenly has {move} in its arsenal, a New Move born from pure instinct!`,
  `{attacker}'s eyes flash with new resolve — {move} erupts as a New Move, changing everything!`,
];

const EVOLVE_TEMPLATES = [
  '{from} is suddenly wreathed in blinding light — it\'s evolving! {to} emerges, fully healed and ready.',
  'Something changes deep within {from} — light erupts, and moments later, {to} stands in its place, restored.',
  'The battle itself seems to pause as {from} evolves before everyone\'s eyes, emerging as {to}, fully healed!',
  '{from} can feel it building — and then it happens: evolution! {to} rises, healed and stronger than ever.',
  'A blinding flash, and {from} is gone — in its place stands {to}, fully restored and ready to keep fighting.',
  `{from} glows brighter and brighter — there's no stopping it now. {to} emerges, fully healed.`,
  `The transformation is instant and total: {from} becomes {to}, restored and ready for more.`,
  `A surge of energy, a blinding light, and {from} is gone — {to} stands there instead, fully healed.`,
  `{from} has pushed past its limit and into something new: {to}, fully restored.`,
  `In one dazzling instant, {from} evolves into {to}, healed completely and ready to keep fighting.`,
];

const FAINT_TEMPLATES = [
  '{name} can\'t continue — it\'s down.',
  '{name} collapses, unable to battle on.',
  'That\'s it for {name} — down and out.',
  '{name} hits the ground, finished for this battle.',
  '{name} has given everything it\'s got, and it\'s not enough. Down it goes.',
  `{name} goes still — it's over for now.`,
  `{name} can't answer the bell. Down for the count.`,
  `{name} slumps, completely spent.`,
  `That's all {name} has got. Down it goes.`,
  `{name} fights to the very end, but it's not enough this time.`,
];

const SWITCH_TEMPLATES = [
  '{name} steps up, ready to fight.',
  '{name} takes the field, eyes sharp.',
  'In comes {name}, ready for battle.',
  '{name} enters the fray with confidence.',
  '{name} strides out, ready to turn things around.',
  `{name} takes its place, ready for whatever comes next.`,
  `Out comes {name}, focused and ready.`,
  `{name} strides forward, ready to make an impact.`,
  `A fresh face enters: {name}, ready to fight.`,
  `{name} steps into the fray, determined.`,
];

const TRANSFORM_TEMPLATES = [
  '{from} ripples and shifts — in an instant, it\'s a perfect copy of {into}!',
  'A strange shimmer, and {from} reshapes itself entirely into {into}!',
  '{from} melts and reforms before anyone can blink — now it\'s {into}!',
  'In the blink of an eye, {from} becomes an exact copy of {into}!',
  `A pulse of light, and {from} is instantly, perfectly {into}!`,
  `{from} doesn't hesitate — in a flash, it's become {into} completely!`,
  `One moment it's {from}; the next, {into} stands in its place!`,
  `{from} shifts shape entirely, emerging as a flawless {into}!`,
];

// narrate() is the single entry point that turns a mechanical event into display text. For every
// event type except the battle-opening 'start', this resolves synchronously and instantly -- no
// loading state needed. 'start' still gets a plain fallback here; its richer AI intro is fetched
// once, separately, by the battle screen.
function narrate(event) {
  switch (event.type) {
    case 'start':
      if (event.gym) return event.gym.line;
      return `${event.t0} and ${event.t1} begin their battle!`;
    case 'transform':
      return fillTemplate(pickVaried('transform', TRANSFORM_TEMPLATES), { from: event.from, into: event.into });
    case 'attack':
    case 'counter':
    case 'dodge_punish': {
      const role = event.type;
      const verb = pickVaried(`verb_${role}`, ROLE_VERBS[role]);
      const vars = { attacker: event.attacker, move: event.move, defender: event.defender, verb };
      let base;
      if (role === 'attack' && event.dodged) {
        base = fillTemplate(pickVaried('hit_dodged', HIT_TEMPLATES.dodged), vars);
      } else if (event.missed) {
        base = fillTemplate(pickVaried('hit_miss', HIT_TEMPLATES.miss), vars);
      } else {
        const moveType = (MOVES[event.move] && MOVES[event.move].type) || 'Normal';
        const flavor = pickVaried(`flavor_${moveType}`, TYPE_FLAVOR[moveType] || TYPE_FLAVOR.Normal);
        const tier = event.effectiveness === 0 ? 'noEffect' : event.effectiveness > 1 ? 'superEffective' : event.effectiveness < 1 ? 'notVeryEffective' : 'neutral';
        base = fillTemplate(pickVaried(`hit_${tier}`, HIT_TEMPLATES[tier]), { ...vars, flavor });
        if (event.crit) base += ' ' + pickVaried('crit', CRIT_SUFFIXES);
      }
      if (event.learnedFinishing) {
        const announce = fillTemplate(pickVaried('newmove', NEW_MOVE_TEMPLATES), { attacker: event.attacker, move: event.learnedFinishing });
        return `${announce} ${base}`;
      }
      return base;
    }
    case 'faint':
      return fillTemplate(pickVaried('faint', FAINT_TEMPLATES), { name: event.name });
    case 'evolve': {
      const base = fillTemplate(pickVaried('evolve', EVOLVE_TEMPLATES), { from: event.from, to: event.to });
      return event.note ? `${event.note} ${base}` : base;
    }
    case 'switch':
      return fillTemplate(pickVaried('switch', SWITCH_TEMPLATES), { name: event.name });
    default:
      return '';
  }
}

function makeSnapshot(teams, active) {
  return [0, 1].map(side => {
    const b = teams[side][active[side]];
    return { name: b.name, types: [...b.types], currentHp: b.currentHp, maxHp: b.maxHp, hasEvolved: b.hasEvolved };
  });
}

function chooseAttack(state, moveName) {
  if (moveName === 'Transform') return resolveTransform(state);
  return { ...state, pendingAttackMove: moveName };
}

function resolveTransform(state) {
  const teams = state.teams.map(t => t.map(m => ({ ...m, stats: { ...m.stats }, learnedFinishing: [...m.learnedFinishing], movesByRole: { attack: [...m.movesByRole.attack], counter: [...m.movesByRole.counter], dodge: [...m.movesByRole.dodge] }, finishingPool: [...m.finishingPool], battleRecord: { ...m.battleRecord } })));
  const attackerSide = state.initiator;
  const defenderSide = attackerSide === 0 ? 1 : 0;
  const attacker = teams[attackerSide][state.active[attackerSide]];
  const target = teams[defenderSide][state.active[defenderSide]];
  const result = applyTransform(attacker, target);
  const event = { type: 'transform', side: attackerSide, ...result };
  const beat = { id: state.beatCounter, event, mechanicalText: narrate(event), aiText: null, snapshotAfter: makeSnapshot(teams, state.active) };
  const log = [...state.log, beat];
  const nextInitiator = attackerSide === 0 ? 1 : 0;
  return { teams, active: state.active, log, pendingBeats: state.pendingBeats, beatCounter: state.beatCounter + 1, initiator: nextInitiator, pendingAttackMove: null, winner: state.winner, needsSwitch: state.needsSwitch };
}

function chooseDefense(state, defenseMoveName) {
  const teams = state.teams.map(t => t.map(m => ({ ...m, stats: { ...m.stats }, learnedFinishing: [...m.learnedFinishing], movesByRole: { attack: [...m.movesByRole.attack], counter: [...m.movesByRole.counter], dodge: [...m.movesByRole.dodge] }, finishingPool: [...m.finishingPool], battleRecord: { ...m.battleRecord } })));
  const active = state.active;
  const attackerSide = state.initiator;
  const defenderSide = attackerSide === 0 ? 1 : 0;
  const attacker = teams[attackerSide][active[attackerSide]];
  const defender = teams[defenderSide][active[defenderSide]];
  const attackMoveName = state.pendingAttackMove;
  const isDodge = defender.movesByRole.dodge.includes(defenseMoveName);

  const beats = [];
  let beatId = state.beatCounter;
  const pushBeat = (event) => {
    beats.push({ id: beatId, event, mechanicalText: narrate(event), aiText: null, snapshotAfter: makeSnapshot(teams, active) });
    beatId += 1;
  };

  // Attributes a landed hit to its source for the end-of-battle stats table: damage dealt/taken,
  // hits landed, crits, and KO credit all get recorded here in one place.
  const applyDamage = (source, target, roll) => {
    if (roll.missed) return;
    target.currentHp = Math.max(0, target.currentHp - roll.damage);
    source.battleRecord.damageDealt += roll.damage;
    source.battleRecord.hitsLanded += 1;
    target.battleRecord.damageTaken += roll.damage;
    if (roll.crit) source.battleRecord.critsLanded += 1;
    if (target.currentHp <= 0) source.battleRecord.koScored += 1;
  };

  if (isDodge) {
    const dodgeChance = getDodgeChance(attacker, defender);
    const dodgeSuccess = Math.random() < dodgeChance;
    if (dodgeSuccess) {
      defender.battleRecord.dodgesSucceeded += 1;
      pushBeat({ type: 'attack', side: attackerSide, attacker: attacker.name, defender: defender.name, move: attackMoveName, dodged: true });
      const { move: punishMove, learnedFinishing } = resolveActingMove(defender, defenseMoveName);
      const punishRoll = rollMove(defender, attacker, punishMove);
      applyDamage(defender, attacker, punishRoll);
      if (learnedFinishing) defender.battleRecord.finishingMovesUsed += 1;
      pushBeat({ type: 'dodge_punish', side: defenderSide, attacker: defender.name, defender: attacker.name, learnedFinishing, ...punishRoll });
    } else {
      const { move: actualAttackMove, learnedFinishing } = resolveActingMove(attacker, attackMoveName);
      const attackRoll = rollMove(attacker, defender, actualAttackMove);
      applyDamage(attacker, defender, attackRoll);
      if (learnedFinishing) attacker.battleRecord.finishingMovesUsed += 1;
      pushBeat({ type: 'attack', side: attackerSide, attacker: attacker.name, defender: defender.name, dodgeFailed: true, learnedFinishing, ...attackRoll });
    }
  } else {
    const { move: actualAttackMove, learnedFinishing: attackerLearned } = resolveActingMove(attacker, attackMoveName);
    const attackRoll = rollMove(attacker, defender, actualAttackMove);
    applyDamage(attacker, defender, attackRoll);
    if (attackerLearned) attacker.battleRecord.finishingMovesUsed += 1;
    pushBeat({ type: 'attack', side: attackerSide, attacker: attacker.name, defender: defender.name, learnedFinishing: attackerLearned, ...attackRoll });

    const { move: actualCounterMove, learnedFinishing: defenderLearned } = resolveActingMove(defender, defenseMoveName);
    const counterRoll = rollMove(defender, attacker, actualCounterMove);
    applyDamage(defender, attacker, counterRoll);
    if (defenderLearned) defender.battleRecord.finishingMovesUsed += 1;
    pushBeat({ type: 'counter', side: defenderSide, attacker: defender.name, defender: attacker.name, learnedFinishing: defenderLearned, ...counterRoll });
  }

  if (defender.currentHp <= 0) { defender.fainted = true; pushBeat({ type: 'faint', side: defenderSide, name: defender.name }); }
  if (attacker.currentHp <= 0) { attacker.fainted = true; pushBeat({ type: 'faint', side: attackerSide, name: attacker.name }); }

  if (defender.currentHp > 0) { const evo = maybeEvolve(defender); if (evo) pushBeat({ type: 'evolve', side: defenderSide, ...evo }); }
  if (attacker.currentHp > 0) { const evo = maybeEvolve(attacker); if (evo) pushBeat({ type: 'evolve', side: attackerSide, ...evo }); }

  const side0Remaining = teams[0].some(m => !m.fainted);
  const side1Remaining = teams[1].some(m => !m.fainted);
  let winner = null, needsSwitch = [];
  if (!side0Remaining && !side1Remaining) winner = 'draw';
  else if (!side0Remaining) winner = 1;
  else if (!side1Remaining) winner = 0;
  else {
    if (defender.fainted) needsSwitch.push(defenderSide);
    if (attacker.fainted) needsSwitch.push(attackerSide);
  }

  const nextInitiator = attackerSide === 0 ? 1 : 0;
  const [firstBeat, ...restBeats] = beats;
  const log = [...state.log, firstBeat];
  const pendingBeats = [...state.pendingBeats, ...restBeats];

  return { teams, active, log, pendingBeats, beatCounter: beatId, initiator: nextInitiator, pendingAttackMove: null, winner, needsSwitch };
}

function applySwitchIn(state, sideIdx, newIdx) {
  const teams = state.teams.map((t, tIdx) => tIdx === sideIdx ? t.map((m, i) => (i === newIdx ? { ...m, everActive: true } : m)) : t);
  const active = [...state.active];
  active[sideIdx] = newIdx;
  const needsSwitch = state.needsSwitch.filter(s => s !== sideIdx);
  const event = { type: 'switch', side: sideIdx, name: teams[sideIdx][newIdx].name };
  const beat = { id: state.beatCounter, event, mechanicalText: narrate(event), aiText: null, snapshotAfter: makeSnapshot(teams, active) };
  const log = [...state.log, beat];
  return { ...state, teams, active, needsSwitch, log, beatCounter: state.beatCounter + 1 };
}

function revealNextBeat(state) {
  if (state.pendingBeats.length === 0) return state;
  const [next, ...rest] = state.pendingBeats;
  return { ...state, log: [...state.log, next], pendingBeats: rest };
}

function initBattle(roster0, roster1, trainerNames, gym) {
  resetVarietyTracking();
  const teams = [roster0.map(makeBattler), roster1.map(makeBattler)];
  teams[0][0].everActive = true;
  teams[1][0].everActive = true;
  const active = [0, 0];
  const initiator = teams[0][0].stats.spd >= teams[1][0].stats.spd ? 0 : 1;
  const names = trainerNames || ['Trainer 1', 'Trainer 2'];
  const startEvent = { type: 'start', t0: names[0], t1: names[1], gym: gym ? { line: opponentStartLine(gym, names[0]) } : null };
  const log = [{ id: 0, event: startEvent, mechanicalText: narrate(startEvent), aiText: null, snapshotAfter: makeSnapshot(teams, active) }];
  return { teams, active, log, pendingBeats: [], beatCounter: 1, initiator, pendingAttackMove: null, winner: null, needsSwitch: [] };
}

// ===================== QUICK BATTLE (auto-resolve helpers) =====================
function isKeyAttackMoment(attacker) {
  return attacker.learnedFinishing.length > 0 || attacker.movesByRole.attack.includes('Transform');
}
function isKeyDefenseMoment(defender) {
  return defender.currentHp / defender.maxHp <= 0.4;
}
function autoPickAttack(attacker, defender) {
  const [a0, a1] = attacker.movesByRole.attack;
  const eff0 = getEffectiveness(MOVES[a0].type, defender.types);
  const eff1 = getEffectiveness(MOVES[a1].type, defender.types);
  return eff1 > eff0 ? a1 : a0;
}
function autoPickDefense(defender) {
  const useCounter = Math.random() < 0.65;
  const pool = useCounter ? defender.movesByRole.counter : defender.movesByRole.dodge;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ===================== VS COMPUTER: BATTLE AI =====================
// Every in-battle decision the computer makes runs through one `skill` number between 0 and 1:
// the chance that, on a given decision, it does the real arithmetic instead of playing loose.
// "The arithmetic" is the same math the engine uses -- expected damage with type matchups, the
// actual dodge odds, and which Pokémon on its bench fares best into yours.

// Average damage a move does, mirroring rollMove(): 95% to hit, ~0.925 average variance, and the
// small expected bump from 1-in-16 crits.
function expectedDamage(attacker, defender, moveName) {
  const move = MOVES[moveName];
  if (!move || move.power === 0) return 0;
  const eff = getEffectiveness(move.type, defender.types);
  return 0.95 * (move.power * attacker.stats.atk / defender.stats.def / 3) * eff * 0.925 * (1 + 0.5 / 16);
}

function bestExpectedDamage(attacker, defender) {
  const moves = [...attacker.movesByRole.attack, ...attacker.learnedFinishing];
  return Math.max(0, ...moves.map(m => expectedDamage(attacker, defender, m)));
}

function cpuPickAttack(attacker, defender, skill) {
  const options = [...attacker.movesByRole.attack, ...attacker.learnedFinishing];
  if (options.includes('Transform')) {
    // Copying a stronger opponent is almost always right; a careless trainer only sometimes thinks of it.
    if (Math.random() < 0.5 + 0.5 * skill) return 'Transform';
    const rest = options.filter(m => m !== 'Transform');
    return rest[Math.floor(Math.random() * rest.length)];
  }
  if (Math.random() >= skill) return options[Math.floor(Math.random() * options.length)];
  let best = options[0], bestDmg = -1;
  for (const m of options) {
    const d = expectedDamage(attacker, defender, m) * (0.97 + Math.random() * 0.06);
    if (d > bestDmg) { bestDmg = d; best = m; }
  }
  return best;
}

// Weighs COUNTER (both sides land their hit) against each DODGE (dodge succeeds at the real odds
// and punishes, or fails and eats the full hit). Damage is scored as a share of each side's
// remaining HP, so a counter that would finish the attacker -- or a hit that would finish this
// Pokémon -- weighs exactly as heavily as it should.
function cpuPickDefense(defender, attacker, attackMoveName, skill) {
  const counters = defender.movesByRole.counter;
  const dodges = defender.movesByRole.dodge;
  if (Math.random() >= skill) {
    const pool = Math.random() < 0.6 ? counters : dodges;
    return pool[Math.floor(Math.random() * pool.length)];
  }
  const incoming = Math.min(expectedDamage(attacker, defender, attackMoveName), defender.currentHp) / Math.max(1, defender.currentHp);
  const dealt = (m) => Math.min(expectedDamage(defender, attacker, m), attacker.currentHp) / Math.max(1, attacker.currentHp);
  const p = getDodgeChance(attacker, defender);
  let best = counters[0], bestScore = -Infinity;
  for (const m of counters) {
    const s = dealt(m) - incoming;
    if (s > bestScore) { bestScore = s; best = m; }
  }
  for (const m of dodges) {
    const s = p * dealt(m) - (1 - p) * incoming;
    if (s > bestScore) { bestScore = s; best = m; }
  }
  return best;
}

// Who to send out after a faint. Careless: the next one in line. Sharp: the best matchup.
function cpuPickSwitch(team, opponent, skill) {
  const alive = team.map((_, i) => i).filter(i => !team[i].fainted);
  if (alive.length <= 1 || Math.random() >= skill) return alive[0];
  let best = alive[0], bestScore = -Infinity;
  for (const i of alive) {
    const m = team[i];
    const s = bestExpectedDamage(m, opponent) / Math.max(1, opponent.currentHp) - bestExpectedDamage(opponent, m) / Math.max(1, m.currentHp);
    if (s > bestScore) { bestScore = s; best = i; }
  }
  return best;
}

// Takes whatever single action `side` owes right now (switch in, attack, or defend) and returns the
// next battle state -- or null when it isn't that side's move. Used for the computer's turns in VS
// Computer and, in the balance simulations, for stand-in players too.
function cpuTakeTurn(state, side, skill) {
  if (state.winner !== null || state.pendingBeats.length > 0) return null;
  const other = side === 0 ? 1 : 0;
  if (state.needsSwitch.length > 0) {
    if (state.needsSwitch[0] !== side) return null;
    const opponent = state.teams[other][state.active[other]];
    return applySwitchIn(state, side, cpuPickSwitch(state.teams[side], opponent, skill));
  }
  const attackerSide = state.initiator;
  const defenderSide = attackerSide === 0 ? 1 : 0;
  const attacker = state.teams[attackerSide][state.active[attackerSide]];
  const defender = state.teams[defenderSide][state.active[defenderSide]];
  if (state.pendingAttackMove === null) {
    if (attackerSide !== side) return null;
    return chooseAttack(state, cpuPickAttack(attacker, defender, skill));
  }
  if (defenderSide !== side) return null;
  return chooseDefense(state, cpuPickDefense(defender, attacker, state.pendingAttackMove, skill));
}

// ===================== BATTLE INTRO (the one remaining live AI call, once per battle) =====================
// Browsers expose whatever text-to-speech voices are installed on the device; the default
// picked automatically is often the most basic/robotic one. This prefers voices that tend to
// sound more natural (Google's voices on Chrome, "Natural"/"Neural"/"Enhanced" voices on newer
// OSes, well-regarded named voices like Samantha) without requiring the user to pick manually.
function pickBestVoice(voices) {
  if (!voices || voices.length === 0) return null;
  const english = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
  const pool = english.length > 0 ? english : voices;
  const preferredNamePatterns = [/natural/i, /neural/i, /premium/i, /enhanced/i, /samantha/i, /aria/i, /google/i];
  for (const pattern of preferredNamePatterns) {
    const match = pool.find(v => pattern.test(v.name));
    if (match) return match;
  }
  return pool[0];
}

// `gym` (VS Computer only) is { leader, challengerIsGuest } -- adds the Gym setting to the story.
// The opening narration line for a VS Computer battle (shown before the AI intro arrives, and as
// its fallback).
function opponentStartLine(o, challenger) {
  switch (opponentKind(o)) {
    case 'elite': return `Elite Four ${o.name} awaits ${challenger} at the Indigo Plateau. Only the strongest trainers go any further!`;
    case 'champion': return `${challenger} climbs the last stairs of the Indigo Plateau. Champion ${o.name} is waiting, and the title is on the line!`;
    case 'professor': return `In his lab in Pallet Town, Professor Oak sets down his notes and steps up to face ${challenger} in one final battle.`;
    default: return `${o.name}, Leader of the ${o.city} Gym, accepts ${challenger}'s challenge. The ${o.badge} is on the line!`;
  }
}

// Display strings for an opponent on the gym menu and team screen.
function opponentHeading(o) {
  switch (opponentKind(o)) {
    case 'elite': return `ELITE FOUR · ${o.name.toUpperCase()}`;
    case 'champion': return `CHAMPION ${o.name.toUpperCase()}`;
    case 'professor': return 'PROFESSOR OAK · PALLET TOWN';
    default: return `${o.name.toUpperCase()} · ${o.city.toUpperCase()} GYM`;
  }
}
function opponentSubheading(o) {
  switch (opponentKind(o)) {
    case 'elite': return `${o.type.toUpperCase()} MASTER · INDIGO PLATEAU`;
    case 'champion': return 'THE CHAMPIONSHIP IS ON THE LINE';
    case 'professor': return 'THE FINAL BATTLE · UP TO THREE ACES ALLOWED';
    default: return `${o.type.toUpperCase()} SPECIALIST · ${o.badge.toUpperCase()} ON THE LINE`;
  }
}
function challengeLabel(o) {
  if (opponentKind(o) === 'champion') return `CHAMPION ${o.name.toUpperCase()}`;
  return o.name.toUpperCase();
}

function gymStoryLine(trainers, gym) {
  if (!gym) return '';
  const l = gym.leader, ace = GYM_ACES[l.id].name, c = trainers[0].name;
  switch (opponentKind(l)) {
    case 'elite':
      return `\nThis is a Pokémon League battle at the Indigo Plateau. ${l.name} of the Elite Four, a ${l.type}-type master, stands between ${c} and the Champion. ${l.name} is saving ${l.poss} ace, ${ace}, for last.\n`;
    case 'champion':
      return `\nThis is the Championship battle at the Indigo Plateau. ${l.name} is the reigning Pokémon League Champion and ${c}'s lifelong rival; ${c} has beaten all eight Gyms and the Elite Four to get here. ${l.name} is saving his ace, ${ace}, for last.\n`;
    case 'professor':
      return `\nThis is a special final battle in Professor Oak's lab in Pallet Town, where ${c}'s journey began. The new Champion faces the professor himself, who was a great trainer long before he was a researcher. He is saving his ace, the mythical ${ace}, for last.\n`;
    default:
      return `\nThis is an official Gym battle at the ${l.city} Gym. ${l.name} is the Gym Leader, a ${l.type}-type specialist, defending the ${l.badge}; ${c} is the challenger. ${l.name} is saving their ace, ${ace}, for last.\n`;
  }
}

function buildIntroPrompt(trainers, rosters, gym) {
  const teamList = (i) => rosters[i].map(p => p.name).join(', ');
  return `Write a short scene-setting opener for a manga-style Pokémon battle that's about to begin, in PRESENT TENSE, 2-3 sentences. Set the mood and introduce the matchup -- don't describe any specific attacks or moves, just the charged moment right before the battle starts. Plain prose only: no markdown, no quotation marks wrapping the whole thing, nothing else in your reply but the prose itself.

${trainers[0].name} (${trainers[0].style.name} style -- ${trainers[0].style.desc}) has a team of: ${teamList(0)}.
${trainers[1].name} (${trainers[1].style.name} style -- ${trainers[1].style.desc}) has a team of: ${teamList(1)}.
${gymStoryLine(trainers, gym)}
Their lead Pokémon are about to face off first: ${rosters[0][0].name} vs ${rosters[1][0].name}.`;
}

async function fetchBattleIntro(trainers, rosters, fetchImpl, timeoutMs, gym) {
  const doFetch = fetchImpl || fetch;
  const ms = timeoutMs || 25000;
  const prompt = buildIntroPrompt(trainers, rosters, gym);
  const fetchPromise = (async () => {
    const response = await doFetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 300, messages: [{ role: 'user', content: prompt }] }),
    });
    if (!response.ok) throw new Error(`intro fetch failed: ${response.status}`);
    const data = await response.json();
    if (!data || !Array.isArray(data.content)) return null;
    const text = data.content.filter(b => b && b.type === 'text').map(b => b.text).join('').trim();
    return text.length > 0 ? text : null;
  })();
  fetchPromise.catch(() => {});
  const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(null), ms));
  return Promise.race([fetchPromise, timeoutPromise]);
}

// ===================== POST-BATTLE: MVP, GRADES, EPILOGUE =====================
// A simple point score per Pokémon from what it actually did in the fight -- rewards damage,
// landed hits, crits, KOs, successful dodges, pulling off a New Move, and evolving.
function computeBattleScore(battler) {
  const r = battler.battleRecord;
  let score = (r.damageDealt / 8) + (r.hitsLanded * 1) + (r.critsLanded * 3) + (r.koScored * 8) + (r.dodgesSucceeded * 3) + (r.finishingMovesUsed * 6);
  if (battler.hasEvolved) score += 5;
  return score;
}

function scoreToGrade(score) {
  if (score >= 35) return 'S';
  if (score >= 22) return 'A';
  if (score >= 12) return 'B';
  if (score >= 5) return 'C';
  return 'D';
}

// MVP is whichever Pokémon scored highest across BOTH teams -- it can land on the losing side
// if that Pokémon was still the standout performer.
function computeMVP(teams, trainers) {
  let best = null, bestScore = -Infinity;
  teams.forEach((team, side) => {
    team.forEach((battler, index) => {
      const score = computeBattleScore(battler);
      if (score > bestScore) { bestScore = score; best = { side, index, name: battler.name, trainerName: trainers[side].name, score }; }
    });
  });
  return best;
}

function buildStatsTable(teams, trainers, mvp) {
  return teams.map((team, side) => ({
    trainerName: trainers[side].name,
    rows: team.map((battler, index) => {
      const played = battler.everActive;
      const grade = played ? scoreToGrade(computeBattleScore(battler)) : 'DNP';
      return {
        name: battler.name, evolved: battler.hasEvolved, played,
        damageDealt: battler.battleRecord.damageDealt, damageTaken: battler.battleRecord.damageTaken,
        koScored: battler.battleRecord.koScored, grade,
        isMVP: side === mvp.side && index === mvp.index,
      };
    }),
  }));
}

// What the Gym result means for the story: badge won (and the ace the leader entrusts to a named
// challenger), or the badge defended.
function gymResultLine(trainers, winnerIdx, gym) {
  if (!gym) return '';
  const l = gym.leader, ace = GYM_ACES[l.id].name, challenger = trainers[0].name;
  const kind = opponentKind(l);
  if (kind !== 'gym') {
    if (winnerIdx === 0) {
      if (kind === 'elite') return `${challenger} defeated ${l.name} of the Elite Four and moved one step closer to the Champion.`;
      if (kind === 'champion') return `${challenger} defeated ${l.name} and became the new Pokémon League Champion, finally settling their rivalry.`;
      return `${challenger} defeated Professor Oak in the lab where their journey began, and the professor proudly entered them into the Hall of Fame.`;
    }
    if (winnerIdx === 1) {
      if (kind === 'elite') return `${l.name} of the Elite Four held firm; ${challenger} will have to come back stronger.`;
      if (kind === 'champion') return `${l.name} kept his title as Champion; ${challenger} will have to climb the Indigo Plateau again.`;
      return `Professor Oak won the day, smiling, and told ${challenger} there is always more to learn.`;
    }
    return `The battle with ${l.name} ended in a draw, so ${challenger} will have to try again.`;
  }
  if (winnerIdx === 0) {
    return gym.challengerIsGuest
      ? `${challenger} beat Gym Leader ${l.name} at the ${l.city} Gym.`
      : `${challenger} beat Gym Leader ${l.name} and earned the ${l.badge}. ${l.name} also entrusted ${challenger} with a ${ace} of their own, a partner for future Gym battles.`;
  }
  if (winnerIdx === 1) return `Gym Leader ${l.name} defended the ${l.badge}; ${challenger} will have to train harder and come back.`;
  return `The Gym battle at the ${l.city} Gym ended in a draw, so the ${l.badge} stays with ${l.name} for now.`;
}

function buildEpiloguePrompt(trainers, winnerIdx, mvp, teams, gym) {
  const isDraw = winnerIdx === 'draw';
  let closeness;
  if (isDraw) {
    closeness = `Both trainers' teams were completely worn down -- a full draw.`;
  } else {
    const winnerFaintedCount = teams[winnerIdx].filter(m => m.fainted).length;
    closeness = winnerFaintedCount === 0
      ? `${trainers[winnerIdx].name}'s team came through completely unscathed -- a dominant win.`
      : `${trainers[winnerIdx].name}'s team also took real losses along the way (${winnerFaintedCount} of ${teams[winnerIdx].length} Pokémon down) -- a close, hard-fought battle.`;
  }
  const matchup = isDraw
    ? `${trainers[0].name} (${trainers[0].style.name} style) and ${trainers[1].name} (${trainers[1].style.name} style) fought to a draw.`
    : `${trainers[winnerIdx].name} (${trainers[winnerIdx].style.name} style) won. ${trainers[winnerIdx === 0 ? 1 : 0].name} (${trainers[winnerIdx === 0 ? 1 : 0].style.name} style) fought hard but came up short.`;

  return `Write a short manga-style epilogue (3-4 sentences), in PAST TENSE now that the battle is over. Focus on the TRAINERS -- their reaction, what this fight meant to them, the bond with their Pokémon -- rather than replaying specific moves or damage numbers. This is the closing beat of the story, the quiet moment right after the dust settles.

${matchup}
${closeness}
${gymResultLine(trainers, winnerIdx, gym)}
The standout performer of the battle was ${mvp.name}, fighting for ${mvp.trainerName}.

Plain prose only: no markdown, no quotation marks wrapping the whole thing, nothing else in your reply but the prose itself.`;
}

function fallbackEpilogue(trainers, winnerIdx, mvp, gym) {
  const gymLine = gym ? ` ${gymResultLine(trainers, winnerIdx, gym)}` : '';
  if (winnerIdx === 'draw') {
    return `${trainers[0].name} and ${trainers[1].name} both gave everything they had, and neither backed down. A hard-fought draw, with ${mvp.name} standing out above the rest.${gymLine}`;
  }
  const winner = trainers[winnerIdx].name;
  const loser = trainers[winnerIdx === 0 ? 1 : 0].name;
  return `${winner} claimed the victory after a hard-fought battle against ${loser}. ${mvp.name} was the standout performer, carrying the fight when it mattered most.${gymLine}`;
}

async function fetchEpilogue(trainers, winnerIdx, mvp, teams, fetchImpl, timeoutMs, gym) {
  const doFetch = fetchImpl || fetch;
  const ms = timeoutMs || 25000;
  const prompt = buildEpiloguePrompt(trainers, winnerIdx, mvp, teams, gym);
  const fetchPromise = (async () => {
    const response = await doFetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 400, messages: [{ role: 'user', content: prompt }] }),
    });
    if (!response.ok) throw new Error(`epilogue fetch failed: ${response.status}`);
    const data = await response.json();
    if (!data || !Array.isArray(data.content)) return null;
    const text = data.content.filter(b => b && b.type === 'text').map(b => b.text).join('').trim();
    return text.length > 0 ? text : null;
  })();
  fetchPromise.catch(() => {});
  const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(null), ms));
  return Promise.race([fetchPromise, timeoutPromise]);
}

// ===================== TRAINER RECORDS (persisted via window.storage) =====================
// Personal (non-shared) storage, keyed by a normalized trainer name -- this is a per-account
// history of whoever has this artifact open, not a global leaderboard across all users.
const ELO_K_FACTOR = 32;
const ELO_STARTING_GRADE = 1000;

// Standard ELO update for one side. score is 1 for a win, 0.5 for a draw, 0 for a loss.
function computeEloUpdate(gradeSelf, gradeOpponent, score) {
  const expected = 1 / (1 + Math.pow(10, (gradeOpponent - gradeSelf) / 400));
  return Math.round(gradeSelf + ELO_K_FACTOR * (score - expected));
}

function trainerKey(name) {
  // Storage keys can't contain whitespace, slashes, or quotes -- a totally normal name like
  // "Ash Ketchum" would otherwise produce an invalid key and silently fail to save.
  const cleaned = name.trim().toLowerCase().replace(/[\s/\\'"]+/g, '-');
  return `trainer:${cleaned}`;
}

// window.storage has proven consistently unavailable in testing -- reads, writes, and lists all
// fail the same way, including on the very first load before any battle, which rules out anything
// specific to a particular call shape or concurrent writes. That points to a platform-level issue
// rather than something fixable from here. This in-memory cache is a graceful fallback: it keeps
// the scoreboard working for the CURRENT session even when persistent storage isn't, rather than
// the feature being entirely non-functional. It does not survive a reload or a new conversation.
let sessionTrainerRecords = {};

async function getTrainerRecord(name) {
  const key = trainerKey(name);
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const result = await window.storage.get(key);
      if (result && result.value) return JSON.parse(result.value);
      break; // resolved but empty -- genuinely no record yet, not a transient error worth retrying
    } catch (e) {
      if (attempt < 2) await new Promise(r => setTimeout(r, 250));
      // otherwise fall through below
    }
  }
  if (sessionTrainerRecords[key]) return { ...sessionTrainerRecords[key] };
  return { displayName: name.trim(), wins: 0, losses: 0, draws: 0, grade: ELO_STARTING_GRADE };
}

async function saveTrainerRecord(name, record) {
  const key = trainerKey(name);
  sessionTrainerRecords[key] = { ...record }; // always keep the session copy current
  const maxAttempts = 3;
  let lastReason = 'unknown error';
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await window.storage.set(key, JSON.stringify(record));
      if (result) return { ok: true, persisted: true };
      lastReason = 'storage returned no confirmation';
    } catch (e) {
      lastReason = (e && e.message) ? e.message : String(e);
    }
    if (attempt < maxAttempts) await new Promise(r => setTimeout(r, 300 * attempt));
  }
  // Persistent storage failed, but the session copy above still means this battle's result is
  // tracked for as long as the session lasts -- so this is a degraded success, not a hard failure.
  return { ok: true, persisted: false, reason: `${lastReason} (after ${maxAttempts} attempts)` };
}

// Call once per completed battle. Reads both trainers' current records, applies the ELO update
// and win/loss/draw tally using their PRE-battle grades for both sides (standard ELO practice),
// then writes both back.
async function recordBattleResult(trainers, winnerIdx) {
  try {
    const isDraw = winnerIdx === 'draw';
    const [recordA, recordB] = await Promise.all([
      getTrainerRecord(trainers[0].name),
      getTrainerRecord(trainers[1].name),
    ]);
    const beforeA = recordA.grade, beforeB = recordB.grade;
    const scoreA = isDraw ? 0.5 : (winnerIdx === 0 ? 1 : 0);
    const scoreB = isDraw ? 0.5 : (winnerIdx === 1 ? 1 : 0);
    recordA.grade = computeEloUpdate(beforeA, beforeB, scoreA);
    recordB.grade = computeEloUpdate(beforeB, beforeA, scoreB);
    if (isDraw) { recordA.draws += 1; recordB.draws += 1; }
    else if (winnerIdx === 0) { recordA.wins += 1; recordB.losses += 1; }
    else { recordA.losses += 1; recordB.wins += 1; }
    recordA.displayName = trainers[0].name.trim();
    recordB.displayName = trainers[1].name.trim();
    const resultA = await saveTrainerRecord(trainers[0].name, recordA);
    const resultB = await saveTrainerRecord(trainers[1].name, recordB);
    const detail = `${recordA.displayName}: ${beforeA}\u2192${recordA.grade} (${recordA.wins}W-${recordA.losses}L-${recordA.draws}D)  |  ${recordB.displayName}: ${beforeB}\u2192${recordB.grade} (${recordB.wins}W-${recordB.losses}L-${recordB.draws}D)`;
    const bothPersisted = resultA.persisted && resultB.persisted;
    return { ok: true, persisted: bothPersisted, reason: bothPersisted ? null : (resultA.reason || resultB.reason), detail };
  } catch (e) {
    return { ok: true, persisted: false, reason: (e && e.message) ? e.message : String(e) };
  }
}

// VS Computer results never touch W-L-D or the ELO grade -- those stay a measure of play against
// other people. A gym win only adds that leader's badge (once) to the named trainer's record,
// alongside everything else already stored there. Losses aren't recorded at all.
async function recordGymBadge(trainerName, leaderId) {
  try {
    const record = await getTrainerRecord(trainerName);
    const badges = Array.isArray(record.badges) ? record.badges : [];
    if (badges.includes(leaderId)) return { ok: true, persisted: true, newBadge: false, badges: sortBadges(badges) };
    record.badges = sortBadges([...badges, leaderId]);
    record.displayName = trainerName.trim();
    const result = await saveTrainerRecord(trainerName, record);
    return { ...result, newBadge: true, badges: record.badges };
  } catch (e) {
    return { ok: false, persisted: false, newBadge: false, reason: (e && e.message) ? e.message : String(e) };
  }
}

// League wins (Elite Four, Champion, Professor Oak) are progress, not badges: they unlock the next
// opponent and earn scoreboard titles. Like badges, they never touch W-L-D or the ELO grade.
async function recordLeagueWin(trainerName, opponentId) {
  try {
    const record = await getTrainerRecord(trainerName);
    const league = Array.isArray(record.league) ? record.league : [];
    if (league.includes(opponentId)) return { ok: true, persisted: true, newWin: false, league: sortLeague(league) };
    record.league = sortLeague([...league, opponentId]);
    record.displayName = trainerName.trim();
    const result = await saveTrainerRecord(trainerName, record);
    return { ...result, newWin: true, league: record.league };
  } catch (e) {
    return { ok: false, persisted: false, newWin: false, reason: (e && e.message) ? e.message : String(e) };
  }
}

// The highest League title a record has earned, for the scoreboard.
function leagueTitle(record) {
  const w = (record && Array.isArray(record.league)) ? record.league : [];
  if (w.includes('oak')) return 'HALL OF FAME';
  if (w.includes('gary')) return 'CHAMPION';
  return null;
}

async function fetchLeaderboard() {
  const maxAttempts = 3;
  let lastReason = 'unknown error';
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const listResult = await window.storage.list('trainer:');
      if (!listResult || !Array.isArray(listResult.keys)) throw new Error('malformed list response');
      const records = await Promise.all(listResult.keys.map(async (key) => {
        try {
          const r = await window.storage.get(key);
          return r && r.value ? JSON.parse(r.value) : null;
        } catch (e) {
          return null;
        }
      }));
      return { ok: true, persisted: true, records: records.filter(Boolean).sort((a, b) => b.grade - a.grade) };
    } catch (e) {
      lastReason = (e && e.message) ? e.message : String(e);
      if (attempt < maxAttempts) await new Promise(r => setTimeout(r, 300 * attempt));
    }
  }
  const records = Object.values(sessionTrainerRecords).sort((a, b) => b.grade - a.grade);
  return { ok: true, persisted: false, reason: `${lastReason} (after ${maxAttempts} attempts)`, records };
}

// ===================== UI PIECES =====================
function StampBadge({ type, size = 30 }) {
  const color = TYPE_COLORS[type] || '#888';
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      border: `2px solid ${color}`, color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FONT_MONO, fontWeight: 600, fontSize: size * 0.3, letterSpacing: '0.02em',
    }}>
      {type.slice(0, 3).toUpperCase()}
    </div>
  );
}

function PokemonCard({ pokemon, onClick, interactive = true, selected = false }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }) : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: selected ? '#33413C' : COLORS.panel,
        border: `${selected ? 2 : 1}px solid ${selected ? COLORS.jadeBright : (hover && interactive ? COLORS.jadeBright : COLORS.hairline)}`,
        borderRadius: 4, padding: selected ? 11 : 12, cursor: interactive ? 'pointer' : 'default',
        display: 'flex', flexDirection: 'column', gap: 8, boxSizing: 'border-box',
        transition: 'border-color 0.15s ease, background 0.15s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 19, color: COLORS.paper, lineHeight: 1.05 }}>
          {pokemon.name}
        </div>
        {selected ? (
          <span style={{ fontSize: 15, color: COLORS.jadeBright, flexShrink: 0 }}>&#10003;</span>
        ) : pokemon.evolvesTo && (
          <span title="Can evolve mid-battle" style={{ fontSize: 15, color: COLORS.jadeBright, flexShrink: 0 }}>&#10022;</span>
        )}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {pokemon.types.map(t => <StampBadge key={t} type={t} size={26} />)}
      </div>
      {(pokemon.aceOf || pokemon.signatureOf || pokemon.gymTrained > 0) && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {pokemon.signatureOf && (
            <span style={{ fontFamily: FONT_MONO, fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', color: opponentColor(getLeader(pokemon.signatureOf)), border: `1px solid ${opponentColor(getLeader(pokemon.signatureOf))}`, borderRadius: 10, padding: '1px 7px' }}>
              {['champion', 'professor'].includes(opponentKind(getLeader(pokemon.signatureOf)))
                ? `${getLeader(pokemon.signatureOf).name.toUpperCase()}'S TEAM`
                : `${getLeader(pokemon.signatureOf).name.toUpperCase()} EXCLUSIVE`}
            </span>
          )}
          {pokemon.aceOf && (
            <span style={{ fontFamily: FONT_MONO, fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', color: COLORS.ink, background: opponentColor(getLeader(pokemon.aceOf)), borderRadius: 10, padding: '2px 8px' }}>
              ★ {pokemon.earnedAce ? `${getLeader(pokemon.aceOf).badge.toUpperCase()} ACE` : `${getLeader(pokemon.aceOf).name.toUpperCase()}'S ACE`}
            </span>
          )}
          {pokemon.gymTrained > 0 && (
            <span style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '0.08em', color: COLORS.hpMid, border: `1px solid ${COLORS.hpMid}`, borderRadius: 10, padding: '1px 7px' }}>
              {pokemon.trainedTag || 'GYM-TRAINED'} +{pokemon.gymTrained}%
            </span>
          )}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, fontFamily: FONT_MONO, fontSize: 10, color: COLORS.ash }}>
        <div>HP{pokemon.stats.hp}</div>
        <div>AT{pokemon.stats.atk}</div>
        <div>DF{pokemon.stats.def}</div>
        <div>SP{pokemon.stats.spd}</div>
      </div>
    </div>
  );
}

// A denser card just for the draft pool grid: iPhone 17 Pro's viewport is 402x874 CSS px, and
// fitting all 12 pool cards without scrolling means 3 columns instead of 2, and each card giving up
// some of its padding/font size and collapsing the 4-cell stat grid into one compact line. Grid cells
// use gridAutoRows: '1fr' (set where this is rendered) so the card stretches to fill whatever space
// is actually available rather than assuming a fixed pixel height.
function CompactPokemonCard({ pokemon, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      style={{
        background: selected ? '#33413C' : COLORS.panel,
        border: `${selected ? 2 : 1}px solid ${selected ? COLORS.jadeBright : COLORS.hairline}`,
        borderRadius: 4, padding: 6, cursor: 'pointer', boxSizing: 'border-box', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 3 }}>
        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 12, color: COLORS.paper, lineHeight: 1.1 }}>
          {pokemon.name}
        </div>
        {selected ? (
          <span style={{ fontSize: 10, color: COLORS.jadeBright, flexShrink: 0 }}>&#10003;</span>
        ) : pokemon.evolvesTo && (
          <span style={{ fontSize: 10, color: COLORS.jadeBright, flexShrink: 0 }}>&#10022;</span>
        )}
      </div>
      <div style={{ display: 'flex', gap: 3 }}>
        {pokemon.types.map(t => <StampBadge key={t} type={t} size={18} />)}
      </div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.ash, overflow: 'hidden', whiteSpace: 'nowrap' }}>
        H{pokemon.stats.hp} A{pokemon.stats.atk} D{pokemon.stats.def} S{pokemon.stats.spd}
      </div>
    </div>
  );
}

function TrainerInput({ label, value, onChange }) {
  return (
    <div style={{ position: 'relative' }}>
      <label style={{
        position: 'absolute', top: -8, left: 12, background: COLORS.ink, padding: '0 6px',
        fontFamily: FONT_MONO, fontSize: 10, color: COLORS.ash, letterSpacing: '0.1em',
      }}>{label.toUpperCase()}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={label}
        maxLength={16}
        style={{
          width: '100%', background: COLORS.panel, border: `1px solid ${COLORS.hairline}`,
          borderRadius: 4, padding: '14px 16px', color: COLORS.paper, fontFamily: FONT_BODY,
          fontSize: 16, boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

function HPBar({ current, max }) {
  const pct = Math.max(0, Math.min(100, (current / max) * 100));
  const color = pct > 60 ? COLORS.hpGood : pct > 30 ? COLORS.hpMid : COLORS.hpLow;
  return (
    <div style={{ width: '100%', height: 6, background: COLORS.hairline, borderRadius: 3, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, transition: 'width 0.3s ease' }} />
    </div>
  );
}

function BattlerPanel({ battler, align }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 4, justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
        {battler.types.map(t => <StampBadge key={t} type={t} size={20} />)}
      </div>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 17, color: COLORS.paper, textAlign: align }}>
        {battler.name}{battler.hasEvolved && <span style={{ color: COLORS.jadeBright }}> &#10022;</span>}
      </div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.ash, margin: '4px 0', textAlign: align }}>
        {battler.currentHp}/{battler.maxHp} HP
      </div>
      <HPBar current={battler.currentHp} max={battler.maxHp} />
    </div>
  );
}

function SwitchPicker({ trainer, roster, onPick }) {
  return (
    <div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.jadeBright, letterSpacing: '0.1em', marginBottom: 10, textAlign: 'center' }}>
        {trainer.name.toUpperCase()}, SEND OUT YOUR NEXT POKÉMON
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {roster.map((m, i) => !m.fainted && (
          <button key={i} onClick={() => onPick(i)} style={{
            background: COLORS.panel, border: `1px solid ${COLORS.hairline}`, borderRadius: 4, padding: '12px',
            color: COLORS.paper, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 15, cursor: 'pointer', textAlign: 'left',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span>{m.name}</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.ash }}>{m.currentHp}/{m.maxHp} HP</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MoveButton({ move, onClick, finishing }) {
  const data = MOVES[move];
  const isTransform = move === 'Transform';
  return (
    <button onClick={onClick} style={{
      background: finishing ? COLORS.jade : COLORS.panel,
      border: `1px solid ${finishing ? COLORS.jadeBright : COLORS.hairline}`,
      borderRadius: 4, padding: '12px 8px', color: COLORS.paper, fontFamily: FONT_BODY,
      fontWeight: 600, fontSize: 13, cursor: 'pointer', textAlign: 'left',
    }}>
      {finishing && <div style={{ fontFamily: FONT_MONO, fontSize: 8, letterSpacing: '0.1em', marginBottom: 3 }}>★ NEW MOVE</div>}
      <div>{move}</div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: finishing ? COLORS.paper : TYPE_COLORS[data.type], marginTop: 3 }}>
        {isTransform ? 'Copies your opponent!' : `${data.type.toUpperCase()} · ${data.power}`}
      </div>
    </button>
  );
}

function DefenseButton({ role, move, onClick, chance }) {
  const data = MOVES[move];
  const showChance = typeof chance === 'number';
  const chanceColor = showChance ? dodgeChanceColor(chance) : null;
  return (
    <button onClick={onClick} style={{
      background: COLORS.panel, border: `1px solid ${COLORS.hairline}`, borderRadius: 4, padding: '12px 8px',
      color: COLORS.paper, fontFamily: FONT_BODY, fontWeight: 700, fontSize: 13, cursor: 'pointer', textAlign: 'left',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '0.1em', color: role === 'DODGE' ? COLORS.hpMid : COLORS.jadeBright }}>{role}</div>
        {showChance && (
          <div style={{
            fontFamily: FONT_MONO, fontSize: 10, fontWeight: 700, color: COLORS.ink,
            background: chanceColor, borderRadius: 10, padding: '1px 6px', flexShrink: 0,
          }}>
            {Math.round(chance * 100)}%
          </div>
        )}
      </div>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 15, marginTop: 3 }}>{move}</div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: TYPE_COLORS[data.type], marginTop: 3 }}>{data.type.toUpperCase()} · {data.power}</div>
      {showChance && (
        <div style={{ width: '100%', height: 4, background: COLORS.hairline, borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
          <div style={{ width: `${Math.round(chance * 100)}%`, height: '100%', background: chanceColor }} />
        </div>
      )}
    </button>
  );
}

function ToggleOption({ label, desc, checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
        background: COLORS.panel, border: `1px solid ${checked ? COLORS.jadeBright : COLORS.hairline}`,
        borderRadius: 4, padding: '12px 14px', cursor: 'pointer',
      }}
    >
      <div style={{
        width: 20, height: 20, borderRadius: 4, border: `2px solid ${checked ? COLORS.jadeBright : COLORS.ash}`,
        background: checked ? COLORS.jadeBright : 'transparent', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.ink, fontSize: 13, fontWeight: 900,
      }}>
        {checked ? '✓' : ''}
      </div>
      <div>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14, color: COLORS.paper }}>{label}</div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: COLORS.ash }}>{desc}</div>
      </div>
    </button>
  );
}

function GradeBadge({ grade }) {
  const isDNP = grade === 'DNP';
  const gradeColors = { S: '#D9B54A', A: COLORS.jadeBright, B: '#8FA0AC', C: COLORS.ash, D: COLORS.hpLow };
  return (
    <span style={{
      display: 'inline-block', minWidth: isDNP ? 32 : 22, textAlign: 'center',
      fontFamily: isDNP ? FONT_MONO : FONT_DISPLAY, fontWeight: isDNP ? 600 : 900, fontSize: isDNP ? 9 : 15,
      color: isDNP ? COLORS.ash : COLORS.ink, background: isDNP ? 'transparent' : (gradeColors[grade] || COLORS.ash),
      border: isDNP ? `1px solid ${COLORS.hairline}` : 'none',
      borderRadius: 4, padding: isDNP ? '3px 4px' : '1px 6px',
    }}>
      {grade}
    </span>
  );
}

function BattleStatsTable({ statsByTeam }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {statsByTeam.map((team, side) => (
        <div key={side}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.jadeBright, letterSpacing: '0.1em', marginBottom: 8 }}>
            {team.trainerName.toUpperCase()}'S TEAM
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 0.8fr 0.8fr 0.5fr 0.6fr', gap: 6, fontFamily: FONT_MONO, fontSize: 9, color: COLORS.ash, letterSpacing: '0.04em', padding: '0 8px', marginBottom: 4 }}>
            <div>POKÉMON</div><div>DEALT</div><div>TAKEN</div><div>KOs</div><div>GRD</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {team.rows.map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1.7fr 0.8fr 0.8fr 0.5fr 0.6fr', gap: 6, alignItems: 'center',
                background: COLORS.panel, border: `1px solid ${row.isMVP ? COLORS.jadeBright : COLORS.hairline}`,
                borderRadius: 4, padding: '8px', fontFamily: FONT_BODY, fontSize: 12, color: COLORS.paper,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontWeight: 700, overflow: 'hidden' }}>
                  {row.isMVP && <span style={{ color: COLORS.jadeBright, flexShrink: 0 }}>★</span>}
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.name}{row.evolved && '✦'}</span>
                </div>
                <div style={{ fontFamily: FONT_MONO }}>{row.played ? row.damageDealt : '—'}</div>
                <div style={{ fontFamily: FONT_MONO }}>{row.played ? row.damageTaken : '—'}</div>
                <div style={{ fontFamily: FONT_MONO }}>{row.played ? row.koScored : '—'}</div>
                <div><GradeBadge grade={row.grade} /></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function renderStoryText(text) {
  const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  if (paragraphs.length <= 1) return text;
  return paragraphs.map((p, i) => <div key={i} style={{ marginTop: i === 0 ? 0 : 8 }}>{p}</div>);
}

// ===================== BADGE ART =====================
// An original set of badge designs (inline SVG, 100x100 viewBox): a distinct silhouette and emblem
// per badge, themed to the gym's type, with a metallic gradient, a sheen and an inner bevel. The
// League gets matching emblems: an Elite Four crest per member, a crown for the Champion, and a
// Hall of Fame wreath for Professor Oak.
function scallopPath(n, r1, r2) {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2, am = (a0 + a1) / 2;
    const f = v => v.toFixed(1);
    if (i === 0) d += `M${f(50 + r1 * Math.cos(a0))} ${f(50 + r1 * Math.sin(a0))} `;
    d += `Q${f(50 + r2 * Math.cos(am))} ${f(50 + r2 * Math.sin(am))} ${f(50 + r1 * Math.cos(a1))} ${f(50 + r1 * Math.sin(a1))} `;
  }
  return d + 'Z';
}
function starPath(cx, cy, points, rOuter, rInner, rotation = -Math.PI / 2) {
  let d = '';
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = rotation + (i * Math.PI) / points;
    d += `${i === 0 ? 'M' : 'L'}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)} `;
  }
  return d + 'Z';
}
const CIRCLE_BODY = 'M50 5 A45 45 0 1 1 49.99 5 Z';
const CREST_BODY = 'M50 4 L93 33 L78 93 L22 93 L7 33 Z';

const BADGE_ART = {
  // Boulder: a shield with a mountain range
  brock: {
    light: '#EFE2BF', mid: '#B39869', dark: '#5E4C30', edge: '#3A2E1C',
    body: 'M50 5 L88 18 L85 58 C82 78 68 89 50 96 C32 89 18 78 15 58 L12 18 Z',
    emblem: c => (<>
      <path d="M14 76 L37 42 L47 55 L61 30 L86 76 Z" fill={c.dark} />
      <path d="M61 30 L68 43 L63 41 L59 46 L55 41 Z" fill={c.light} />
      <path d="M37 42 L42 50 L38 49 L35 52 L33 49 Z" fill={c.light} />
    </>),
  },
  // Cascade: a round medallion with rolling waves
  misty: {
    light: '#D2EDFC', mid: '#4C93C7', dark: '#1F4F7A', edge: '#13324F',
    body: CIRCLE_BODY,
    emblem: c => (<g fill="none" stroke={c.light} strokeWidth="6" strokeLinecap="round">
      <path d="M16 38 Q27 29 38 38 T60 38 T84 38" />
      <path d="M16 54 Q27 45 38 54 T60 54 T84 54" />
      <path d="M16 70 Q27 61 38 70 T60 70 T84 70" opacity="0.75" />
    </g>),
  },
  // Thunder: a diamond with a lightning bolt
  surge: {
    light: '#FFF4B8', mid: '#E8C93A', dark: '#9C7A12', edge: '#5E4808',
    body: 'M50 3 L96 50 L50 97 L4 50 Z',
    emblem: c => <path d="M57 15 L31 54 L47 54 L40 85 L70 43 L54 43 L61 15 Z" fill={c.light} stroke={c.dark} strokeWidth="2.5" strokeLinejoin="round" />,
  },
  // Marsh: a hexagon with an all-seeing eye
  sabrina: {
    light: '#FCE0EB', mid: '#E86B98', dark: '#8E2F57', edge: '#561A34',
    body: 'M50 4 L90 27 L90 73 L50 96 L10 73 L10 27 Z',
    emblem: c => (<>
      <path d="M18 50 Q50 20 82 50 Q50 80 18 50 Z" fill={c.light} />
      <circle cx="50" cy="50" r="14" fill={c.mid} stroke={c.dark} strokeWidth="2.5" />
      <circle cx="50" cy="50" r="6" fill={c.dark} />
      <circle cx="45" cy="45" r="3" fill="#FFFFFF" />
    </>),
  },
  // Rainbow: an arch with rainbow bands and a sprout
  erika: {
    light: '#D8F4CF', mid: '#5FA65A', dark: '#2A6427', edge: '#1A4218',
    body: 'M8 94 L8 50 A42 42 0 0 1 92 50 L92 94 Z',
    emblem: c => (<>
      <g fill="none" strokeWidth="5" strokeLinecap="round">
        <path d="M20 94 V52 A30 30 0 0 1 80 52 V94" stroke="#F08A7E" />
        <path d="M27 94 V52 A23 23 0 0 1 73 52 V94" stroke="#F5D46A" />
        <path d="M34 94 V52 A16 16 0 0 1 66 52 V94" stroke="#7FC3EA" />
      </g>
      <path d="M50 92 V66" stroke={c.dark} strokeWidth="4" strokeLinecap="round" />
      <path d="M50 76 Q37 74 34 62 Q47 62 50 76 Z" fill={c.light} stroke={c.dark} strokeWidth="1.5" />
      <path d="M50 70 Q63 68 66 56 Q53 56 50 70 Z" fill={c.light} stroke={c.dark} strokeWidth="1.5" />
    </>),
  },
  // Soul: a four-point shuriken
  koga: {
    light: '#EBD3F3', mid: '#9857A8', dark: '#4E2459', edge: '#2E1236',
    body: 'M50 2 L61 39 L98 50 L61 61 L50 98 L39 61 L2 50 L39 39 Z',
    emblem: c => (<>
      <path d="M50 14 L56 44 L86 50 L56 56 L50 86 L44 56 L14 50 L44 44 Z" fill={c.light} opacity="0.35" />
      <circle cx="50" cy="50" r="9" fill={c.edge} stroke={c.light} strokeWidth="2" />
    </>),
  },
  // Volcano: a rounded square with an erupting volcano
  blaine: {
    light: '#FFDDBE', mid: '#E2703E', dark: '#7E2C10', edge: '#4E1A08',
    body: 'M22 6 H78 Q94 6 94 22 V78 Q94 94 78 94 H22 Q6 94 6 78 V22 Q6 6 22 6 Z',
    emblem: c => (<>
      <path d="M12 86 L38 46 L62 46 L88 86 Z" fill={c.dark} />
      <ellipse cx="50" cy="46" rx="12" ry="4" fill="#FFD27A" />
      <path d="M46 47 L42 64 L49 59 L46 76 L56 54 L50 57 L54 47 Z" fill="#FF9B45" />
      <circle cx="40" cy="30" r="4" fill="#FFD27A" />
      <circle cx="58" cy="24" r="3.5" fill="#FFB25A" />
      <circle cx="49" cy="15" r="2.5" fill="#FFD27A" />
    </>),
  },
  // Earth: a scalloped seal with layered strata
  giovanni: {
    light: '#EFE1BD', mid: '#B88F4E', dark: '#5C4322', edge: '#352611',
    body: scallopPath(12, 41, 50),
    emblem: c => (<>
      <path d="M0 52 Q25 45 50 52 T100 52 V100 H0 Z" fill={c.mid} />
      <path d="M0 64 Q25 57 50 64 T100 64 V100 H0 Z" fill="#8A6634" />
      <path d="M0 76 Q25 69 50 76 T100 76 V100 H0 Z" fill={c.dark} />
      <path d="M50 18 L62 32 L50 44 L38 32 Z" fill={c.light} stroke={c.dark} strokeWidth="2" />
    </>),
  },

  // ---- the Pokémon League ----
  // Elite Four: a shared crest shape, each with their own emblem
  lorelei: {
    light: '#EEFDFB', mid: '#7FD1C8', dark: '#2E7F78', edge: '#1A4D49',
    body: CREST_BODY,
    emblem: c => (<g stroke={c.light} strokeWidth="5" strokeLinecap="round" fill="none">
      {[0, 60, 120].map(a => <path key={a} d="M50 26 V82" transform={`rotate(${a} 50 54)`} />)}
      {[0, 60, 120, 180, 240, 300].map(a => <path key={`b${a}`} d="M42 32 L50 40 L58 32" transform={`rotate(${a} 50 54)`} strokeWidth="3.5" />)}
    </g>),
  },
  bruno: {
    light: '#F7D3CB', mid: '#C0503D', dark: '#6E2418', edge: '#43150D',
    body: CREST_BODY,
    emblem: c => (<>
      <path d={starPath(50, 55, 8, 30, 13)} fill={c.light} />
      <circle cx="50" cy="55" r="9" fill={c.dark} />
    </>),
  },
  agatha: {
    light: '#E4DBF6', mid: '#6F5C96', dark: '#33274D', edge: '#1E1630',
    body: CREST_BODY,
    emblem: c => (<>
      <path d="M50 26 C66 26 72 39 72 51 L72 78 L64 71 L57 79 L50 71 L43 79 L36 71 L28 78 L28 51 C28 39 34 26 50 26 Z" fill={c.light} />
      <ellipse cx="42" cy="50" rx="4" ry="6" fill={c.dark} />
      <ellipse cx="58" cy="50" rx="4" ry="6" fill={c.dark} />
    </>),
  },
  lance: {
    light: '#D8DDFC', mid: '#5D6FE8', dark: '#263283', edge: '#141B4F',
    body: CREST_BODY,
    emblem: c => (<g fill="none" stroke={c.light} strokeWidth="7" strokeLinecap="round">
      <path d="M32 28 Q46 52 34 82" />
      <path d="M50 24 Q64 50 52 84" />
      <path d="M68 28 Q80 52 70 80" />
    </g>),
  },
  // Champion: a gold medal with a crown
  gary: {
    light: '#FFF4C4', mid: '#D9B54A', dark: '#8A6A12', edge: '#55400A',
    body: CIRCLE_BODY,
    emblem: c => (<>
      <path d="M24 66 L22 34 L37 48 L50 26 L63 48 L78 34 L76 66 Z" fill={c.light} stroke={c.dark} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="24" y="66" width="52" height="9" rx="2" fill={c.dark} />
      <circle cx="50" cy="56" r="4.5" fill="#E86B6B" />
      <circle cx="36" cy="58" r="3" fill="#7FC3EA" />
      <circle cx="64" cy="58" r="3" fill="#7FC3EA" />
    </>),
  },
  // Professor Oak: the Hall of Fame wreath
  oak: {
    light: '#FFFFFF', mid: '#E6DCC2', dark: '#9C8D6A', edge: '#5A503C',
    body: CIRCLE_BODY,
    emblem: () => (<>
      <path d="M30 80 Q16 60 24 34 M70 80 Q84 60 76 34" fill="none" stroke="#2F7466" strokeWidth="2.5" strokeLinecap="round" />
      {Array.from({ length: 6 }, (_, i) => {
        const t = 125 + i * 18;
        const rad = (t * Math.PI) / 180;
        const x = 50 + 32 * Math.cos(rad), y = 53 + 32 * Math.sin(rad);
        const rot = t + 90 + 40;
        return (<g key={i}>
          <ellipse cx={x.toFixed(1)} cy={y.toFixed(1)} rx="6.5" ry="3" fill="#4FA393" stroke="#2F7466" strokeWidth="1" transform={`rotate(${rot.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})`} />
          <ellipse cx={(100 - x).toFixed(1)} cy={y.toFixed(1)} rx="6.5" ry="3" fill="#4FA393" stroke="#2F7466" strokeWidth="1" transform={`rotate(${(-rot).toFixed(0)} ${(100 - x).toFixed(1)} ${y.toFixed(1)})`} />
        </g>);
      })}
      <path d={starPath(50, 50, 5, 17, 7.5)} fill="#D9B54A" stroke="#8A6A12" strokeWidth="2" strokeLinejoin="round" />
    </>),
  },
};

// Stable per-instance id for SVG gradients (several badges share a page, so ids must not collide).
function useSvgId() {
  const ref = useRef(null);
  if (ref.current === null) ref.current = 'b' + Math.random().toString(36).slice(2, 9);
  return ref.current;
}

function BadgeIcon({ id, earned = true, size = 32, label }) {
  const art = BADGE_ART[id];
  const uid = useSvgId();
  if (!art) return null;
  if (!earned) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={label ? `${label} (not earned yet)` : undefined} style={{ flexShrink: 0, display: 'block' }}>
        <path d={art.body} fill="rgba(156,145,132,0.08)" stroke={COLORS.ash} strokeWidth="3" strokeDasharray="8 6" strokeLinejoin="round" opacity="0.7" />
      </svg>
    );
  }
  const fillId = `${uid}f`, sheenId = `${uid}s`, clipId = `${uid}c`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={label} style={{ flexShrink: 0, display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={fillId} x1="0.15" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor={art.light} />
          <stop offset="0.5" stopColor={art.mid} />
          <stop offset="1" stopColor={art.dark} />
        </linearGradient>
        <linearGradient id={sheenId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="0.42" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="0.43" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <clipPath id={clipId}><path d={art.body} /></clipPath>
      </defs>
      <path d={art.body} fill={`url(#${fillId})`} />
      <g clipPath={`url(#${clipId})`}>
        {art.emblem(art)}
        <path d={art.body} fill={`url(#${sheenId})`} />
      </g>
      <path d={art.body} fill="none" stroke={art.light} strokeOpacity="0.55" strokeWidth="2" strokeLinejoin="round" transform="translate(50 50) scale(0.86) translate(-50 -50)" />
      <path d={art.body} fill="none" stroke={art.edge} strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

// A badge (or League emblem) in the badge case, team screen, and win screen. Not yet earned: just a
// dashed outline of its shape.
function BadgeMedallion({ leader, earned, size = 30, pop = false }) {
  return (
    <div title={leader.badge || leader.name} className={pop ? 'badge-pop' : undefined} style={{ flexShrink: 0, lineHeight: 0 }}>
      <BadgeIcon id={leader.id} earned={earned} size={size} label={leader.badge || leader.name} />
    </div>
  );
}

// The scoreboard's row of mini badges.
function BadgeDots({ badges }) {
  const owned = GYM_LEADERS.filter(l => badges.includes(l.id));
  return (
    <div style={{ display: 'flex', gap: 2, marginTop: 3 }} title={`${owned.length} gym badge${owned.length === 1 ? '' : 's'}`}>
      {owned.map(l => <BadgeIcon key={l.id} id={l.id} size={12} label={l.badge} />)}
    </div>
  );
}

function AceChip({ label, color, active, disabled, onClick }) {
  const accent = color || COLORS.jadeBright;
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{
      background: active ? accent : 'transparent', color: active ? COLORS.ink : COLORS.paper,
      border: `1px solid ${active ? accent : (color || COLORS.hairline)}`, borderRadius: 20, padding: '6px 12px',
      fontFamily: FONT_MONO, fontSize: 11, fontWeight: 600, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1,
    }}>
      {label}
    </button>
  );
}

function CpuThinking({ text }) {
  return (
    <div className="loading-pulse" style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.ash, letterSpacing: '0.1em', textAlign: 'center', padding: '18px 0' }}>
      {text}
    </div>
  );
}

function Leaderboard({ data, onRefresh }) {
  const header = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
      <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.jadeBright, letterSpacing: '0.15em' }}>★ SCOREBOARD ★</div>
      <button onClick={onRefresh} style={{ background: 'none', border: 'none', color: COLORS.ash, fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '0.05em', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
        refresh
      </button>
    </div>
  );

  if (data === null) {
    return (
      <div className="loading-pulse" style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.ash, letterSpacing: '0.1em', textAlign: 'center', marginTop: 24 }}>
        LOADING RECORDS
      </div>
    );
  }
  if (!data.persisted && data.records.length === 0) {
    return (
      <div style={{ width: '100%', maxWidth: 400, marginTop: 24, textAlign: 'center' }}>
        {header}
        <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: COLORS.ash }}>
          No battles recorded yet. Play your first match to start the scoreboard.
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.hpMid, marginTop: 8 }}>
          Persistent storage isn't available right now, so records will only last this session.
        </div>
      </div>
    );
  }
  if (data.records.length === 0) {
    return (
      <div style={{ width: '100%', maxWidth: 400, marginTop: 24, textAlign: 'center' }}>
        {header}
        <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: COLORS.ash }}>
          No battles recorded yet. Play your first match to start the scoreboard.
        </div>
      </div>
    );
  }
  return (
    <div style={{ width: '100%', maxWidth: 400, marginTop: 32 }}>
      {header}
      {!data.persisted && (
        <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.hpMid, textAlign: 'center', marginBottom: 10 }}>
          Session only \u2014 persistent storage is unavailable, so this won't carry over to a new conversation
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '0.3fr 1.5fr 0.9fr 0.6fr 0.7fr', gap: 6, fontFamily: FONT_MONO, fontSize: 9, color: COLORS.ash, padding: '0 8px', marginBottom: 4 }}>
        <div>#</div><div>TRAINER</div><div>W-L-D</div><div>WIN%</div><div>GRADE</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {data.records.slice(0, 20).map((r, i) => {
          const total = r.wins + r.losses + r.draws;
          const winPct = total > 0 ? Math.round((r.wins / total) * 100) : 0;
          return (
            <div key={r.displayName + i} style={{
              display: 'grid', gridTemplateColumns: '0.3fr 1.5fr 0.9fr 0.6fr 0.7fr', gap: 6, alignItems: 'center',
              background: COLORS.panel, border: `1px solid ${COLORS.hairline}`, borderRadius: 4, padding: '8px',
              fontFamily: FONT_BODY, fontSize: 12, color: COLORS.paper,
            }}>
              <div style={{ fontFamily: FONT_MONO, color: COLORS.ash, fontSize: 11 }}>{i + 1}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.displayName}</div>
                {((Array.isArray(r.badges) && r.badges.length > 0) || leagueTitle(r)) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 6 }}>
                    {Array.isArray(r.badges) && r.badges.length > 0 && <BadgeDots badges={r.badges} />}
                    {leagueTitle(r) && (
                      <span style={{ fontFamily: FONT_MONO, fontSize: 8, fontWeight: 600, letterSpacing: '0.08em', color: COLORS.ink, background: '#D9B54A', borderRadius: 8, padding: '1px 5px', marginTop: 3, whiteSpace: 'nowrap' }}>
                        ★ {leagueTitle(r)}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.ash }}>{r.wins}-{r.losses}-{r.draws}</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.ash }}>{winPct}%</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 12, fontWeight: 700, color: COLORS.jadeBright }}>{r.grade}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===================== SCREENS =====================
function TitleScreen({ onStart, onStartCpu }) {
  const [leaderboard, setLeaderboard] = useState(null);

  const loadLeaderboard = () => {
    setLeaderboard(null);
    fetchLeaderboard()
      .then(result => setLeaderboard(result))
      .catch(e => setLeaderboard({ ok: false, reason: (e && e.message) ? e.message : String(e), records: [] }));
  };

  useEffect(() => {
    let cancelled = false;
    fetchLeaderboard()
      .then(result => { if (!cancelled) setLeaderboard(result); })
      .catch(e => { if (!cancelled) setLeaderboard({ ok: false, reason: (e && e.message) ? e.message : String(e), records: [] }); });
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 48, color: COLORS.paper, lineHeight: 0.95 }}>
          THE DRAFT
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.jadeBright, marginTop: 10, letterSpacing: '0.15em' }}>
          A NEW POKÉMON ROSTER, EVERY GAME
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
        <button
          onClick={onStart}
          style={{
            background: COLORS.jade, color: COLORS.paper, border: 'none', borderRadius: 4,
            padding: '14px 24px', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, letterSpacing: '0.05em', cursor: 'pointer',
          }}
        >
          2-PLAYER DRAFT
        </button>
        <button
          onClick={onStartCpu}
          style={{
            background: COLORS.panel, color: COLORS.paper, border: `1px solid ${COLORS.jadeBright}`, borderRadius: 4,
            padding: '12px 24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          }}
        >
          <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, letterSpacing: '0.05em' }}>VS COMPUTER</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.jadeBright, letterSpacing: '0.12em' }}>GYM CHALLENGE · 8 BADGES</span>
        </button>
      </div>

      <Leaderboard data={leaderboard} onRefresh={loadLeaderboard} />
    </div>
  );
}

function SetupScreen({ onStart, onBack }) {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
      <button onClick={onBack} style={{ position: 'absolute', top: 24, left: 24, background: 'none', border: 'none', color: COLORS.ash, fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.1em', cursor: 'pointer', padding: 0 }}>
        &larr; BACK
      </button>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 32, color: COLORS.paper, lineHeight: 0.95 }}>
          WHO'S PLAYING?
        </div>
      </div>
      <div style={{ width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <TrainerInput label="Trainer 1" value={name1} onChange={setName1} />
        <TrainerInput label="Trainer 2" value={name2} onChange={setName2} />
        <button
          onClick={() => onStart([name1, name2])}
          style={{
            marginTop: 8, background: COLORS.jade, color: COLORS.paper, border: 'none', borderRadius: 4,
            padding: '14px', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, letterSpacing: '0.05em', cursor: 'pointer',
          }}
        >
          START DRAFT
        </button>
      </div>
    </div>
  );
}

function VsSetupScreen({ onContinue, onBack }) {
  const [name, setName] = useState('');
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
      <button onClick={onBack} style={{ position: 'absolute', top: 24, left: 24, background: 'none', border: 'none', color: COLORS.ash, fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.1em', cursor: 'pointer', padding: 0 }}>
        &larr; BACK
      </button>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 32, color: COLORS.paper, lineHeight: 0.95 }}>
          GYM CHALLENGE
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.jadeBright, marginTop: 10, letterSpacing: '0.12em' }}>
          EIGHT KANTO LEADERS · EIGHT BADGES
        </div>
      </div>
      <div style={{ width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <TrainerInput label="Your name" value={name} onChange={setName} />
        <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: COLORS.ash, lineHeight: 1.5 }}>
          Use the same name every time to keep your badges. Leave it blank to practice as a guest: every gym is open, but nothing is saved.
        </div>
        <button
          onClick={() => onContinue(name)}
          style={{
            marginTop: 6, background: COLORS.jade, color: COLORS.paper, border: 'none', borderRadius: 4,
            padding: '14px', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, letterSpacing: '0.05em', cursor: 'pointer',
          }}
        >
          TO THE GYMS
        </button>
      </div>
    </div>
  );
}

// The gym menu: badge case, the eight gyms (opening one at a time for a named trainer), then the
// Pokémon League -- each part of which stays hidden until it's earned -- the selected opponent's
// details, and which earned aces (one, or up to three against Professor Oak) to bring along.
function OpponentRow({ o, label, sub, tag, open, beaten, selected, disabled, onSelect }) {
  return (
    <button disabled={disabled} onClick={onSelect} style={{
      display: 'grid', gridTemplateColumns: '22px 1fr auto', alignItems: 'center', gap: 8, textAlign: 'left',
      background: selected ? '#33413C' : COLORS.panel, color: COLORS.paper,
      border: `${selected ? 2 : 1}px solid ${selected ? COLORS.jadeBright : COLORS.hairline}`,
      borderRadius: 4, padding: selected ? '6px 9px' : '7px 10px', cursor: disabled ? 'default' : 'pointer', opacity: open ? 1 : 0.45,
    }}>
      <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.ash }}>{label}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 16 }}>{o.name}</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 9, color: opponentColor(o), letterSpacing: '0.06em' }}>{tag}</span>
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.ash, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub}</div>
      </div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '0.08em', color: beaten ? COLORS.jadeBright : open ? COLORS.paper : COLORS.ash }}>
        {beaten ? '✓ WON' : open ? 'OPEN' : 'LOCKED'}
      </div>
    </button>
  );
}

function GymHubScreen({ challenger, onChallenge, onBack }) {
  const isGuest = challenger.isGuest;
  const [progress, setProgress] = useState(isGuest ? { badges: [], league: [] } : null);
  const [selectedId, setSelectedId] = useState(null);
  const [aceIds, setAceIds] = useState([]);

  useEffect(() => {
    if (isGuest) return undefined;
    let cancelled = false;
    const merge = (r) => ({
      badges: sortBadges([...(Array.isArray(r.badges) ? r.badges : []), ...(challenger.badges || [])]),
      league: sortLeague([...(Array.isArray(r.league) ? r.league : []), ...(challenger.league || [])]),
    });
    getTrainerRecord(challenger.name)
      .then(r => { if (!cancelled) setProgress(merge(r)); })
      .catch(() => { if (!cancelled) setProgress(merge({})); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ready = progress !== null;
  const earned = ready ? progress.badges : [];
  const league = ready ? progress.league : [];
  const leagueShown = LEAGUE.filter(o => isLeagueVisible(o, earned, league, isGuest));
  const isGym = (o) => opponentKind(o) === 'gym';
  const isOpen = (o) => (isGym(o) ? isGymUnlocked(gymIndex(o.id), earned, isGuest) : isLeagueUnlocked(o, earned, league, isGuest));
  const isBeaten = (o) => (isGym(o) ? earned.includes(o.id) : league.includes(o.id));
  const shown = [...GYM_LEADERS, ...leagueShown];
  const next = shown.find(o => isOpen(o) && !isBeaten(o));
  const activeId = selectedId && shown.some(o => o.id === selectedId) ? selectedId : (next || shown[shown.length - 1]).id;
  const leader = getLeader(activeId);
  const unlocked = isOpen(leader);
  const maxAces = opponentMaxAces(leader);
  const earnedLeaders = isGuest ? [] : GYM_LEADERS.filter(l => earned.includes(l.id));
  const chosen = aceIds.filter(id => id !== activeId && earned.includes(id)).slice(0, maxAces);
  const toggleAce = (id) => {
    if (chosen.includes(id)) setAceIds(chosen.filter(x => x !== id));
    else if (maxAces === 1) setAceIds([id]);
    else if (chosen.length < maxAces) setAceIds([...chosen, id]);
  };
  const title = league.includes('oak') ? ' · HALL OF FAME' : league.includes('gary') ? ' · CHAMPION' : '';
  const leagueRowInfo = (o) => {
    if (o.kind === 'elite') return { label: `E${ELITE_FOUR_IDS.indexOf(o.id) + 1}`, tag: o.type.toUpperCase(), sub: 'Elite Four · Indigo Plateau' };
    if (o.kind === 'champion') return { label: '★', tag: 'CHAMPION', sub: 'Pokémon League Champion · Indigo Plateau' };
    return { label: '✦', tag: 'FINAL BATTLE', sub: 'Professor Oak’s Lab · Pallet Town' };
  };
  const aceNote = chosen.length > 0
    ? `${chosen.map(id => GYM_ACES[id].name).join(', ')} ${chosen.length === 1 ? 'takes one' : `take ${chosen.length}`} of your six slots, so you'll draft ${GYM_CHALLENGER_TEAM_SIZE - chosen.length}.`
    : maxAces > 1 ? 'Professor Oak lets you bring up to three of your aces. Each one takes one of your six slots.'
    : (isGym(leader) && earned.includes(activeId)) ? `${leader.name}'s own ace can't be brought to ${leader.name}'s gym.`
    : 'Bringing an ace means drafting five instead of six.';

  return (
    <div style={{ minHeight: '100vh', maxWidth: 460, margin: '0 auto', padding: '20px 16px 0', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <button onClick={onBack} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: COLORS.ash, fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.1em', cursor: 'pointer', padding: 0, marginBottom: 14 }}>
        &larr; HOME
      </button>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 30, color: COLORS.paper, lineHeight: 1 }}>GYM CHALLENGE</div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: isGuest ? COLORS.hpMid : COLORS.jadeBright, letterSpacing: '0.1em', marginTop: 6 }}>
        {isGuest ? 'GUEST · PRACTICE MODE · NOTHING IS SAVED' : `${challenger.name.toUpperCase()} · ${ready ? earned.length : '–'}/8 BADGES${title}`}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 2, margin: '14px 0 14px', padding: '10px 6px', background: COLORS.panel, border: `1px solid ${COLORS.hairline}`, borderRadius: 4 }}>
        {GYM_LEADERS.map(l => (
          <div key={l.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 0 }}>
            <BadgeMedallion leader={l} earned={earned.includes(l.id)} size={34} />
            <div style={{ fontFamily: FONT_MONO, fontSize: 7, color: earned.includes(l.id) ? COLORS.paper : COLORS.ash, letterSpacing: '0.02em' }}>
              {l.badge.split(' ')[0].toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {GYM_LEADERS.map((l, i) => (
          <OpponentRow key={l.id} o={l} label={String(i + 1)} tag={l.type.toUpperCase()} sub={`${l.city} · ${l.badge}`}
            open={isOpen(l)} beaten={isBeaten(l)} selected={l.id === activeId} disabled={!isOpen(l) || !ready} onSelect={() => setSelectedId(l.id)} />
        ))}
      </div>

      {leagueShown.length > 0 && (
        <>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: '#D9B54A', letterSpacing: '0.15em', margin: '18px 0 8px', textAlign: 'center' }}>
            ★ THE POKÉMON LEAGUE ★
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {leagueShown.map(o => {
              const info = leagueRowInfo(o);
              return (
                <OpponentRow key={o.id} o={o} label={info.label} tag={info.tag} sub={info.sub}
                  open={isOpen(o)} beaten={isBeaten(o)} selected={o.id === activeId} disabled={!isOpen(o) || !ready} onSelect={() => setSelectedId(o.id)} />
              );
            })}
          </div>
        </>
      )}

      <div style={{ marginTop: 12, padding: '12px 14px', background: COLORS.panel, border: `1px solid ${opponentColor(leader)}`, borderRadius: 4 }}>
        <div style={{ fontFamily: FONT_BODY, fontSize: 13, fontStyle: 'italic', color: COLORS.paper, lineHeight: 1.45 }}>
          “{leader.taunt}” <span style={{ fontStyle: 'normal', color: COLORS.ash }}>— {leader.name}</span>
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.ash, marginTop: 8, letterSpacing: '0.05em' }}>
          ACE: {GYM_ACES[leader.id].name.toUpperCase()} · FIELDS {gymTeamSize(leader) === 6 ? 'SIX' : 'THREE'} POKÉMON{leader.trainedPct > 0 ? ` · ${isGym(leader) ? 'GYM' : 'LEAGUE'}-TRAINED +${leader.trainedPct}%` : ''}
        </div>
      </div>

      {!isGuest && ready && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.ash, letterSpacing: '0.1em', marginBottom: 8 }}>
            {maxAces > 1 ? `BRING UP TO ${maxAces} ACES` : 'BRING AN ACE'}
          </div>
          {earnedLeaders.length === 0 ? (
            <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: COLORS.ash, lineHeight: 1.5 }}>
              Beat a Gym Leader to earn their badge and their ace. You can bring one ace into any VS Computer battle.
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <AceChip label="None" active={chosen.length === 0} onClick={() => setAceIds([])} />
                {earnedLeaders.map(l => (
                  <AceChip key={l.id} label={GYM_ACES[l.id].name} color={opponentColor(l)} active={chosen.includes(l.id)}
                    disabled={l.id === activeId || (!chosen.includes(l.id) && maxAces > 1 && chosen.length >= maxAces)} onClick={() => toggleAce(l.id)} />
                ))}
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: COLORS.ash, marginTop: 8, lineHeight: 1.45 }}>{aceNote}</div>
            </>
          )}
        </div>
      )}

      <div style={{ position: 'sticky', bottom: 0, background: COLORS.ink, padding: '14px 0 20px', marginTop: 'auto' }}>
        <button
          disabled={!ready || !unlocked}
          onClick={() => onChallenge(activeId, chosen)}
          style={{
            width: '100%', background: COLORS.jade, color: COLORS.paper, border: 'none', borderRadius: 4, padding: '14px',
            fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, letterSpacing: '0.05em', cursor: ready && unlocked ? 'pointer' : 'default',
            opacity: ready && unlocked ? 1 : 0.5,
          }}
        >
          {ready ? `CHALLENGE ${challengeLabel(leader)}` : 'LOADING BADGES…'}
        </button>
      </div>
    </div>
  );
}

function DraftScreen({ trainers, pool, rosters, pickOrder, pickIndex, onPick, onReset, cpuSide = null, backLabel = 'NEW DRAFT' }) {
  const [selected, setSelected] = useState(null);
  const currentIdx = pickOrder[pickIndex];
  const cpuTurn = cpuSide !== null && currentIdx === cpuSide;

  const confirmPick = () => {
    if (!selected) return;
    onPick(selected);
    setSelected(null);
  };

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', maxWidth: 720, margin: '0 auto', overflow: 'hidden', position: 'relative' }}>
      <div style={{ flexShrink: 0, background: COLORS.ink, padding: '14px 16px 10px', borderBottom: `1px solid ${COLORS.hairline}` }}>
        <button onClick={onReset} style={{ background: 'none', border: 'none', color: COLORS.ash, fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.1em', cursor: 'pointer', padding: 0, marginBottom: 6 }}>
          &larr; {backLabel}
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {trainers.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: currentIdx === i ? 1 : 0.4 }}>
              {currentIdx === i && <span style={{ width: 9, height: 9, borderRadius: '50%', background: COLORS.jadeBright, display: 'inline-block' }} />}
              <div style={{ textAlign: i === 1 ? 'right' : 'left' }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 24, color: COLORS.paper, lineHeight: 1.1 }}>{t.name}</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.ash }}>{t.style.name.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', fontFamily: FONT_MONO, fontSize: 11, color: COLORS.jadeBright, letterSpacing: '0.15em', marginTop: 6 }}>
          {cpuTurn
            ? <span className="loading-pulse">{trainers[currentIdx].name.toUpperCase()} IS CHOOSING…</span>
            : <>PICK {pickIndex + 1} / {pickOrder.length} — {trainers[currentIdx].name.toUpperCase()}'S TURN</>}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '10px 16px 0' }}>
        <div style={{ flexShrink: 0, display: 'flex', gap: 12, minHeight: 22, marginBottom: 10 }}>
          {rosters.map((roster, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: i === 1 ? 'flex-end' : 'flex-start' }}>
              {roster.map(p => (
                <div key={p.name} style={{ fontSize: 9, fontFamily: FONT_MONO, color: (p.aceOf || p.signatureOf) ? COLORS.paper : COLORS.ash, border: `1px solid ${(p.aceOf || p.signatureOf) ? opponentColor(getLeader(p.aceOf || p.signatureOf)) : COLORS.hairline}`, borderRadius: 20, padding: '2px 7px' }}>
                  {p.aceOf ? '★ ' : ''}{p.name}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ flexShrink: 0, fontFamily: FONT_MONO, fontSize: 10, color: COLORS.ash, letterSpacing: '0.1em', marginBottom: 8, borderBottom: `1px solid ${COLORS.hairline}`, paddingBottom: 6 }}>
          THE POOL — {pool.length} LEFT
        </div>
        <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '1fr', gap: 8, overflow: 'hidden' }}>
          {pool.map(p => (
            <CompactPokemonCard
              key={p.name}
              pokemon={p}
              selected={selected?.name === p.name}
              onClick={() => { if (!cpuTurn) setSelected(prev => (prev?.name === p.name ? null : p)); }}
            />
          ))}
        </div>
      </div>

      {selected && !cpuTurn && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, background: COLORS.ink,
          borderTop: `2px solid ${COLORS.jadeBright}`, padding: 16, display: 'flex', flexDirection: 'column', gap: 10,
          boxShadow: '0 -8px 24px rgba(0,0,0,0.4)',
        }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, color: COLORS.paper, textAlign: 'center' }}>
            Draft {selected.name} for {trainers[currentIdx].name}?
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setSelected(null)}
              style={{ flex: 1, background: 'none', border: `1px solid ${COLORS.hairline}`, color: COLORS.ash, borderRadius: 4, padding: '12px', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
            >
              CANCEL
            </button>
            <button
              onClick={confirmPick}
              style={{ flex: 2, background: COLORS.jade, border: 'none', color: COLORS.paper, borderRadius: 4, padding: '12px', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14, letterSpacing: '0.03em', cursor: 'pointer' }}
            >
              CONFIRM PICK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewScreen({ trainers, rosters, onBattle, onReset, gym = null, backLabel = 'NEW DRAFT' }) {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [quickBattle, setQuickBattle] = useState(false);
  return (
    <div style={{ minHeight: '100vh', padding: '32px 16px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button onClick={onReset} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: COLORS.ash, fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.1em', cursor: 'pointer', padding: 0, marginBottom: 20 }}>
        &larr; {backLabel}
      </button>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 30, color: COLORS.paper, marginBottom: gym ? 16 : 28 }}>{gym ? ({ elite: 'ELITE FOUR', champion: 'CHAMPIONSHIP', professor: 'FINAL BATTLE' }[opponentKind(gym)] || 'GYM BATTLE') : 'TEAMS SET'}</div>
      {gym && (
        <div style={{ width: '100%', maxWidth: 460, marginBottom: 28, background: COLORS.panel, border: `1px solid ${opponentColor(gym)}`, borderRadius: 4, padding: '14px 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <BadgeMedallion leader={gym} earned size={30} />
            <div>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 18, color: COLORS.paper, lineHeight: 1.1 }}>{opponentHeading(gym)}</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.ash, letterSpacing: '0.08em', marginTop: 2 }}>{opponentSubheading(gym)}</div>
            </div>
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 14, fontStyle: 'italic', color: COLORS.paper, lineHeight: 1.5 }}>“{gym.taunt}”</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.jadeBright, marginTop: 10, lineHeight: 1.4 }}>
            {gymTeamSize(gym) === 3
              ? `${gym.name} fields three Pokémon against your six: two drafted, plus their ace.`
              : opponentKind(gym) === 'gym'
                ? `${gym.name} fields a full six against your six: two drafted, three gym exclusives, and their ace.`
                : `${gym.name} fields a full six against your six: two drafted, three of ${gym.poss} own, and ${gym.poss} ace.`}
          </div>
          {gym.trainedPct > 0 && (
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.hpMid, marginTop: 10, lineHeight: 1.4 }}>
              {gym.name}'s team is {opponentKind(gym) === 'gym' ? 'gym' : 'league'}-trained: +{gym.trainedPct}% to every stat on everyone but the ace.
            </div>
          )}
        </div>
      )}
      <div style={{ width: '100%', maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 28 }}>
        {trainers.map((t, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10, borderBottom: `1px solid ${COLORS.hairline}`, paddingBottom: 8 }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 20, color: COLORS.paper }}>{t.name}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.jadeBright }}>{t.style.name.toUpperCase()}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {rosters[i].map(p => <PokemonCard key={p.name} pokemon={p} interactive={false} />)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 10, marginTop: 32 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.ash, letterSpacing: '0.1em' }}>BEFORE YOU BEGIN</div>
        <ToggleOption label="Narrate aloud" desc="Read the story with text-to-speech" checked={audioEnabled} onChange={setAudioEnabled} />
        <ToggleOption label="Quick Battle" desc="Auto-resolve routine moves; you'll still decide the key moments" checked={quickBattle} onChange={setQuickBattle} />
      </div>

      <button
        onClick={() => onBattle(audioEnabled, quickBattle)}
        style={{
          marginTop: 24, background: COLORS.jade, color: COLORS.paper, border: 'none', borderRadius: 4,
          padding: '14px 32px', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, letterSpacing: '0.05em',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
        }}
      >
        <Swords size={18} /> {gym ? (opponentKind(gym) === 'gym' ? 'BEGIN GYM BATTLE' : 'BEGIN LEAGUE BATTLE') : 'BEGIN BATTLE'}
      </button>
    </div>
  );
}

// What a finished League battle means: the next step unlocked (Elite Four), the title (Champion),
// the Hall of Fame (Professor Oak) -- or the opponent holding firm.
function leagueResultText(l, result) {
  const kind = opponentKind(l);
  if (!result.won) {
    const title = kind === 'champion' ? `${l.name.toUpperCase()} KEEPS THE TITLE` : `${l.name.toUpperCase()} WINS THIS ONE`;
    return { title, body: 'Rework your draft and try again. League losses never count against your scoreboard record.', earned: false };
  }
  if (result.saving) return { title: kind === 'professor' ? 'HALL OF FAME!' : kind === 'champion' ? 'YOU ARE THE CHAMPION!' : `${l.name.toUpperCase()} DEFEATED!`, body: 'Saving your progress…', earned: true };
  const again = result.newWin === false && result.ok;
  if (kind === 'elite') {
    const i = ELITE_FOUR_IDS.indexOf(l.id);
    const nextUp = i < ELITE_FOUR_IDS.length - 1 ? `Next up: Elite Four ${getLeader(ELITE_FOUR_IDS[i + 1]).name}.` : 'All four of the Elite Four are down. The Champion is waiting.';
    return { title: `${l.name.toUpperCase()} DEFEATED!`, body: again ? `You've beaten ${l.name} before. ${nextUp}` : nextUp, earned: true };
  }
  if (kind === 'champion') {
    return { title: 'YOU ARE THE CHAMPION!', body: again ? `You've beaten ${l.name} before, and the title is still yours.` : `You beat ${l.name} and took his title. Professor Oak would like a word: one last battle waits in Pallet Town.`, earned: true };
  }
  return { title: 'HALL OF FAME!', body: again ? 'You beat Professor Oak again. Your place in the Hall of Fame is secure.' : 'Professor Oak proudly enters you into the Hall of Fame. Your journey is complete.', earned: true };
}

// What a finished gym battle means: badge earned (plus the ace that comes with it), badge already
// held, a guest win that can't be kept, or the leader holding on to their badge.
function GymResultPanel({ gym, result }) {
  if (!result) return null;
  const l = gym.leader;
  const ace = GYM_ACES[l.id];
  let title, body, earned = false, note = null;
  if (opponentKind(l) !== 'gym') {
    ({ title, body, earned } = leagueResultText(l, result));
    if (result.won && !result.saving && !result.ok) note = `Couldn't save your progress (${result.reason}).`;
    else if (result.won && !result.saving && result.persisted === false) note = `Saved for this session only (${result.reason}).`;
  } else if (!result.won) {
    title = `${l.name.toUpperCase()} KEEPS THE ${l.badge.toUpperCase()}`;
    body = `Rework your draft and challenge ${l.name} again. Gym losses never count against your scoreboard record.`;
  } else if (result.guest) {
    title = 'GYM CLEARED AS A GUEST';
    body = `Guests can't keep badges. Enter a trainer name in VS Computer to start collecting them, and ${ace.name} with the ${l.badge}.`;
  } else if (result.saving) {
    title = `${l.badge.toUpperCase()} EARNED!`;
    body = `${l.name} entrusts you with ${ace.name}…`;
    earned = true;
  } else if (result.newBadge === false && result.ok) {
    title = `${l.badge.toUpperCase()} ALREADY IN YOUR CASE`;
    body = `You've beaten ${l.name} before. ${ace.name} is still yours to bring into any VS Computer battle.`;
    earned = true;
  } else {
    title = `${l.badge.toUpperCase()} EARNED!`;
    body = `${l.name} entrusts you with ${ace.name}. Bring it into any VS Computer battle from the gym menu. It can't be used in 2-player drafts.`;
    earned = true;
    if (!result.ok) note = `Couldn't save the badge (${result.reason}).`;
    else if (!result.persisted) note = `Saved for this session only (${result.reason}).`;
  }
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', textAlign: 'left', background: COLORS.panel, border: `1px solid ${earned ? opponentColor(l) : COLORS.hairline}`, borderRadius: 4, padding: '12px 14px', marginBottom: 20 }}>
      <BadgeMedallion leader={l} earned={earned} size={56} pop={earned && result.won && !result.saving && result.newBadge !== false && result.newWin !== false} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 16, color: earned ? COLORS.paper : COLORS.ash, lineHeight: 1.15 }}>{title}</div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: COLORS.ash, marginTop: 4, lineHeight: 1.45 }}>{body}</div>
        {note && <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.hpMid, marginTop: 4 }}>{note}</div>}
      </div>
    </div>
  );
}

// `gym` is null for a 2-player battle. In VS Computer it's { leader, challengerIsGuest }, side 1 is
// the computer, and its turns are taken automatically after a short pause.
function BattleScreen({ trainers, rosters, audioEnabled, quickBattle, onBack, onPlayAgain, gym = null, onHome, onGymResult }) {
  const cpuSide = gym ? 1 : null;
  const cpuSkill = gym ? gym.leader.skill : 0;
  const [battle, setBattle] = useState(() => initBattle(rosters[0], rosters[1], [trainers[0].name, trainers[1].name], gym ? gym.leader : null));
  const logEndRef = useRef(null);
  const mountedRef = useRef(true);
  useEffect(() => {
    // Re-arm on every mount: React's development StrictMode mounts, unmounts and remounts once,
    // which would otherwise leave this false and silently drop the intro and epilogue text.
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [battle.log.length]);

  // The ONE live AI call per battle: fetch a scene-setting intro for the opening beat only.
  // Fires once on mount; every other beat's text is generated locally and instantly (see narrate()).
  useEffect(() => {
    const startBeat = battle.log[0];
    if (!startBeat || startBeat.event.type !== 'start' || startBeat.aiText !== null) return;
    fetchBattleIntro(trainers, rosters, undefined, undefined, gym).then(text => {
      if (!mountedRef.current) return;
      setBattle(prev => ({ ...prev, log: prev.log.map(b => (b.id === 0 ? { ...b, aiText: text || '' } : b)) }));
    }).catch(() => {
      if (!mountedRef.current) return;
      setBattle(prev => ({ ...prev, log: prev.log.map(b => (b.id === 0 ? { ...b, aiText: '' } : b)) }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!audioEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    const current = battle.log[battle.log.length - 1];
    if (!current) return;
    const isStart = current.event.type === 'start';
    if (isStart && current.aiText === null) return; // wait for the one-time intro fetch so audio reads the rich version, not the fallback
    const text = current.aiText || current.mechanicalText;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = pickBestVoice(window.speechSynthesis.getVoices());
    if (voice) utterance.voice = voice;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioEnabled, battle.log.length, battle.log[0]?.aiText]);

  // The other live AI call: once the battle has a winner, fetch a trainer-focused closing epilogue.
  // The MVP + stats table below don't wait on this -- they're computed locally and shown instantly.
  const [epilogueText, setEpilogueText] = useState(null);
  useEffect(() => {
    if (battle.winner === null) return;
    const mvpForPrompt = computeMVP(battle.teams, trainers);
    fetchEpilogue(trainers, battle.winner, mvpForPrompt, battle.teams, undefined, undefined, gym).then(text => {
      if (!mountedRef.current) return;
      setEpilogueText(text || fallbackEpilogue(trainers, battle.winner, mvpForPrompt, gym));
    }).catch(() => {
      if (!mountedRef.current) return;
      setEpilogueText(fallbackEpilogue(trainers, battle.winner, mvpForPrompt, gym));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battle.winner]);

  // Persists the result to each trainer's historical record (win/loss/draw + ELO-style grade),
  // once per battle. Skipped entirely if either side never entered a name -- an unnamed guest
  // shouldn't get a tracked record, and a match involving one shouldn't affect the named side's
  // grade either, since the "opponent" has no stable, comparable rating history.
  // recordingStatus surfaces exactly what happened -- success, failure with the real reason, or
  // skipped for a guest -- since prior silent-failure handling made this impossible to diagnose.
  const [recordingStatus, setRecordingStatus] = useState(null);
  const [gymResult, setGymResult] = useState(null);
  useEffect(() => {
    if (battle.winner === null) return;
    if (gym) {
      // VS Computer never touches W-L-D or the ELO grade. A named challenger's win earns the badge;
      // the app is told right away so the gym menu shows it even before the save finishes.
      setRecordingStatus({ ok: true, skipped: true });
      if (battle.winner !== 0) { setGymResult({ won: false }); return; }
      if (trainers[0].isGuest) { setGymResult({ won: true, guest: true }); return; }
      setGymResult({ won: true, saving: true });
      const isGymBattle = opponentKind(gym.leader) === 'gym';
      if (onGymResult) onGymResult(isGymBattle ? 'badges' : 'league', [gym.leader.id]);
      (isGymBattle ? recordGymBadge : recordLeagueWin)(trainers[0].name, gym.leader.id).then(result => {
        if (mountedRef.current) setGymResult({ won: true, ...result });
      }).catch(e => {
        if (mountedRef.current) setGymResult({ won: true, ok: false, reason: (e && e.message) ? e.message : String(e) });
      });
      return;
    }
    if (trainers[0].isGuest || trainers[1].isGuest) { setRecordingStatus({ ok: true, skipped: true }); return; }
    recordBattleResult(trainers, battle.winner).then(result => {
      if (mountedRef.current) setRecordingStatus(result);
    }).catch(e => {
      if (mountedRef.current) setRecordingStatus({ ok: false, reason: (e && e.message) ? e.message : String(e) });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battle.winner]);

  useEffect(() => {
    if (!audioEnabled || typeof window === 'undefined' || !window.speechSynthesis || epilogueText === null) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(epilogueText);
    const voice = pickBestVoice(window.speechSynthesis.getVoices());
    if (voice) utterance.voice = voice;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioEnabled, epilogueText]);

  const hasMoreBeats = battle.pendingBeats.length > 0;
  const attackerSide = battle.initiator;
  const defenderSide = attackerSide === 0 ? 1 : 0;
  const attackerBattler = battle.teams[attackerSide][battle.active[attackerSide]];
  const defenderBattler = battle.teams[defenderSide][battle.active[defenderSide]];

  const showAttackChoice = !hasMoreBeats && battle.winner === null && battle.needsSwitch.length === 0 && battle.pendingAttackMove === null;
  const showDefenseChoice = !hasMoreBeats && battle.winner === null && battle.needsSwitch.length === 0 && battle.pendingAttackMove !== null;
  const showSwitch = !hasMoreBeats && battle.winner === null && battle.needsSwitch.length > 0;
  const showWinner = !hasMoreBeats && battle.winner !== null;

  const handleAttack = (moveName) => setBattle(prev => chooseAttack(prev, moveName));
  const handleDefense = (moveName) => setBattle(prev => chooseDefense(prev, moveName));
  const handleSwitch = (idx) => setBattle(prev => applySwitchIn(prev, prev.needsSwitch[0], idx));
  const handleContinue = () => setBattle(prev => revealNextBeat(prev));

  useEffect(() => {
    if (!quickBattle || (!showAttackChoice && !showDefenseChoice)) return;
    let timer;
    if (showAttackChoice && attackerSide !== cpuSide && !isKeyAttackMoment(attackerBattler)) {
      timer = setTimeout(() => {
        setBattle(prev => {
          const atk = prev.teams[prev.initiator][prev.active[prev.initiator]];
          const defSide = prev.initiator === 0 ? 1 : 0;
          const def = prev.teams[defSide][prev.active[defSide]];
          return chooseAttack(prev, autoPickAttack(atk, def));
        });
      }, 450);
    } else if (showDefenseChoice && defenderSide !== cpuSide && !isKeyDefenseMoment(defenderBattler)) {
      timer = setTimeout(() => {
        setBattle(prev => {
          const defSide = prev.initiator === 0 ? 1 : 0;
          const def = prev.teams[defSide][prev.active[defSide]];
          return chooseDefense(prev, autoPickDefense(def));
        });
      }, 450);
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quickBattle, showAttackChoice, showDefenseChoice, attackerBattler, defenderBattler]);

  // VS Computer: whenever side 1 owes an action (switch in, attack, or defend), the leader takes it
  // after a short pause so it reads like they're thinking. Story beats still wait on CONTINUE.
  const cpuOwesAction = cpuSide !== null && !hasMoreBeats && battle.winner === null && (
    battle.needsSwitch.length > 0 ? battle.needsSwitch[0] === cpuSide
      : battle.pendingAttackMove === null ? attackerSide === cpuSide
      : defenderSide === cpuSide);
  useEffect(() => {
    if (!cpuOwesAction) return undefined;
    const timer = setTimeout(() => {
      setBattle(prev => cpuTakeTurn(prev, cpuSide, cpuSkill) || prev);
    }, 900);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cpuOwesAction, battle.beatCounter, battle.pendingAttackMove, battle.needsSwitch.length]);

  return (
    <div style={{ minHeight: '100vh', padding: '20px 16px 32px', maxWidth: 560, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      <button onClick={onBack} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: COLORS.ash, fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.1em', cursor: 'pointer', padding: 0, marginBottom: 16 }}>
        &larr; TEAMS
      </button>

      <div style={{ display: 'flex', gap: 16, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${COLORS.hairline}` }}>
        <BattlerPanel battler={battle.log[battle.log.length - 1].snapshotAfter[0]} align="left" />
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 20, color: COLORS.ash, alignSelf: 'center' }}>VS</div>
        <BattlerPanel battler={battle.log[battle.log.length - 1].snapshotAfter[1]} align="right" />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14, maxHeight: 360, paddingRight: 4 }}>
        {battle.log.map((entry, i) => {
          const isLatest = i === battle.log.length - 1;
          const isStart = entry.event.type === 'start';
          const stillWaitingForIntro = isStart && entry.aiText === null;
          const justLearnedFinishing = !!entry.event.learnedFinishing;
          const special = ['evolve', 'transform'].includes(entry.event.type) || justLearnedFinishing;
          return (
            <div
              key={entry.id}
              className={isLatest && justLearnedFinishing ? 'finish-flash' : undefined}
              style={{ borderRadius: 4, padding: isLatest && justLearnedFinishing ? '8px 10px' : 0 }}
            >
              {isLatest && justLearnedFinishing && (
                <div style={{
                  display: 'inline-block', background: COLORS.jade, color: COLORS.paper,
                  fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.12em', padding: '4px 10px',
                  borderRadius: 20, marginBottom: 6,
                }}>
                  ★ NEW MOVE ★
                </div>
              )}
              {stillWaitingForIntro ? (
                <div className="loading-pulse" style={{
                  fontFamily: FONT_MONO, fontSize: isLatest ? 13 : 11, color: COLORS.ash, letterSpacing: '0.12em',
                }}>
                  STORY LOADING
                </div>
              ) : (
                <div
                  className={isLatest && justLearnedFinishing ? 'finish-pop' : undefined}
                  style={{
                    fontFamily: FONT_BODY, fontSize: isLatest ? 16 : 13, lineHeight: 1.65,
                    color: special ? COLORS.jadeBright : COLORS.paper,
                    opacity: isLatest ? 1 : 0.5,
                    fontWeight: isLatest ? 500 : 400,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  {renderStoryText(entry.aiText || entry.mechanicalText)}
                </div>
              )}
            </div>
          );
        })}
        <div ref={logEndRef} />
      </div>

      {hasMoreBeats && (
        <button
          onClick={handleContinue}
          style={{
            background: COLORS.panel, border: `1px solid ${COLORS.jadeBright}`, color: COLORS.jadeBright,
            borderRadius: 4, padding: '12px', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 15,
            letterSpacing: '0.05em', cursor: 'pointer', marginBottom: 4,
          }}
        >
          CONTINUE &rarr;
        </button>
      )}

      {showWinner && (() => {
        const mvp = computeMVP(battle.teams, trainers);
        const statsByTeam = buildStatsTable(battle.teams, trainers, mvp);
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 26, color: COLORS.jadeBright, marginBottom: 16 }}>
              {battle.winner === 'draw' ? "IT'S A DRAW!" : `${trainers[battle.winner].name.toUpperCase()} WINS!`}
            </div>

            {gym && <GymResultPanel gym={gym} result={gymResult} />}

            {epilogueText === null ? (
              <div className="loading-pulse" style={{ fontFamily: FONT_MONO, fontSize: 12, color: COLORS.ash, letterSpacing: '0.12em', marginBottom: 24 }}>
                EPILOGUE LOADING
              </div>
            ) : (
              <div style={{ fontFamily: FONT_BODY, fontSize: 15, lineHeight: 1.7, color: COLORS.paper, textAlign: 'left', marginBottom: 24, fontStyle: 'italic' }}>
                {renderStoryText(epilogueText)}
              </div>
            )}

            {recordingStatus && !recordingStatus.skipped && (
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: recordingStatus.persisted ? COLORS.jadeBright : COLORS.hpMid }}>
                  {recordingStatus.persisted ? '\u2713 Scoreboard updated' : `\u25D0 Saved for this session only (${recordingStatus.reason})`}
                </div>
                {recordingStatus.detail && (
                  <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.ash, marginTop: 4 }}>
                    {recordingStatus.detail}
                  </div>
                )}
              </div>
            )}

            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.jadeBright, letterSpacing: '0.12em', marginBottom: 14, textAlign: 'left' }}>
              ★ MVP — {mvp.name} ({mvp.trainerName}'s team)
            </div>
            <div style={{ textAlign: 'left', marginBottom: 24 }}>
              <BattleStatsTable statsByTeam={statsByTeam} />
            </div>

            {gym ? (
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button onClick={onHome} style={{ background: 'none', color: COLORS.ash, border: `1px solid ${COLORS.hairline}`, borderRadius: 4, padding: '12px 20px', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
                  HOME
                </button>
                <button onClick={onPlayAgain} style={{ background: COLORS.jade, color: COLORS.paper, border: 'none', borderRadius: 4, padding: '12px 28px', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
                  BACK TO GYMS
                </button>
              </div>
            ) : (
              <button onClick={onPlayAgain} style={{ background: COLORS.jade, color: COLORS.paper, border: 'none', borderRadius: 4, padding: '12px 28px', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
                PLAY AGAIN
              </button>
            )}
          </div>
        );
      })()}

      {showSwitch && (battle.needsSwitch[0] === cpuSide
        ? <CpuThinking text={`${trainers[cpuSide].name.toUpperCase()} IS CHOOSING THE NEXT POKÉMON…`} />
        : <SwitchPicker trainer={trainers[battle.needsSwitch[0]]} roster={battle.teams[battle.needsSwitch[0]]} onPick={handleSwitch} />
      )}

      {showAttackChoice && attackerSide === cpuSide && (
        <CpuThinking text={`${trainers[cpuSide].name.toUpperCase()} IS CHOOSING AN ATTACK…`} />
      )}

      {showAttackChoice && attackerSide !== cpuSide && (
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.jadeBright, letterSpacing: '0.1em', marginBottom: 10, textAlign: 'center' }}>
            {trainers[attackerSide].name.toUpperCase()}, CHOOSE YOUR ATTACK
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {attackerBattler.movesByRole.attack.map(m => (
              <MoveButton key={m} move={m} onClick={() => handleAttack(m)} />
            ))}
            {attackerBattler.learnedFinishing.map(m => (
              <MoveButton key={m} move={m} finishing onClick={() => handleAttack(m)} />
            ))}
          </div>
        </div>
      )}

      {showDefenseChoice && (
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.hpLow, letterSpacing: '0.1em', marginBottom: 6, textAlign: 'center' }}>
            {attackerBattler.name.toUpperCase()} IS ATTACKING WITH {battle.pendingAttackMove.toUpperCase()}!
          </div>
          {defenderSide === cpuSide ? (
            <CpuThinking text={`${trainers[cpuSide].name.toUpperCase()} IS READING YOUR ATTACK…`} />
          ) : (<>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.jadeBright, letterSpacing: '0.1em', marginBottom: 10, textAlign: 'center' }}>
            {trainers[defenderSide].name.toUpperCase()}, HOW DO YOU RESPOND?
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {defenderBattler.movesByRole.counter.map(m => (
              <DefenseButton key={m} role="COUNTER" move={m} onClick={() => handleDefense(m)} />
            ))}
            {defenderBattler.movesByRole.dodge.map(m => (
              <DefenseButton key={m} role="DODGE" move={m} onClick={() => handleDefense(m)} chance={getDodgeChance(attackerBattler, defenderBattler)} />
            ))}
          </div>
          </>)}
        </div>
      )}
    </div>
  );
}

// ===================== APP =====================
export default function App() {
  const [phase, setPhase] = useState('title');
  const [trainers, setTrainers] = useState([]);
  const [pool, setPool] = useState([]);
  const [pickOrder, setPickOrder] = useState([]);
  const [pickIndex, setPickIndex] = useState(0);
  const [rosters, setRosters] = useState([[], []]);
  const [battleOptions, setBattleOptions] = useState({ audio: false, quick: false });
  // VS Computer: the current challenge ({ leaderId, aceIds }) and who's taking it on.
  const [gym, setGym] = useState(null);
  const [challenger, setChallenger] = useState(null);

  const startDraft = (names) => {
    const styled = names.map((name, i) => {
      const trimmed = name.trim();
      return {
        name: trimmed || `Guest ${i + 1}`,
        isGuest: trimmed.length === 0,
        style: BATTLE_STYLES[Math.floor(Math.random() * BATTLE_STYLES.length)],
      };
    });
    setTrainers(styled);
    setPool(getMasterList(15));
    setPickOrder(getSnakeOrder(2, 3));
    setPickIndex(0);
    setRosters([[], []]);
    setGym(null);
    setPhase('drafting');
  };

  const enterGyms = (rawName) => {
    const trimmed = rawName.trim();
    setChallenger({ name: trimmed || 'Guest', isGuest: trimmed.length === 0, badges: [], league: [] });
    setPhase('gym-hub');
  };

  const startGymChallenge = (leaderId, aceIds) => {
    const aces = Array.isArray(aceIds) ? aceIds : (aceIds ? [aceIds] : []);
    const leader = getLeader(leaderId);
    setTrainers([
      { name: challenger.name, isGuest: challenger.isGuest, style: BATTLE_STYLES[Math.floor(Math.random() * BATTLE_STYLES.length)] },
      { name: leader.name, isGuest: false, isCpu: true, style: leader.style },
    ]);
    setGym({ leaderId, aceIds: aces });
    setPool(getGymPool(leader));
    setPickOrder(getGymPickOrder(aces.length));
    setPickIndex(0);
    setRosters(buildGymStartRosters(leaderId, aces));
    setPhase('drafting');
  };

  // A win is passed up right away (before the save finishes) so the gym menu shows it immediately.
  const noteProgress = (field, ids) => setChallenger(prev => {
    if (!prev) return prev;
    const merged = [...(prev[field] || []), ...ids];
    return { ...prev, [field]: field === 'badges' ? sortBadges(merged) : sortLeague(merged) };
  });

  const draftPick = (pokemon) => {
    const trainerIdx = pickOrder[pickIndex];
    const isLastPick = pickIndex + 1 >= pickOrder.length;
    setRosters(prev => {
      const next = prev.map(r => [...r]);
      next[trainerIdx] = [...next[trainerIdx], pokemon];
      return isLastPick && gym ? finalizeGymRosters(next, getLeader(gym.leaderId)) : next;
    });
    setPool(prev => prev.filter(p => p.name !== pokemon.name));
    if (isLastPick) setPhase('review');
    else setPickIndex(pickIndex + 1);
  };

  // The leader's draft picks, made automatically after a short pause on their turn.
  useEffect(() => {
    if (phase !== 'drafting' || !gym || pickOrder[pickIndex] !== 1) return undefined;
    const leader = getLeader(gym.leaderId);
    const timer = setTimeout(() => draftPick(cpuDraftPick(pool, rosters[1], rosters[0], leader)), 900);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, gym, pickIndex]);

  const reset = () => { setPhase('title'); setGym(null); };
  const backToGyms = () => { setPhase('gym-hub'); setGym(null); };
  const leader = gym ? getLeader(gym.leaderId) : null;

  const beginBattle = (audio, quick) => {
    setBattleOptions({ audio, quick });
    setPhase('battle');
  };

  return (
    <div style={{ background: COLORS.ink, minHeight: '100vh', fontFamily: FONT_BODY, color: COLORS.paper }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
        button:focus-visible, input:focus-visible, div[role="button"]:focus-visible { outline: 2px solid ${COLORS.jadeBright}; outline-offset: 2px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .screen { animation: fadeIn 0.35s ease; }
        @keyframes finishFlashKf { 0% { background: transparent; } 20% { background: rgba(79, 163, 147, 0.32); } 100% { background: transparent; } }
        .finish-flash { animation: finishFlashKf 0.9s ease-out; }
        @keyframes finishPopKf { 0% { transform: scale(0.92); opacity: 0.4; } 55% { transform: scale(1.03); } 100% { transform: scale(1); opacity: 1; } }
        .finish-pop { animation: finishPopKf 0.45s ease-out; }
        @keyframes badgePopKf { 0% { transform: scale(0.4) rotate(-12deg); opacity: 0; } 60% { transform: scale(1.15) rotate(4deg); opacity: 1; } 100% { transform: scale(1) rotate(0); } }
        .badge-pop { animation: badgePopKf 0.6s cubic-bezier(.2,.9,.3,1.2); }
        @keyframes loadingPulseKf { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        .loading-pulse { animation: loadingPulseKf 1.3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .screen, .finish-flash, .finish-pop, .loading-pulse, .badge-pop { animation: none; } }
      `}</style>
      <div className="screen" key={phase}>
        {phase === 'title' && <TitleScreen onStart={() => setPhase('setup')} onStartCpu={() => setPhase('vs-setup')} />}
        {phase === 'setup' && <SetupScreen onStart={startDraft} onBack={() => setPhase('title')} />}
        {phase === 'vs-setup' && <VsSetupScreen onContinue={enterGyms} onBack={() => setPhase('title')} />}
        {phase === 'gym-hub' && challenger && <GymHubScreen challenger={challenger} onChallenge={startGymChallenge} onBack={reset} />}
        {phase === 'drafting' && (
          <DraftScreen trainers={trainers} pool={pool} rosters={rosters} pickOrder={pickOrder} pickIndex={pickIndex} onPick={draftPick}
            onReset={gym ? backToGyms : reset} cpuSide={gym ? 1 : null} backLabel={gym ? 'GYMS' : 'NEW DRAFT'} />
        )}
        {phase === 'review' && (
          <ReviewScreen trainers={trainers} rosters={rosters} onBattle={beginBattle} onReset={gym ? backToGyms : reset} gym={leader} backLabel={gym ? 'GYMS' : 'NEW DRAFT'} />
        )}
        {phase === 'battle' && (
          <BattleScreen trainers={trainers} rosters={rosters} audioEnabled={battleOptions.audio} quickBattle={battleOptions.quick}
            onBack={() => setPhase('review')} onPlayAgain={gym ? backToGyms : reset} onHome={reset}
            gym={gym ? { leader, challengerIsGuest: trainers[0].isGuest } : null} onGymResult={noteProgress} />
        )}
      </div>
    </div>
  );
}
