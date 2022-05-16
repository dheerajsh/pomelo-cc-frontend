import http from "../http-common";

const getAll = (params) => {
  return http.get("http://localhost:4000/api/github/search", { params });
};



const GitSearchService = {
  getAll,
};

export default GitSearchService;
