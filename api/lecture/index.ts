import { client } from "../common/client";

export const fetchLecture = async (
  lectureId: string,
  chapterId: string,
  courseId: string,
  purchase: boolean,
  userId: string,
) => {
  const response = await client.post(`courses/user/lecture`, {
    lectureId: lectureId,
    chapterId: chapterId,
    courseId: courseId,
    purchase: purchase,
    userId: userId,
  });
  return response.data;
};
