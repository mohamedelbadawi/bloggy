"use server"
import { connection } from "@/config/db";
import userModel from '@/models/User'
import { hash } from 'bcryptjs'
import { signIn } from "next-auth/react";
export const register = async (formData) => {
    connection();
    const { fullname, email, password } = Object.fromEntries(formData);
    try {
        const user = await userModel.findOne({
            email: email
        })
        if (user) {
            return "User already registered"
        }
        const hashedPassword = await hash(password, 10);
        const newUser = await userModel.create({
            email: email,
            fullname: fullname,
            password: hashedPassword,
            provider: 'credentials'
        });
        return "User Registered successfully"
    } catch (error) {
        console.error(error)
        return { error: "Something went wrong" }
    }
}

export const login = async (formData) => {
    const { email, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { redirect: "/" }, { email, password });
    } catch (error) {
        // console.error(error)
        return { error: "Something went wrong" }
    }
}