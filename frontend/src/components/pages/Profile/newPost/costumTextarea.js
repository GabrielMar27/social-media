import React from "react";
import { TextareaAutosize } from "@mui/material";

const CustomTextarea = ({ value, onChange }) => {
  return (
    <TextareaAutosize
      minRows={3}
      placeholder="Ce gândești?"
      value={value}
      onChange={onChange}
      style={{
        width: "320px",
        height: "100px",
        resize: "none",
        overflow: "auto",
        fontSize: "0.875rem",
        fontWeight: "400",
        lineHeight: "1.5",
        padding: "8px 12px",
        borderRadius: "8px",
        color: "#1C2025", // Ajustează culorile conform temei
        background: "#fff",
        border: "1px solid #DAE2ED",
        boxShadow: "0px 2px 2px #F3F6F9",
        "&:hover": {
          borderColor: "#3399FF",
        },
        "&:focus": {
          borderColor: "#3399FF",
          boxShadow: "0 0 0 3px #b6daff",
        },
        "&:focus-visible": {
          outline: "0",
        },
      }}
    />
  );
};
export default CustomTextarea;
