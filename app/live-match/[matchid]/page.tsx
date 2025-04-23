"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MatchTimer from "@/components/MatchTimer";

const FinishMatchButton = ({matchid}) => {
  const finishMatch = async () => {
    try {
      const res = await axios.post("/api/finish-match", {matchid});
      if (res.data?.message === "Match Finished") {
        console.log('winner-> in page',res.data);
        alert(`Winner: ${res.data.updatedMatch.winner.teamName} 🎉`);
       // router.push("/completed-matches");
      }
    } catch (err) {
      console.error("Error finishing match:", err);
      alert("Failed to finish the match.");
    }
  };

  return (
    <button
      onClick={finishMatch}
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
    >
      Finish Match
    </button>
  );
};

export default function liveMatch() {
  const [match, setMatch] = useState<any>(null);

  const params = useParams<{ matchid: string }>();

  const fetchMatch = async () => {
    const res = await axios.get(`/api/findmatch/${params?.matchid}`);
    setMatch(res.data);
  };

  useEffect(() => {
    fetchMatch();
  }, []);

  const addPoint = async (
    teamNumber: 1 | 2,
    playerIndex: number,
    pointtype: "raid" | "defence",
    point: number = 1
  ) => {
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
  };
  const undoPoint = async()=>{
    const res=await axios.post(`/api/point/undo`,{matchid:params.matchid})
    console.log(`data in the undoPoint ->${res.data.message}`)
    if(res.data?.message=='Undo One Step')
      fetchMatch();
  }
  

  if (!match) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <MatchTimer />
      <h1 className="text-3xl font-bold text-center mb-6">{match.matchName}</h1>

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

          return (
            <div
              key={teamNumber}
              className="bg-white rounded-xl p-6 shadow-md border"
            >
              <h2 className="text-xl font-semibold text-center mb-2">
                {team.name}
              </h2>
              <p className="text-center text-gray-600 font-medium mb-4">
                Raid: {totalRaidPoints} | Defence: {totalDefencePoints} | Total:{" "}
                {totalPoints}
              </p>

              <div className="space-y-4">
                {team.players.map((player: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-gray-500">
                        Raid: {player.raidPoints} | Defense:{" "}
                        {player.defencePoints}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex flex-wrap gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((point) => (
                          <button
                            key={point}
                            onClick={() =>
                              addPoint(teamNumber as 1 | 2, index, "raid", point)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 rounded-md shadow-sm"
                          >
                            +{point} Raid
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-1 mt-1">
                        {[1, 2].map((point) => (
                          <button
                            key={point}
                            onClick={() =>
                              addPoint(
                                teamNumber as 1 | 2,
                                index,
                                "defence",
                                point
                              )
                            }
                            className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-md shadow-sm"
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
        <div className="flex justify-center mb-6">
  <button
    onClick={undoPoint}
    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
  >
    Undo Last Action
  </button>
  {(match?.status === "ongoing"||match?.status === "finished") && (
  <div className="flex justify-center mt-4">
    <FinishMatchButton matchid={params.matchid} />
  </div>
)}

</div>
      </div>
    </div>
  );
}
