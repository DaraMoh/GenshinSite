export const roleTierLists = {
  'Main DPS': {
    'S+': ['mavuika', 'skirk', 'nefer', 'flins'],
    S: ['zibai', 'varesa', 'mualani', 'neuvillette', 'arlecchino', 'durin'],
    'A+': ['kamisato-ayaka', 'kinich', 'venti', 'clorinde', 'navia', 'klee', 'varka', 'chasca', 'lyney', 'gaming'],
    A: ['hu-tao', 'alhaitham', 'raiden-shogun', 'sethos', 'cyno', 'ifa'],
    B: ['xiao', 'wriothesley', 'ganyu', 'razor', 'sangonomiya-kokomi', 'arataki-itto', 'diluc', 'yumemizuki-mizuki'],
    C: ['tighnari', 'traveler-pyro', 'ningguang', 'yae-miko', 'noelle', 'shikanoin-heizou'],
    D: ['eula', 'keqing', 'hydro-traveler'],
  },
  'Sub DPS': {
    'S+': ['ineffa', 'escoffier', 'columbina', 'durin', 'furina'],
    S: ['yelan', 'fischl', 'raiden-shogun', 'kuki-shinobu', 'mavuika'],
    'A+': ['xingqiu', 'albedo', 'emilie', 'ororon', 'chiori', 'aino'],
    A: ['nahida', 'xiangling', 'venti'],
    B: ['kaeya', 'traveler-pyro', 'kachina'],
    C: ['lisa',],
    D: [],
  },
  'Support': {
    'S+': [],
    S: [],
    'A+': [],
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
// Tags available: 'Expert', 'F2P Friendly', 'Flexible', 'Niche'
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
};

export const tierColors = {
  'S': { border: 'border-red-500/60',    text: 'text-red-400' },
  'A': { border: 'border-orange-500/60', text: 'text-orange-400' },
  'B': { border: 'border-yellow-500/60', text: 'text-yellow-400' },
  'C': { border: 'border-green-500/60',  text: 'text-green-400' },
  'D': { border: 'border-blue-500/60',   text: 'text-blue-400' },
};
