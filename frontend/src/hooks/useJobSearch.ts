import { useState, useCallback } from "react";
import type { Job } from "../types";

export const useJobSearch = (jobs: Job[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    minSalary: 0,
    maxSalary: 300000,
    workType: null as null | "remote" | "hybrid" | "onsite",
  });

  const filteredJobs = useCallback(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSalary =
        job.salary.min >= filters.minSalary &&
        job.salary.max <= filters.maxSalary;

      const matchesWorkType =
        !filters.workType || job.type === filters.workType;

      return matchesSearch && matchesSalary && matchesWorkType;
    });
  }, [jobs, searchQuery, filters]);

  const updateFilters = useCallback((newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilters,
    filteredJobs: filteredJobs(),
  };
};
