import { Career, Kanban_Row } from "@/types";

import { client } from "../common/client";

export const fetchRows = async () => {
  const response = await client.get(`kanban/rows`);
  return response.data as Kanban_Row[];
};

export const reorderRows = async (rows: Kanban_Row[]) => {
  const response = await client.post(`kanban/rows/reorder`, { list: rows });
  return response.data;
};

export const createRow = async (
  columnId: string,
  title: string,
  subtitle: string,
) => {
  const response = await client.post(`kanban/rows`, {
    columnId,
    title,
    subtitle,
  });
  return response.data as Kanban_Row;
};

export const fetchRow = async (id: string) => {
  const response = await client.get(`kanban/rows/${id}`);
  return response.data as Kanban_Row;
};

export const bookmarkRow = async (
  title: string,
  subtitle: string,
  career: Career,
) => {
  const response = await client.post(`kanban/rows/bookmark`, {
    title,
    subtitle,
    career,
  });
  return response.data as Kanban_Row;
};
