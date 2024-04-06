import React, { useState } from "react";
import { Button, FormLabel } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./popUpStyle.css"; // Asigură-te că calea este corectă pentru stilurile CSS
import { postareNou } from "../../../../classes/Clase";
import CustomTextarea from "./costumTextarea"; // Asigură-te că ai calea corectă pentru import
import { newPost } from "../../../../functions/dbAcctions";
const NewPost = ({ onClose }) => {
  const [imagesBase64, setImagesBase64] = useState([]);
  const [post, setPost] = useState({ ...postareNou });

  const handleImageChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(
        0,
        4 - imagesBase64.length
      );
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagesBase64((prevImages) => [...prevImages, reader.result]);
          setPost((prevPost) => ({
            ...prevPost,
            media_postare: [...prevPost.media_postare, reader.result],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (indexToRemove) => {
    setImagesBase64((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async () => {
    const userId = sessionStorage.user_id;

    if (!userId) {
      console.error("Niciun ID de utilizator găsit în sesiune.");
      return;
    }

    const updatedPost = {
      ...post,
      id_user: userId,
    };

    console.log("Trimite postarea la server:", updatedPost);
    newPost(updatedPost);
    setImagesBase64([]);
    setPost({ ...postareNou });
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
          <CustomTextarea
            value={post.text_postare}
            onChange={(e) => setPost({ ...post, text_postare: e.target.value })}
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
          {imagesBase64.length > 0 && (
            <div>
              {imagesBase64.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`upload-${index}`}
                  style={{
                    width: "100px",
                    height: "auto",
                    margin: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => removeImage(index)}
                />
              ))}
            </div>
          )}
          <Button
            variant="contained"
            color="info"
            style={{ marginTop: "20px" }}
            onClick={handleSubmit}
          >
            POSTEAZĂ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
