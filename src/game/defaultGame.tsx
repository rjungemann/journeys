import { DESCRIPTION_ATTACHMENT, Game, SKILL_CHECK_ATTACHMENT } from "./data";

export const defaultGame: Game = {
  showInspector: false,
  sceneName: 'room',
  roomName: 'quarters',
  rooms: [
    {
      name: 'quarters',
      title: 'quarters',
      exits: [
        { name: 'north', title: 'north', to: 'hallway' }
      ],
      entities: ['alard-tyney', 'terminal-1'],
      tidbits: ['alard-1:success', 'alard-1:failure']
    },
    {
      name: 'hallway',
      title: 'hallway',
      exits: [
        { name: 'south', title: 'south', to: 'quarters' },
        { name: 'east', title: 'east', to: 'bridge' },
        { name: 'west', title: 'west', to: 'galley' }
      ],
      entities: [],
      tidbits: []
    },
    {
      name: 'bridge',
      title: 'bridge',
      exits: [
        { name: 'west', title: 'west', to: 'hallway' }
      ],
      entities: [],
      tidbits: []
    },
    {
      name: 'galley',
      title: 'galley',
      exits: [
        { name: 'east', title: 'east', to: 'hallway' }
      ],
      entities: ['kynon-morgan'],
      tidbits: []
    }
  ],
  party: ['alard-tyney'],
  entityName: null,
  entities: [
    {
      name: 'alard-tyney',
      title: 'Alard Tyney',
      tags: [
        'character',
        'dialogue:alard-1:0',
        'dialogue:alard-1:tag:skill-check:alard-1'
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
      inventory: ['revolver-1'],
      tidbits: ['fix-1:success', 'fix-1:failure']
    },
    {
      name: 'kynon-morgan',
      title: 'Kynon Morgan',
      tags: [
        'character'
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
      inventory: ['knife-1'],
      tidbits: []
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
      tags: ['skill-check:fix-1', 'skill-check:fix-1:success:tag:test-1', 'skill-check:fix-1:success:tag:test-2'],
      tidbits: []
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
      topic: `what's on my mind`,
      messages: ['One...', 'Two...', 'Three...']
    }
  ],
  log: [],
  skillCheckName: null,
  skillChecks: [
    {
      name: 'fix-1',
      title: 'Repair the broken terminal?',
      characteristic: 'intelligence',
      skill: 'mechanics',
      tn: 8,
      result: null
    },
    {
      name: 'alard-1',
      title: 'Do you think you could give me some guidance?',
      characteristic: 'education',
      skill: 'mechanics',
      tn: 8,
      result: null
    },
    {
      name: 'alard-2',
      title: 'Do you want to try again?',
      characteristic: 'education',
      skill: 'mechanics',
      tn: 6,
      result: null
    }
  ],
  tidbits: [
    {
      name: 'alard-1:success',
      conditionTag: 'skill-check:alard-1:success',
      attachment: {
        type: DESCRIPTION_ATTACHMENT,
        message: 'Alard seems grateful for the help.'
      }
    },
    {
      name: 'alard-1:failure',
      conditionTag: 'skill-check:alard-1:failure',
      attachment: {
        type: DESCRIPTION_ATTACHMENT,
        message: 'Alard still seems upset about earlier.'
      }
    },
    {
      name: 'fix-1:success',
      conditionTag: 'skill-check:fix-1:success',
      attachment: {
        type: DESCRIPTION_ATTACHMENT,
        message: 'Everyone appreciates the terminal being fixed.'
      }
    },
    {
      name: 'fix-1:failure',
      conditionTag: 'skill-check:fix-1:failure',
      attachment: {
        type: DESCRIPTION_ATTACHMENT,
        message: 'Nobody expected you to be able to fix the terminal.'
      }
    }
  ]
}