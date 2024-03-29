import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginDB } from "../../../functions/dbAcctions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LinkMui from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//test
//test
const defaultTheme = createTheme();

const Login = () => {
  const [dataUser, setDataUser] = useState({ email: "", parola_cont: "" });
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginDB(dataUser);
      const data = response[0][0];
      if (data !== undefined) {
        sessionStorage.setItem("user_id", data.id_user);
        sessionStorage.setItem("userLoggedIn", true);
        navigate("/");
      } else {
        alert("Datele de conectare introduse greșit");
      }
    } catch (error) {
      console.error("Eroare la autentificare:", error);
      alert(
        "A apărut o eroare la autentificare. Vă rugăm să încercați din nou."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setDataUser((prevState) => {
      if (prevState) {
        const lowercasedValue = ["email"].includes(name)
          ? value.toLowerCase()
          : value;
        return { ...prevState, [name]: lowercasedValue };
      }
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => handleChange(event)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="parola_cont"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => handleChange(event)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <LinkMui href="#" variant="body2">
                  Forgot password?
                </LinkMui>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
