import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import App from "./App";

test("The homepage is rendered error free", () => {
  render(<App />);

  expect(screen.getByText("Gründlicher Entwickler")).toBeInTheDocument();
  expect(screen.getByText("Career Highlights")).toBeInTheDocument();
  expect(screen.getByText("Hit Me Up about..")).toBeInTheDocument();
});
