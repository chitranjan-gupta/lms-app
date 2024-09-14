import { createQuery } from "react-query-kit";

import { client } from "@/api/common/client";

import type { AxiosError } from "axios";

type Variables = void;

export const useCourses = createQuery<Response, Variables, AxiosError>({
  queryKey: ["courses"],
  fetcher: async () => {
    const response = await client.get(`courses`);
    return response.data;
  },
});
