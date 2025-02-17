import { render, screen } from "@testing-library/react";
import Mars from "../Pages/Mars";

test("🔹 Mars Rover page should render correctly", () => {
  render(<Mars />);
  expect(screen.getByText(/Mars Rover Exploration/i)).toBeInTheDocument();
});
