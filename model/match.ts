import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  raidPoints: {
    type: Number,
    default: 0,
  },
  defencePoints: {
    type: Number,
    default: 0,
  },
  isCaptain: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
  },
});

const teamStatsSchema = new mongoose.Schema({
  raidPoints: {
    type: Number,
    default: 0,
  },
  defencePoints: {
    type: Number,
    default: 0,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
});

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  players: [playerSchema],
  stats: {
    type: teamStatsSchema,
    default: () => ({}),
  },
});

const matchSchema = new mongoose.Schema({
  matchName: {
    type: String,
    required: true,
  },
 
  
  team1: teamSchema,
  team2: teamSchema,
  winner: {
    teamName: String,
    points: Number,
  },
  status: {
    type: String,
    enum: ["pending", "ongoing", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  eventLog: [
    {
      team: Number,
      playerIndex: Number,
      playerName: String,
      pointtype: {
        type: String,
        enum: ["raid", "defence"],
      },
      point: Number,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }
  ],
  createdBy:{type:String}
});

const match = mongoose.models.match || mongoose.model("match", matchSchema);
export default match;
