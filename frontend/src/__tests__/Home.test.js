import { render, screen } from "@testing-library/react";
import Home from "../Pages/Home";
import { MemoryRouter } from "react-router-dom";

test("🔹 Home page should render correctly", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(screen.getByText(/Welcome to NASA Portal/i)).toBeInTheDocument();
});
