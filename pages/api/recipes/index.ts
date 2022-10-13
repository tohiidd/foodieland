import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Recipe from "@/models/Recipe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  dbConnect();
  if (method === "GET") {
    try {
      const recipes = await Recipe.find();
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
