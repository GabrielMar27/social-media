import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";
import ThumbDownOffAltTwoToneIcon from "@mui/icons-material/ThumbDownOffAltTwoTone";
import CommentIcon from "@mui/icons-material/Comment";
function SocialMediaPost(props) {
  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardActionArea>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <Avatar /*src={props.postare.poza_profil}*/></Avatar>
            <Typography>{/*{props.postare.poza_profil}*/}</Typography>
          </Box>
          {/* {props.postare.id_user === props.id ? <Button>Edit</Button> : <></>} */}
        </Box>
        <Typography gutterBottom variant="h5" component="div">
          {/*{props.postare.text_postare}*/}
        </Typography>
        <CardMedia
          component="img"
          height="auto"
          src="da" /*{{props.postare.text_postare}}*/
          alt="Imagine postare"
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: "Flex", justifyContent: "space-between" }}>
        <Box style={{ display: "Flex" }}>
          <Button size="small" color="primary">
            <ThumbUpTwoToneIcon></ThumbUpTwoToneIcon>
          </Button>
          <Typography size="small" color="primary">
            {/*{props.postare.upvotes}*/}
          </Typography>
          <Button size="small" color="primary">
            <ThumbDownOffAltTwoToneIcon></ThumbDownOffAltTwoToneIcon>
          </Button>
        </Box>
        <Button size="small" color="primary">
          <CommentIcon></CommentIcon>
        </Button>
      </CardActions>
    </Card>
  );
}

export default SocialMediaPost;
