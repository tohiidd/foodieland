import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "services/dbConnect";
import Recipe from "@/models/Recipe";
import { addFilters } from "@/utils/addFilters";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  await dbConnect();
  if (method === "GET") {
    let pageNumber = parseInt(query?.page as string) || 1;
    let nPerPage = parseInt(query?.limit as string) || 12;

    let filters = addFilters(query);
    try {
      const recipes = await Recipe.find(filters)
        .skip((pageNumber - 1) * nPerPage)
        .limit(nPerPage);

      const total = await Recipe.countDocuments(filters);

      res.status(200).json({ message: "recipes found successfully.", data: recipes, total });
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
