import { Company } from "@/types";

import { client } from "../common/client";

export const fetchCompanies = async () => {
  const response = await client.get(`companies`);
  return response.data.data as Company[];
};

export const fetchCompany = async (id: string) => {
  const response = await client.get(`companies/${id}`);
  return response.data as Company;
};
