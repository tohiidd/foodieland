import axios from "axios";
import { IArticle } from "../types";

const articlesApi = axios.create({
  baseURL: "http://localhost:3000/api/articles",
});

export const getArticles = async (query: string = "") => {
  const response = await articlesApi.get(`?${query}`);
  return response?.data;
};

export const getArticle = async (id: string) => {
  const response = await articlesApi.get(`/${id}`);
  return response?.data?.data;
};

export const addArticle = async (data: IArticle) => {
  const response = await articlesApi.post("/", data);
  return response.data;
};

export const updateArticle = async (data: IArticle) => {
  const response = await articlesApi.put(`/${data._id}`, data);
  return response.data;
};

export const deleteArticle = async (id: string) => {
  const response = await articlesApi.delete(`/${id}`);
  return response.data;
};

export default articlesApi;
