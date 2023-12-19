import pixelToRem from "./pixel-to-rem";

const MAX_PHONE_PX = 428;

const MAX_PHONE = pixelToRem(`${MAX_PHONE_PX}px`);
const MIN_TABLET = pixelToRem("429px");
const MAX_TABLET = pixelToRem("768px");
const MIN_DESKTOP = pixelToRem("769px");
const MAX_DESKTOP = pixelToRem("1280px");

const STORYBOOK_VIEWPORTS = [320, 428, 768, 1280];

const MOBILE_VIEWPORTS = [320, 428];
const DESKTOP_VIEWPORTS = [429, 1280];

export {
  MAX_PHONE_PX,
  MAX_PHONE,
  MIN_TABLET,
  MAX_TABLET,
  MIN_DESKTOP,
  MAX_DESKTOP,
  STORYBOOK_VIEWPORTS,
  MOBILE_VIEWPORTS,
  DESKTOP_VIEWPORTS,
};
