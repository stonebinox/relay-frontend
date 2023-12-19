"use client";
import React, { useState, useEffect } from "react";

import { CheckoutContainer, ItemData, TableHeading } from "./index.styles";

export const CheckoutList = ({ item, setItem }) => {
  const [items, setItems] = useState([]);
  const [parsedItems, setParsedItems] = useState([]);

  const checkDiscountRules = () => {
    const { discountRules = null, sku } = item;

    if (!discountRules) return;

    const { type } = discountRules;

    if (type === "item") {
      const { minQty, items: discountItems = [] } = discountRules;
      const target = parsedItems.find((parsedItem) => parsedItem.sku === sku);

      if (target === undefined) return;

      if (target.quantity > minQty) {
        const promises = discountItems.map((discount) =>
          fetch(`http://localhost:3000/scan?sku=${discount.itemSku}`)
        );

        Promise.all(promises)
          .then((responses) =>
            Promise.all(responses.map((response) => response.json()))
          )
          .then((data) => {
            if (!data) return;

            data.forEach((fetchedData) => {
              if (fetchedData.success === false) return;

              const { data: fetchedItem } = fetchedData;
              const { sku: fetchedSku } = fetchedItem;
              const discountItem = discountItems.find(
                (discount) => discount.itemSku === fetchedSku
              );

              if (discountItem === undefined) return; // this will never happen; fail-safe though

              const { price: discountPrice } = discountItem;
              fetchedItem.price = discountPrice;
              setItem(fetchedItem);
            });
          });
      }
    }
  };

  const addItem = () => {
    const itemsCopy = items.slice();
    itemsCopy.push(item);
    setItems(itemsCopy);
  };

  const parseItems = () => {
    const newParsedItems = [];

    items.forEach((savedItem, i) => {
      const position = newParsedItems.findIndex(
        (parsedItem) => parsedItem.sku === savedItem.sku
      );

      if (position === -1) {
        newParsedItems.push({ ...savedItem, quantity: 1 });
      } else {
        const parsedItem = newParsedItems[position];
        parsedItem.quantity += 1;
        newParsedItems[position] = parsedItem;
      }
    });

    setParsedItems(newParsedItems);
  };

  const listItems = () => {
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

  useEffect(() => {
    parseItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(() => {
    if (item === null) return;

    checkDiscountRules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedItems]);

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
