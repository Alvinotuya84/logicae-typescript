import CloseIcon from "@mui/icons-material/Close";
import TrashIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { addJoke, deleteJoke, updateJoke } from "../redux/jokesSlice";
import { AppDispatch, RootState } from "../redux/store";
import { convertDateToTimeStamp, inputFormartedDate } from "../utils/functions";
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
      <Link color="inherit" href="/">
        Logicae
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function AddEditJoke() {
  const { darkTheme } = useThemeContext();

  const defaultTheme = createTheme({
    palette: {
      mode: darkTheme ? "dark" : "light",
    },
  });
  const { loading } = useSelector((state: RootState) => state.jokes);

  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = React.useState(location?.state?.joke?.Title);
  const [views, setViews] = React.useState(location?.state?.joke?.Views);
  const [author, setAuthor] = React.useState(location?.state?.joke?.Author);
  const [body, setBody] = React.useState(location?.state?.joke?.Body);

  const [createdAt, setCreatedAt] = React.useState(
    inputFormartedDate(location?.state?.joke?.CreatedAt)
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (!location?.state?.editMode) {
      dispatch(
        addJoke({
          Title: data.get("title"),
          Views: data.get("views"),
          Body: data.get("body"),
          Author: data.get("author"),
          CreatedAt: new Date(),
        })
      );
    } else {
      dispatch(
        updateJoke({
          id: location?.state.joke?.id,
          Title: data.get("title"),
          Views: data.get("views"),
          Author: data.get("author"),
          Body: data.get("body"),
          CreatedAt: convertDateToTimeStamp(data.get("created_at")),
        })
      );
    }
  };

  React.useEffect(() => {}, []);

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
            {location.state.editMode ? "Update" : "Add"}
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
              id="title"
              label="Title"
              name="title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="author"
              label="Author"
              type="text"
              id="author"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="body"
              label="Body"
              type="textarea"
              id="body"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="views"
              label="Views"
              type="number"
              id="views"
              onChange={(e) => setViews(e.target.value)}
              value={views}
            />
            {location?.state?.editMode && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="created_at"
                label="Created At"
                type="date"
                id="created_at"
                onChange={(e) => setCreatedAt(e.target.value)}
                value={createdAt}
              />
            )}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              disabled={loading}
            >
              {loading && <CircularProgress />}
              {location?.state?.editMode ? "Update Joke" : "Add Joke"}
            </Button>
          </Box>
          {location?.state?.editMode && (
            <Button
              onClick={() => {
                if (confirm("Are you sure you want to delete this Joke?")) {
                  dispatch(deleteJoke(location?.state?.joke?.id));
                } else {
                }
              }}
              color="error"
              sx={{
                margin: 3,
              }}
              endIcon={<TrashIcon />}
              disabled={loading}
            >
              Delete
            </Button>
          )}
          <Button
            onClick={() => navigate("/home")}
            variant="contained"
            sx={{
              margin: 3,
            }}
            endIcon={<CloseIcon />}
          >
            Close
          </Button>{" "}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
