import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Article from "@/models/Article";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  dbConnect();

  if (method === "GET") {
    try {
      const articles = await Article.find();
      res.status(200).json({ message: "articles found successfully.", data: articles });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const articles = await Article.create(req.body);
      res.status(201).json({ message: "article created successfully.", data: articles });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
