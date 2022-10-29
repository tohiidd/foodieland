import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import dbConnect from "@/services/dbConnect";
import Admin from "@/models/Admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  await dbConnect();

  const hashedPassword = await hash(password, 12);

  let user = { email, password: hashedPassword };

  try {
    await Admin.create(user);
    res.status(201).json({ message: "user created successfully.", data: user });
  } catch (error) {
    res.status(500).json(error);
  }
}
