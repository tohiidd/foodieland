import Admin from "@/models/Admin";
import dbConnect from "@/services/dbConnect";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials!;

        await dbConnect();
        let admin;
        try {
          admin = await Admin.findOne({ email });
        } catch (err) {
          console.log(err);
        }

        if (!admin) {
          throw new Error("No admin found!");
        }

        let isValid;
        try {
          isValid = await compare(password, admin!.password);
        } catch (err) {
          console.log(err);
        }
        if (!isValid) {
          throw new Error("Could not log you in! ");
        }

        return { id: "1", email };
      },
    }),
  ],
};
export default NextAuth(authOptions);
