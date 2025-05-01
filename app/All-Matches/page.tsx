'use client'; 

import MatchCard, { Match } from '@/components/MatchCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get('/api/All-Matches');
        console.log(`data in api-> ${JSON.stringify(res.data[0])}`);
        setMatches(res.data);
      } catch (error) {
        console.error('Failed to fetch matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <div className="p-6">Loading matches...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">All Matches</h1>

      {matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
          {matches?.map((match) => (
            <MatchCard key={match._id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
