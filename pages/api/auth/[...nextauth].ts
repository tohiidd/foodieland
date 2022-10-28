import Admin from "@/models/Admin";
import dbConnect from "@/services/dbConnect";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();

        const user: any = await Admin.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("No user found!");
        }
        const isValid = await compare(credentials?.password!, user?.password);
        if (!isValid) {
          throw new Error("Could not log you in!");
        }
        return user;
      },
    }),
  ],
});
