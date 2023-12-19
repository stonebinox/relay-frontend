"use client";
import styled from "styled-components";

import { MAX_DESKTOP } from "@/utils/breakpoints";
import { colors } from "@/utils/colors";
import { DOUBLE_BASE_SPACING, BASE_SPACING } from "@/utils/spacing";

export const ScanContainer = styled.div`
  width: 100%;
  max-width: ${MAX_DESKTOP};
  height: auto;
  background-color: ${colors.white};
  border-radius: ${DOUBLE_BASE_SPACING};
  padding: ${BASE_SPACING};
`;

export const ScanInput = styled.input`
  width: 100%;
  height: ${DOUBLE_BASE_SPACING};
  background: rgba(255, 255, 255, 0);
  border: 0;
  font-size: ${DOUBLE_BASE_SPACING};
  color: ${colors.black};
  outline: 0;
  font-family: sans-serif;
`;

export const ScanInputSubtext = styled.div`
  color: ${colors.white};
  margin-top: ${BASE_SPACING};
  margin-left: ${BASE_SPACING};
  font-size: ${BASE_SPACING};
`;
