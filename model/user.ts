
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
     name:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    bio:{
        type:String,
        default: "",
    },
    image:{
        type: String,
        default: "",
    },
    notification:{
        type: Boolean,
        default: true,
    },
    theme:{
        type: String,
        default: "light",
    }
});
const User= mongoose.models.User || mongoose.model("User",UserSchema);
export default User;