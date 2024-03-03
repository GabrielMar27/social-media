import NavBar from "../../navBar/navBar";
import { Avatar, Box } from "@mui/material";
import * as React from "react";
import { User } from "../../../classes/Clase";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  sendFrRequest,
  UploadProfilePic,
} from "../../../functions/dbAcctions";
import NotFound from "../NotFound/NotFound";
import "./profileStyle.css";
import Button from "@mui/material/Button";
import io from "socket.io-client";
const Profile = () => {
  const [user, setUser] = React.useState(User);
  const [id, setId] = React.useState("");
  const [notFound, setNotFound] = React.useState(false);
  const { idUser } = useParams();
  const data = new Date(user.inregistrare_cont);

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
  const socket = io.connect("http://localhost:3001");
  React.useEffect(() => {
    const getUser = async () => {
      const data = await getUserProfile(idUser);
      if (!data.result || Object.keys(data.result).length === 0) {
        setNotFound(true);
      } else {
        setUser(data.result[0]);
        setId(sessionStorage.user_id);
        console.log(data.result[0]);
      }
    };

    getUser();
  }, [idUser]);

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
          <h1 className="userData">{infiintareCont}</h1>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            {user.id_user !== id ? (
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
                  onClick={() => sendFrRequest(id, user.id_user, 0)}
                >
                  Send Friend
                </Button>
                <Button variant="contained" className="profileActions">
                  Message
                </Button>
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
      <Box></Box>
    </>
  );
};

export default Profile;
