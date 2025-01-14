import React, { useEffect } from "react";
import PropTypes from "prop-types";

const AdSenseAd = ({ adClient, adSlot, adFormat = "auto", fullWidthResponsive = true }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error: ", e);
      }
    } else {
      console.warn("AdSense ads are not served in development mode.");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      {/* First Ad */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
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
  adFormat: PropTypes.string, // Optional: Default to "auto"
  fullWidthResponsive: PropTypes.bool, // Optional: Default to true
};

export default AdSenseAd;
