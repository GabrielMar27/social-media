import {
  Button,
  FormLabel,
  TextField,
  TextareaAutosize as BaseTextareaAutosize,
} from "@mui/material";
import { styled } from "@mui/system";
import "./popUpStyle.css";

const NewPost = ({ onClose }) => {
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 320px; 
    height: 100px;
    resize: none;
    overflow: auto;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
    @media (max-width: 600px) {
      width: 100%; // Lățimea se ajustează la dimensiunea containerului
      height: 80px; // Înălțime mai mică pentru spațiu limitat
    }
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );
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
        <div className="popup-Body">
          <TextField id="standard-basic" label="Title" variant="outlined" />
          <Textarea
            style={{ marginTop: "10px" }}
            fixated
            aria-label="Demo input"
            minRows={3}
            variant="outlined"
            placeholder="What's in your mind"
          />
        </div>
      </div>
    </div>
  );
};

export default NewPost;

//fa schimbari la baza de date, adauga tablea imagine postare [id-imagine,imagine_postare, id_postare] pentru a putea avea postari cu mai multe imagini
