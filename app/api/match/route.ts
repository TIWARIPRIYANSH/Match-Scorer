import { connectdb } from "@/lib/mongodb";
import Match from "@/model/match";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req:NextRequest) {
    await connectdb();
    const body= await req.json();
    const match = await Match.create(body);
   // console.log(match);
    
    if(match){
        return NextResponse.json({
            message:"Match saved",
            data:match
    })
    }
    else{
        return NextResponse.json({
            message: "not Saved"
        })
    }
    
    
}