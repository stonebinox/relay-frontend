"use client";
import React, { useState } from "react";

import { ScanContainer, ScanInput, ScanInputSubtext } from "./index.styles";

export const Scan = () => {
  const [sku, setSku] = useState("");

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
    }
  };

  return (
    <div>
      <ScanContainer>
        <ScanInput
          type="text"
          name="sku"
          placeholder="Enter a SKU"
          onChange={(e) => setSku(e.currentTarget.value)}
          onKeyUp={handleSubmit}
        />
      </ScanContainer>
      <ScanInputSubtext>Hit Enter to scan SKU</ScanInputSubtext>
    </div>
  );
};
