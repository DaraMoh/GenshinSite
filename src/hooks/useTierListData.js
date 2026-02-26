import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  roleTierLists as localRoleTierLists,
  characterTags as localCharacterTags,
  tagDescriptions as localTagDescriptions,
  partnerConnections as localPartnerConnections,
} from '../data/tierList';

const LOCAL_FALLBACK = {
  roleTierLists: localRoleTierLists,
  characterTags: localCharacterTags,
  tagDescriptions: localTagDescriptions,
  partnerConnections: localPartnerConnections,
};

export function useTierListData() {
  const [data, setData] = useState(LOCAL_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchData() {
      try {
        const { data: row, error: fetchError } = await supabase
          .from('tier_list_config')
          .select('role_tier_lists, character_tags, tag_descriptions, partner_connections')
          .eq('id', 1)
          .single();

        if (cancelled) return;

        if (fetchError) throw fetchError;

        setData({
          roleTierLists: row.role_tier_lists ?? LOCAL_FALLBACK.roleTierLists,
          characterTags: row.character_tags ?? LOCAL_FALLBACK.characterTags,
          tagDescriptions: row.tag_descriptions ?? LOCAL_FALLBACK.tagDescriptions,
          partnerConnections: row.partner_connections ?? LOCAL_FALLBACK.partnerConnections,
        });
      } catch (err) {
        if (cancelled) return;
        console.error('Failed to fetch tier list data from Supabase:', err);
        setError(err);
        // Keep local fallback data (already set as initial state)
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { ...data, loading, error };
}
