import NavBar from "../../navBar/navBar";

import FriendReq from "./friendRequest/friendRequest";
import { useNotifications } from "../../../functions/NotifContext";
const Notif = () => {
  const { notifications } = useNotifications();
  return (
    <>
      <NavBar />
      {notifications.map((user, index) => (
        <FriendReq key={index} data={user} />
      ))}
    </>
  );
};
export default Notif;
