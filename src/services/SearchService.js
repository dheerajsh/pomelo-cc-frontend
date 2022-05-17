import http from "../http-common";

const getAll = (params) => {
  return http.get("http://localhost:4000/git/search", { params });
};



const GitSearchService = {
  getAll,
};

export default GitSearchService;
