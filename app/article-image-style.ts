import type { CSSProperties } from "react";

type ArticleImageStyle = CSSProperties & {
  "--image-x": string;
  "--image-y": string;
  "--image-scale": string;
};

export function articleImageStyle(slug: string): ArticleImageStyle {
  void slug;
  return {
    "--image-x": "50%",
    "--image-y": "50%",
    "--image-scale": "1",
  };
}
