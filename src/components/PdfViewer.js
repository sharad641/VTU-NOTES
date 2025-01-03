import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { analytics } from '../firebase'; // Import analytics
import { logEvent } from 'firebase/analytics'; // Import logEvent
import { QRCodeCanvas } from 'qrcode.react'; // Import QR code generator
import './PdfViewer.css';
import CommentSection from './CommentSection';

const PdfViewer = () => {
    const { pdfUrl } = useParams();
    const directPdfUrl = decodeURIComponent(pdfUrl); // Decode the URL for safety

    // Construct the unique link to this page for sharing
    const currentPageLink = `${window.location.origin}/pdf-viewer/${encodeURIComponent(pdfUrl)}`;

    // Function to construct Google Drive download link from URL
    const getGoogleDriveDownloadLink = (url) => {
        const fileIdMatch = url.match(/[-\w]{25,}/); // Regex to extract file ID from the Google Drive URL
        return fileIdMatch ? `https://drive.google.com/uc?export=download&id=${fileIdMatch[0]}` : null;
    };

    const downloadLink = getGoogleDriveDownloadLink(directPdfUrl); // Construct download link for Google Drive

    // Log the PDF view event when the component is rendered
    useEffect(() => {
        logEvent(analytics, 'pdf_view', { pdf_url: directPdfUrl }); // Log the view event
    }, [directPdfUrl]);

    // Function to handle the download event
    const handleDownload = () => {
        if (downloadLink) {
            logEvent(analytics, 'pdf_download', { file_name: directPdfUrl }); // Log the download event
        }
    };

    // Function to handle sharing the QR code link
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Check out this PDF!',
                    text: 'Scan this QR code or use the link to view the PDF.',
                    url: currentPageLink,
                });
                logEvent(analytics, 'qr_code_shared', { pdf_url: directPdfUrl }); // Log the share event
            } catch (error) {
                console.error('Error sharing QR code:', error);
            }
        } else {
            // Fallback: Copy link to clipboard
            try {
                await navigator.clipboard.writeText(currentPageLink);
                alert('Link copied to clipboard!');
                logEvent(analytics, 'qr_code_copied', { pdf_url: directPdfUrl }); // Log the copy event
            } catch (error) {
                console.error('Error copying link to clipboard:', error);
                alert('Failed to copy link.');
            }
        }
    };

    return (
        <div className="pdf-viewer">
            <h2>📄 PDF Viewer</h2>

            {/* Embed the PDF in an iframe for viewing */}
            <iframe
                className="pdf-frame"
                src={directPdfUrl}
                title="PDF Viewer"
                width="100%"
                height="600px"
                allow="autoplay"
            ></iframe>

            <div className="download-button-container">
                {/* Only show the download button if the download link is valid */}
                {downloadLink && (
                    <a 
                        href={downloadLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={handleDownload} // Track the download event
                    >
                        <button className="download-button">
                            📥 Download PDF
                        </button>
                    </a>
                )}
            </div>

            {/* Add a QR code for sharing the current page */}
            <div className="qr-code-container">
                <h3>📱 Share this PDF</h3>
                <div className="qr-code">
                    <QRCodeCanvas
                        value={currentPageLink} // Generate QR code with the current page link
                        size={150} // Larger QR code for better visibility
                        level="H" // High error correction level
                        bgColor="#ffffff" // White background
                        fgColor="#000000" // Black foreground
                    />
                </div>
                <p>Scan to open this PDF link on another device.</p>
                <button className="share-button" onClick={handleShare}>
                    📤 Share Link
                </button>
            </div>

            {/* Add the comment section below the PDF viewer */}
            <CommentSection />
        </div>
    );
};

export default PdfViewer;
