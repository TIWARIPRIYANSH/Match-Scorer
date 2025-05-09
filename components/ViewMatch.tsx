'use client';
import { notFound, useRouter } from 'next/navigation';
import React from 'react';

interface MatchPageProps {
  match: any;
}

const ViewMatch = ({ match }: MatchPageProps) => {
  const router = useRouter();

  if (!match) return notFound();

  const isCompleted = match?.status === 'completed';
  const isOngoing = match.status === 'ongoing';
  const isPending = match.status === 'pending';

  const openMatch = () => {
    router.push(`/live-match/${match._id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow rounded-xl mt-6">
      <h1 className="text-3xl font-bold mb-4">{match.matchName}</h1>

      <p className="mb-4 font-medium">
        Status: <span className="capitalize text-blue-600">{match.status}</span>
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[match.team1, match.team2].map((team, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{team.name}</h2>
            <p>Raid Points: {team.stats?.raidPoints}</p>
            <p>Defence Points: {team.stats?.defencePoints}</p>
            <p>Total Points: {team.stats?.totalPoints}</p>
          </div>
        ))}
      </div>

      {isPending && (
        <div className="mb-6">
          <p className="text-red-500 mb-4">This match is pending.</p>
          <button
            onClick={openMatch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Click To Start
          </button>
        </div>
      )}

      {isCompleted && match.winner && (
        <div className="mb-6">
          <p className="text-lg font-semibold">
            🏆 Winner: {match.winner.teamName} ({match.winner.points} points)
          </p>
        </div>
      )}

      {(isCompleted || isOngoing) && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Event Log</h3>
          {match.eventLog?.length ? (
            <ul className="space-y-2">
              {match.eventLog.map((log: any, idx: number) => (
                <li
                  key={idx}
                  className="p-3 bg-white border rounded-md shadow-sm text-sm text-gray-800"
                >
                  <strong>{log.playerName}</strong> ({log.pointtype}) scored{" "}
                  {log.point} point(s) for Team {log.team} at{" "}
                  {new Date(log.timestamp).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No events logged yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewMatch;
