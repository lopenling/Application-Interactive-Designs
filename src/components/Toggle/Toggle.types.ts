export type TProps = {
  attributes?: Record<string, string>;
  toggled?: boolean;
  size?: "large" | "medium" | "small";
  appearance?: "primary" | "secondary";
  switch?: TSwitch;
  label?: TLabel;
};

export type TSwitch = {
  attributes?: Record<string, string>;
};

export type TLabel = {
  attributes?: Record<string, string>;
  passive?: boolean;
  toggleOpacity?: boolean;
  text?: string;
  textExtra?: string;
};
