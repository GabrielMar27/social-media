import Stack from "@mui/material/Stack";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Avatar, Button } from "@mui/material";
import { sendFrRequest } from "../../../../functions/dbAcctions";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const FriendReq = (props) => {
  return (
    <>
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
              <Avatar
                style={{ width: "50px", height: "50px" }}
                src={props.data.poza_profil}
              ></Avatar>
              {props.data.nume_cont}
            </div>
            <div
              style={{
                width: "150px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                color="success"
                onClick={() => {
                  sendFrRequest(
                    props.data.sender_id,
                    sessionStorage.user_id,
                    1
                  );
                }}
              >
                Accept
              </Button>
              <Button
                color="error"
                onClick={() => {
                  sendFrRequest(
                    props.data.sender_id,
                    sessionStorage.user_id,
                    2
                  );
                }}
              >
                Decline
              </Button>
            </div>
          </Item>
        </Stack>
      </Box>
    </>
  );
};
export default FriendReq;
