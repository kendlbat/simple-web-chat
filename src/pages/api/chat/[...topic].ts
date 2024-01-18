import type { APIRoute } from "astro";
import mongoose from "mongoose";
import Chat from "@lib/mongo/Chat";
import { getSession } from "auth-astro/server";

export const GET: APIRoute = async (ctx): Promise<Response> => {
    let topic = ctx.params.topic;

    if (!topic?.match(/^[a-z0-9-]+$/)) {
        return new Response("Invalid topic", { status: 400 });
    }

    await mongoose.connect(import.meta.env.MONGODB_URI);
    let messages = await Chat.find({ topic }).sort({ date: 1 });
    await mongoose.disconnect();

    messages = messages.map((m) => ({
        message: m.message,
        date: m.date,
        username: m.username,
    }));

    return new Response(JSON.stringify(messages), {
        headers: { "content-type": "application/json" },
    });
};

export const POST: APIRoute = async (ctx): Promise<Response> => {
    const session = await getSession(ctx.request);
    if (!session) return new Response("Unauthorized", { status: 401 });

    let topic = ctx.params.topic;

    if (!topic?.match(/^[a-z0-9-]+$/)) {
        return new Response("Invalid topic", { status: 400 });
    }

    let body;
    try {
        body = await ctx.request.text();
    } catch (e) {
        return new Response("Invalid request body", { status: 400 });
    }

    await mongoose.connect(import.meta.env.MONGODB_URI);
    // Send to database
    // Drop the oldest message if there are more than 20 in the topic
    const count = await Chat.countDocuments();
    if (count >= 20) {
        const oldest = await Chat.findOne({ topic }).sort({ date: 1 });
        await Chat.deleteOne({ _id: oldest._id });
    }
    await Chat.create({
        message: body,
        topic: topic,
        username: session.user?.name,
    });
    await mongoose.disconnect();

    return new Response("OK", {
        headers: { "content-type": "text/plain" },
    });
};
