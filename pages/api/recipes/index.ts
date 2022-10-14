import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Recipe from "@/models/Recipe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  await dbConnect();
  if (method === "GET") {
    let pageNumber = 1;
    let nPerPage = 9;
    if (typeof query?.limit === "string" && typeof query?.page === "string") {
      pageNumber = parseInt(query?.page);
      nPerPage = parseInt(query?.limit);
    }

    let filters: any = {};
    if (query?.category) {
      filters.category = { $in: query.category };
    }
    if (query?.search) {
      filters.title = {
        $regex: new RegExp(".*" + query.search + ".*", "ig"),
      };
    }

    try {
      const recipes = await Recipe.find(filters)
        .skip((pageNumber - 1) * nPerPage)
        .limit(nPerPage);
      res.status(200).json({ message: "recipes found successfully.", data: recipes });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const recipes = await Recipe.create(req.body);
      res.status(201).json({ message: "recipe created successfully.", data: recipes });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
