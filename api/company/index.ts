import { Company } from "@/types";

import { client } from "../common/client";

export const fetchCompanies = async (page: number, per_page: number) => {
  const response = await client.get(
    `companies?page=${page}&per_page=${per_page}`,
  );
  return response.data;
};

export const fetchCompany = async (id: string) => {
  const response = await client.get(`companies/${id}`);
  return response.data as Company;
};
