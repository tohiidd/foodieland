import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "services/dbConnect";
import Recipe from "@/models/Recipe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const id = query.recipe;

  await dbConnect();

  if (method === "GET") {
    console.log("recipe");
    try {
      const recipe = await Recipe.findById(id);
      res.status(200).json({ message: "recipe found successfully!", data: recipe });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "PUT") {
    try {
      const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ message: "recipe updated successfully!", data: recipe });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "DELETE") {
    try {
      const recipe = await Recipe.findByIdAndDelete(id);
      res.status(200).json({ message: "recipe deleted successfully!", data: recipe });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
