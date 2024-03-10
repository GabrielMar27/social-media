import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchNotifications } from "./dbAcctions";
const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      let notif = await fetchNotifications(sessionStorage.user_id);
      // Acum setăm întregul array de notificări, nu doar numărul lor
      setNotifications(notif.result);
    }, 1000);

    // Funcția de curățare
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, notificationCount: notifications.length }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
