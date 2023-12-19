"use client";
import styled from "styled-components";

import { MAX_DESKTOP } from "@/utils/breakpoints";
import { colors } from "@/utils/colors";
import {
  DOUBLE_BASE_SPACING,
  BASE_SPACING,
  QUARTER_BASE_SPACING,
  customSpacing,
} from "@/utils/spacing";

export const ScanContainer = styled.div`
  width: 100%;
  max-width: ${MAX_DESKTOP};
  height: auto;
  background-color: ${colors.white};
  border-radius: ${DOUBLE_BASE_SPACING};
  padding: ${BASE_SPACING};
  border: ${QUARTER_BASE_SPACING} solid ${colors.grey};
  transition: all 0.2s ease;

  &:hover {
    border: ${QUARTER_BASE_SPACING} solid ${colors.amber};
  }
`;

export const ScanInput = styled.input`
  width: 100%;
  height: ${customSpacing(40)};
  background: rgba(255, 255, 255, 0);
  border: 0;
  font-size: ${DOUBLE_BASE_SPACING};
  color: ${colors.black};
  outline: 0;
  font-family: sans-serif;
`;

export const ScanSubtextContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

export const ScanInputSubtext = styled.div`
  color: ${colors.grey};
  margin-top: ${BASE_SPACING};
  margin-left: ${BASE_SPACING};
  font-size: ${BASE_SPACING};
`;

export const ErrorText = styled(ScanInputSubtext)`
  text-align: right;
  color: ${colors.red};
  margin-left: 0;
  margin-right: ${BASE_SPACING};
`;
