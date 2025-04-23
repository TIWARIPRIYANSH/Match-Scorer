import { connectdb } from "@/lib/mongodb";
import Match from "@/model/match";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(`body-> ${body}`)
  const { matchid } = body;
  console.log(`matchbody-> ${matchid}`)
  
  try {
    await connectdb();
    //@ts-ignore
    const match = await Match.findByIdAndUpdate(
      matchid,
      { status: "ongoing" },
      { new: true }
    );
   

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
