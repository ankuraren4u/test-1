import { useState, useCallback } from "react";
import {fetchCompanies} from "./fetchCompanies"
/* Made it async to update it with real API calls */


export const useFetchCompanies = () => {
  const [companies, updateCompanies] = useState([]);

  const getCompanies = useCallback(async () => {
    const companies = await fetchCompanies();
    updateCompanies(companies);
  }, []);

  return [companies, getCompanies];
};
