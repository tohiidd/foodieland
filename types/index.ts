import { ReactNode } from "react";

export interface IUi {
  children: ReactNode;
  className?: string;
}

export interface IIngredients {
  main: string[];
  sauce: string[];
}
export interface IDirection {
  title: string;
  description: string;
}
export interface INutrition {
  calories: string;
  carbohydrate: string;
  cholesterol: string;
  protein: string;
  totalFat: string;
}

export interface IRecipe {
  _id?: string;
  category: string;
  title: string;
  chef: string;
  image: string;
  banner: string;
  video: string;
  prepTime: string;
  cookTime: string;
  createdAt?: string;
  description: string;
  nutrition: INutrition;
  likes?: string;
  ingredients: IIngredients;
  directions: IDirection[];
}
export interface IArticle {
  _id?: string;
  title: string;
  author: string;
  image: string;
  createdAt?: string;
  shortDescription: string;
  description: string;
}
export interface IMessage {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  enquiry: "advertising" | "commercials" | "support";
  message: string;
  createdAt?: string;
}
