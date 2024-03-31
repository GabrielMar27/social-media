import React, { useState } from "react";
import { Button, FormLabel, TextField } from "@mui/material";
import { styled } from "@mui/system";
import "./popUpStyle.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Carousel from "react-material-ui-carousel";
import { TextareaAutosize } from "@mui/material";

const NewPost = ({ onClose }) => {
  const [text_postare, setTextPostare] = useState("");
  const [media_postare, setMedia_postare] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(
        0,
        4 - media_postare.length
      ); // Limităm numărul de fișiere selectate dacă depășește limita

      // Verificăm dacă numărul total de imagini va depăși limita
      if (media_postare.length + files.length > 4) {
        alert("Nu puteți încărca mai mult de 4 imagini.");
        return; // Oprim executia funcției dacă limita este depășită
      }

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          setMedia_postare((prevImages) => [...prevImages, reader.result]);
        };

        reader.readAsDataURL(file);
      });
    }
  };
  const removeImage = (indexToRemove) => {
    setMedia_postare((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-Header">
          <FormLabel variant="contained" color="info">
            Exprimați-vă
          </FormLabel>
          <Button variant="contained" color="error" onClick={onClose}>
            X
          </Button>
        </div>
        <div className="popup-Body">
          <TextField
            id="standard-basic"
            label="Titlu"
            variant="outlined"
            onChange={(e) => setTextPostare(e.target.value)}
          />
          <Button
            variant="contained"
            color="info"
            component="label"
            style={{ marginTop: "10px" }}
          >
            <AddPhotoAlternateIcon /> Adaugă o imagine nouă
            <input type="file" multiple hidden onChange={handleImageChange} />
          </Button>
          {media_postare.length > 0 && (
            <div>
              {media_postare.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`upload-${index}`}
                  style={{ width: "100px", height: "auto", cursor: "pointer" }}
                  onClick={() => removeImage(index)}
                />
              ))}
            </div>
          )}
          <Button
            variant="contained"
            color="info"
            style={{ marginTop: "20px" }}
            onClick={() => {
              console.log(media_postare);
              console.log(text_postare);
            }}
          >
            POSTEAZĂ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
