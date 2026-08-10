"use client";

import { useCallback, useSyncExternalStore } from "react";

type BannerSize = "728x90" | "468x60" | "320x50" | "300x250" | "160x300" | "160x600";

const banners: Record<BannerSize, { key: string; width: number; height: number }> = {
  "728x90": { key: "3117dee9a689668a6c7f698f12974ee9", width: 728, height: 90 },
  "468x60": { key: "a665a9d58569e2b23d093be0feb83799", width: 468, height: 60 },
  "320x50": { key: "a0f1d6d0ee912c6912c612d82c75b218", width: 320, height: 50 },
  "300x250": { key: "b6fabad459005a4fbe6936fdda872ee2", width: 300, height: 250 },
  "160x300": { key: "2a82c61a162f46fa62d7413d65330df9", width: 160, height: 300 },
  "160x600": { key: "11a6ed6e46201242885daf7ca7eda27d", width: 160, height: 600 },
};

function bannerDocument({ key, width, height }: { key: string; width: number; height: number }) {
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;width:${width}px;height:${height}px;overflow:hidden;background:transparent}</style></head><body><script>atOptions={'key':'${key}','format':'iframe','height':${height},'width':${width},'params':{}};</script><script src="https://www.highperformanceformat.com/${key}/invoke.js"></script></body></html>`;
}

export function AdsterraBanner({ size, placement }: { size: BannerSize; placement: string }) {
  const config = banners[size];
  return (
    <iframe
      className="adsterraFrame"
      srcDoc={bannerDocument(config)}
      title={`Advertisement — ${placement}`}
      width={config.width}
      height={config.height}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
      scrolling="no"
    />
  );
}

function useViewportMatch(query: string) {
  const subscribe = useCallback((callback: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
  }, [query]);
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore<boolean | null>(subscribe, getSnapshot, () => null);
}

export function AdsterraResponsiveBanner({
  desktopSize,
  mobileSize,
  placement,
  breakpoint = 720,
}: {
  desktopSize: BannerSize;
  mobileSize: BannerSize;
  placement: string;
  breakpoint?: number;
}) {
  const isMobile = useViewportMatch(`(max-width: ${breakpoint}px)`);
  if (isMobile === null) return <div className="adPending" aria-hidden="true" />;
  return <AdsterraBanner size={isMobile ? mobileSize : desktopSize} placement={placement} />;
}

const nativeKey = "b06ed254f7a4c2a25dfe5a921796890a";

export function AdsterraNative({ placement }: { placement: string }) {
  const source = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent;font-family:Arial,sans-serif}</style></head><body><script async data-cfasync="false" src="https://pl30789006.effectivecpmnetwork.com/${nativeKey}/invoke.js"></script><div id="container-${nativeKey}"></div></body></html>`;
  return (
    <iframe
      className="adsterraNativeFrame"
      srcDoc={source}
      title={`Native advertisement — ${placement}`}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
      scrolling="no"
    />
  );
}
