"use client";
import { useState } from "react";
import axios from "axios";
import { Save, Star, Trash2, Trophy, UserPlus, Users } from "lucide-react";
import { useRouter } from "next/navigation";



interface Player {
  name: string;
  raidPoints: number;
  defencePoints: number;
  isCaptain: boolean;
  position: string;
}

export default function CreateMatchPage() {
  const [matchName, setMatchName] = useState("");
  const [team1, setteam1] = useState("");
  const [team2, setteam2] = useState("");
  const [team1Players, setteam1Players] = useState<Player[]>([]);
  const [team2Players, setteam2Players] = useState<Player[]>([]);
  const[matchid,setMatchId]= useState("");

  const handlePlayer = (team: number) => {
    const newPlayer: Player = {
      name: "",
      raidPoints: 0,
      defencePoints: 0,
      position: "",
      isCaptain: false,
    };
    if (team === 1) {
      setteam1Players([...team1Players, newPlayer]);
    } else {
      setteam2Players([...team2Players, newPlayer]);
    }
  };

  const removePlayer = (team: number, index: number) => {
    if (team === 1) {
      const updatedPlayers = [...team1Players];
      updatedPlayers.splice(index, 1);
      setteam1Players(updatedPlayers);
    } else {
      const updatedPlayers = [...team2Players];
      updatedPlayers.splice(index, 1);
      setteam2Players(updatedPlayers);
    }
  };

  const handlePlayerChange = (
    team: number,
    index: number,
    key: keyof Player,
    value: any
  ) => {
    const update = team === 1 ? [...team1Players] : [...team2Players];
    update[index] = { ...update[index], [key]: value };

    // If setting a new captain, remove captain status from other players
    if (key === "isCaptain" && value === true) {
      update.forEach((player, i) => {
        if (i !== index) {
          player.isCaptain = false;
        }
      });
    }

    if (team === 1) setteam1Players(update);
    else setteam2Players(update);
  };
  
  const router = useRouter();
  const handleStartMatch = async () => {
   
     const res = await axios.post("/api/matchstart",{matchid});
     //console.log(`done in findmatch in create-match ${res.data.message}`);
    router.push(`live-match/${matchid}`); // Going to another tsx page 
  };

  const handleSubmit = async () => {
    const matchData = {
      matchName,
      team1: {
        name: team1,
        players: team1Players,
      },
      team2: {
        name: team2,
        players: team2Players,
      },
      
    };
    try {
      const res = await axios.post("/api/match", matchData);
      //console.log("id response", res.data.data._id);
      setMatchId(res.data.data._id);
      alert("Match Saved Successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to Save Match");
    }
  };

 // console.log({matchid})

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg ">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Create Match</h1>
        </div>

        <input
          type="text"
          placeholder="Match Name"
          className="w-full mb-8 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          value={matchName}
          onChange={(e) => setMatchName(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Team 1 */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Team 1</h2>
            </div>
            <input
              type="text"
              placeholder="Team 1 Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              value={team1}
              onChange={(e) => setteam1(e.target.value)}
            />
            <div className="space-y-3">
              {team1Players.map((player, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="px-3 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="Player Name"
                      value={player.name}
                      onChange={(e) =>
                        handlePlayerChange(1, index, "name", e.target.value)
                      }
                    />
                    <input
                      className="px-3 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="Position"
                      value={player.position}
                      onChange={(e) =>
                        handlePlayerChange(1, index, "position", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={player.isCaptain}
                        onChange={(e) =>
                          handlePlayerChange(1, index, "isCaptain", e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        Team Captain
                      </span>
                    </label>
                    <button
                      onClick={() => removePlayer(1, index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remove Player"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handlePlayer(1)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Player
              </button>
            </div>
          </div>

          {/* Team 2 */}
          <div className="bg-purple-50 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">Team 2</h2>
            </div>
            <input
              type="text"
              placeholder="Team 2 Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
              value={team2}
              onChange={(e) => setteam2(e.target.value)}
            />
            <div className="space-y-3">
              {team2Players.map((player, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="px-3 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                      placeholder="Player Name"
                      value={player.name}
                      onChange={(e) =>
                        handlePlayerChange(2, index, "name", e.target.value)
                      }
                    />
                    <input
                      className="px-3 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                      placeholder="Position"
                      value={player.position}
                      onChange={(e) =>
                        handlePlayerChange(2, index, "position", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={player.isCaptain}
                        onChange={(e) =>
                          handlePlayerChange(2, index, "isCaptain", e.target.checked)
                        }
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        Team Captain
                      </span>
                    </label>
                    <button
                      onClick={() => removePlayer(2, index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remove Pl8ayer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handlePlayer(2)}
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Player
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 font-semibold"
        >
          <Save className="w-5 h-5" />
          Save Match
        </button>
        { matchid && (
          <div className="flex justify-center">
  <button
    onClick={async () => {
      handleStartMatch();
      alert("Match Started!");
    }}
    className="bg-green-600 hover:bg-green-700 transition-colors text-white px-4 py-2 mt-4 rounded"
  >
    Start Match
  </button>
  </div>
)}
      </div>
      

    </div>
    
  );
}