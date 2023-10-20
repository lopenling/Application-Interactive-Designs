export type TProps = {
  attributes?: Record<string, string>;
  storeKey?: string;
  options?: TOption[];
  label?: TLabel;
  input?: TInput;
};

export type TOption = null | {
  id: number;
  value: string;
  selected?: boolean;
};

export type TLabel = {
  attributes?: Record<string, string>;
  text?: string;
};

export type TInput = {
  attributes?: Record<string, string>;
  appearance?: "gray" | "white" | "transparent";
  shadow?: boolean;
};
