import { NextApiRequest, NextApiResponse } from "next";
import Message from "@/models/Message";
import dbConnect from "@/services/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  await dbConnect();

  if (method === "GET") {
    let pageNumber = parseInt(query?.page as string) || 1;
    let nPerPage = parseInt(query?.limit as string) || 12;

    try {
      const messages = await Message.find()
        .skip((pageNumber - 1) * nPerPage)
        .limit(nPerPage);

      const total = await Message.countDocuments();

      res.status(200).json({ message: "messages found successfully.", data: messages, total });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const messages = await Message.create(req.body);
      res.status(201).json({ message: "recipe created successfully.", data: messages });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
