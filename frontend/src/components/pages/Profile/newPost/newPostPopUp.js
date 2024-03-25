import { Button, FormLabel } from "@mui/material";
import "./popUpStyle.css";

const NewPost = ({ onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-Header">
          <FormLabel variant="contained" color="info">
            Express Yourself
          </FormLabel>
          <Button variant="contained" color="error" onClick={onClose}>
            X
          </Button>
        </div>
        <h2>Popup Content</h2>
        <p>This is the content of the popup.</p>
      </div>
    </div>
  );
};

export default NewPost;

//fa schimbari la baza de date, adauga tablea imagine postare [id-imagine,imagine_postare, id_postare] pentru a putea avea postari cu mai multe imagini
