import React, { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import GitSearchService from "../services/SearchService";
import { useTable } from "react-table";

/**
 * Component to show the results in tabular form paginated manner
 * @param props 
 * @returns 
 */
const SearchResultsList = (props) => {
  const [tutorials, setResults] = useState([]);
  const [searchTitle, setSearchResults] = useState("");
  const tutorialsRef = useRef();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const pageSizes = [10,20,30];

  tutorialsRef.current = tutorials;

  /**
   * every time search query is changed by user
   * @param  e 
   */
  const onChangeSearchQuery = (e) => {
    const searchTitle = e.target.value;
    setSearchResults(searchTitle);
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["q"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["per_page"] = pageSize;
    }

    return params;
  };

  const retrieveResults = () => {
    const params = getRequestParams(searchTitle, page, pageSize);

    if(searchTitle) {
      GitSearchService.getAll(params)
        .then((response) => {
          const { items, per_page, total } = response.data;
  
          setResults(items);
          setCount(Math.floor(total/per_page));
  
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  };

  useEffect(retrieveResults, [page, pageSize]);

  const findByQuery = () => {
    setPage(1);
    retrieveResults();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  /**
   * defination of headers in the table
   */
  const columns = useMemo(
    () => [
      {
        Header: "File Name",
        accessor: "file_name",
      },
      {
        Header: "File Path",
        accessor: "file_path",
      },
      {
        Header: "Repo name",
        accessor: "repo_name",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: tutorials,
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchTitle}
            onChange={onChangeSearchQuery}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByQuery}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-12 list">
        <div className="mt-3">
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>

        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default SearchResultsList;
