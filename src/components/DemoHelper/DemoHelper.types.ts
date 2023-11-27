import { type TProps as TBasicPopoverProps } from "@components/BasicPopover/BasicPopover.types";

export type TProps = {
  attributes?: Record<string, string>;
  button?: TButton;
  popover?: TPopover;
};

export type TButton = {
  attributes?: Record<string, string>;
  name: string;
  href: string;
};

export type TPopover = TBasicPopoverProps & {
  button?: {
    text?: string;
  };
  panel?: {
    html?: string;
  };
};
