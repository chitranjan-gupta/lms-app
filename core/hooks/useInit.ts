import { useEffect, useState } from "react";

import { useCareers } from "@/core/store/career";
import { useCategories } from "@/core/store/categories";
import { useCompanies } from "@/core/store/company";
import { useCourses } from "@/core/store/courses";
import { useColumns, useRows } from "@/core/store/kanban";
// import { useUser } from "@/core/store/user";

export const useInit = () => {
  // const { getUser, status: userStatus } = useUser();
  const { getCourses, status: coursesState } = useCourses();
  const { getCategories, status: categoriesState } = useCategories();
  const { getCompanies, status: companiesState } = useCompanies();
  const { getCareers, status: careersState } = useCareers();
  const { getColumns, status: columnsState } = useColumns();
  const { getRows, status: rowsState } = useRows();
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
