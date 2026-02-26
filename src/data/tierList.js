export const roleTierLists = {
  'Main DPS': {
    'S+': ['mavuika', 'skirk', 'nefer', 'flins'],
    S: ['zibai', 'varesa', 'mualani', 'neuvillette', 'arlecchino', 'durin'],
    'A+': ['venti', 'clorinde', 'navia', 'varka', 'lyney',],
    A: ['kamisato-ayaka', 'chasca', 'kinich', 'hu-tao', 'raiden-shogun', 'klee', 'cyno', 'gaming', 'ifa'],
    B: ['xiao', 'alhaitham', 'wriothesley', 'sethos', 'ganyu', 'razor', 'sangonomiya-kokomi', 'arataki-itto', 'diluc',],
    C: ['tighnari', 'traveler-pyro', 'ningguang', 'yae-miko', 'noelle', 'shikanoin-heizou', 'yumemizuki-mizuki'],
    D: ['eula', 'keqing', 'hydro-traveler'],
  },
  'Sub DPS': {
    'S+': ['ineffa', 'escoffier', 'columbina', 'durin'],
    S: ['yelan', 'fischl', 'raiden-shogun', 'kuki-shinobu', 'mavuika'],
    'A+': ['xingqiu', 'albedo', 'emilie', 'ororon', 'chiori', 'aino'],
    A: ['xiangling', 'venti'],
    B: ['kaeya', 'traveler-pyro', 'kachina'],
    C: ['lisa',],
    D: [],
  },
  'Support': {
    'S+': ['furina', 'bennett', 'iansan', 'chevreuse', 'lauma'],
    S: ['illuga,'],
    'A+': ['nahida', 'xianyun', 'shenhe', 'faruzan'],
    A: [],
    B: [],
    C: [],
    D: [],
  },
  'Sustain': {
    'S+': [],
    S: ['furina', 'zhongli', 'bennett'],
    'A+': [],
    A: ['jean', 'kokomi', 'baizhu', 'kirara', 'charlotte'],
    B: ['diona', 'layla', 'noelle', 'barbara', 'sayu'],
    C: ['qiqi', 'yaoyao', 'lynette'],
    D: [],
  },
};

// Tags: map character ID to an array of tag names
// Available tags and their colors are defined in TAG_STYLES in TierList.jsx
// Tags available: 'Expert', 'F2P Friendly', 'Flexible', 'Niche', 'Partner'
export const characterTags = {
  'mavuika': ['Expert', 'Flexible'],
  'kinich': ['Expert'],
  'lyney': ['Expert'],
  'gaming': ['Expert'],
  'neuvillette': ['Flexible'],
  'arlecchino': ['F2P Friendly', 'Flexible'],
  'alhaitham': ['F2P Friendly'],
  'hu-tao': ['Flexible'],
  'raiden-shogun': ['Flexible'],
  'klee': ['Expert'],
  'lyney': ['Niche'],
  'sethos': ['Expert'],
};

// Tag descriptions — use {{character-id}} to inline a character icon
// Example: 'Works best with {{furina}} and {{bennett}}'
export const tagDescriptions = {
  Expert: 'Requires advanced mechanics or precise gameplay to reach full potential.',
  'F2P Friendly': 'Performs well with free-to-play weapons and easily accessible teams.',
  Flexible: 'Can fit into many different team compositions effectively.',
  Niche: 'Strong in specific scenarios but limited in general use.',
  Partner: 'Relies on or greatly benefits from pairing with a specific character.',
};

// Partner connections — each entry is [characterId, partnerId, description]
// The description supports {{character-id}} for inline character icons
// Add new partner pairs here as needed
export const partnerConnections = [
  ['nefer', 'lauma', '{{nefer}} and {{lauma}}'],
  ['flins', 'ineffa', '{{flins}} and {{ineffa}}'],
  ['skirk', 'escoffier', '{{skirk}} and {{escoffier}}'],
];

export const tierColors = {
  'S': { border: 'border-red-500/60',    text: 'text-red-400' },
  'A': { border: 'border-orange-500/60', text: 'text-orange-400' },
  'B': { border: 'border-yellow-500/60', text: 'text-yellow-400' },
  'C': { border: 'border-green-500/60',  text: 'text-green-400' },
  'D': { border: 'border-blue-500/60',   text: 'text-blue-400' },
};
