import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"; 
import { connectdb } from "@/lib/mongodb";
import User from "@/model/user";
 
export async function GET(req: Request){
    try{
        await connectdb();
        const session = await getServerSession(authOptions);
        if(!session || !session.user){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const user = await User.findOne({email: session.user.email});
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        return NextResponse.json({user}, {status: 200});
        
    }catch(err){
        console.error(err);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}