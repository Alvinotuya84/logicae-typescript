import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import ProtectedLayout from "../page-routes/ProtectedLayout";
import { AuthProvider } from "../contexts/auth";
import { OverallThemeProvider } from "../contexts/theme";

test("Clicking theme button toggles localstorage theme info", () => {
  const initialTheme = "false";
  localStorage.setItem("theme", initialTheme);

  render(
    <Provider store={store}>
      <OverallThemeProvider>
        <AuthProvider>
          <MemoryRouter initialEntries={["/"]}>
            <ProtectedLayout />
          </MemoryRouter>
        </AuthProvider>
      </OverallThemeProvider>
    </Provider>
  );

  const themeButton = screen.getByRole("button", { name: /ToggleTheme/i });
  fireEvent.click(themeButton);

  const storedThemeAfterToggle1 = localStorage.getItem("theme");
  expect(storedThemeAfterToggle1).toBe("true");

  fireEvent.click(themeButton);

  const storedThemeAfterToggle2 = localStorage.getItem("theme");
  expect(storedThemeAfterToggle2).toBe("false");
});
