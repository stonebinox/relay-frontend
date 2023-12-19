"use client";
import React, { useState } from "react";

import { LayoutContainer } from "./index.styles";
import { Scan } from "../scan";
import { CheckoutList } from "../checkout-list";

export const MainLayout = () => {
  const [item, setItem] = useState(null);

  return (
    <LayoutContainer>
      <Scan setItem={setItem} />
      <CheckoutList setItem={setItem} item={item} />
    </LayoutContainer>
  );
};
