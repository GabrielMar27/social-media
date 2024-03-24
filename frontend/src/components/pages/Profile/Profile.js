import NavBar from "../../navBar/navBar";
import { Avatar, Box, Button } from "@mui/material";
import * as React from "react";
import { User } from "../../../classes/Clase";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  sendFrRequest,
  UploadProfilePic,
  checkFriendShip,
} from "../../../functions/dbAcctions";
import NotFound from "../NotFound/NotFound";
import "./profileStyle.css";
import io from "socket.io-client";
import Postare from "./postare/postare";
const Profile = () => {
  const [user, setUser] = React.useState(User);
  const [id, setId] = React.useState("");
  const [notFound, setNotFound] = React.useState(false);
  const { idUser } = useParams();
  const data = new Date(user.inregistrare_cont);
  const [friendshipStatus, setFriendshipStatus] = React.useState({
    stare: 0,
    sender_id: "",
    receiver_Id: "",
  });
  const an = data.getFullYear();
  const luni = [
    "Ian",
    "Feb",
    "Mar",
    "Apr",
    "Mai",
    "Iun",
    "Iul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const luna = luni[data.getMonth()];

  const zi = data.getDate();
  const infiintareCont = `${zi}-${luna}-${an}`;

  React.useEffect(() => {
    const getUser = async () => {
      const data = await getUserProfile(idUser);
      if (!data.result || Object.keys(data.result).length === 0) {
        setNotFound(true);
      } else {
        const userProfile = data.result[0];
        setUser(userProfile);
        const currentUserId = sessionStorage.user_id;
        setId(currentUserId);

        if (currentUserId != userProfile.id_user) {
          const friendStatus = await checkFriendShip(
            currentUserId,
            userProfile.id_user
          );

          if (friendStatus && friendStatus.stare !== null) {
            setFriendshipStatus(friendStatus.result[0]);
          } else {
            setFriendshipStatus(null);
          }
        }
      }
    };
    getUser();
  }, [idUser]);
  const buttonSwitch = () => {
    console.log(friendshipStatus.stare);
    switch (friendshipStatus?.stare) {
      case 0:
        if (friendshipStatus.sender_id === idUser) {
          return (
            <>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "310px",
                }}
              >
                <Button
                  variant="contained"
                  className="profileActions"
                  color="success"
                  onClick={() => {
                    sendFrRequest(
                      friendshipStatus.sender_id,
                      friendshipStatus.receiver_Id,
                      1
                    );
                    window.location.reload();
                  }}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  className="profileActions"
                  color="error"
                  onClick={() => {
                    sendFrRequest(
                      friendshipStatus.sender_id,
                      friendshipStatus.receiver_Id,
                      2
                    );
                    window.location.reload();
                  }}
                >
                  Delete
                </Button>
              </Box>
            </>
          );
        }
        if (friendshipStatus.sender_id === id) {
          return (
            <>
              <Button variant="contained" className="profileActions" disabled>
                Friend Request Sent
              </Button>
            </>
          );
        }
      case 1:
        return (
          <Button variant="contained" className="profileActions">
            Message
          </Button>
        );
      case 2:
        if (friendshipStatus.sender_id === idUser) {
          return (
            <>
              <Button variant="contained" className="profileActions" disabled>
                Friend Request Sent
              </Button>
            </>
          );
        } else
          return (
            <>
              {" "}
              <Button
                variant="contained"
                className="profileActions"
                onClick={() => {
                  sendFrRequest(id, user.id_user, 2);
                  window.location.reload();
                }}
              >
                Send Friend
              </Button>
            </>
          );
      default:
        return (
          <>
            {" "}
            <Button
              variant="contained"
              className="profileActions"
              onClick={() => {
                sendFrRequest(id, user.id_user, 0);
                window.location.reload();
              }}
            >
              Send Friend
            </Button>
          </>
        );
    }
  };
  if (notFound) {
    return <NotFound />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Container pentru Avatar și input */}
        <div style={{ position: "relative" }}>
          <Avatar
            sx={{ width: 200, height: 200 }}
            alt={`poza_profil`}
            src={user.poza_profil}
            style={{
              border: "0.5px solid black",
            }}
          />
          {console.log(user.id_user === id)}
          {console.log(user.id_user)}
          {console.log(id)}
          {user.id_user === id && (
            <input
              type="file"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
              onChange={(e) => {
                UploadProfilePic(e.target.files[0], id);
                window.location.reload();
              }}
            />
          )}
        </div>

        <Box>
          <h1 className="userData">{user.nume_cont}</h1>
          <div className="userData">User since:{infiintareCont}</div>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            {user.id_user !== id ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "310px",
                }}
              >
                {buttonSwitch()}
              </Box>
            ) : (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "310px",
                }}
              >
                <Button
                  variant="contained"
                  className="profileActions"
                  style={{ fontSize: "13px" }}
                >
                  Edit Page
                </Button>
                <Button
                  variant="contained"
                  className="profileActions"
                  style={{ fontSize: "13px" }}
                >
                  Make New Post
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Postare></Postare>
      </Box>
    </>
  );
};

export default Profile;
