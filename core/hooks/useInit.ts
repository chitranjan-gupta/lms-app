import { useEffect, useState } from "react";

// import { useCategories } from "@/core/store/categories";
import { useColumns } from "@/core/store/columns";
import { useCompanies } from "@/core/store/companies";
// import { useCourses } from "@/core/store/courses";
import { useJobs } from "@/core/store/jobs";
import { useRows } from "@/core/store/rows";
import { useUser } from "@/core/store/user";

export const useInit = () => {
  const getUser = useUser((state) => state.getUser);
  const userStatus = useUser((state) => state.status);
  // const getCourses = useCourses((state) => state.getCourses);
  // const coursesState = useCourses((state) => state.status);
  // const getCategories = useCategories((state) => state.getCategories);
  // const categoriesState = useCategories((state) => state.status);
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
      userStatus === "pending" ||
      // coursesState === "pending" ||
      // categoriesState === "pending" ||
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
    userStatus,
    // coursesState,
    // categoriesState,
    companiesState,
    jobsState,
    columnsState,
    rowsState,
  ]);

  useEffect(() => {
    async function init() {
      await getUser();
      // getCourses();
      // getCategories();
      await getCompanies();
      await getJobs();
      await getColumns();
      await getRows();
    }
    init();
  }, [
    getUser,
    // getCategories,
    // getCourses,
    getCompanies,
    getJobs,
    getColumns,
    getRows,
  ]);

  return { loading };
};
