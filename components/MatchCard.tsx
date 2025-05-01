'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TeamStats {
  raidPoints: number;
  defencePoints: number;
  totalPoints: number;
}

interface Team {
  name: string;
  stats: TeamStats;
}

interface Winner {
  teamName: string;
  points: number;
}

export interface Match {
  _id: string;
  matchName: string;
  team1: Team;
  team2: Team;
  status: 'pending' | 'ongoing' | 'completed';
  winner?: Winner;
}

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { matchName, team1, team2, status, winner } = match;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-gradient-to-r from-indigo-100 to-purple-200 border border-indigo-300 shadow-lg rounded-2xl p-6 mb-6 transition-all duration-300"
    >
      <h2 className="text-2xl font-semibold text-indigo-800 mb-4">{matchName}</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="text-center text-indigo-900">
          <h3 className="text-lg font-semibold">{team1?.name}</h3>
          <p>Raid: {team1?.stats?.raidPoints}</p>
          <p>Defence: {team1?.stats?.defencePoints}</p>
          <p>Total: {team1?.stats?.totalPoints}</p>
        </div>

        <span className="text-pink-600 text-xl font-bold">VS</span>

        <div className="text-center text-indigo-900">
          <h3 className="text-lg font-semibold">{team2?.name}</h3>
          <p>Raid: {team2?.stats?.raidPoints}</p>
          <p>Defence: {team2?.stats?.defencePoints}</p>
          <p>Total: {team2?.stats?.totalPoints}</p>
        </div>
      </div>

      <div className="mb-4 text-gray-700">
        <p>Status: <span className="font-semibold capitalize">{status}</span></p>
        {status === 'completed' && winner && (
          <p className="text-green-700 font-medium mt-1">🏆 Winner: {winner.teamName} ({winner.points} points)</p>
        )}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
      >
        View Match
      </motion.button>
    </motion.div>
  );
};

export default MatchCard;
