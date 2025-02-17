import { render, screen } from "@testing-library/react";
import Apod from "../Pages/Apod";

test("🔹 APOD page should render correctly", () => {
  render(<Apod />);
  expect(screen.getByText(/NASA Astronomy Picture of the Day/i)).toBeInTheDocument();
});
