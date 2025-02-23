import { Obj } from "@/src/types";

export const generateUrlWithParams = (baseUrl: string, params: Obj) => {
  const queryString = Object.keys(params)
    .filter(
      (key) =>
        params[key] !== undefined && params[key] !== null && params[key] !== ""
    )
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
