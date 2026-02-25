import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { characters } from '../data/characters';
import TierRow from '../components/TierRow';
import CharacterPool from '../components/CharacterPool';
import DraggableCharacter from '../components/DraggableCharacter';

export default function TierListMaker() {
  const [tierList, setTierList] = useState({
    'S': [],
    'A': [],
    'B': [],
    'C': [],
    'D': [],
    'unranked': characters.map((char) => char.id),
  });

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeContainer = findContainer(active.id);
    const overContainer = over.data.current?.sortable?.containerId || over.id;

    if (activeContainer && overContainer) {
      if (activeContainer === overContainer) {
        const items = tierList[activeContainer];
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        if (oldIndex !== newIndex) {
          setTierList((prev) => ({
            ...prev,
            [activeContainer]: arrayMove(items, oldIndex, newIndex),
          }));
        }
      } else {
        setTierList((prev) => {
          const activeItems = [...prev[activeContainer]];
          const overItems = [...prev[overContainer]];

          const activeIndex = activeItems.indexOf(active.id);
          const [movedItem] = activeItems.splice(activeIndex, 1);

          const overIndex = over.data.current?.sortable?.index ?? overItems.length;
          overItems.splice(overIndex, 0, movedItem);

          return {
            ...prev,
            [activeContainer]: activeItems,
            [overContainer]: overItems,
          };
        });
      }
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const findContainer = (id) => {
    if (id in tierList) return id;
    return Object.keys(tierList).find((key) => tierList[key].includes(id));
  };

  const resetTierList = () => {
    setTierList({
      'S': [],
      'A': [],
      'B': [],
      'C': [],
      'D': [],
      'unranked': characters.map((char) => char.id),
    });
  };

  const activeCharacter = activeId
    ? characters.find((char) => char.id === activeId)
    : null;

  return (
    <div className="relative z-[1] min-h-screen">
      <section className="relative py-16 px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-4 mb-3">
              <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, #b89830)' }} />
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '6px',
                  textTransform: 'uppercase',
                  color: '#e8d068',
                }}
              >
                Tier Maker
              </div>
              <div style={{ height: '1px', width: '80px', background: 'linear-gradient(270deg, transparent, #b89830)' }} />
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '14px', color: '#c4b48a', letterSpacing: '2px' }}>
              Create your custom tier list with drag and drop
            </div>
          </div>
          <button
            onClick={resetTierList}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              padding: '10px 24px',
              background: 'transparent',
              border: '1px solid #a04040',
              color: '#e06060',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(224,96,96,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Reset All
          </button>
        </div>

        {/* Tip */}
        <div
          className="mb-8"
          style={{
            background: '#181410',
            border: '1px solid #2e2416',
            padding: '16px 24px',
          }}
        >
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '14px', color: '#c4b48a' }}>
            Drag characters from the pool below into the tier rows. You can reorder within tiers too.
          </span>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="max-w-[1000px] mx-auto mb-10">
            {['S', 'A', 'B', 'C', 'D'].map((tier) => (
              <TierRow key={tier} tier={tier} characterIds={tierList[tier]} />
            ))}
          </div>

          <div className="max-w-[1000px] mx-auto">
            <CharacterPool characterIds={tierList.unranked} />
          </div>

          <DragOverlay>
            {activeCharacter ? (
              <DraggableCharacter character={activeCharacter} isDragging />
            ) : null}
          </DragOverlay>
        </DndContext>
      </section>
    </div>
  );
}
