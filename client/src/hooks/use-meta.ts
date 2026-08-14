import { useEffect } from "react";

const SITE = "https://liminalfilms.in";
const DEFAULT_IMAGE = `${SITE}/opengraph.jpg`;

interface MetaOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

function setTag(selector: string, attr: string, key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useMeta({ title, description, path, image }: MetaOptions) {
  useEffect(() => {
    const url = `${SITE}${path}`;
    const img = image ?? DEFAULT_IMAGE;

    document.title = title;

    setTag('meta[name="description"]', "name", "description", description);

    setTag('meta[property="og:title"]', "property", "og:title", title);
    setTag('meta[property="og:description"]', "property", "og:description", description);
    setTag('meta[property="og:url"]', "property", "og:url", url);
    setTag('meta[property="og:image"]', "property", "og:image", img);
    setTag('meta[property="og:type"]', "property", "og:type", "website");
    setTag('meta[property="og:site_name"]', "property", "og:site_name", "Liminal Films");

    setTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setTag('meta[name="twitter:title"]', "name", "twitter:title", title);
    setTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    setTag('meta[name="twitter:image"]', "name", "twitter:image", img);

    setCanonical(url);
  }, [title, description, path, image]);
}
