import React, { useEffect } from "react";
import CodeIcon from "@mui/icons-material/Code";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getUserInfo } from "../utils/getUserInfo";
import { getCurrentUser } from "../utils/auth";

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        const userId = getCurrentUser();
        if (userId) {
          try {
            const userData = await getUserInfo(userId);
            setUser(userData);
          } catch (error) {
            console.error("Failed to fetch user information", error);
          }
        }
      };

      fetchUser();
    }
  }, [user, setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon />
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="overline"
              noWrap
              component="div"
              marginLeft={1}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Dev.io
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {user ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={user.avatar}
                alt="Profile"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  marginLeft: 2,
                  display: { xs: "none", md: "inherit", lg: "inherit" },
                }}
              >
                {user.username}
              </Typography>
              <IconButton
                size="large"
                edge="end"
                aria-label="logout"
                aria-haspopup="true"
                color="inherit"
                onClick={handleLogout}
                sx={{ marginLeft: { md: 4 } }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          ) : isLoginPage ? (
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="subtitle1"
                color="inherit"
                sx={{ marginLeft: 2 }}
              >
                Sign Up
              </Typography>
            </Link>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="subtitle1"
                color="inherit"
                sx={{ marginLeft: 2 }}
              >
                Login
              </Typography>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
