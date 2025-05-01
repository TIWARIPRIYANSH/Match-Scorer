import { connectdb } from "@/lib/mongodb";
import Match from "@/model/match";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    await connectdb();
    const body = await req.json(); // ✅ Parse the body here

    const { matchid } = body;
    console.log({matchid})
 
    const match=await Match.findById(matchid);
     
    const winnerteam=match.team1.stats.totalPoints>match.team2.stats.totalPoints ? match.team1 : match.team2;
    const winPoints=Math.abs(match.team1.stats.totalPoints-match.team2.stats.totalPoints);
    console.log("winnerteam->",winnerteam.name);
    
     const updatedMatch=await Match.findByIdAndUpdate(
      matchid,
      {
        status: "completed",
        winner: {
          teamName: winnerteam.name,
          points: winnerteam.stats.totalPoints,
        },
      },
      { new: true }
    );
    
    if (!match) {
        return NextResponse.json(
          { message: "No match available" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: "Match Finished",updatedMatch },
        { status: 200 }
      );
}
