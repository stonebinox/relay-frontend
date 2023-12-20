import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Scan } from ".";

// Mock the fetch function
global.fetch = jest.fn();

describe("Scan", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Scan component", () => {
    render(<Scan setItem={() => {}} />);
    expect(screen.getByTestId("scan")).toBeInTheDocument();
  });

  test("submits form and sets item on successful scan", async () => {
    const setItemMock = jest.fn();
    fetch.mockResolvedValueOnce({
      json: () => ({
        success: true,
        data: {
          name: "test",
          sku: "123",
        },
      }),
    });

    render(<Scan setItem={setItemMock} />);

    const skuInput = screen.getByTestId("sku");
    fireEvent.change(skuInput, { target: { value: "123" } });

    await act(async () => {
      fireEvent.keyUp(skuInput, { keyCode: 13 });
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/scan?sku=123"
    );

    expect(setItemMock).toHaveBeenCalledWith({
      name: "test",
      sku: "123",
    });
  });

  test("handles error on unsuccessful scan", async () => {
    const setItemMock = jest.fn();
    fetch.mockResolvedValueOnce({
      json: () => ({ success: false, message: "Invalid item SKU" }),
    });

    render(<Scan setItem={setItemMock} />);

    const skuInput = screen.getByTestId("sku");
    fireEvent.change(skuInput, { target: { value: "456" } });

    await act(async () => {
      fireEvent.keyUp(skuInput, { keyCode: 13 });
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/scan?sku=456"
    );

    expect(setItemMock).toHaveBeenCalledWith(null);

    expect(screen.getByText("Invalid item SKU")).toBeInTheDocument();
  });
});
