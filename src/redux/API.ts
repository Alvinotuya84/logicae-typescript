import axios from "axios";
import { JokeEntries } from "../types";

const baseUrl = import.meta.env.VITE_BASE_URL;
export const getJokes = (args: any) =>
  axios.get(baseUrl + `/jokes/?\_page=${args?.page}&\_limit=${args?.limit}`);
export const addJoke = (formData: JokeEntries) =>
  axios.post(baseUrl + "/jokes", formData);
export const updateJoke = (formData: JokeEntries, id: number | undefined) =>
  axios.patch(baseUrl + `/jokes/${id}`, formData);
export const deleteJoke = (id: number | undefined) =>
  axios.delete(baseUrl + `/jokes/${id}`);
