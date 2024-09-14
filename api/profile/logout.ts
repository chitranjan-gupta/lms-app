import { createMutation } from "react-query-kit";

import { client } from "@/api/common/client";
import { useAuth } from "@/core/auth";

import type { AxiosError } from "axios";

type Variables = void;

export const useLogout = createMutation<Response, Variables, AxiosError>({
  mutationFn: async () => {
    const token = useAuth.getState().token;
    const response = await client.get(`user/logout`, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
      },
    });
    return response.data;
  },
});
