import { connectdb } from "@/lib/mongodb";
import Match from "@/model/match";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
     const session= await getServerSession(authOptions);
   
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectdb(); 
    const matches = await Match.find({createdBy:session?.user?.email}).sort({ createdAt: -1 }); 
  

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
