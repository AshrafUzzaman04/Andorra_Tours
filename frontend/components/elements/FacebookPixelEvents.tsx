"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const FacebookPixelEvents: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID as string | undefined;

  useEffect(() => {
    if (!FACEBOOK_PIXEL_ID) {
      console.warn("Facebook Pixel ID is not defined");
      return;
    }
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(FACEBOOK_PIXEL_ID);
        ReactPixel.pageView();
      })
      .catch((err) => console.error("Error loading react-facebook-pixel", err));
  }, [pathname, searchParams]);

  return null;
};
