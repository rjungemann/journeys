import { Game, ITEM_CHECK_VARIANT_VERIFY } from "./data";

export const defaultGame: Game = {
  ticks: 0,
  showInspector: false,
  sceneName: 'room',
  roomName: 'quarters-a',
  rooms: [
    {
      name: 'quarters-a',
      title: 'quarters',
      exits: [
        { name: 'north', title: 'north', to: 'hallway' }
      ],
      entities: ['alard-tyney', 'terminal-1'],
      tags: ['description:fix-1:success']
    },
    {
      name: 'quarters-b',
      title: 'quarters',
      exits: [
        { name: 'south', title: 'south', to: 'hallway' }
      ],
      entities: ['beth-raschke', 'nikos-rosek'],
      tags: ['description:fix-1:success']
    },
    {
      name: 'hallway',
      title: 'hallway',
      exits: [
        { name: 'north', title: 'north', to: 'quarters-b' },
        { name: 'south', title: 'south', to: 'quarters-a' },
        { name: 'east', title: 'east', to: 'bridge' },
        { name: 'west', title: 'west', to: 'galley' }
      ],
      entities: [],
      tags: []
    },
    {
      name: 'bridge',
      title: 'bridge',
      exits: [
        { name: 'west', title: 'west', to: 'hallway' }
      ],
      entities: [],
      tags: []
    },
    {
      name: 'galley',
      title: 'galley',
      exits: [
        { name: 'east', title: 'east', to: 'hallway' }
      ],
      entities: ['kynon-morgan'],
      tags: []
    }
  ],
  partyRepresentativeName: 'alard-tyney',
  party: ['arlen-hyden', 'alice-hewitt'],
  entityName: null,
  entities: [
    {
      name: 'arlen-hyden',
      title: 'Arlen Hyden',
      tags: [
        'character'
      ],
      characteristics: {
        strength: 6,
        dexterity: 10,
        endurance: 9,
        intelligence: 8,
        education: 5,
        socialStanding: 7,
        psionicStrength: 0
      },
      skills: {
        mechanics: 0,
        gunCombat: 0,
        slugPistol: 1,
        vehicle: 0,
        groundVehicle: 0
      },
      inventory: ['revolver-1']
    },
    {
      name: 'alice-hewitt',
      title: 'Alice Hewitt',
      tags: [
        'character'
      ],
      characteristics: {
        strength: 6,
        dexterity: 10,
        endurance: 9,
        intelligence: 8,
        education: 5,
        socialStanding: 7,
        psionicStrength: 0
      },
      skills: {
        mechanics: 0,
        gunCombat: 0,
        slugPistol: 1,
        vehicle: 0,
        groundVehicle: 0
      },
      inventory: ['revolver-2']
    },
    {
      name: 'beth-raschke',
      title: 'Beth Raschke',
      tags: [
        'character',
        'ally:nikos-rosek',
        'hostile'
      ],
      characteristics: {
        strength: 6,
        dexterity: 10,
        endurance: 9,
        intelligence: 8,
        education: 5,
        socialStanding: 7,
        psionicStrength: 0
      },
      skills: {
        mechanics: 0,
        gunCombat: 0,
        slugPistol: 1,
        vehicle: 0,
        groundVehicle: 0
      },
      inventory: ['revolver-3']
    },
    {
      name: 'nikos-rosek',
      title: 'Nikos Rosek',
      tags: [
        'character',
        'ally:beth-raschke',
        'hostile'
      ],
      characteristics: {
        strength: 6,
        dexterity: 10,
        endurance: 9,
        intelligence: 8,
        education: 5,
        socialStanding: 7,
        psionicStrength: 0
      },
      skills: {
        mechanics: 0,
        gunCombat: 0,
        slugPistol: 1,
        vehicle: 0,
        groundVehicle: 0
      },
      inventory: ['revolver-4']
    },
    {
      name: 'alard-tyney',
      title: 'Alard Tyney',
      tags: [
        'character',
        'dialogue:alard-1:0',
        'skill-check:alard-1',
        'skill-check:alard-2',
        'description:alard-1:success',
        'description:alard-1:failure'
      ],
      characteristics: {
        strength: 6,
        dexterity: 10,
        endurance: 9,
        intelligence: 8,
        education: 5,
        socialStanding: 7,
        psionicStrength: 0
      },
      skills: {
        mechanics: 0,
        gunCombat: 0,
        slugPistol: 1,
        vehicle: 0,
        groundVehicle: 0
      },
      inventory: ['revolver-5']
    },
    {
      name: 'kynon-morgan',
      title: 'Kynon Morgan',
      tags: [
        'character',
        'wandering',
        'choice:birds-1',
        'item-check:has-revolver-6'
      ],
      characteristics: {
        strength: 10,
        dexterity: 6,
        endurance: 5,
        intelligence: 7,
        education: 9,
        socialStanding: 8,
        psionicStrength: 0
      },
      skills: {
        mechanics: 0,
        gunCombat: 0,
        slugPistol: 1,
        vehicle: 0,
        groundVehicle: 0
      },
      inventory: ['knife-1']
    },
    {
      name: 'terminal-1',
      title: 'terminal',
      characteristics: {
        strength: 7,
        dexterity: 7,
        endurance: 7,
        intelligence: 7,
        education: 7,
        socialStanding: 7,
        psionicStrength: 0
      },
      skills: {},
      inventory: [],
      tags: [
        'skill-check:fix-1',
        'description:fix-1:success',
        'description:fix-1:failure'
      ]
    }
  ],
  items: [
    {
      name: 'revolver-1',
      title: 'revolver',
      rounds: 6,
      tags: ['ranged'],
      damage: '2d6',
      isEquipped: true,
    },
    {
      name: 'revolver-2',
      title: 'revolver',
      rounds: 6,
      tags: ['ranged'],
      damage: '2d6',
      isEquipped: true,
    },
    {
      name: 'revolver-3',
      title: 'revolver',
      rounds: 6,
      tags: ['ranged'],
      damage: '2d6',
      isEquipped: true,
    },
    {
      name: 'revolver-4',
      title: 'revolver',
      rounds: 6,
      tags: ['ranged'],
      damage: '2d6',
      isEquipped: true,
    },
    {
      name: 'revolver-5',
      title: 'revolver',
      rounds: 6,
      tags: ['ranged'],
      damage: '2d6',
      isEquipped: true,
    },
    {
      name: 'revolver-6',
      title: 'revolver',
      rounds: 6,
      tags: ['ranged'],
      damage: '2d6',
      isEquipped: true,
    },
    {
      name: 'knife-1',
      title: 'knife',
      rounds: null,
      tags: ['melee'],
      damage: '1d6',
      isEquipped: true
    }
  ],
  dialogues: [
    {
      name: 'alard-1',
      conditionTag: null,
      topic: `what's on my mind`,
      messages: ['One...', 'Two...', 'Three...']
    }
  ],
  log: [],
  skillCheckName: null,
  skillChecks: [
    {
      name: 'fix-1',
      conditionTag: null,
      title: 'Repair the broken terminal?',
      characteristic: 'intelligence',
      skill: 'mechanics',
      tn: 8,
      result: null
    },
    {
      name: 'alard-1',
      conditionTag: 'dialogue:alard-1:done',
      title: 'Do you think you could give me some guidance?',
      characteristic: 'education',
      skill: 'mechanics',
      tn: 8,
      result: null
    },
    {
      name: 'alard-2',
      conditionTag: 'skill-check:alard-1:failure',
      title: 'Do you want to try again?',
      characteristic: 'education',
      skill: 'mechanics',
      tn: 6,
      result: null
    }
  ],
  itemCheckName: null,
  itemChecks: [
    {
      name: 'has-revolver-1',
      conditionTag: null,
      title: 'Do you have the gun?',
      message: 'Looks like you have it.',
      variant: { type: ITEM_CHECK_VARIANT_VERIFY },
      itemName: 'revolver-1'
    }
  ],
  partyCheckName: null,
  partyChecks: [

  ],
  choiceName: null,
  choices: [
    {
      name: 'birds-1',
      title: 'A quick question about birds',
      conditionTag: null,
      message: 'Do you like birds?',
      options: [
        {
          name: 'birds-1:yes',
          message: 'Yes'
        },
        {
          name: 'birds-1:no',
          message: 'No'
        }
      ]
    }
  ],
  descriptions: [
    {
      name: 'birds-1:yes',
      conditionTag: 'birds-1:yes',
      message: 'That is cool that you like birds.'
    },
    {
      name: 'birds-1:no',
      conditionTag: 'birds-1:no',
      message: 'How can you not like birds?'
    },
    {
      name: 'alard-1:success',
      conditionTag: 'skill-check:alard-1:success',
      message: 'Alard seems grateful for the help.'
    },
    {
      name: 'alard-1:failure',
      conditionTag: 'skill-check:alard-1:failure',
      message: 'Alard still seems upset about earlier.'
    },
    {
      name: 'fix-1:success',
      conditionTag: 'skill-check:fix-1:success',
      message: 'Everyone appreciates the terminal being fixed.'
    },
    {
      name: 'fix-1:failure',
      conditionTag: 'skill-check:fix-1:failure',
      message: 'Nobody expected you to be able to fix the terminal.'
    }
  ],
  fieldName: null,
  fields: []
}