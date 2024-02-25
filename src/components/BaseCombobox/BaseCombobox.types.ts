export type TProps = {
  options?: TOption[];
  storeKey?: string;
};

export type TOption = null | {
  id: number;
  value: string;
  selected?: boolean;
};
