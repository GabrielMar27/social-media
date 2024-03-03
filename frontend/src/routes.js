export const ORIGIN_URL = "http://localhost:3001";

export const routes = {
  register: "/register",
  login: "/login",
  uploadPFP: "/uploadPFP",
  friendReq: "/friendReq",
};

export const getRoute = (route) => `${ORIGIN_URL}${route}`;
