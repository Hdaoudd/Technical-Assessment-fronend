"use client";
import { useRouter } from "next/navigation";
import styles from "./userInformationPage.module.css";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const logout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  return (
    <div className={styles.container}>
      <Button
        type="submit"
        variant="contained"
        sx={{
          position: "absolute",
          top: "60px",
          right: "60px",
          color: "black",
          backgroundColor: "#ccc",
          border: "1px solid #b2b2b2",
          width: "6vw",
          borderRadius: "30px !important",
          "&:hover": {
            backgroundColor: "#efeeee",
          },
        }}
        onClick={() => logout()}
      >
        logout
      </Button>
      <div className={styles.profileCard}>
        <h1 className={styles.profileHeading}>User Profile</h1>
        {user ? (
          <div className={styles.userInfo}>
            <p>
              <span className={styles.label}>Username:</span> {user?.username}
            </p>
            <p>
              <span className={styles.label}>Password:</span> {user?.password}
            </p>
          </div>
        ) : (
          <p>Error fetching user information.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
