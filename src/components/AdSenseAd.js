import React, { useEffect } from "react";
import PropTypes from "prop-types";

const AdSenseAd = ({ adClient, adSlot, adFormat = "auto", fullWidthResponsive = true, style = {} }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // console.error("AdSense error: ", e);
      }
    }
  }, []);

  return (
    <div 
      className="ad-slot-container" 
      style={{ 
        textAlign: "center", 
        margin: "24px 0",
        minHeight: "280px", // CLS Protection
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        borderRadius: "12px",
        overflow: "hidden",
        ...style 
      }}
    >
      <span style={{ 
        fontSize: "0.6rem", 
        color: "#64748B", 
        textTransform: "uppercase", 
        letterSpacing: "1px",
        marginBottom: "8px",
        display: "block"
      }}>
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minWidth: "300px", width: "100%" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      ></ins>
    </div>
  );
};

// Prop validation
AdSenseAd.propTypes = {
  adClient: PropTypes.string.isRequired,
  adSlot: PropTypes.string.isRequired,
  adFormat: PropTypes.string, 
  fullWidthResponsive: PropTypes.bool,
  style: PropTypes.object
};

export default AdSenseAd;
