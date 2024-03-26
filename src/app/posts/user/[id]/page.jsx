"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/Spinner'
import Link from 'next/link';
import axios from 'axios';
const UserPosts = ({ params }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(null);

    const { status, data } = useSession();
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        if (query) {

            setSearch(query);
            const filteredItems = filteredPosts.filter((post) =>

                post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query)
            );
            setFilteredPosts(filteredItems);
        }
        else {
            setFilteredPosts(posts)
        }
    };

    const handleLike = async (e, postId) => {
        if (status !== 'authenticated') {
            router.push('/login')
        }
        e.preventDefault();
        await axios.post(`/api/posts/like/${postId}`, JSON.stringify({ userId: data.user.id })).then((res) => {
            const updatedPosts = filteredPosts.map(post => {
                if (post._id === postId) {
                    // Check if the user ID is already in the likes array
                    const index = post.likes.indexOf(data.user.id);
                    if (index !== -1) {
                        // If user ID is found, create a new array without the user ID
                        const updatedLikes = [...post.likes.slice(0, index), ...post.likes.slice(index + 1)];
                        // Return the updated post
                        return {
                            ...post,
                            likes: updatedLikes
                        };
                    } else {
                        return {
                            ...post,
                            likes: [...post.likes, data.user.id]
                        };
                    }
                } else {
                    return post;
                }
            });
            setFilteredPosts(updatedPosts)

        })
    }
    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            await axios.get(`/api/posts/user/${params.id}`).then((res) => {
                setPosts(res.data.posts)
                setFilteredPosts(res.data.posts)

            })
        }
        getData();
        setLoading(false);
    }, [params.id])

    return (
        <div>
            {loading && <Spinner />}
            <div className='flex items-center justify-center gap-10'>

                <form className="basis-5/12 ">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => handleSearch(e)} placeholder="title , word from content" required />
                    </div>
                </form>
                {
                    (status === 'authenticated') ?
                        (<Link href='/posts/write' className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add post</Link>) : ''
                }
            </div>

            <div className="  flex flex-col items-center  justify-center   mt-4 gap-4 text-center">
                {
                    (filteredPosts && filteredPosts.length > 0) ? filteredPosts.map((post) => {

                        return (<div key={post._id} class="w-2/3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.content}</p>
                            <button className='flex ' onClick={(e) => handleLike(e, post._id)} >

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={" w-8 h-8 " + (post.likes.includes(data?.user.id) ? 'text-red-800 fill-current' : '')}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>

                            </button>
                        </div>)

                    }) : (
                        <div className="w-full flex justify-center items-center">
                            <h2 className=''>No posts yet</h2>
                        </div>
                    )

                }
            </div>

        </div >
    )
}

export default UserPosts