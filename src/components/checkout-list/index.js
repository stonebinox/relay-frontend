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
              fetchedItem.parent = discountItem.parent;
              setItem(fetchedItem);
            });
          });
      }
      return;
    }

    if (type === "qty") {
      const { minQty } = discountRules;
      const target = parsedItems.find((parsedItem) => parsedItem.sku === sku);

      if (target === undefined) return;

      const totalQuantity = items.filter(
        (savedItem) => savedItem.sku === sku
      ).length;

      if (totalQuantity > minQty) {
        const trigger = parseInt(totalQuantity % (minQty + 1), 10);

        if (trigger === 0) {
          const latestItem = items[items.length - 1];

          if (latestItem.price !== 0.0) {
            latestItem.price = 0.0;
            const itemsCopy = items.slice();
            itemsCopy[itemsCopy.length - 1] = latestItem;
            setItems(itemsCopy);
          }
        }
      }

      return;
    }

    if (type === "price") {
      const { minQty } = discountRules;
      const target = parsedItems.find((parsedItem) => parsedItem.sku === sku);

      if (target === undefined) return;

      if (target.quantity > minQty) {
        const { discountPricePerItem } = discountRules;
        let changed = false;
        const itemsCopy = items.map((savedItem) => {
          if (
            savedItem.sku === sku &&
            savedItem.price !== discountPricePerItem
          ) {
            savedItem.originalPrice = savedItem.price;
            savedItem.price = discountPricePerItem;

            changed = true;
          }

          return savedItem;
        });

        if (changed) {
          // to prevent infinite loops
          setItems(itemsCopy);
        }
      } else {
        let changed = false;

        const itemsCopy = items.map((savedItem) => {
          if (
            savedItem.originalPrice &&
            savedItem.originalPrice !== savedItem.price
          ) {
            changed = true;
            savedItem.price = savedItem.originalPrice;
            delete savedItem.originalPrice;
          }

          return savedItem;
        });

        if (changed) {
          setItems(itemsCopy);
        }
      }

      return;
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
        (parsedItem) =>
          parsedItem.sku === savedItem.sku &&
          savedItem.price === parsedItem.price
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

  /**
   * Removes an item from the checkout list.
   *
   * @param {number} index
   * @todo This function is done; some render behaviour has to be changed
   * @returns
   */
  const removeItem = (index) => {
    const parsedCopy = parsedItems.slice();
    const itemsCopy = items.slice();
    const parsedItem = parsedCopy[index];
    const { sku } = parsedItem;

    if (parsedItem.quantity > 1) {
      const reversedItems = itemsCopy.reverse();
      const position = reversedItems.findIndex(
        (reversedItem) => reversedItem.sku === sku
      );

      if (position === -1) return;

      reversedItems.splice(position, 1);
      setItems(reversedItems.reverse());
    } else {
      const position = itemsCopy.findIndex((itemCopy) => itemCopy.sku === sku);

      if (position === -1) return;

      itemsCopy.splice(position, 1);

      setItems(itemsCopy);
    }
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
          {storedItem.currency}{" "}
          {parseFloat(storedItem.quantity * storedItem.price).toFixed(2)}
        </ItemData>
        {/* TODO: <ItemData>
          <a href="#" onClick={() => removeItem(index)}>
            Remove
          </a>
    </ItemData> */}
      </tr>
    ));
  };

  const getTotalQuantity = () => {
    let total = 0;

    for (let i = 0; i < parsedItems.length; i++) {
      const parsed = parsedItems[i];
      total = total + parsed.quantity;
    }

    return total;
  };

  const getTotalInvoiceValue = () => {
    let total = 0.0;

    for (let i = 0; i < parsedItems.length; i++) {
      const parsed = parsedItems[i];
      total = total + parsed.price * parsed.quantity;
    }

    return parseFloat(total).toFixed(2);
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
    <CheckoutContainer data-testid="checkout">
      <table width="100%" border="0">
        <thead>
          <tr>
            <TableHeading>Name</TableHeading>
            <TableHeading>Qty</TableHeading>
            <TableHeading>Rate</TableHeading>
            <TableHeading>Total</TableHeading>
            {/* TODO: <TableHeading>Actions</TableHeading> */}
          </tr>
        </thead>
        <tbody>
          {listItems()}
          <tr>
            <td colSpan={4}>
              <hr />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <TableHeading>Total</TableHeading>
            <TableHeading>{getTotalQuantity()}</TableHeading>
            <TableHeading></TableHeading>
            <TableHeading>{getTotalInvoiceValue()}</TableHeading>
          </tr>
        </tfoot>
      </table>
    </CheckoutContainer>
  );
};
