import { connection } from "@/config/db"
import userModel from "@/models/User"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
const login = async (credentials) => {
    connection();
    try {
        const user = await userModel.findOne({ email: credentials.email });
        if (!user) {
            throw new Error("invalid credentials");
        }
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isCorrectPassword) {
            throw new Error("wrong password")
        }
        return user;
    } catch (error) {
        console.error(error)
        throw new Error("Failed to authenticate");
    }
}


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    const loggedUser = { id: user._id, name: user.fullname, email: user.email, images: user?.image }
                    return loggedUser;
                } catch (error) {
                    return null
                }
            },

        }),

    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: '/'
    },
    callbacks: {
        async signIn(user) {
            connection()
            try {

                const exist = await userModel.findOne({
                    email: user.user.email
                })
                if (exist) {
                    return true
                }
                else {
                    await userModel.create({
                        fullname: user.user.name,
                        email: user.user.email,
                        image: user.user.image,
                        provider: user.account.provider
                    })
                    return true
                }
            } catch (error) {
                console.error(error)
                return false
            }
        },
        async jwt({ token, user }) {

            if (user) {
                token.id = user.id
            }
            return token
        }
        ,
        session: ({ session, token }) => {
            session.user.id = token.sub;
            return session
        }
    }
})
export { handler as GET, handler as POST }