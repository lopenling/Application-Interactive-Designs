export type TProps = {
  attributes?: Record<string, string>;
  position?: "top" | "bottom";
  button?: {
    attributes?: Record<string, string>;
  };
  panel?: {
    attributes?: Record<string, string>;
    width?: number;
  };
};
