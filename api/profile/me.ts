import { createQuery } from "react-query-kit";

import { client } from "@/api/common/client";
import { useAuth } from "@/core/auth";

import type { AxiosError } from "axios";

type Variables = void;

export const useMe = createQuery<Response, Variables, AxiosError>({
  queryKey: ["profile"],
  fetcher: async () => {
    const token = useAuth.getState().token;
    const response = await client.get(`user/auth`, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
      },
    });
    return response.data;
  },
});
