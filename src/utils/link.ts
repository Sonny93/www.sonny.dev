import { PATH_BG_IMG, PATH_BG_PROJETS } from "config";

export function buildProjectImageUrl(image: string) {
  return PATH_BG_PROJETS + "/" + image;
}
export function buildBackgroundImageUrl(image: string) {
  return PATH_BG_IMG + "/" + image;
}
