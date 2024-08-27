import axios from "axios";
import { Breed } from "../types/AnimalData";

export const getBreeds = async (animalType: string, pageParam: number) => {
  const api =
    animalType === "cat"
      ? `https://api.thecatapi.com/v1/breeds?page=${pageParam}`
      : `https://api.thedogapi.com/v1/breeds?page=${pageParam}`;

  const response = await axios.get(api, {
    headers: {
      "x-api-key": process.env.API_KEY,
    },
  });

  const data = response.data.map((breed: any) => ({
    name: breed.name,
  }));

  return data;
};
