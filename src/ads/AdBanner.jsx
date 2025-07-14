import { useEffect, useRef } from "react";

export default function AdBanner() {
  const adRef = useRef(null);

  useEffect(() => {
    // inicia solo una vez
    let pushed = false;
    const t = setTimeout(() => {
      try {
        if (!pushed && window.adsbygoogle && adRef.current.offsetWidth) {
          window.adsbygoogle.push({});
          pushed = true;
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }, 300); // 300 ms suele bastar para que el layout esté listo

    return () => clearTimeout(t);
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block", width: "100%", maxWidth: 728, height: 90 }}
      data-ad-client="ca-pub-3213722704392473"
      data-ad-slot="4055786692"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
