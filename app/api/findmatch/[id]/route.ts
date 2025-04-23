import { connectdb } from "@/lib/mongodb";
import Match from "@/model/match";
import { NextRequest, NextResponse } from "next/server";


export async function GET( req: NextRequest,
    context: { params: { id: string } }){
    const id = context.params.id;
   
    await connectdb();
    const match=await Match.findById(id);
    if(!match)
        return NextResponse.json({
        Message:"Match Not Found"
    })
    else
    return NextResponse.json(match);

}