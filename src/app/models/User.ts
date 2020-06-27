import * as mongoose from "mongoose";
import { UserInterface } from "./interfaces/User";
import { encriptPassword } from "../controllers/validations/encrypt";


const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      set: encriptPassword
    },
    document:{
      type: String,
      required: true
    },
    phone:{
      type: String,
      required: true
    },   
  },
  {
    timestamps: true,    
  }, 
);

export default mongoose.model<UserInterface>("User", UserSchema);
