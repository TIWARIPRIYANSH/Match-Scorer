import { connectdb } from "@/lib/mongodb";
import Match from "@/model/match";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { matchid } = body;
  
  try {
    await connectdb();
    const match = await Match.findByIdAndUpdate(
      matchid,
      { status: "ongoing" },
      { new: true }
    );
    console.log(match);

    if (!match) {
      return NextResponse.json(
        { message: "No match available" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Match Started", match },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
