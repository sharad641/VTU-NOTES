import React, { useEffect } from "react";
import PropTypes from "prop-types";

const AdSenseAd = ({ adClient, adSlot, adFormat = "auto", fullWidthResponsive = true, style = {} }) => {
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
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "24px 0",
        minHeight: "100px", // Reduced min-height for banners
        width: "100%",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.01)" // Very subtle placeholder
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

      {/* 
        Responsive Wrapper:
        On Desktop: Respects the wide 600px preference if Space allows.
        On Mobile: Forces max-width 100% to prevent overflow.
      */}
      <div style={{ maxWidth: "100%", display: "flex", justifyContent: "center" }}>
        <ins
          className="adsbygoogle"
          style={{ 
            display: "block", 
            minWidth: "300px",
             // If user passes specific 600px width, we use it, but cap it at 100vw for mobile 
             // using the wrapper's constraints.
             // AdSense responsive code usually ignores width if format=auto.
             // But if specific sizing is needed:
            width: style.width || "100%", 
            height: style.height || "auto",
            ...style 
          }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
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
};

export default AdSenseAd;
