import axios from "axios";
import type { Country } from "../types/country";

const API_URL = "http://localhost:5101/api/countries";
export const getCountries = async (): Promise<Country[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};
