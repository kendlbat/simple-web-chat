import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    topic: String,
    message: String,
    username: String,
    date: { type: Date, default: Date.now },
});

export default mongoose.models.Chat ||
    mongoose.model("Chat", ChatSchema, "chat");
