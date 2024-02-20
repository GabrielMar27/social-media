import NavBar from "../../navBar/navBar";
import { Avatar, Box } from "@mui/material";
import * as React from "react";
import { UploadProfilePic } from "../../../functions/dbAcctions";
import { User } from "../../../classes/Clase";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../../functions/dbAcctions";
const Profile = () => {
  const [user, setUser] = React.useState(User);
  const [id, setId] = React.useState("");
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
  const da = async () => {
    console.log(user);
  };
  React.useEffect(() => {
    const getUser = async () => {
      const data = await getUserProfile(idUser);
      setUser(data.result[0]);
    };
    setId(idUser);
    getUser();
    console.log(idUser);
    da();
  }, [idUser]);
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "inline-block",
          position: "relative",
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            position: "relative",
            cursor: "pointer",
            display: "flex",
          }}
        >
          <Avatar
            sx={{ width: 56, height: 56 }}
            alt={`poza`}
            src={user.poza_profil}
          />
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
        </Box>
        <Box>
          <h1>{user.nume_cont}</h1>
          <h1>user since:{infiintareCont}</h1>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
