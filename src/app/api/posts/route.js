import postModel from "@/models/Post";
import { connection } from "@/config/db";
import { NextResponse } from "next/server";
import userModel from "@/models/User";

export async function POST(req) {
    try {
        const { title, content, userId } = await req.json();
        const post = await postModel.create({
            title: title,
            content: content,
            userId: userId
        })

        return NextResponse.json({ success: true, post: post })
    } catch (error) {
        return NextResponse.json({ success: false, 'error': error })
    }
}
export async function GET(req) {
    try {
        await connection()


        const posts = await postModel.find({}).populate('userId')
        return NextResponse.json({ posts: posts })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, 'error': error })

    }
}