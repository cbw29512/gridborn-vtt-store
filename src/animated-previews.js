/**
 * Verified source-path mapping for public art studies; preview only.
 * Source details are keyed by catalog ID, never a creature-name heuristic.
 */
export const animatedPreviews = Object.freeze({
  'mon-srd-52-goblin-warrior': Object.freeze({
    still:'./assets/studies/srd-goblin-warrior.svg',
    idle:'./assets/demos/srd-goblin-warrior-idle.svg',
    move:'./assets/demos/srd-goblin-warrior-move.svg',
    action:'./assets/demos/srd-goblin-warrior-attack.svg',
    rest:'./assets/demos/srd-goblin-warrior-rest.svg',
    idleDurationMs:3600,moveDurationMs:3600,actionDurationMs:1400,restDurationMs:6000,
    labels:Object.freeze({
      idle:'Idle · Goblin Warrior breathes and blinks',
      move:'Move · shared goblin stride carries the saber',
      action:'Attack · quick curved saber slash',
      rest:'Rest · sword lowered and shoulders relaxed'
    })
  }),
  'mon-srd-52-goblin-minion': Object.freeze({
    still:'./assets/studies/srd-goblin-minion.svg',
    idle:'./assets/demos/srd-goblin-minion-idle.svg',
    move:'./assets/demos/srd-goblin-minion-move.svg',
    action:'./assets/demos/srd-goblin-minion-attack.svg',
    rest:'./assets/demos/srd-goblin-minion-rest.svg',
    idleDurationMs:3600,moveDurationMs:3600,actionDurationMs:1400,restDurationMs:6000,
    labels:Object.freeze({
      idle:'Idle · Goblin Minion breathes and blinks',
      move:'Move · shared goblin stride carries the worn dagger',
      action:'Attack · quick curved worn dagger slash',
      rest:'Rest · sword lowered and shoulders relaxed'
    })
  }),

  'mon-srd-52-ogre': Object.freeze({
    still:'./assets/studies/srd-ogre.svg',
    idle:'./assets/demos/srd-ogre-idle.svg',
    move:'./assets/demos/srd-ogre-move.svg',
    action:'./assets/demos/srd-ogre-attack.svg',
    rest:'./assets/demos/srd-ogre-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · Ogre shifts weight and braces its gear',
      move:'Move · original creature stride retained by shared body rig',
      action:'Attack · iron-bound club smash visibly swings from its hand',
      rest:'Rest · Ogre relaxes and lowers its weapon'
    })
  }),
  'mon-srd-52-goblin-boss': Object.freeze({
    still:'./assets/studies/srd-goblin-boss.svg',
    idle:'./assets/demos/srd-goblin-boss-idle.svg',
    move:'./assets/demos/srd-goblin-boss-move.svg',
    action:'./assets/demos/srd-goblin-boss-attack.svg',
    rest:'./assets/demos/srd-goblin-boss-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · Goblin Boss shifts weight and braces its gear',
      move:'Move · original creature stride retained by shared body rig',
      action:'Attack · steel sword strike visibly swings from its hand',
      rest:'Rest · Goblin Boss relaxes and lowers its weapon'
    })
  }),

  'mon-forest-wolf': Object.freeze({
    still:'./assets/studies/dire-wolf.svg',
    idle:'./assets/demos/dire-wolf-idle.svg',
    move:'./assets/demos/dire-wolf-move.svg',
    action:'./assets/demos/dire-wolf-attack.svg',
    rest:'./assets/demos/dire-wolf-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,actionDurationMs:1300,restDurationMs:4800,
    labels:Object.freeze({
      idle:'Idle · massive Dire Wolf bristles and breathes',
      move:'Move · four paws trot in alternating diagonal pairs',
      action:'Attack · heavier forward lunge and bite with visible fangs',
      rest:'Rest · folded wolf posture settles and breathes'
    })
  }),

  'npc-guard-human': Object.freeze({
    still:'./assets/studies/city-guard.svg',
    idle:'./assets/demos/city-guard-idle.svg',
    move:'./assets/demos/city-guard-move.svg',
    action:'./assets/demos/city-guard-attack.svg',
    rest:'./assets/demos/city-guard-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · City Guard maintains a grounded, physically held equipment stance',
      move:'Move · alternating legs carry weapons or tools anchored to the hands',
      action:'Attack · shield-guarded forward spear thrust',
      rest:'Rest · body settles and arms lower naturally'
    })
  }),
  'npc-roster-blacksmith-human': Object.freeze({
    still:'./assets/studies/human-blacksmith.svg',
    idle:'./assets/demos/human-blacksmith-idle.svg',
    move:'./assets/demos/human-blacksmith-move.svg',
    action:'./assets/demos/human-blacksmith-attack.svg',
    rest:'./assets/demos/human-blacksmith-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · Human Blacksmith · Nonbinary maintains a grounded, physically held equipment stance',
      move:'Move · alternating legs carry weapons or tools anchored to the hands',
      action:'Attack · full-hand forge hammer swing with sparks',
      rest:'Rest · body settles and arms lower naturally'
    })
  }),

  'npc-roster-farmer-human': Object.freeze({
    still:'./assets/studies/human-farmer.svg',
    idle:'./assets/demos/human-farmer-idle.svg',
    move:'./assets/demos/human-farmer-move.svg',
    action:'./assets/demos/human-farmer-attack.svg',
    rest:'./assets/demos/human-farmer-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · farmer balances a real three-tined pitchfork by hand',
      move:'Move · walking with alternating feet and steadying pitchfork grip',
      action:'Attack · grounded defensive pitchfork thrust with recovery',
      rest:'Rest · pitchfork planted as farmer settles after work'
    })
  }),

  'mon-srd-52-young-silver-dragon': Object.freeze({
    still:'./assets/studies/dragon-young-silver.svg',
    idle:'./assets/demos/dragon-young-silver-idle.svg',
    move:'./assets/demos/dragon-young-silver-move.svg',
    action:'./assets/demos/dragon-young-silver-attack.svg',
    rest:'./assets/demos/dragon-young-silver-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · young Silver dragon breathes with subtle wing and tail motion (prototype)',
      move:'Move · articulated front and hind legs travel with tail counterbalance (prototype)',
      action:'Attack · distinct cold breath shoots from open jaws with recovery (prototype)',
      rest:'Rest · lowered head and folded wing joint settles naturally (prototype)'
    })
  }),

  'mon-srd-52-young-copper-dragon': Object.freeze({
    still:'./assets/studies/dragon-young-copper.svg',
    idle:'./assets/demos/dragon-young-copper-idle.svg',
    move:'./assets/demos/dragon-young-copper-move.svg',
    action:'./assets/demos/dragon-young-copper-attack.svg',
    rest:'./assets/demos/dragon-young-copper-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · young Copper dragon breathes with subtle wing and tail motion (prototype)',
      move:'Move · articulated front and hind legs travel with tail counterbalance (prototype)',
      action:'Attack · distinct acid breath shoots from open jaws with recovery (prototype)',
      rest:'Rest · lowered head and folded wing joint settles naturally (prototype)'
    })
  }),

  'mon-srd-52-young-bronze-dragon': Object.freeze({
    still:'./assets/studies/dragon-young-bronze.svg',
    idle:'./assets/demos/dragon-young-bronze-idle.svg',
    move:'./assets/demos/dragon-young-bronze-move.svg',
    action:'./assets/demos/dragon-young-bronze-attack.svg',
    rest:'./assets/demos/dragon-young-bronze-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · young Bronze dragon breathes with subtle wing and tail motion (prototype)',
      move:'Move · articulated front and hind legs travel with tail counterbalance (prototype)',
      action:'Attack · distinct lightning breath shoots from open jaws with recovery (prototype)',
      rest:'Rest · lowered head and folded wing joint settles naturally (prototype)'
    })
  }),

  'mon-srd-52-young-brass-dragon': Object.freeze({
    still:'./assets/studies/dragon-young-brass.svg',
    idle:'./assets/demos/dragon-young-brass-idle.svg',
    move:'./assets/demos/dragon-young-brass-move.svg',
    action:'./assets/demos/dragon-young-brass-attack.svg',
    rest:'./assets/demos/dragon-young-brass-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · young Brass dragon breathes with subtle wing and tail motion (prototype)',
      move:'Move · articulated front and hind legs travel with tail counterbalance (prototype)',
      action:'Attack · distinct fire breath shoots from open jaws with recovery (prototype)',
      rest:'Rest · lowered head and folded wing joint settles naturally (prototype)'
    })
  }),

  'mon-srd-52-young-white-dragon': Object.freeze({
    still:'./assets/studies/dragon-young-white.svg',
    idle:'./assets/demos/dragon-young-white-idle.svg',
    move:'./assets/demos/dragon-young-white-move.svg',
    action:'./assets/demos/dragon-young-white-attack.svg',
    rest:'./assets/demos/dragon-young-white-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · young White dragon breathes with subtle wing and tail motion (prototype)',
      move:'Move · articulated front and hind legs travel with tail counterbalance (prototype)',
      action:'Attack · distinct cold breath shoots from open jaws with recovery (prototype)',
      rest:'Rest · lowered head and folded wing joint settles naturally (prototype)'
    })
  }),

  'mon-srd-52-young-blue-dragon': Object.freeze({
    still:'./assets/studies/dragon-young-blue.svg',
    idle:'./assets/demos/dragon-young-blue-idle.svg',
    move:'./assets/demos/dragon-young-blue-move.svg',
    action:'./assets/demos/dragon-young-blue-attack.svg',
    rest:'./assets/demos/dragon-young-blue-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · young Blue dragon breathes with subtle wing and tail motion (prototype)',
      move:'Move · articulated front and hind legs travel with tail counterbalance (prototype)',
      action:'Attack · distinct lightning breath shoots from open jaws with recovery (prototype)',
      rest:'Rest · lowered head and folded wing joint settles naturally (prototype)'
    })
  }),

  'mon-srd-52-young-black-dragon': Object.freeze({
    still:'./assets/studies/dragon-young-black.svg',
    idle:'./assets/demos/dragon-young-black-idle.svg',
    move:'./assets/demos/dragon-young-black-move.svg',
    action:'./assets/demos/dragon-young-black-attack.svg',
    rest:'./assets/demos/dragon-young-black-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · young Black dragon breathes with subtle wing and tail motion (prototype)',
      move:'Move · articulated front and hind legs travel with tail counterbalance (prototype)',
      action:'Attack · distinct acid breath shoots from open jaws with recovery (prototype)',
      rest:'Rest · lowered head and folded wing joint settles naturally (prototype)'
    })
  }),

  'mon-srd-52-young-red-dragon': Object.freeze({
    still:'./assets/studies/dragon-young-red.svg',
    idle:'./assets/demos/dragon-young-red-idle.svg',
    move:'./assets/demos/dragon-young-red-move.svg',
    action:'./assets/demos/dragon-young-red-attack.svg',
    rest:'./assets/demos/dragon-young-red-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · young Red dragon holds a side-profile guard with responsive tail and wings (prototype)',
      move:'Move · four articulated legs stride with braced wings and tail balance (prototype)',
      action:'Attack · jaws open and release a distinct fire plume toward the target (prototype)',
      rest:'Rest · folding wings, lowering head and settling as a living dragon (prototype)'
    })
  }),
  'mon-srd-52-young-green-dragon': Object.freeze({
    still:'./assets/studies/dragon-young-green.svg',
    idle:'./assets/demos/dragon-young-green-idle.svg',
    move:'./assets/demos/dragon-young-green-move.svg',
    action:'./assets/demos/dragon-young-green-attack.svg',
    rest:'./assets/demos/dragon-young-green-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · young Green dragon holds a side-profile guard with responsive tail and wings (prototype)',
      move:'Move · four articulated legs stride with braced wings and tail balance (prototype)',
      action:'Attack · jaws open and release a distinct poison cloud toward the target (prototype)',
      rest:'Rest · folding wings, lowering head and settling as a living dragon (prototype)'
    })
  }),
  'mon-srd-52-young-gold-dragon': Object.freeze({
    still:'./assets/studies/dragon-young-gold.svg',
    idle:'./assets/demos/dragon-young-gold-idle.svg',
    move:'./assets/demos/dragon-young-gold-move.svg',
    action:'./assets/demos/dragon-young-gold-attack.svg',
    rest:'./assets/demos/dragon-young-gold-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · young Gold dragon holds a side-profile guard with responsive tail and wings (prototype)',
      move:'Move · four articulated legs stride with braced wings and tail balance (prototype)',
      action:'Attack · jaws open and release a distinct fire plume toward the target (prototype)',
      rest:'Rest · folding wings, lowering head and settling as a living dragon (prototype)'
    })
  }),

  'npc-inn-human': Object.freeze({
    still:'./assets/studies/village-innkeeper.svg',
    idle:'./assets/demos/village-innkeeper-idle.svg',
    move:'./assets/demos/village-innkeeper-move.svg',
    action:'./assets/demos/village-innkeeper-attack.svg',
    rest:'./assets/demos/village-innkeeper-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · Village Innkeeper offers a foaming tankard (prototype)',
      move:'Move · Innkeeper walks while steadying the serving arm (prototype)',
      action:'Attack · defensive tankard shove with short foam burst (prototype)',
      rest:'Rest · Innkeeper lowers tankard into an easy service stance (prototype)'
    })
  }),

  'pregen-bard-nonbinary-3': Object.freeze({
    still:'./assets/studies/elf-court-nonbinary.svg',
    idle:'./assets/demos/elf-court-nonbinary-idle.svg',
    move:'./assets/demos/elf-court-nonbinary-move.svg',
    action:'./assets/demos/elf-court-nonbinary-attack.svg',
    rest:'./assets/demos/elf-court-nonbinary-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · nonbinary Elf court musician picks long-neck archlute (prototype)',
      move:'Move · measured court stride with fitted silver-blue stagecoat (prototype)',
      action:'Attack · fretting hand anchors as arpeggio releases luminous notes (prototype)',
      rest:'Rest · performer lowers the long-neck archlute (prototype)'
    })
  }),
  'pregen-bard-female-1': Object.freeze({
    still:'./assets/studies/orc-songweaver-female.svg',
    idle:'./assets/demos/orc-songweaver-female-idle.svg',
    move:'./assets/demos/orc-songweaver-female-move.svg',
    action:'./assets/demos/orc-songweaver-female-attack.svg',
    rest:'./assets/demos/orc-songweaver-female-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · female Orc Songweaver sways and plucks traveling lute (prototype)',
      move:'Move · broad grounded performance steps, sword stays sheathed (prototype)',
      action:'Attack · attached plucking hand strikes the strings and casts harmonic wave (prototype)',
      rest:'Rest · performer lowers the large pear-bodied lute (prototype)'
    })
  }),
  'pregen-ranger-male-1': Object.freeze({
    still:'./assets/studies/dwarf-pathfinder-male.svg',
    idle:'./assets/demos/dwarf-pathfinder-male-idle.svg',
    move:'./assets/demos/dwarf-pathfinder-male-move.svg',
    action:'./assets/demos/dwarf-pathfinder-male-attack.svg',
    rest:'./assets/demos/dwarf-pathfinder-male-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · stocky Dwarf Pathfinder watches with yew recurve at side (prototype)',
      move:'Move · braced short travel steps under weathered quiver (prototype)',
      action:'Attack · drawhand anchors under beard before arrow release (prototype)',
      rest:'Rest · grounded Dwarf lowers bow arm and catches breath (prototype)'
    })
  }),
  'pregen-ranger-nonbinary-1': Object.freeze({
    still:'./assets/studies/goblin-pathfinder-nonbinary.svg',
    idle:'./assets/demos/goblin-pathfinder-nonbinary-idle.svg',
    move:'./assets/demos/goblin-pathfinder-nonbinary-move.svg',
    action:'./assets/demos/goblin-pathfinder-nonbinary-attack.svg',
    rest:'./assets/demos/goblin-pathfinder-nonbinary-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · compact Goblin Pathfinder scouts with shortbow (prototype)',
      move:'Move · low fast strides with a narrow fletched quiver (prototype)',
      action:'Attack · hand draws shortbow string to cheek and releases arrow (prototype)',
      rest:'Rest · Goblin lowers shortbow in crouched resting stance (prototype)'
    })
  }),
  'pregen-ranger-female-1': Object.freeze({
    still:'./assets/studies/orc-pathfinder-female.svg',
    idle:'./assets/demos/orc-pathfinder-female-idle.svg',
    move:'./assets/demos/orc-pathfinder-female-move.svg',
    action:'./assets/demos/orc-pathfinder-female-attack.svg',
    rest:'./assets/demos/orc-pathfinder-female-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · Orc Pathfinder surveys the trail with recurve bow at hand (prototype)',
      move:'Move · grounded ranger prowl under a quiver of fletched arrows (prototype)',
      action:'Attack · anchor bowstring under chin then release distinct arrow (prototype)',
      rest:'Rest · lower bow arm into settled scout stance (prototype)'
    })
  }),
  'pregen-monk-nonbinary-3': Object.freeze({
    still:'./assets/studies/goblin-stonefist-nonbinary.svg',
    idle:'./assets/demos/goblin-stonefist-nonbinary-idle.svg',
    move:'./assets/demos/goblin-stonefist-nonbinary-move.svg',
    action:'./assets/demos/goblin-stonefist-nonbinary-attack.svg',
    rest:'./assets/demos/goblin-stonefist-nonbinary-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · nimble Goblin Stonefist guarded low stance (prototype)',
      move:'Move · fast crouched steps on both feet (prototype)',
      action:'Attack · elbow feint and separate low heel sweep (prototype)',
      rest:'Rest · crouched stance with quiet fists (prototype)'
    })
  }),
  'pregen-monk-female-3': Object.freeze({
    still:'./assets/studies/orc-stonefist-female.svg',
    idle:'./assets/demos/orc-stonefist-female-idle.svg',
    move:'./assets/demos/orc-stonefist-female-move.svg',
    action:'./assets/demos/orc-stonefist-female-attack.svg',
    rest:'./assets/demos/orc-stonefist-female-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · Orc Stonefist heavy unarmed guard (prototype)',
      move:'Move · deliberate grounded alternating strides (prototype)',
      action:'Attack · shoulder-linked hammerfist windup, slam and recoil (prototype)',
      rest:'Rest · settled stance with hands lowered (prototype)'
    })
  }),
  'pregen-warlock-nonbinary-1': Object.freeze({
    still:'./assets/studies/dwarf-hexwarden-warlock.svg',
    idle:'./assets/demos/dwarf-hexwarden-warlock-idle.svg',
    move:'./assets/demos/dwarf-hexwarden-warlock-move.svg',
    action:'./assets/demos/dwarf-hexwarden-warlock-attack.svg',
    rest:'./assets/demos/dwarf-hexwarden-warlock-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · Dwarf Hexwarden studies held occult tome with staff at side (prototype)',
      move:'Move · stout short-stride travel with book carried close (prototype)',
      action:'Attack · occult rune invokes a separate eldritch bolt (prototype)',
      rest:'Rest · book and staff lower while rune disappears (prototype)'
    })
  }),
  'pregen-sorcerer-nonbinary-1': Object.freeze({
    still:'./assets/studies/elf-sparkweaver-sorcerer.svg',
    idle:'./assets/demos/elf-sparkweaver-sorcerer-idle.svg',
    move:'./assets/demos/elf-sparkweaver-sorcerer-move.svg',
    action:'./assets/demos/elf-sparkweaver-sorcerer-attack.svg',
    rest:'./assets/demos/elf-sparkweaver-sorcerer-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · spontaneous crystal power flickers at the open hand (prototype)',
      move:'Move · agile elf travel steps and steady carried staff (prototype)',
      action:'Attack · arc charge gathers and releases a branching bolt (prototype)',
      rest:'Rest · lowered staff and dimmed crystal focus (prototype)'
    })
  }),
  'pregen-monk-male-1': Object.freeze({
    still:'./assets/studies/human-wayfarer-monk.svg',
    idle:'./assets/demos/human-wayfarer-monk-idle.svg',
    move:'./assets/demos/human-wayfarer-monk-move.svg',
    action:'./assets/demos/human-wayfarer-monk-attack.svg',
    rest:'./assets/demos/human-wayfarer-monk-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · balanced Wayfarer with wrapped hands in guard (prototype)',
      move:'Move · light opposite-foot steps and active guard (prototype)',
      action:'Attack · braced palm strike followed by chambered front kick (prototype)',
      rest:'Rest · settled stance and lowered guard (prototype)'
    })
  }),
  'pregen-druid-female-1': Object.freeze({
    still:'./assets/studies/human-wildspeaker-druid.svg',
    idle:'./assets/demos/human-wildspeaker-druid-idle.svg',
    move:'./assets/demos/human-wildspeaker-druid-move.svg',
    action:'./assets/demos/human-wildspeaker-druid-attack.svg',
    rest:'./assets/demos/human-wildspeaker-druid-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · braided Wildspeaker balances living oak staff (prototype)',
      move:'Move · split-leg stride with oak leaf mantle (prototype)',
      action:'Attack · casting hand lashes a thornvine toward target (prototype)',
      rest:'Rest · crouches with lowered staff and quiet leaves (prototype)'
    })
  }),
  'chr-brd-halfling': Object.freeze({
    still:'./assets/studies/halfling-bard.svg',
    idle:'./assets/demos/halfling-bard-idle.svg',
    move:'./assets/demos/halfling-bard-move.svg',
    action:'./assets/demos/halfling-bard-attack.svg',
    rest:'./assets/demos/halfling-bard-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · original halfling lute recital with moving plucking fingers (prototype)',
      move:'Move · agile short-stride walk with instrument held close (prototype)',
      action:'Attack · fretted lute chord sends directed magical harmonics (prototype)',
      rest:'Rest · lowered pear-bodied lute and calmer posture (prototype)'
    })
  }),
  'chr-rng-elf': Object.freeze({
    still:'./assets/studies/elven-ranger.svg',
    idle:'./assets/demos/elven-ranger-idle.svg',
    move:'./assets/demos/elven-ranger-move.svg',
    action:'./assets/demos/elven-ranger-attack.svg',
    rest:'./assets/demos/elven-ranger-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · Elven longbow scout watches for movement (prototype)',
      move:'Move · opposing leg strides with balanced bow (prototype)',
      action:'Attack · draw and release arrow toward target (prototype)',
      rest:'Rest · bow lowered and body relaxed (prototype)'
    })
  }),
  'chr-pal-human': Object.freeze({
    still:'./assets/studies/human-paladin.svg',
    idle:'./assets/demos/human-paladin-idle.svg',
    move:'./assets/demos/human-paladin-move.svg',
    action:'./assets/demos/human-paladin-attack.svg',
    rest:'./assets/demos/human-paladin-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · guarded sword and shield watch (prototype)',
      move:'Move · measured plated march with sword balanced (prototype)',
      action:'Attack · one oathguard sword smite, then Idle (prototype)',
      rest:'Rest · shield lowered during solemn prayer (prototype)'
    })
  }),
  'chr-rge-gnome': Object.freeze({
    still:'./assets/studies/gnome-rogue.svg',
    idle:'./assets/demos/gnome-rogue-idle.svg',
    move:'./assets/demos/gnome-rogue-move.svg',
    action:'./assets/demos/gnome-rogue-attack.svg',
    rest:'./assets/demos/gnome-rogue-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · goggled scout checks loaded crossbow (prototype)',
      move:'Move · quick short-boot scurry (prototype)',
      action:'Attack · one hand-crossbow bolt, then Idle (prototype)',
      rest:'Rest · low concealed crouch with crossbow lowered (prototype)'
    })
  }),
  'mon-swamp-lizard': Object.freeze({
    still:'./assets/studies/swamp-lizardfolk.svg',
    idle:'./assets/demos/swamp-lizardfolk-idle.svg',
    move:'./assets/demos/swamp-lizardfolk-move.svg',
    action:'./assets/demos/swamp-lizardfolk-attack.svg',
    rest:'./assets/demos/swamp-lizardfolk-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · crocodilian snout and tail sway (prototype)',
      move:'Move · reptilian spear hunter stride, tail counterbalances (prototype)',
      action:'Attack · one thrusting spear jab, then Idle (prototype)',
      rest:'Rest · low reptile rest with spear grounded (prototype)'
    })
  }),
  'ani-ocean-greatwhite': Object.freeze({
    still:'./assets/studies/great-white-shark.svg',
    idle:'./assets/demos/great-white-shark-idle.svg',
    move:'./assets/demos/great-white-shark-move.svg',
    action:'./assets/demos/great-white-shark-attack.svg',
    rest:'./assets/demos/great-white-shark-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · slow fin and crescent tail movement (prototype)',
      move:'Move · side-view swimming with sweeping tail strokes (prototype)',
      action:'Attack · one lunging shark bite, then Idle (prototype)',
      rest:'Rest · gentle drifting swim, never a human sleep pose (prototype)'
    })
  }),
  'chr-clr-dwarf': Object.freeze({
    still:'./assets/studies/dwarven-cleric.svg',
    idle:'./assets/demos/dwarven-cleric-idle.svg',
    move:'./assets/demos/dwarven-cleric-move.svg',
    action:'./assets/demos/dwarven-cleric-attack.svg',
    rest:'./assets/demos/dwarven-cleric-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · stocky dwarf prayer and mace ready (prototype)',
      move:'Move · heavy shielded dwarf marching (prototype)',
      action:'Attack · one flanged mace smite, then Idle (prototype)',
      rest:'Rest · kneeling prayer with shield and mace lowered (prototype)'
    })
  }),
  'pregen-cleric-female-2': Object.freeze({
    still:'./assets/studies/human-mercywarden-female.svg',
    idle:'./assets/demos/human-mercywarden-female-idle.svg',
    move:'./assets/demos/human-mercywarden-female-move.svg',
    action:'./assets/demos/human-mercywarden-female-attack.svg',
    rest:'./assets/demos/human-mercywarden-female-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · braided healer with warm golden aura (prototype)',
      move:'Move · guarded strides and raised healing shield (prototype)',
      action:'Attack · one healing-mace flash then Idle (prototype)',
      rest:'Rest · quiet healing prayer and soft aura (prototype)'
    })
  }),
  'pregen-rogue-nonbinary-1': Object.freeze({
    still:'./assets/studies/human-shadowstep-nonbinary.svg',
    idle:'./assets/demos/human-shadowstep-nonbinary-idle.svg',
    move:'./assets/demos/human-shadowstep-nonbinary-move.svg',
    action:'./assets/demos/human-shadowstep-nonbinary-attack.svg',
    rest:'./assets/demos/human-shadowstep-nonbinary-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · hooded rogue keeps watch with twin daggers (prototype)',
      move:'Move · low silent sidesteps and trailing cloak (prototype)',
      action:'Attack · rapid paired dagger strike then Idle (prototype)',
      rest:'Rest · crouched stillness with sheathed daggers (prototype)'
    })
  }),
  'mon-cave-ogre': Object.freeze({
    still:'./assets/studies/cave-ogre.svg',
    idle:'./assets/demos/cave-ogre-idle.svg',
    move:'./assets/demos/cave-ogre-move.svg',
    action:'./assets/demos/cave-ogre-attack.svg',
    rest:'./assets/demos/cave-ogre-rest.svg',
    idleDurationMs:3200,moveDurationMs:2400,
    actionDurationMs:1400,restDurationMs:4000,
    labels:Object.freeze({
      idle:'Idle · huge ogre shifts club weight (prototype)',
      move:'Move · heavy uneven ogre footfalls (prototype)',
      action:'Attack · one crushing stone-club smash then Idle (prototype)',
      rest:'Rest · ogre slumps with grounded club (prototype)'
    })
  }),
  'chr-wiz-elf': Object.freeze({
    still: './assets/studies/elven-wizard.svg',
    idle: './assets/demos/elven-wizard-idle.svg',
    move: './assets/demos/elven-wizard-move.svg',
    action: './assets/demos/elven-wizard-attack.svg',
    rest: './assets/demos/elven-wizard-rest.svg',
    idleDurationMs: 3200,
    moveDurationMs: 2400,
    actionDurationMs: 1400,
    restDurationMs: 4000,
    labels: Object.freeze({
      idle: 'Idle · quiet staff glow and floating robe (prototype)',
      move: 'Move · levitating stride with swaying staff (prototype)',
      action: 'Attack · one bright arcane staff cast then Idle (prototype)',
      rest: 'Rest · calm wizard stance with dimmed spell aura (prototype)'
    })
  }),
  'pregen-barbarian-male-3': Object.freeze({
    still: './assets/studies/orc-axe-vanguard-pregen.svg',
    idle: './assets/demos/orc-axe-vanguard-pregen-idle.svg',
    move: './assets/demos/orc-axe-vanguard-pregen-move.svg',
    action: './assets/demos/orc-axe-vanguard-pregen-attack.svg',
    rest: './assets/demos/orc-axe-vanguard-pregen-rest.svg',
    idleDurationMs: 3200,
    moveDurationMs: 2400,
    actionDurationMs: 1400,
    restDurationMs: 4000,
    labels: Object.freeze({
      idle: 'Idle · orc pregen hefting a battle axe (prototype)',
      move: 'Move · heavy alternating boot march (prototype)',
      action: 'Attack · one overhead axe cleave then Idle (prototype)',
      rest: 'Rest · lowered axe and steady breathing (prototype)'
    })
  }),
  'mon-dng-armor': Object.freeze({
    still: './assets/studies/animated-armor.svg',
    idle: './assets/demos/animated-armor-idle.svg',
    move: './assets/demos/animated-armor-move.svg',
    action: './assets/demos/animated-armor-attack.svg',
    rest: './assets/demos/animated-armor-rest.svg',
    idleDurationMs: 3200,
    moveDurationMs: 2400,
    actionDurationMs: 1400,
    restDurationMs: 4000,
    labels: Object.freeze({
      idle: 'Idle · hollow armor creak and visor glimmer (prototype)',
      move: 'Move · hard segmented metal footfalls (prototype)',
      action: 'Attack · single sword cleave then Idle (prototype)',
      rest: 'Rest · slumped inert armor, no breathing (prototype)'
    })
  }),
  'chr-ftr-human': Object.freeze({
    still: './assets/demos/human-fighter-still.svg',
    idle: './assets/demos/human-fighter-idle.svg',
    move: './assets/demos/human-fighter-move.svg',
    action: './assets/demos/human-fighter-attack.svg',
    rest: './assets/demos/human-fighter-rest.svg',
    actionDurationMs: 1400,
    idleDurationMs: 3200,
    moveDurationMs: 3200,
    restDurationMs: 6000,
    labels: Object.freeze({
      idle: 'Idle · shield and cape breathing (prototype)',
      move: 'Move · alternating armored footsteps (prototype)',
      action: 'Attack · single guarded sword strike, then Idle (prototype)',
      rest: 'Rest · lowered sword and gentle breathing (prototype)'
    }),
  }),
  'mon-dng-skeleton': Object.freeze({
    still: './assets/studies/skeleton-warrior.svg',
    idle: './assets/demos/skeleton-warrior-idle.svg',
    move: './assets/demos/skeleton-warrior-move.svg',
    action: './assets/demos/skeleton-warrior-attack.svg',
    rest: './assets/demos/skeleton-warrior-rest.svg',
    actionDurationMs: 1400,
    idleDurationMs: 3000,
    moveDurationMs: 2400,
    restDurationMs: 4000,
    labels: Object.freeze({
      idle: 'Idle · undead skull and weapon fidgets; no breathing (prototype)',
      move: 'Move · alternating, jerky skeletal shuffle (prototype)',
      action: 'Attack · one bone-arm sword strike, then Idle (prototype)',
      rest: 'Rest · collapsed, inert bones; faint spectral glimmer (prototype)'
    }),
  }),
  'mon-cave-spider': Object.freeze({
    still: './assets/studies/giant-cave-spider.svg',
    idle: './assets/demos/giant-cave-spider-idle.svg',
    move: './assets/demos/giant-cave-spider-move.svg',
    action: './assets/demos/giant-cave-spider-attack.svg',
    rest: './assets/demos/giant-cave-spider-rest.svg',
    actionDurationMs: 1400,
    idleDurationMs: 3600,
    moveDurationMs: 2400,
    restDurationMs: 5000,
    labels: Object.freeze({
      idle: 'Idle · abdomen breathing and palp motion (prototype)',
      move: 'Move · eight legs in alternating tetrapod gait (prototype)',
      action: 'Attack · single fang jab, then Idle (prototype)',
      rest: 'Rest · eight legs folded close to body (prototype)'
    }),
  }),
  'ani-forest-wolf': Object.freeze({
    still: './assets/studies/gray-wolf.svg',
    idle: './assets/demos/gray-wolf-idle.svg',
    move: './assets/demos/gray-wolf-move.svg',
    action: './assets/demos/gray-wolf-attack.svg',
    rest: './assets/demos/gray-wolf-rest.svg',
    actionDurationMs: 1300,
    idleDurationMs: 3200,
    moveDurationMs: 2000,
    restDurationMs: 4800,
    labels: Object.freeze({
      idle: 'Idle · gentle breathing loop with synchronized ears and tail (prototype)',
      move: 'Move · four-legged trot in diagonal pairs (prototype)',
      action: 'Attack · one bite with a forward lunge, then Idle (prototype)',
      rest: 'Rest · curled breathing wolf pose (prototype)'
    }),
  }),
  'mon-cave-goblin': Object.freeze({
    still: './assets/studies/cave-goblin.svg',
    idle: './assets/demos/cave-goblin-idle.svg',
    move: './assets/demos/cave-goblin-move.svg',
    action: './assets/demos/cave-goblin-attack.svg',
    rest: './assets/demos/cave-goblin-rest.svg',
    actionDurationMs: 1400,
    idleDurationMs: 3600,
    moveDurationMs: 3600,
    restDurationMs: 6000,
    labels: Object.freeze({
      idle: 'Idle · breathing and blinking (prototype)',
      move: 'Move · alternating goblin leg stride (prototype)',
      action: 'Attack · one curved blade strike, then Idle (prototype)',
      rest: 'Rest · relaxed breathing pose (prototype)'
    }),
  }),
});
