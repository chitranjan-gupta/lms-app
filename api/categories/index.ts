import { createQuery } from "react-query-kit";

import { client } from "@/api/common/client";

import type { AxiosError } from "axios";

type Variables = void;

export const useCategories = createQuery<Response, Variables, AxiosError>({
  queryKey: ["categories"],
  fetcher: async () => {
    const response = await client.get(`categories`);
    return response.data;
  },
});
