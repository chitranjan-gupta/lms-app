import { useEffect, useState } from "react";

import { useCategories } from "@/core/store/categories";
import { useColumns } from "@/core/store/columns";
import { useCompanies } from "@/core/store/companies";
import { useCourses } from "@/core/store/courses";
import { useJobs } from "@/core/store/jobs";
import { useRows } from "@/core/store/rows";

export const useInit = () => {
  const getCourses = useCourses((state) => state.getCourses);
  const coursesState = useCourses((state) => state.status);
  const getCategories = useCategories((state) => state.getCategories);
  const categoriesState = useCategories((state) => state.status);
  const getCompanies = useCompanies((state) => state.getCompanies);
  const companiesState = useCompanies((state) => state.status);
  const getJobs = useJobs((state) => state.getJobs);
  const jobsState = useJobs((state) => state.status);
  const getColumns = useColumns((state) => state.getColumns);
  const columnsState = useColumns((state) => state.status);
  const getRows = useRows((state) => state.getRows);
  const rowsState = useRows((state) => state.status);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      coursesState === "pending" ||
      categoriesState === "pending" ||
      companiesState === "pending" ||
      jobsState === "pending" ||
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
    jobsState,
    columnsState,
    rowsState,
  ]);

  useEffect(() => {
    getCourses();
    getCategories();
    getCompanies();
    getJobs();
    getColumns();
    getRows();
  }, [getCategories, getCourses, getCompanies, getJobs, getColumns, getRows]);

  return { loading };
};
