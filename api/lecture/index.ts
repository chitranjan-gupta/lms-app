import { createMutation } from "react-query-kit";

import { client } from "@/api/common/client";

import type { AxiosError } from "axios";

type Variables = {
  lectureId: string;
  chapterId: string;
  courseId: string;
};

export const useLecture = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const response = await client.post(`courses/user/lecture`, {
      lectureId: variables.lectureId,
      chapterId: variables.chapterId,
      courseId: variables.courseId,
      purchase: true,
      userId: "",
    });
    return response.data;
  },
});
