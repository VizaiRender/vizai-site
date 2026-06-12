"use client";

import { useEffect } from "react";

// Carrega o GTM (via Stape) somente após consentimento no banner de cookies.
// Os pushes em dataLayer feitos antes do load ficam enfileirados no array
// e são processados pelo GTM assim que o script entra.
const GTM_PARAM =
  "e1woubx=AwhbKyE%2FRCVcODY4M0E9TRxRVEJEVA0FVxoPFhQbGw4ECAMeWxEGBg%3D%3D";

function loadGtm() {
  if (document.getElementById("gtm-script")) return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const j = document.createElement("script");
  j.id = "gtm-script";
  j.async = true;
  j.src = `https://sst.vizairender.com/2qokirulflj.js?${GTM_PARAM}`;
  document.head.appendChild(j);
}

export function TrackingScripts() {
  useEffect(() => {
    if (localStorage.getItem("cookie-consent") === "true") loadGtm();
    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail === true) loadGtm();
    };
    window.addEventListener("vizai-consent", onConsent);
    return () => window.removeEventListener("vizai-consent", onConsent);
  }, []);
  return null;
}
