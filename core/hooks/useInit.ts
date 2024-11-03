import { useEffect, useState } from "react";

import { useCareers } from "@/core/store/career";
import { useCategories } from "@/core/store/categories";
import { useCompanies } from "@/core/store/company";
import { useCourses } from "@/core/store/courses";
import { useColumns, useRows } from "@/core/store/kanban";
// import { useUser } from "@/core/store/user";

export const useInit = () => {
  // const getUser = useUser((state) => state.getUser);
  // const userStatus = useUser((state) => state.status);
  const getCourses = useCourses((state) => state.getCourses);
  const coursesState = useCourses((state) => state.status);
  const getCategories = useCategories((state) => state.getCategories);
  const categoriesState = useCategories((state) => state.status);
  const getCompanies = useCompanies((state) => state.getCompanies);
  const companiesState = useCompanies((state) => state.status);
  const getCareers = useCareers((state) => state.getCareers);
  const careersState = useCareers((state) => state.status);
  const getColumns = useColumns((state) => state.getColumns);
  const columnsState = useColumns((state) => state.status);
  const getRows = useRows((state) => state.getRows);
  const rowsState = useRows((state) => state.status);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      coursesState === "pending" ||
      categoriesState === "pending" ||
      companiesState === "pending" ||
      careersState === "pending" ||
      columnsState === "pending" ||
      rowsState === "pending"
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    coursesState,
    categoriesState,
    companiesState,
    careersState,
    columnsState,
    rowsState,
  ]);

  useEffect(() => {
    async function init() {
      await getCourses();
      await getCategories();
      await getCompanies();
      await getCareers();
      await getColumns();
      await getRows();
    }
    init();
  }, [
    getCategories,
    getCourses,
    getCompanies,
    getCareers,
    getColumns,
    getRows,
  ]);

  return { loading };
};
