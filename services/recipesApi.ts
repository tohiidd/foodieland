import axios from "axios";
import { IRecipe } from "@/types/index";

interface GetRecipesResponse {
  message: string;
  data: IRecipe[];
  total: number;
}

const recipesApi = axios.create({
  baseURL: "http://localhost:3000/api/recipes",
});

export const getRecipes = async (query: string = ""): Promise<GetRecipesResponse> => {
  const response = await recipesApi.get(`?${query}`);
  return response.data;
};

export const getRecipe = async (id: string) => {
  const response = await recipesApi.get(`/${id}`);
  return response.data;
};

export const addRecipe = async (data: IRecipe) => {
  const response = await recipesApi.post("/", data);
  return response.data;
};

export const updateRecipe = async (data: IRecipe) => {
  const response = await recipesApi.put(`/${data._id}`, data);
  return response.data;
};

export const deleteRecipe = async (id: string) => {
  const response = await recipesApi.delete(`/${id}`);
  return response.data;
};

export default recipesApi;
