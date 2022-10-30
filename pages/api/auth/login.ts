import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/services/dbConnect";
import Admin from "@/models/Admin";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  await dbConnect();

  let user;
  try {
    user = await Admin.findOne({ email });
  } catch (err) {
    res.status(500).json("Logging in failed, please try again later.");
  }

  if (!user) {
    res.status(404).json("User not found!");
  }

  let isValidPassword;
  try {
    isValidPassword = await compare(password, user.password);
  } catch (err) {
    res.status(500).json("Could not log you in, please check your credentials and try again.");
  }

  if (!isValidPassword) {
    res.status(400).json("Wrong password or username!");
  }
  let token;
  try {
    token = jwt.sign({ id: user._id }, "Foodieland_JWT ", { expiresIn: "5d" });
  } catch (err) {
    res.status(500).json("Logging in failed, please try again later.");
  }

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token as string, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    })
  );
  res.status(200).json({
    message: "Login successful",
    data: { email, token },
  });
}
