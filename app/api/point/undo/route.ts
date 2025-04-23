
import { connectdb } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Match from "@/model/match";

export async function POST(req:NextRequest){
  await connectdb();
  

   const { matchid } = await req.json();
  // console.log(`match id in und ->${matchid}`)
   const match=await Match.findById(matchid);
   if (!match) {
    return NextResponse.json({ message: "Match not found" }, { status: 404 });
  }

  const lastAction = match.eventLog.pop(); 
  console.log(`ladtAction -> ${lastAction}`);
  if (!lastAction) {
    return NextResponse.json({ message: "No actions to undo" }, { status: 400 });
  }
  const { team, playerIndex, pointtype, point } = lastAction;
  const currentTeam = team === 1 ? match.team1 : match.team2;
  const player = currentTeam.players[playerIndex];
  if(pointtype=='raid'){
    player.raidPoints=Math.max(0,player.raidPoints-point);
    currentTeam.stats.raidPoints=Math.max(0,currentTeam.stats.raidPoints-point);
  }
  if(pointtype=='defence'){
    player.defencePoints=Math.max(0,player.defencePoints-point);
    currentTeam.stats.defencePoints=Math.max(0,currentTeam.stats.defencePoints-point);
  }
  currentTeam.stats.totalPoints=Math.max(0,currentTeam.stats.totalPoints-point);
  await match.save();
  return NextResponse.json({message:"Undo One Step"},{status:200});
}