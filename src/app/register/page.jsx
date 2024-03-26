"use client"
import React, { useState } from 'react'
import Link from "next/link";
import { signIn } from 'next-auth/react';
import { register } from '@/lib/actions';
const RegisterPage = () => {
    const [loading, setLoading] = useState(false)



    return (
        <div className='flex justify-center w-full items-center'>
            <div className="w-full mt-6 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" action={register} >
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Register</h5>
                    <div>
                        <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">fullname</label>
                        <input type="text" name="fullname" id="fullname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="ex:Mohamed" required />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>

                    <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register account</button>
                    <button onClick={() => signIn("google")} className="flex justify-center items-center gap-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google"><path strokeWidth="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" /></svg>
                        Login With Google</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Have account? <Link href="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage