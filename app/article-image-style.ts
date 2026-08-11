import type { CSSProperties } from "react";

type ArticleImageStyle = CSSProperties & {
  "--image-x": string;
  "--image-y": string;
  "--image-scale": string;
  "--image-saturation": string;
  "--image-contrast": string;
};

export function articleImageStyle(slug: string): ArticleImageStyle {
  let hash = 2166136261;
  for (const character of slug) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  const value = hash >>> 0;
  return {
    "--image-x": "50%",
    "--image-y": "50%",
    "--image-scale": "1",
    "--image-saturation": (0.94 + ((value >>> 14) % 7) / 100).toFixed(2),
    "--image-contrast": (1.01 + ((value >>> 18) % 5) / 100).toFixed(2),
  };
}
