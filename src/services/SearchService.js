import http from "../http-common";

/**
 * make a request to backend api to get the results based on the search text
 * 
 * @param  params 
 * @returns 
 */
const getAll = (params) => {
  return http.get("http://localhost:4000/git/search", { params });
};



const GitSearchService = {
  getAll,
};

export default GitSearchService;
