import React, { useState } from "react";
import { Persoana } from "../../../classes/Clase";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../functions/dbAcctions";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { Select, RadioGroup, FormControlLabel, Radio } from "@mui/material";
const Register = () => {
  const defaultTheme = createTheme();
  const [newPersoana, setNewPersoana] = useState(Persoana);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const [year, setYear] = useState(currentYear.toString());
  const [month, setMonth] = useState(currentMonth.toString());
  const [day, setDay] = useState(currentDay.toString());
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPersoana((prevState) => {
      if (prevState) {
        const lowercasedValue = ["firstName", "lastName", "email"].includes(
          name
        )
          ? value.toLowerCase()
          : value;
        return { ...prevState, [name]: lowercasedValue };
      }
    });
  };

  const handleDateChange = (type, value) => {
    if (type === "zi") {
      setDay(value);
    } else if (type === "luna") {
      setMonth(value);
    } else if (type === "an") {
      setYear(value);
    }
  };

  const checkDataValidity = () => {
    const checkIfEmail = (text) => {
      var regex =
        /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
      return regex.test(text);
    };

    const checkForEmptyData = () => {
      for (const key in newPersoana) {
        if (!(newPersoana[key] && newPersoana[key].trim())) {
          return false;
        }
      }
      return true;
    };

    const checkPasswordValidity = () => {
      const password = newPersoana.parola_cont;

      return password.length >= 8 && /\d/.test(password);
    };

    return (
      checkForEmptyData() &&
      checkIfEmail(newPersoana.email) &&
      checkPasswordValidity()
    );
  };

  const sendNewPersoana = async (event) => {
    event.preventDefault();

    newPersoana.data_nastere = `${year}-${month}-${day}`;

    if (checkDataValidity()) {
      const response = await register(newPersoana);
      if (response.OK === "Utilizator înregistrat cu succes!") {
        navigate("/login");
      } else if (response.error === "Email-ul există deja în baza de date") {
        alert("Email-ul există deja în baza de date");
      } else {
        alert("Eroare de la server");
      }
    } else {
      alert(
        "Datele utilizatorului nu sunt valide. Verificați toate câmpurile!"
      );
    }
  };

  const generateYearOptions = () => {
    const startYear = 1900;
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
      years.push(
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      );
    }

    return years;
  };

  const generateDayOptions = () => {
    const monthsWith30Days = ["4", "6", "9", "11"];
    const isFebruary = month === "2";
    let maxDays;

    if (monthsWith30Days.includes(month)) {
      maxDays = 30;
    } else if (isFebruary) {
      const isLeapYear =
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      maxDays = isLeapYear ? 29 : 28;
    } else {
      maxDays = 31;
    }

    const days = [];
    for (let day = 1; day <= maxDays; day++) {
      days.push(
        <MenuItem key={day} value={day}>
          {day}
        </MenuItem>
      );
    }

    return days;
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={sendNewPersoana}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="nume"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="prenume"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Select
                  value={day}
                  name="day"
                  fullWidth
                  size="small"
                  onChange={(e) => handleDateChange("zi", e.target.value)}
                >
                  {generateDayOptions()}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  value={month}
                  fullWidth
                  name="month"
                  size="small"
                  onChange={(e) => handleDateChange("luna", e.target.value)}
                >
                  <MenuItem value="1">Ianuarie</MenuItem>
                  <MenuItem value="2">Februarie</MenuItem>
                  <MenuItem value="3">Martie</MenuItem>
                  <MenuItem value="4">Aprilie</MenuItem>
                  <MenuItem value="5">Mai</MenuItem>
                  <MenuItem value="6">Iunie</MenuItem>
                  <MenuItem value="7">Iulie</MenuItem>
                  <MenuItem value="8">August</MenuItem>
                  <MenuItem value="9">Septembrie</MenuItem>
                  <MenuItem value="10">Octombrie</MenuItem>
                  <MenuItem value="11">Noiembrie</MenuItem>
                  <MenuItem value="12">Decembrie</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Select
                  value={year}
                  name="year"
                  fullWidth
                  onChange={(e) => handleDateChange("an", e.target.value)}
                  size="small"
                >
                  {generateYearOptions()}
                </Select>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="parola_cont"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  defaultValue="medium"
                  name="gen"
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="F"
                    control={<Radio size="small" />}
                    label="F"
                  />
                  <FormControlLabel
                    value="M"
                    control={<Radio size="medium" />}
                    label="M"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
