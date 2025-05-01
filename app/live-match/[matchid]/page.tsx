"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MatchTimer from "@/components/MatchTimer";

const FinishMatchButton = ({ matchid }: { matchid: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const finishMatch = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/finish-match", { matchid });
      if (res.data?.message === "Match Finished") {
        console.log('winner-> in page', res.data);
        alert(`Winner: ${res.data.updatedMatch.winner.teamName} 🎉`);
        // router.push("/completed-matches");
      }
    } catch (err) {
      console.error("Error finishing match:", err);
      alert("Failed to finish the match.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={finishMatch}
      disabled={isLoading}
      className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      ) : null}
      Finish Match
    </button>
  );
};

export default function LiveMatch() {
  const [match, setMatch] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams<{ matchid: string }>();

  const fetchMatch = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/findmatch/${params?.matchid}`);
      setMatch(res.data);
    } catch (error) {
      console.error("Failed to fetch match:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params?.matchid) {
      fetchMatch();
    }
  }, [params?.matchid]);

  const addPoint = async (
    teamNumber: 1 | 2,
    playerIndex: number,
    pointtype: "raid" | "defence",
    point: number = 1
  ) => {
    try {
      const res = await axios.post(`/api/point`, {
        matchid: params.matchid,
        teamNumber,
        playerIndex,
        pointtype,
        point,
      });
      if (res) {
        fetchMatch();
      }
    } catch (error) {
      console.error("Failed to add point:", error);
    }
  };

  const undoPoint = async () => {
    try {
      const res = await axios.post(`/api/point/undo`, { matchid: params.matchid });
      console.log(`data in the undoPoint ->${res.data.message}`);
      if (res.data?.message == 'Undo One Step')
        fetchMatch();
    } catch (error) {
      console.error("Failed to undo point:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-purple-800">Loading match data...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Match Not Found</h2>
          <p className="text-gray-700">Unable to load match data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10"></div>
            <div className="relative flex flex-col md:flex-row justify-between items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-purple-900">{match.matchName}</h1>
              <MatchTimer />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((teamNumber) => {
            const team = teamNumber === 1 ? match.team1 : match.team2;
            const totalRaidPoints = team.players.reduce(
              (sum: number, p: any) => sum + (p.raidPoints || 0),
              0
            );
            const totalDefencePoints = team.players.reduce(
              (sum: number, p: any) => sum + (p.defencePoints || 0),
              0
            );
            const totalPoints = totalRaidPoints + totalDefencePoints;

            const teamColor = teamNumber === 1 ? "blue" : "purple";
            const gradientClass = teamNumber === 1 
              ? "from-blue-600 to-indigo-700"
              : "from-purple-600 to-pink-600";

            return (
              <div key={teamNumber} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className={`bg-gradient-to-r ${gradientClass} p-6`}>
                  <h2 className="text-xl font-bold text-white text-center">{team.name}</h2>
                  <div className="flex justify-between items-center mt-3 text-white/90">
                    <div className="space-x-4">
                      <span>Raid: {totalRaidPoints}</span>
                      <span>Defence: {totalDefencePoints}</span>
                    </div>
                    <div className="text-2xl font-bold">Total: {totalPoints}</div>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {team.players.map((player: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{player.name}</h3>
                          <p className="text-sm text-gray-600">
                            Raid: {player.raidPoints || 0} | Defence: {player.defencePoints || 0}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-white bg-${teamColor}-600`}>
                          {(player.raidPoints || 0) + (player.defencePoints || 0)}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {[1, 2, 3, 4, 5, 6, 7].map((point) => (
                            <button
                              key={point}
                              onClick={() => addPoint(teamNumber as 1 | 2, index, "raid", point)}
                              className={`bg-#f6339a -500 hover:bg-${teamColor}-600 text-blue text-sm px-3 py-1.5 rounded-lg shadow-sm transition-all duration-200 transform hover:scale-105 active:scale-95`}
                            >
                              +{point} Raid
                            </button>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {[1, 2].map((point) => (
                            <button
                              key={point}
                              onClick={() => addPoint(teamNumber as 1 | 2, index, "defence", point)}
                              className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg shadow-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
                            >
                              +{point} Def
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <button
            onClick={undoPoint}
            className="flex items-center bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 w-full md:w-auto justify-center"
          >
            Undo Last Action
          </button>
          
          {(match?.status === "ongoing" || match?.status === "completed") && (
            <FinishMatchButton matchid={params.matchid} />
          )}
        </div>
      </div>
    </div>
  );
}