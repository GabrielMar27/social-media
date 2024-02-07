export const ORIGIN_URL = "http://localhost:3001";

export const routes = {
  register: "/register",
  login: "/login",
};

export const getRoute = (route) => `${ORIGIN_URL}${route}`;
