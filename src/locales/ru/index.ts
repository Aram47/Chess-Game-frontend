import { buildLocale } from "../buildLocale";
import { ruAbout } from "./about";
import { ruCommon } from "./common";
import { ruApp } from "./app";
import { ruFeatures } from "./features";

export const ru = buildLocale({
  ...ruAbout,
  ...ruCommon,
  ...ruApp,
  ...ruFeatures,
});
