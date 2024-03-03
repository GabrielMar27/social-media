import NavBar from "../../navBar/navBar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Avatar, Button } from "@mui/material";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const socket = io("http://localhost:3001");

const Notif = () => {
  const obg = {
    nume: "da",
  };

  useEffect(() => {
    socket.on("receiveFr", (data) => {
      alert(data);
    });
  }, [socket]);
  return (
    <>
      <NavBar />
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          <Item
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100vw",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar style={{ width: "50px", height: "50px" }}></Avatar>
              {obg.nume}
            </div>
            <div
              style={{
                width: "150px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button color="success">Accept</Button>
              <Button color="error">Decline</Button>
            </div>
          </Item>
        </Stack>
      </Box>
    </>
  );
};
export default Notif;
