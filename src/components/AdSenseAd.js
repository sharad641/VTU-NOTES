import React, { useEffect } from "react";
import PropTypes from "prop-types";

const AdSenseAd = ({ 
  adClient, 
  adSlot, 
  adFormat = "auto", 
  fullWidthResponsive = true, 
  style = {},
  layoutKey = null // Added for Multiplex/In-feed ads
}) => {
  useEffect(() => {
    // Push the ad to the queue
    if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
      try {
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
      } catch (e) {
        // console.error("AdSense Error:", e);
      }
    }
  }, []);

  return (
    <div 
      className="ad-slot-wrapper"
      role="region" 
      aria-label="Advertisement"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "24px 0",
        minHeight: "280px", // ✅ Prevent CLS: Reserve space for standard 300x250 ads
        width: "100%",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.01)" 
      }}
    >
      <span style={{ 
        fontSize: "0.65rem", 
        color: "#64748B", 
        textTransform: "uppercase", 
        letterSpacing: "1.5px", 
        marginBottom: "8px",
        opacity: 0.7
      }}>
        Sponsored
      </span>

      <div style={{ maxWidth: "100%", display: "flex", justifyContent: "center", width: "100%" }}>
        <ins
          className="adsbygoogle"
          style={{ 
            display: "block", 
            minWidth: "250px", // Reduced to fit 320px mobile screens
            width: style.width || "100%", 
            height: style.height || "auto",
            ...style 
          }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
          {...(layoutKey && { "data-ad-layout-key": layoutKey })}
        ></ins>
      </div>
    </div>
  );
};

AdSenseAd.propTypes = {
  adClient: PropTypes.string.isRequired,
  adSlot: PropTypes.string.isRequired,
  adFormat: PropTypes.string,
  fullWidthResponsive: PropTypes.bool,
  style: PropTypes.object,
  layoutKey: PropTypes.string
};

export default AdSenseAd;
