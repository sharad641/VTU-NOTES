import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { analytics } from "../firebase"; // Firebase Analytics
import { logEvent } from "firebase/analytics"; // Firebase event logging
import { QRCodeCanvas } from "qrcode.react"; // QR code generator
import AdSenseAd from "./AdSenseAd"; 
import CommentSection from "./CommentSection";
import "./PdfViewer.css";

const PdfViewer = () => {
    const { pdfUrl } = useParams(); 
    const decodedPdfUrl = decodeURIComponent(pdfUrl || "");
    const currentPageLink = `${window.location.origin}/pdf-viewer/${encodeURIComponent(pdfUrl || "")}`;

    const [fileName, setFileName] = useState("");
    const [error, setError] = useState(false);

    // Extract file name from URL
    useEffect(() => {
        if (decodedPdfUrl) {
            try {
                const parsedFileName = decodeURIComponent(
                    decodedPdfUrl.split("/").pop().split("?")[0]
                );
                setFileName(parsedFileName);
            } catch {
                setError(true);
            }
        } else {
            setError(true);
        }
    }, [decodedPdfUrl]);

    // Construct Google Drive download link
    const getGoogleDriveDownloadLink = (url) => {
        const fileIdMatch = url.match(/[-\w]{25,}/);
        return fileIdMatch ? `https://drive.google.com/uc?export=download&id=${fileIdMatch[0]}` : null;
    };

    const downloadLink = getGoogleDriveDownloadLink(decodedPdfUrl);

    // Log PDF view event
    useEffect(() => {
        if (decodedPdfUrl) {
            logEvent(analytics, "pdf_view", { pdf_url: decodedPdfUrl });
        }
    }, [decodedPdfUrl]);

    // Handle sharing (Web Share API / Clipboard)
    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: `Check out this PDF: ${fileName}`,
                    text: "Scan this QR code or use the link to view the PDF.",
                    url: currentPageLink,
                });
                logEvent(analytics, "qr_code_shared", { pdf_url: decodedPdfUrl });
            } else {
                await navigator.clipboard.writeText(currentPageLink);
                alert("🔗 Link copied to clipboard!");
                logEvent(analytics, "qr_code_copied", { pdf_url: decodedPdfUrl });
            }
        } catch (error) {
            console.error("Error sharing:", error);
            alert("Failed to share the link.");
        }
    };

    // Handle QR Code Download
    const handleQrCodeDownload = () => {
        const canvas = document.querySelector(".qr-code canvas");
        if (canvas) {
            const link = document.createElement("a");
            link.download = `${fileName}-QRCode.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    if (error) {
        return <p className="error-message">🚫 Error: Unable to load the PDF. Please check the URL and try again.</p>;
    }

    return (
        <div className="pdf-viewer">
            <h2>📄 PDF Viewer</h2>

            {/* PDF Embed */}
            <iframe
                className="pdf-frame"
                src={decodedPdfUrl}
                title="PDF Viewer"
                width="100%"
                height="600px"
                onError={() => setError(true)}
            ></iframe>

            {/* Download & Share Buttons */}
            {downloadLink && (
                <div className="download-button-container">
                    <a className="download-button" href={downloadLink} target="_blank" rel="noopener noreferrer">
                        📥 Download PDF
                    </a>
                    <button className="share-button" onClick={handleShare}>
                        📤 Share Link
                    </button>
                </div>
            )}

            {/* AdSense Ad */}
            <div className="ad-container">
                <AdSenseAd
                    adClient="ca-pub-9499544849301534"
                    adSlot="7579321744"
                    adFormat="auto"
                    fullWidthResponsive={true}
                />
            </div>

            {/* QR Code Sharing */}
            <div className="qr-code-container">
                <h3>📱 Share this PDF</h3>
                <div className="qr-code">
                    <QRCodeCanvas
                        value={currentPageLink}
                        size={150}
                        level="H"
                        bgColor="#ffffff"
                        fgColor="#000000"
                        aria-label={`QR Code for sharing ${fileName}`}
                    />
                </div>
                <p>Scan to open this PDF link on another device.</p>
                <button className="share-button" onClick={handleShare}>
                    📤 Share Link
                </button>
                <button className="qr-code-download" onClick={handleQrCodeDownload} aria-label="Download QR Code">
                    📥 Download QR Code
                </button>
            </div>

            {/* File Metadata */}
            {fileName && (
                <div className="file-info">
                    <p><strong>File Name:</strong> {fileName}</p>
                </div>
            )}

            {/* Comment Section */}
            <CommentSection />
        </div>
    );
};

export default PdfViewer;
