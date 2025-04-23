import { connectdb } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Match from "@/model/match";

export async function POST(req: NextRequest) {
  await connectdb();
  
  const { matchid, teamNumber, playerIndex, pointtype, point } = await req.json();

  const match = await Match.findById(matchid);
 // console.log('matchid',matchid);
 // console.log(`match -> ${match}`);
  if (!match) {
    return NextResponse.json({ message: "Match not found" }, { status: 404 });
  }
  
  
  const team = teamNumber == 1 ? match.team1 : match.team2;
  // console.log(`team->${team}`)
  // console.log(`${pointtype} and ${point}`)
  // console.log(`playerIndex->${playerIndex}`);
   
  // console.log(`player->${player}`);
  const player = team.players[playerIndex];

  if (!player) {
    return NextResponse.json({ message: "Player not found" }, { status: 404 });
  }
  console.log(` RaidPoints -> ${team.stats.raidPoints} and ${team.stats.totalPoints}`);
  if (pointtype === "raid") {
    player.raidPoints += point;
    team.stats.raidPoints = (team.stats.raidPoints || 0) + point;
  } else if (pointtype === "defence") {
    player.defencePoints += point;
    team.stats.defencePoints = (team.stats.defencePoints || 0) + point;
  } else {
    return NextResponse.json({ message: "Invalid point type" }, { status: 400 });
  }
  team.stats.totalPoints = (team.stats.raidPoints || 0) + (team.stats.defencePoints  || 0);
  match.eventLog.push({
    team: teamNumber,
    playerIndex,
    playerName: player.name,
    pointtype,
    point,
    timestamp: new Date(),
  });
  

  await match.save();
  return NextResponse.json({ message: "Point added successfully" });
}
