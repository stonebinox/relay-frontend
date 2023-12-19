import React from "react";

import { LayoutContainer } from "./index.styles";
import { Scan } from "../scan";
import { CheckoutList } from "../checkout-list";

export const MainLayout = () => (
  <LayoutContainer>
    <Scan />
    <CheckoutList />
  </LayoutContainer>
);
