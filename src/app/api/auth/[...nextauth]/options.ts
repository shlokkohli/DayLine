import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'Email & Password',
            credentials: {
                email: { label: "Email", type: 'email' },
                password: { label: "Password", type: "Password" }
            },
            async authorize(credentials: any): Promise<any> {
                // write user login logic here

                try {

                    // first get the email and password from the user
                    const {email, password} = credentials;

                    // check if the user exists
                    const user = await prisma.user.findUnique({
                        where: {
                            email
                        },
                    })

                    if(!user){
                        throw new Error("User not found with this email")
                    }

                    if(!user.password){
                        throw new Error("This email was used to sign up with Google. Please sign in with Google.")
                    }

                    // compare the password, (credentials password with user password)
                    const isPasswordCorrect = bcrypt.compare(credentials.password, user.password)

                    if(!isPasswordCorrect){
                        throw new Error("Incorrect password");
                    }

                    return user;

                } catch (error: any) {

                    throw new Error("Login failed", error)
                    
                }

            }
        }),
    ],
    callbacks: {
        async jwt({ user, token }){

            if(user){
                token.email = user.email
            }

            return token;

        },
        async session({ session, token }){

            if(token){
                session.user.email = token.email
                session.user.name = token.email
                session.user.id = token.id
            }

            return session;

        }
    },
    pages: {
        signIn: 'sign-in'
    },
    session: {
        strategy: 'jwt'
    }
}