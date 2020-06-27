import * as mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    release_date: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    gender:{
      type: String,
      required: true
    },    
    author:{
      type: String,
      required: true
    },    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Movie", MovieSchema);
