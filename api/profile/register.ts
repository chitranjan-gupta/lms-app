import { createMutation } from "react-query-kit";

import { client } from "@/api/common/client";

import type { AxiosError } from "axios";

type Variables = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export const useRegister = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: "user/signup",
      method: "POST",
      data: variables,
    }).then((response) => response.data),
});
