import { routes, getRoute } from "../routes";

export const addNewUser = async (user) => {
  await fetch(getRoute(routes.register), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};
export const loginDB = async (dateLog) => {
  try {
    const response = await fetch(getRoute(routes.login), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dateLog),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
export const register = async (utilizator) => {
  const response = await fetch(getRoute(routes.register), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(utilizator),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();
  return result;
};
export const userUnique = async (email) => {
  try {
    const response = await fetch(getRoute(routes.email));
    const content = await response.json();
    return content;
  } catch (error) {
    throw error;
  }
};
