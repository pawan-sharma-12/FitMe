import mongoose  from "mongoose";

const sessionSchema = new mongoose.Schema({
  yoga_poses: {
    type: [String],
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Session = mongoose.model('Session', sessionSchema);

export default Session
