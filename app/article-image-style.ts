import type { CSSProperties } from "react";

type ArticleImageStyle = CSSProperties & {
  "--image-x": string;
  "--image-y": string;
  "--image-scale": string;
  "--image-saturation": string;
  "--image-contrast": string;
  "--image-tint": string;
};

const tints = [
  "rgba(240, 68, 47, .10)",
  "rgba(168, 240, 238, .10)",
  "rgba(255, 215, 74, .09)",
  "rgba(198, 183, 255, .10)",
  "rgba(17, 17, 15, .05)",
];

export function articleImageStyle(slug: string): ArticleImageStyle {
  let hash = 2166136261;
  for (const character of slug) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  const value = hash >>> 0;
  return {
    "--image-x": `${32 + (value % 37)}%`,
    "--image-y": `${34 + ((value >>> 5) % 33)}%`,
    "--image-scale": (1.02 + ((value >>> 10) % 9) / 100).toFixed(2),
    "--image-saturation": (0.9 + ((value >>> 14) % 19) / 100).toFixed(2),
    "--image-contrast": (0.96 + ((value >>> 18) % 13) / 100).toFixed(2),
    "--image-tint": tints[(value >>> 22) % tints.length],
  };
}
