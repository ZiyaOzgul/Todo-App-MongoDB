import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  complated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("todo", todoSchema);
