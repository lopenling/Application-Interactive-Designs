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
