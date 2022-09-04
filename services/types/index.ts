import { ReactNode } from "react";

export interface IUi {
  children: ReactNode;
  className?: string;
}

export interface IRecipe {
  id: string;
  category: string;
  title: string;
  chef: string;
  chefImg: string;
  img: string;
  banner: string;
  video: string;
  prepTime: string;
  cookTime: string;
  date: string;
  description: string;
  nutrition?: any;
  likes?: string;
}
