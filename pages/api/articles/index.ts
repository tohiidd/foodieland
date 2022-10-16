import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "services/dbConnect";
import Article from "@/models/Article";
import { addFilters } from "@/utils/addFilters";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  dbConnect();

  if (method === "GET") {
    let pageNumber = parseInt(query?.page as string) ?? 1;
    let nPerPage = parseInt(query?.limit as string) ?? 8;

    let filters = addFilters(query);

    try {
      const articles = await Article.find(filters)
        .skip((pageNumber - 1) * nPerPage)
        .limit(nPerPage);
      const total = await Article.countDocuments(filters);

      res.status(200).json({ message: "articles found successfully.", data: articles, total });
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
