import { connectdb } from "@/lib/mongodb";
import Match from "@/model/match";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function POST (req:NextRequest) {
    await connectdb();
    const session=await getServerSession(authOptions);
     if(!session)
        return NextResponse.json({
            message:"Unauthorized"});
    const email=session?.user?.email;
    const body= await req.json();
    const matchdata={
        ...body,
        createdBy:email,
    }
    const match = await Match.create(matchdata);
    

    
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