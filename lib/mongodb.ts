import mongoose from "mongoose";
import { buffer } from "stream/consumers";
const mongodb=process.env.MONGODB_URL!;
if(!mongodb){
    throw new Error("connectionURL not present");
}
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

const cached = global.mongoose;
export async function connectdb() {
     if(cached.conn){
    return cached.conn;
     }
    if(!cached.promise)
      {
     const opts={
    bufferCommands:true,
    maxPoolSize:10
    }
    cached.promise= mongoose
    .connect(mongodb,opts)
    .then(()=> mongoose.connection);
    console.log("🟢 Connected to MongoDB");
 }  
 try {
    cached.conn= await cached.promise
}
  catch(error){
    cached.promise=null;
    throw error;
  }
  return cached.conn;;
}

