import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";

import { MainLayout } from ".";

describe("MainLayout", () => {
  test("renders Scan and CheckoutList components", () => {
    render(<MainLayout />);

    expect(screen.getByTestId("scan")).toBeInTheDocument();
    expect(screen.getByTestId("checkout")).toBeInTheDocument();
  });
});
