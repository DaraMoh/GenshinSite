import { elementColors } from '../data/characters';

export default function CharacterCard({ character }) {
  const colors = elementColors[character.element];

  return (
    <div className={`group relative bg-zinc-900 ${colors.border} border-2 rounded-xl p-5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}>
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 ${colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

      <div className="relative z-10">
        {character.image && (
          <div className="flex justify-center mb-4">
            <img
              src={character.image}
              alt={character.name}
              className="w-20 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}

        <h3 className="text-xl font-bold text-white text-center mb-4 group-hover:scale-105 transition-transform duration-300">
          {character.name}
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-500 text-sm">Element</span>
            <span className={`${colors.text} font-bold px-3 py-1 rounded-lg ${colors.badge} border ${colors.border}`}>
              {character.element}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-500 text-sm">Weapon</span>
            <span className="text-gray-300 font-semibold">{character.weapon}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-500 text-sm">Rarity</span>
            <span className="text-yellow-400 font-bold text-lg tracking-wider drop-shadow-lg">
              {'★'.repeat(character.rarity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
