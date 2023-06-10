import Brightness4Icon from "@mui/icons-material/Brightness4";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import * as React from "react";
import { Toaster } from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { User } from "../types";
// import { mainListItems, secondaryListItems } from './listItems';
// import Chart from './Chart';
// import Deposits from './Deposits';
import Brightness5Icon from "@mui/icons-material/Brightness5";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts/auth";
import { useThemeContext } from "../contexts/theme";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Logicae
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function ProtectedLayout() {
  const [open, setOpen] = React.useState(false);
  const { setTheme, darkTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme(!darkTheme);
    localStorage.setItem("theme", JSON.stringify(!darkTheme));
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  const { user, setUser } = useAuthContext();
  React.useEffect(() => {
    let profile: User;
    if (localStorage.getItem("profile")) {
      const data = localStorage.getItem("profile");
      if (data !== null) {
        profile = JSON.parse(data);
        setUser(profile);
        navigate("/home");
      }
    } else if (!user.token) {
      navigate("/login");
    }

    //    toast.success(`Login Succesfull Welcome ${profile?.username}!`)
  }, []);

  const defaultTheme = createTheme({
    palette: {
      mode: darkTheme ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar color="secondary" position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(!open && { display: "none" }),
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {user.username}
            </Typography>

            <IconButton onClick={() => toggleTheme()} color="inherit">
              <Typography
                component="p"
                color="inherit"
                noWrap
                sx={{ padding: 1 }}
              >
                Theme
              </Typography>
              {darkTheme ? <Brightness5Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton
              onClick={() => {
                localStorage.removeItem("profile");
                navigate("/login");
                setUser({});
              }}
              color="inherit"
            >
              <Typography
                component="p"
                color="inherit"
                noWrap
                sx={{ padding: 1 }}
              >
                Logout
              </Typography>

              <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            {/* <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton> */}
          </Toolbar>
          <Divider />
          {/* <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List> */}
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <Paper sx={{ p: 5, display: "flex", flexDirection: "column" }}>
            <Outlet />
          </Paper>
        </Box>
        <Toaster />
      </Box>
    </ThemeProvider>
  );
}
