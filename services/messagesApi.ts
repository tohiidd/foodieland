import axios from "axios";
import { IMessage } from "../types";

interface GetMessagesResponse {
  message?: string;
  data: IMessage[];
  total: number;
}
const messagesApi = axios.create({
  baseURL: "http://localhost:3000/api/messages",
});

export const getMessages = async (): Promise<GetMessagesResponse> => {
  const response = await messagesApi.get("/");
  return response.data;
};

export const addMessage = async (data: IMessage) => {
  const response = await messagesApi.post("/", data);
  return response.data;
};
