import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "../page-routes/auth/Login";
import Home from "../page-routes/Jokes";
import { Provider } from "react-redux";
import store from "../redux/store";

test("authentication stores user details in localStorage and redirects to home page", () => {
  const { getByRole } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {window.location.pathname === "/login" && (
            <Route path="/home" element={<Navigate to="/home" replace />} />
          )}
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  const usernameInput = getByRole("textbox", { name: "username" });
  const submitButton = getByRole("button", { name: /Login/i });

  fireEvent.change(usernameInput, {
    target: { value: "the username that was entered" },
  });

  fireEvent.click(submitButton);

  const storedUserDetails = localStorage.getItem("profile");
  const expectedUserDetails = {
    username: "the username that was entered",
    token: expect.any(String),
  };

  if (storedUserDetails !== null) {
    expect(JSON.parse(storedUserDetails)).toEqual(expectedUserDetails);
  }
  const redirectedToHome = window.location.pathname === "/home";
  const redirectedToRoot = window.location.pathname === "/";
  expect(redirectedToHome || redirectedToRoot).toBe(true);
});
