import { Kanban_Column } from "@/types";

import { client } from "../common/client";

export const fetchColumns = async () => {
  const response = await client.get(`kanban/columns`);
  return response.data as Kanban_Column[];
};

export const createColumn = async (name: string) => {
  const response = await client.post(`kanban/columns`, { name });
  return response.data as Kanban_Column;
};

export const fetchColumn = async (id: string) => {
  const response = await client.get(`kanban/columns/${id}`);
  return response.data as Kanban_Column;
};
