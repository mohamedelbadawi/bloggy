import postModel from "@/models/Post";
import { connection } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(req, context) {
    try {
        await connection()
        const { params } = context;
        
        const posts = await postModel.find({ userId: params.id })
        return NextResponse.json({ success: true, posts: posts })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, 'error': error })

    }
}