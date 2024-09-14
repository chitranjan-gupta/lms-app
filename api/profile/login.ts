import { createMutation } from "react-query-kit";

import { client } from "@/api/common/client";

import type { AxiosError } from "axios";

type Variables = { email: string; password: string };

export const useLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: "user/signin",
      method: "POST",
      data: variables,
    }).then((response) => response.data),
});
