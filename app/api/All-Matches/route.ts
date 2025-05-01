import { connectdb } from "@/lib/mongodb";
import Match from "@/model/match";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectdb(); 
    const matches = await Match.find({}); 
  

    if (!matches || matches.length === 0) {
      return NextResponse.json({ message: "No matches found" }, { status: 404 });
    }

    return NextResponse.json(matches); 
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch matches", error: error.message },
      { status: 500 }
    );
  }
}
