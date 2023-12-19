"use client";
import styled from "styled-components";

import { colors } from "@/utils/colors";
import { MAX_DESKTOP } from "@/utils/breakpoints";
import {
  DOUBLE_BASE_SPACING,
  BASE_SPACING,
  QUARTER_BASE_SPACING,
  HALF_BASE_SPACING,
} from "@/utils/spacing";

export const CheckoutContainer = styled.div`
  width: 100%;
  max-width: ${MAX_DESKTOP};
  margin: 0 auto;
  height: auto;
  background: ${colors.white};
  border-radius: ${DOUBLE_BASE_SPACING};
  padding: ${BASE_SPACING};
  margin-top: ${BASE_SPACING};
`;

export const TableHeading = styled.td`
  color: ${colors.black};
  font-weight: bold;
`;

export const ItemData = styled.td`
  color: ${colors.black};
`;
