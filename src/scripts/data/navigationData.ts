import { type AstroGlobal } from "astro";
import getUrlParams from "@scripts/helpers/getUrlParams";
import getCurrentPath from "@scripts/helpers/getCurrentPath";

export type TNavigationData = {
  name: string;
  href: string;
  get current(): boolean;
}[];

export default function navigationData(Astro: AstroGlobal) {
  const urlParams = getUrlParams(Astro);
  const currentPath = getCurrentPath(Astro);

  const data: TNavigationData = [
    {
      name: "Dashboard",
      href: "/dashboard" + "?" + urlParams,
      get current() {
        return this.href.split("?")[0] === currentPath;
      },
    },
    {
      name: "Translate",
      href: "/translate" + "?" + urlParams,
      get current() {
        return this.href.split("?")[0] === currentPath;
      },
    },
    {
      name: "Projects",
      href: "/projects" + "?" + urlParams,
      get current() {
        return this.href.split("?")[0] === currentPath;
      },
    },
  ];
  return data;
}
