import axios from "axios";
import { routes, getRoute } from "../routes";
export const addNewUser = async (user) => {
  try {
    await axios.post(getRoute(routes.register), user);
  } catch (error) {
    throw error;
  }
};
export const UploadProfilePic = async (file, id) => {
  try {
    const reader = new FileReader();

    const base64 = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
    console.log("fisa " + base64);
    const response = await axios.post(getRoute(routes.uploadPFP), {
      image: base64,
      id: id,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const loginDB = async (dateLog) => {
  try {
    const response = await axios.post(getRoute(routes.login), dateLog);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (utilizator) => {
  try {
    const response = await axios.post(getRoute(routes.register), utilizator);
    return response.data; // Success response
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // Specific error handling for status code 409
      return error.response.data;
    } else {
      // General error handling
      throw error;
    }
  }
};
export const getUserProfile = async (id) => {
  try {
    const response = await axios.post(getRoute(`/${id}`));
    return response.data; // Success response
  } catch (error) {
    throw error;
  }
};
export const fetchNotifications = async (receiverId) => {
  try {
    const response = await axios.post(getRoute(routes.notifications), {
      receiverId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const checkFriendShip = async (senderId, receiverId) => {
  try {
    const response = await axios.post(getRoute(routes.checkFriendShip), {
      senderId,
      receiverId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const sendFrRequest = async (senderId, receiverId, stare) => {
  try {
    const response = await axios.post(getRoute(routes.friendReq), {
      senderId,
      receiverId,
      stare,
    });
    console.log(receiverId);
    return response.data;
  } catch (error) {
    throw error;
  }
};
