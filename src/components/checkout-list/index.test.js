import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CheckoutList } from ".";

// Mock the fetch function
global.fetch = jest.fn();

const mockItem = {
  sku: "vga",
  name: "VGA Adapter",
  price: 30.0,
  currency: "USD",
};

const mockItem2 = {
  sku: "mbp",
  name: "MacBook Pro",
  price: 1399.99,
  currency: "USD",
  discountRules: {
    type: "item",
    minQty: 0,
    items: [
      {
        itemSku: "vga",
        itemQty: 1,
        price: 0.0,
      },
    ],
  },
};

describe("CheckoutList", () => {
  test("renders CheckoutList component", () => {
    render(<CheckoutList item={null} setItem={() => {}} />);
    expect(screen.getByTestId("checkout")).toBeInTheDocument();
  });

  test("adds item to list on item update", () => {
    const setItemMock = jest.fn();
    render(<CheckoutList item={mockItem} setItem={setItemMock} />);

    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
  });
});
