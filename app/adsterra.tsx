"use client";

import { useCallback, useSyncExternalStore } from "react";

type BannerSize = "728x90" | "468x60" | "320x50" | "300x250" | "160x300" | "160x600";

const banners: Record<BannerSize, { width: number; height: number }> = {
  "728x90": { width: 728, height: 90 },
  "468x60": { width: 468, height: 60 },
  "320x50": { width: 320, height: 50 },
  "300x250": { width: 300, height: 250 },
  "160x300": { width: 160, height: 300 },
  "160x600": { width: 160, height: 600 },
};

export function AdsterraBanner({ size, placement, eager = false }: { size: BannerSize; placement: string; eager?: boolean }) {
  const config = banners[size];
  return (
    <iframe
      className="adsterraFrame"
      src={`/ad-frames/banner-${size}.html`}
      title={`Advertisement — ${placement}`}
      width={config.width}
      height={config.height}
      loading={eager ? "eager" : "lazy"}
      referrerPolicy="strict-origin-when-cross-origin"
      sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
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
  eager = false,
}: {
  desktopSize: BannerSize;
  mobileSize: BannerSize;
  placement: string;
  breakpoint?: number;
  eager?: boolean;
}) {
  const isMobile = useViewportMatch(`(max-width: ${breakpoint}px)`);
  if (isMobile === null) return <div className="adPending" aria-hidden="true" />;
  return <AdsterraBanner size={isMobile ? mobileSize : desktopSize} placement={placement} eager={eager} />;
}

export function AdsterraNative({ placement }: { placement: string }) {
  return (
    <iframe
      className="adsterraNativeFrame"
      src="/ad-frames/native.html"
      title={`Native advertisement — ${placement}`}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      scrolling="no"
    />
  );
}
