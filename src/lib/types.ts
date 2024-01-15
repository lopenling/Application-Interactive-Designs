import { DEMO_ONLY_ROLES } from "@scripts/data/constants";

export type TLangCode = "en";
export type TMetaInformation = {
  lang: TLangCode;
  title?: string;
  description?: string;
  ogImage?: string;
};
export type TLayoutProps = {
  meta?: TMetaInformation;
  htmlClass?: string;
  bodyClass?: string;
};

// Convert array values to union type. E.g ["a", "b"] becomes "a" | "b"
export type TRole = (typeof DEMO_ONLY_ROLES)[number];
