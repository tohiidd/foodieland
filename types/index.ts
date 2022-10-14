import { ReactNode } from "react";

export interface IUi {
  children: ReactNode;
  className?: string;
}

export interface IRecipe {
  _id: string;
  category: string;
  title: string;
  chef: string;
  chefImg: string;
  image: string;
  banner?: string;
  video: string;
  prepTime: string;
  cookTime: string;
  createdAt: string;
  description: string;
  nutrition: any;
  likes: string;
}
export interface IArticle {
  id: string;
  title: string;
  author: string;
  img: string;
  createdAt: string;
  description: string;
  profile: any;
}
