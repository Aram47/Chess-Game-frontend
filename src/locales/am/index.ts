import { buildLocale } from "../buildLocale";
import { amAbout } from "./about";
import { amCommon } from "./common";
import { amApp } from "./app";
import { amFeatures } from "./features";

export const am = buildLocale({
  ...amAbout,
  ...amCommon,
  ...amApp,
  ...amFeatures,
});
