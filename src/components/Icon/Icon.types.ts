export type TIconData = {
  fill: string;
  stroke: string;
  viewBox: string;
  content: string;
};
export type TProps = {
  attributes?: Record<string, string>;
  data?: TIconData;
};
