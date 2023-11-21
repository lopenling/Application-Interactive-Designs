export type TProps = {
  attributes?: Record<string, string>;
  button?: TButton;
};

export type TButton = {
  attributes?: Record<string, string>;
  name: string;
  href: string;
};
