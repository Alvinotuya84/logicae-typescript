import { TrainOutlined } from "@material-ui/icons";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { Joke, JokeEntries, JokesInitialState } from "../types";
import * as API from './API'
import {toast} from 'react-hot-toast'



export const getJokes=createAsyncThunk(
    "jokes/getJokes",
    async (args:any) => {
      try {
        const response = await API.getJokes(args);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch jokes.');
      }
    }
)
export const addJoke=createAsyncThunk(
  "jokes/addJoke",
  async (formData:JokeEntries) => {
    try {
      const response = await API.addJoke(formData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to Add new joke.');
    }
  }
)

export const updateJoke=createAsyncThunk(
  "jokes/updateJoke",
  async (formData:JokeEntries) => {
    try {
      const response = await API.updateJoke(formData,formData.id);
      return response.data;
    } catch (error) {
      throw new Error('Failed to Add new joke.');
    }
  }
)

export const deleteJoke=createAsyncThunk(
  "jokes/deleteJoke",
  async (id:number) => {
    try {
      const response = await API.deleteJoke(id);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete.');
    }
  }
)

const initialState:JokesInitialState={
  loading:false,  
  jokes: [],
  error: "",
}
const jokeSlice = createSlice({
    name: 'jokes',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getJokes.fulfilled, (state, { payload }) => {
        state.loading = false
        state.jokes = payload

      })
      builder.addCase(getJokes.rejected, (state, action) => {
        state.loading=false
          state.error = "Something went wrong please reload the page and try again"

      })
      builder.addCase(getJokes.pending, (state, action) => {
        state.loading=true
      })
      builder.addCase(addJoke.fulfilled, (state, { payload }) => {
        state.loading = false
        state.jokes = [...state.jokes, payload]
        toast.success(`Joke Added succesfully`)


      })
      builder.addCase(addJoke.rejected, (state, action) => {
        state.loading=false
          state.error = "Something went wrong please reload the page and try again"
          toast.error(`error Adding Joke`)
      })
      builder.addCase(addJoke.pending, (state, action) => {
        state.loading=true
      })
      builder.addCase(updateJoke.fulfilled, (state, { payload }) => {
        state.loading = false
        state.jokes = [...state.jokes, payload]
        toast.success(`Joke updated succesfully`)


      })
      builder.addCase(updateJoke.rejected, (state, action) => {
        state.loading=false
          state.error = "Something went wrong please reload the page and try again"
          toast.error(`error updating Joke`)
      })
      builder.addCase(updateJoke.pending, (state, action) => {
        state.loading=true
      })
      builder.addCase(deleteJoke.fulfilled, (state, { payload }) => {
        state.loading = false
        state.jokes = [...state.jokes, payload]
        toast.success(`Joke deleted succesfully`)


      })
      builder.addCase(deleteJoke.rejected, (state, action) => {
        state.loading=false
          state.error = "Something went wrong please reload the page and try again"
          toast.error(`error deleting Joke`)
      })
      builder.addCase(deleteJoke.pending, (state, action) => {
        state.loading=true
      })
    },
  })

  export default   jokeSlice.reducer;
