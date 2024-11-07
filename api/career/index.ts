import { Career } from "@/types";

import { client } from "../common/client";

export const fetchCareers = async (page: number, per_page: number) => {
  const response = await client.get(
    `careers?page=${page}&per_page=${per_page}`,
  );
  return response.data;
};

export const fetchCareer = async (id: string) => {
  const response = await client.get(`careers/${id}`);
  return response.data as Career;
};
