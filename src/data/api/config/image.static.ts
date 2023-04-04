import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export function getThumbnail(picName: string) {
  return `${publicRuntimeConfig.NEXT_PUBLIC_BE_HOST}/images/${
    picName ? `thumbnails/${picName}` : "default.jpg"
  }`;
}

export function getIcon(picName: string) {
  return `${publicRuntimeConfig.NEXT_PUBLIC_BE_HOST}/images/icons/${picName}`;
}
