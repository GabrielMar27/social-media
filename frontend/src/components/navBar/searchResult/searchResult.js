import React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { Avatar, ListItemAvatar, Button } from "@mui/material";

const SearchResultComponent = ({ searchResults }) => {
  const navigate = useNavigate();

  return (
    <Paper style={{ position: "absolute", width: "100%", zIndex: 2 }}>
      <List>
        {searchResults.map((result) => (
          <ListItem
            key={result.id_user} // asigurați-vă că folosiți un identificator unic aici
            button
            onClick={() => navigate(`/${result.id_user}`)} // ajustați ruta după necesități
          >
            <ListItemAvatar>
              <Avatar src={result.poza_profil} />{" "}
              {/* presupunem că există un câmp avatar */}
            </ListItemAvatar>
            <ListItemText primary={result.nume_cont} />{" "}
            {/* ajustați câmpul după modelul dvs. de date */}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SearchResultComponent;
