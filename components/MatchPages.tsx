'use client';

import MatchCard, { Match } from '@/components/MatchCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface MatchesPageProps {
  type?: 'all' | 'completed' | 'pending';
}

export default function MatchesPage({ type = 'all' }: MatchesPageProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
       
        setLoading(true);

      
        const res = await axios.get('/api/All-Matches');
        console.log("data in matchpages->",res.data);
        

        let allMatches: Match[] = res.data;

      
        if (type === 'completed') {
          allMatches = allMatches.filter((m) => m.status === 'completed');
        } else if (type === 'pending') {
          allMatches = allMatches.filter((m) => m.status === 'pending');
        }

        // Avoid setting state if matches haven't changed // this page is causing werror infinite loop , on clikcing view matches 
        if (JSON.stringify(allMatches) !== JSON.stringify(matches)) {
          setMatches(allMatches);
        }
      } catch (error) {
        console.error('Failed to fetch matches:', error);
      } finally {
        // Stop loading
        setLoading(false);
      }
    };

    // Fetch matches only if matches array is empty or type is changed
    if (matches.length === 0) {
      fetchMatches();
    }
  }, [type]); // Dependency on type and matches.length to prevent infinite loops

  if (loading) return <div className="p-6">Loading matches...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 capitalize">{type} Matches</h1>

      {matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map((match) => (
            <MatchCard key={match._id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}

