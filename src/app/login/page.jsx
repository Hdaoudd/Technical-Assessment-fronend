"use client";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputAdornment } from "@mui/material";
import { TextField, Tooltip, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import Footer from "@/components/footer/Footer";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Image from "next/image";
import axios from "axios";

const LogiForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [switchToSignup, setSwitchToSignup] = useState(false);

  const login = async () => {
    await axios
      .post(
        "http://localhost:4000/api/users/signin",
        {
          username: userName,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .then(async (response) => {
        console.log(response.data, "res");
        localStorage.setItem("user", JSON.stringify(response.data));
        router.push("/userInformationPage");
      })
      .catch((error) => {
        console.log(error);
        if (userName === "" && password !== "") {
          setErrorMessage("Please enter your username to proceed");
        } else if (userName !== "" && password === "") {
          setErrorMessage("Please enter your password to proceed");
        } else if (userName === "" && password === "") {
          setErrorMessage("Please enter your username and password to login");
        } else {
          setErrorMessage("Your login credentials are not correct");
        }
      });
  };
  const signup = async () => {
    await axios
      .post(
        "http://localhost:4000/api/users/signin",
        {
          username: userName,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .then(async (response) => {
        console.log(response.data, "res");
        localStorage.setItem("user", JSON.stringify(response.data));
        router.push("/userInformationPage");
      })
      .catch((error) => {
        console.log(error);
        if (userName === "" && password !== "") {
          setErrorMessage("Please enter your username to proceed");
        } else if (userName !== "" && password === "") {
          setErrorMessage("Please enter your password to proceed");
        } else if (userName === "" && password === "") {
          setErrorMessage("Please enter your username and password to signup");
        } else {
          setErrorMessage(error.response.data.error);
        }
      });
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Image
            layout="intrinsic"
            width={300}
            height={200}
            src="/your logo.jpeg"
            alt="Your Logo"
            priority
          />
          <Typography
            sx={{
              display: "flex",
              fontSize: "24px",
              fontWeight: "bold",
              padding: "10px",
            }}
          >
            {switchToSignup === false ? "Login" : "Signup"}
          </Typography>
          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Box
              sx={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                gap: "2vh",
              }}
            >
              <TextField
                variant="outlined"
                type="text"
                placeholder="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <TextField
                variant="outlined"
                placeholder="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {!showPassword ? (
                        <Tooltip title="Show Password">
                          <VisibilityIcon
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                            style={{
                              cursor: "pointer",
                            }}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Hide Password">
                          <VisibilityOffIcon
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                            style={{
                              cursor: "pointer",
                            }}
                          />
                        </Tooltip>
                      )}
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Box>
          </form>
          <Box sx={{ height: "4vh", marginTop: "1vh" }}>
            <p
              style={{
                color: "red",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </p>
          </Box>
          <Button
            sx={{
              margin: "auto",
              width: "30%",
            }}
            variant="contained"
            onClick={() => (switchToSignup === false ? login() : signup())}
          >
            {switchToSignup === false ? "Login" : "Signup"}
          </Button>
          {switchToSignup === false ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "10pt",
                  color: "gray",
                  marginTop: "0.2vh",
                }}
              >
                Dont have an account ?
              </Typography>

              <Typography
                sx={{
                  fontSize: "12pt",
                  marginLeft: "0.4vw",
                  color: "#0068B1",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
                onClick={() => (setSwitchToSignup(true), setErrorMessage(""))}
              >
                Signup !
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "10pt",
                  color: "gray",
                  marginTop: "0.2vh",
                }}
              >
                Go to
              </Typography>

              <Typography
                sx={{
                  fontSize: "12pt",
                  marginLeft: "0.4vw",
                  color: "#0068B1",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
                onClick={() => (setSwitchToSignup(false), setErrorMessage(""))}
              >
                Login !
              </Typography>
            </Box>
          )}
        </div>
        <Box sx={{ position: "fixed", bottom: "0", width: "100%" }}>
          <Footer />
        </Box>
      </div>
    </div>
  );
};

export default LogiForm;
