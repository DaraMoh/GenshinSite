import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const LOCAL_FALLBACK = {
  iterationName: 'Current Iteration',
  bosses: [
    { name: 'Boss 1', description: 'Placeholder description for the first boss.' },
    { name: 'Boss 2', description: 'Placeholder description for the second boss.' },
    { name: 'Boss 3', description: 'Placeholder description for the third boss.' },
  ],
  recommendedTeams: [],
  strategies: [],
};

export function useStygianData() {
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
          .from('stygian_onslaught')
          .select('iteration_name, bosses, recommended_teams, strategies')
          .eq('id', 1)
          .single();

        if (cancelled) return;
        if (error) throw error;

        setData({
          iterationName: row.iteration_name ?? LOCAL_FALLBACK.iterationName,
          bosses: row.bosses ?? LOCAL_FALLBACK.bosses,
          recommendedTeams: row.recommended_teams ?? LOCAL_FALLBACK.recommendedTeams,
          strategies: row.strategies ?? LOCAL_FALLBACK.strategies,
        });
      } catch (err) {
        if (cancelled) return;
        console.error('Failed to fetch Stygian Onslaught data:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { ...data, loading };
}
