export const ORIGIN_URL = "http://localhost:3001";

export const routes = {
  register: "/register",
  login: "/login",
  uploadPFP: "/uploadPFP",
  friendReq: "/friendReq",
  checkFriendShip: "/checkFriendShip",
  notifications: "/notifications",
  search: "/search",
  newPost: "/newPost",
};

export const getRoute = (route) => `${ORIGIN_URL}${route}`;
