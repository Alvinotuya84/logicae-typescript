import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Jokes from "../page-routes/Jokes";
import { configureStore } from "@reduxjs/toolkit";
import { JokesInitialState } from "../types";

const initialState: JokesInitialState = {
  loading: false,
  jokes: [
    {
      id: 1,
      Title: "Joke 1",
      Author: "Author 1",
      CreatedAt: 1686268800000,
      Views: 10,
    },
  ],
  error: "",
};
const store = configureStore({ reducer: { jokes: () => initialState } });

test("renders and displays jokes correctly", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Jokes />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => {
    const jokeTitles = screen.getAllByText(/Joke/i);
    expect(jokeTitles).toHaveLength(initialState.jokes.length);
  });
});
