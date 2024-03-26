import { connection } from "@/config/db";
import postModel from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST(req, context) {
    try {
        await connection();
        const { params } = context;
        const { userId } = await req.json();
        const post = await postModel.findOne({ _id: params.id });
        if (post.likes.includes(userId)) {
            await postModel.findOneAndUpdate(
                { _id: params.id },
                { $pull: { likes: userId } },
                { new: true }
            );
        }
        else {
            await postModel.findOneAndUpdate(
                { _id: params.id },
                { $addToSet: { likes: userId } },
                { new: true }
            );
        }
        return NextResponse.json({ success: true, message: "Post liked successfully" });
    } catch (error) {
        console.error('Error liking post:', error.message);
        return NextResponse.json({ success: false, error: error });
    }
}