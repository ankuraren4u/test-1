import { useEffect, useState, useMemo } from "react";
import { useFela } from "react-fela";
import classnames from "classnames";
import { debounce } from "lodash";
import { useFetchCompanies } from "../../apis/useFetchCompanies";
import { TableView, HeaderBar, Input } from "../../component";
import { containerStyle, inputWidth } from "./style";

const DEBOUNCE_TIME = 150;
const orderedColumns = [
  { key: "crm_id", value: "CRM ID", width: "150px" },
  { key: "product_id", value: "Product ID", width: "150px" },
  { key: "names", value: "Names" },
  { key: "email", value: "Email" },
];

const getQueryFiltedCompanies = (query, companies) => {
  if (!query) {
    return companies;
  }

  return companies.filter((c) => {
    if (
      c.names.find((n) => n.includes(query)) ||
      c.email.find((n) => n.includes(query))
    ) {
      return true;
    }

    return false;
  });
};

export const Companies = () => {
  const { css } = useFela();
  const [companies, fetchCompanies] = useFetchCompanies();
  const [filterSring, updateFilterSring] = useState();

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleInputChange = useMemo(
    () =>
      debounce((e) => {
        updateFilterSring(e.target.value);
      }, DEBOUNCE_TIME),
    []
  );

  const containerClass = classnames("ui-container", css(containerStyle));

  const queryFiltedCompanies = getQueryFiltedCompanies(filterSring, companies);
  return (
    <div className={containerClass}>
      <HeaderBar>
        <Input
          type="text"
          width={inputWidth}
          placeholder="Filter Companies"
          onChange={handleInputChange}
        />
      </HeaderBar>
      {companies && companies.length ? (
        queryFiltedCompanies && queryFiltedCompanies.length ? (
          <TableView
            tableData={queryFiltedCompanies}
            orderedColumns={orderedColumns}
          />
        ) : (
          "No result maching search filter"
        )
      ) : null}
    </div>
  );
};
