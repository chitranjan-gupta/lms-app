import { Category } from "@/types";

import { client } from "../common/client";

export const fetchCategories = async () => {
  const response = await client.get(`categories`);
  return response.data as Category[];
};
