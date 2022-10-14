import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Article from "@/models/Article";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query: id } = req;
  dbConnect();

  if (method === "GET") {
    try {
      const article = await Article.findById(id);
      res.status(200).json({ message: "article found successfully!", data: article });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "PUT") {
    try {
      const article = await Article.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ message: "article updated successfully!", data: article });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "DELETE") {
    try {
      const article = await Article.findByIdAndDelete(id);
      res.status(200).json({ message: "article deleted successfully!", data: article });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
