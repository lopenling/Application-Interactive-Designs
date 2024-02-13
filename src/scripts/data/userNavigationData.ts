import { type AstroGlobal } from "astro";
import getUrlParams from "@scripts/helpers/getUrlParams";
import getCurrentPath from "@scripts/helpers/getCurrentPath";

export type TUserNavigationData = {
  name: string;
  href: string;
  get current(): boolean;
}[];

export default function userNavigationData(Astro: AstroGlobal) {
  const urlParams = getUrlParams(Astro);
  const currentPath = getCurrentPath(Astro);

  const data: TUserNavigationData = [
    {
      name: "My account",
      href: "/my-account" + "?" + urlParams,
      get current() {
        return this.href.split("?")[0] === currentPath;
      },
    },
    {
      name: "Teams",
      href: "/teams" + "?" + urlParams,
      get current() {
        return this.href.split("?")[0] === currentPath;
      },
    },
  ];
  return data;
}
