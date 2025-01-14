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
      

      {/* Second Ad */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9499544849301534"
        data-ad-slot="9394966294"
        data-ad-format="autorelaxed"
        data-full-width-responsive="true"
      ></ins>

      {/* Third Ad */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9499544849301534"
        data-ad-slot="7579321744"
        data-ad-format="auto"
        data-full-width-responsive="true"
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
