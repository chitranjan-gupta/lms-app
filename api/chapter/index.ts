import { Chapter } from "@/types";

import { client } from "../common/client";

export const fetchChapter = async (id: string) => {
  const response = await client.get(`chapters/${id}`);
  return response.data as Chapter;
};
