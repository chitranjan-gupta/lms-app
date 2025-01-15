import { Course } from "@/types";

import { client } from "../common/client";

export const fetchCourses = async () => {
  const response = await client.get(`courses`);
  return response.data as Course[];
};

export const fetchCourse = async (id: string) => {
  const response = await client.get(`courses/${id}`);
  return response.data as Course;
};
