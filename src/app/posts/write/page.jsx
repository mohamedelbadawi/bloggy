"use client"
import React, { useState } from 'react'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
const PostForm = () => {
    const { data } = useSession();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            toast.error("Please enter a title and a content")
        }
        const postData = {
            title: title,
            content: content,
            userId: data.user.id,
        }
        await axios.post("/api/posts", JSON.stringify(postData)).then((res) => {
            if (res.data.success == true) {
                toast.success("Post Added successfully")
            }
        }).catch((err) => {
            toast.error("error while adding post")
        });
        setTitle('')
        setContent('')


    }
    return (
        <div className='flex items-center justify-center'>

            <form className='w-7/12' onSubmit={handleSubmit}>

                <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 ">
                    <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800 mb-2 mt-2">
                        <label for="title" class="sr-only">title</label>
                        <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} placeholder='title' className='w-full text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400' />
                    </div>
                    <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label for="comment" class="sr-only"> content</label>
                        <textarea id="comment" rows="4" onChange={(e) => setContent(e.target.value)} value={content} class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
                    </div>

                    <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            add Post
                        </button>
                        <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">

                        </div>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default PostForm