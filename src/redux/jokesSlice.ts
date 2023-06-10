import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { JokeEntries, JokesInitialState } from "../types";
import * as API from "./API";
import { redirect } from "react-router-dom";

export const getJokes = createAsyncThunk(
  "jokes/getJokes",
  async (args: any) => {
    try {
      const response = await API.getJokes(args);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch jokes.");
    }
  }
);
export const addJoke = createAsyncThunk(
  "jokes/addJoke",
  async (formData: JokeEntries) => {
    try {
      const response = await API.addJoke(formData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to Add new joke.");
    }
  }
);

export const updateJoke = createAsyncThunk(
  "jokes/updateJoke",
  async (formData: JokeEntries) => {
    try {
      const response = await API.updateJoke(formData, formData.id);
      return response.data;
    } catch (error) {
      throw new Error("Failed to Add new joke.");
    }
  }
);

export const deleteJoke = createAsyncThunk(
  "jokes/deleteJoke",
  async (id: number) => {
    try {
      const response = await API.deleteJoke(id);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete.");
    }
  }
);

const initialState: JokesInitialState = {
  loading: false,
  jokes: [],
  error: "",
};
const jokeSlice = createSlice({
  name: "jokes",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getJokes.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.jokes = payload;
    });
    builder.addCase(getJokes.rejected, (state) => {
      state.loading = false;
      state.error = "Something went wrong please reload the page and try again";
    });
    builder.addCase(getJokes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addJoke.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.jokes = [...state.jokes, payload];
      toast.success(`Joke Added succesfully`);
      setTimeout(() => {
        window.location.replace("/home");
      }, 1000);
    });
    builder.addCase(addJoke.rejected, (state) => {
      state.loading = false;
      state.error = "Something went wrong please reload the page and try again";
      toast.error(`error Adding Joke`);
      setTimeout(() => {
        window.location.replace("/home");
      }, 1000);
    });
    builder.addCase(addJoke.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateJoke.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.jokes = [...state.jokes, payload];
      toast.success(`Joke updated succesfully`);

      setTimeout(() => {
        window.location.replace("/home");
      }, 1000);
    });
    builder.addCase(updateJoke.rejected, (state) => {
      state.loading = false;
      state.error = "Something went wrong please reload the page and try again";
      toast.error(`error updating Joke`);
      setTimeout(() => {
        window.location.replace("/home");
      }, 1000);
    });
    builder.addCase(updateJoke.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteJoke.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.jokes = [...state.jokes, payload];
      toast.success(`Joke deleted succesfully`);
      redirect("/home");
      setTimeout(() => {
        window.location.replace("/home");
      }, 1000);
    });
    builder.addCase(deleteJoke.rejected, (state) => {
      state.loading = false;
      state.error = "Something went wrong please reload the page and try again";
      toast.error(`error deleting Joke`);

      setTimeout(() => {
        redirect("/home");
      }, 1000);
      setTimeout(() => {
        window.location.replace("/home");
      }, 1000);
    });
    builder.addCase(deleteJoke.pending, (state) => {
      state.loading = true;
    });
  },
});

export default jokeSlice.reducer;
