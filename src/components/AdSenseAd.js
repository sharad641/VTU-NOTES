import React, { useEffect } from "react";
import PropTypes from "prop-types";

const AdSenseAd = ({ adClient, adSlot }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    const initializeAds = () => {
      if (window.adsbygoogle) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense error: ", e);
        }
      }
    };

    if (process.env.NODE_ENV === "production") {
      initializeAds();
    }

    // Clean up the script on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "320px", // Adjust this for mobile devices
          margin: "0 auto",
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <p style={{ fontSize: "0.8rem", color: "#666" }}>
        Ads may not display in simplified or reader views.
      </p>
    </div>
  );
};

// Prop validation
AdSenseAd.propTypes = {
  adClient: PropTypes.string.isRequired,
  adSlot: PropTypes.string.isRequired,
};

export default AdSenseAd;
