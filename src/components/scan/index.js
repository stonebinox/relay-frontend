"use client";
import React, { useState } from "react";

import {
  ErrorText,
  ScanContainer,
  ScanInput,
  ScanInputSubtext,
  ScanSubtextContainer,
} from "./index.styles";

export const Scan = ({ setItem }) => {
  const [sku, setSku] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      setError("");
      fetch(`http://localhost:3000/scan?sku=${sku}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data) throw new Error("Unknown error");

          const { success } = data;

          if (success === false) {
            const { message } = data;
            setError(message);
            setItem(null);
          } else {
            const { data: item } = data;
            setItem(item);
          }
        })
        .catch((e) => console.error(e))
        .finally(() => setSku(""));
    }
  };

  return (
    <div data-testid="scan">
      <ScanContainer>
        <ScanInput
          type="text"
          name="sku"
          placeholder="Enter a SKU"
          onChange={(e) => setSku(e.currentTarget.value)}
          onKeyUp={handleSubmit}
          value={sku}
          data-testid="sku"
        />
      </ScanContainer>
      <ScanSubtextContainer>
        <ScanInputSubtext>Hit Enter to scan SKU</ScanInputSubtext>
        <ErrorText>{error}</ErrorText>
      </ScanSubtextContainer>
    </div>
  );
};
