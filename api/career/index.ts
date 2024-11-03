import { Career } from "@/types";

import { client } from "../common/client";

export const fetchCareers = async () => {
  const response = await client.get(`careers`);
  return response.data.data as Career[];
};

export const fetchCareer = async (id: string) => {
  const response = await client.get(`careers/${id}`);
  return response.data as Career;
};
