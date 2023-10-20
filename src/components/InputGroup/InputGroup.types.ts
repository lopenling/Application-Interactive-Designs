export type TProps = {
  attributes?: Record<string, string>;
  label?: TLabel;
  input?: TInput;
};

export type TLabel = {
  attributes?: Record<string, string>;
  text: string;
};

export type TInput = {
  attributes?: {
    [key: string]: string;
    type: "text" | "email" | "number" | "search" | "password";
    inputmode:
      | "none"
      | "text"
      | "decimal"
      | "numeric"
      | "tel"
      | "search"
      | "email"
      | "url";
  };
  appearance?: "gray" | "white" | "transparent";
  shadow?: boolean;
};
