"use client";
import React, { useState, useEffect } from "react";

import { CheckoutContainer, ItemData, TableHeading } from "./index.styles";

export const CheckoutList = ({ item }) => {
  const [items, setItems] = useState([]);
  console.log(item);

  const addItem = () => {
    const itemsCopy = items.slice();
    itemsCopy.push(item);
    setItems(itemsCopy);
  };

  const parseItems = () => {
    const parsedItems = [];

    items.forEach((savedItem, i) => {
      const position = parsedItems.findIndex(
        (parsedItem) => parsedItem.sku === savedItem.sku
      );

      if (position === -1) {
        parsedItems.push({ ...savedItem, quantity: 1 });
      } else {
        const parsedItem = parsedItems[position];
        parsedItem.quantity += 1;
        parsedItems[position] = parsedItem;
      }
    });

    return parsedItems;
  };

  const listItems = () => {
    const parsedItems = parseItems();

    return parsedItems.map((storedItem, index) => (
      <tr key={index}>
        <ItemData>{storedItem.name}</ItemData>
        <ItemData>{storedItem.quantity}</ItemData>
        <ItemData>
          {storedItem.currency} {storedItem.price}
        </ItemData>
        <ItemData>
          {storedItem.currency} {storedItem.quantity * storedItem.price}
        </ItemData>
      </tr>
    ));
  };

  useEffect(() => {
    if (item === null) return;

    addItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <CheckoutContainer>
      <table width="100%" border="0">
        <thead>
          <tr>
            <TableHeading>Name</TableHeading>
            <TableHeading>Qty</TableHeading>
            <TableHeading>Rate</TableHeading>
            <TableHeading>Total</TableHeading>
          </tr>
        </thead>
        <tbody>{listItems()}</tbody>
      </table>
    </CheckoutContainer>
  );
};
