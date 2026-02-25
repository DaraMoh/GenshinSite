import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function DraggableCharacter({ character, isDragging = false }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } =
    useSortable({ id: character.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 14px 8px 8px',
        background: isDragging ? 'rgba(201,162,39,0.08)' : '#1f1a14',
        border: isDragging ? '1px solid #e8d068' : '1px solid #2e2416',
        cursor: isDragging ? 'grabbing' : 'grab',
        boxShadow: isDragging ? '0 0 20px rgba(201,162,39,0.3)' : 'none',
      }}
      {...attributes}
      {...listeners}
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.currentTarget.style.borderColor = '#b89830';
          e.currentTarget.style.background = 'rgba(201,162,39,0.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.currentTarget.style.borderColor = '#2e2416';
          e.currentTarget.style.background = '#1f1a14';
        }
      }}
    >
      <div
        className={`el-bg-${character.element.toLowerCase()}`}
        style={{ width: '40px', height: '40px', borderRadius: '2px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {character.image ? (
          <img src={character.image} alt={character.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '2px' }} loading="lazy" />
        ) : (
          <div style={{ width: '36px', height: '36px', background: '#2e2416', borderRadius: '2px' }} />
        )}
      </div>
      <div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px', color: '#f0e6c8' }}>
          {character.name}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 400, color: '#c4b48a' }}>
          {character.element} &middot; {character.weapon}
        </div>
      </div>
    </div>
  );
}
