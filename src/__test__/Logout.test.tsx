import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import ProtectedLayout from "../page-routes/ProtectedLayout";
import { AuthProvider } from "../contexts/auth";

test("clicking logout button deletes user profile from localStorage", () => {
  const initialUserProfile = {
    username: "testuser",
    token: "testtoken",
  };
  localStorage.setItem("profile", JSON.stringify(initialUserProfile));

  render(
    <Provider store={store}>
      <AuthProvider>
        <MemoryRouter initialEntries={["/"]}>
          <ProtectedLayout />
        </MemoryRouter>
      </AuthProvider>
    </Provider>
  );

  const logoutButton = screen.getByRole("button", { name: /Logout/i });
  fireEvent.click(logoutButton);

  const storedUserProfile = localStorage.getItem("profile");
  expect(storedUserProfile).toBeNull();
});
