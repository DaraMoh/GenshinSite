import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const LOCAL_FALLBACK = {
  seasonName: 'Season 5',
  elements: ['Pyro', 'Electro', 'Cryo'],
  openingCharacters: ['mavuika', 'raiden-shogun', 'kamisato-ayaka', 'hu-tao', 'fischl', 'klee'],
  specialGuests: ['clorinde', 'yoimiya', 'ganyu', 'keqing'],
};

export function useImaginariumData() {
  const [data, setData] = useState(LOCAL_FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchData() {
      try {
        const { data: row, error } = await supabase
          .from('imaginarium_theatre')
          .select('season_name, elements, opening_characters, special_guests')
          .eq('id', 1)
          .single();

        if (cancelled) return;
        if (error) throw error;

        setData({
          seasonName: row.season_name ?? LOCAL_FALLBACK.seasonName,
          elements: row.elements ?? LOCAL_FALLBACK.elements,
          openingCharacters: row.opening_characters ?? LOCAL_FALLBACK.openingCharacters,
          specialGuests: row.special_guests ?? LOCAL_FALLBACK.specialGuests,
        });
      } catch (err) {
        if (cancelled) return;
        console.error('Failed to fetch Imaginarium Theatre data:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { ...data, loading };
}
