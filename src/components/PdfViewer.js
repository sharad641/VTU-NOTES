import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { analytics } from '../firebase'; // Firebase Analytics
import { logEvent } from 'firebase/analytics'; // Firebase event logging
import { QRCodeCanvas } from 'qrcode.react'; // QR code generator
import AdSenseAd from './AdSenseAd'; // Import AdSenseAd Component
import './PdfViewer.css';
import CommentSection from './CommentSection';

const PdfViewer = () => {
    const { pdfUrl } = useParams(); // Get PDF URL from route params
    const directPdfUrl = decodeURIComponent(pdfUrl || ''); // Decode the URL
    const currentPageLink = `${window.location.origin}/pdf-viewer/${encodeURIComponent(pdfUrl || '')}`; // Construct QR code link

    const [error, setError] = useState(false); // State for error handling
    const [fileName, setFileName] = useState(''); // Extracted file name

    // Extract file name from URL
    useEffect(() => {
        if (directPdfUrl) {
            const parsedFileName = decodeURIComponent(
                directPdfUrl.split('/').pop().split('?')[0]
            );
            setFileName(parsedFileName);
        } else {
            setError(true); // Handle missing or invalid URL
        }
    }, [directPdfUrl]);

    // Construct Google Drive download link from URL
    const getGoogleDriveDownloadLink = (url) => {
        const fileIdMatch = url.match(/[-\w]{25,}/); // Regex to extract file ID
        return fileIdMatch ? `https://drive.google.com/uc?export=download&id=${fileIdMatch[0]}` : null;
    };

    const downloadLink = getGoogleDriveDownloadLink(directPdfUrl); // Construct download link

    // Log PDF view event
    useEffect(() => {
        if (directPdfUrl) {
            logEvent(analytics, 'pdf_view', { pdf_url: directPdfUrl });
        }
    }, [directPdfUrl]);

    // Handle share event
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Check out this PDF: ${fileName}`,
                    text: 'Scan this QR code or use the link to view the PDF.',
                    url: currentPageLink,
                });
                logEvent(analytics, 'qr_code_shared', { pdf_url: directPdfUrl });
            } catch (error) {
                console.error('Error sharing QR code:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(currentPageLink);
                alert('Link copied to clipboard!');
                logEvent(analytics, 'qr_code_copied', { pdf_url: directPdfUrl });
            } catch (error) {
                console.error('Error copying link to clipboard:', error);
                alert('Failed to copy link.');
            }
        }
    };

    // Handle QR Code Image Download
    const handleQrCodeDownload = () => {
        const canvas = document.querySelector('.qr-code canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = `${fileName}-QRCode.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    if (error) {
        return <p>Error: Unable to load the PDF. Please check the URL and try again.</p>;
    }

    return (
        <div className="pdf-viewer">
            <h2>📄 PDF Viewer</h2>

            

            {/* Embed the PDF in an iframe */}
            <iframe
                className="pdf-frame"
                src={directPdfUrl}
                title="PDF Viewer"
                width="100%"
                height="600px"
                onError={() => setError(true)}
            ></iframe>

            

            {/* Download Button */}
            {downloadLink && (
                <div className="download-button-container">
                    <a className="download-button" href={downloadLink} target="_blank" rel="noopener noreferrer">
                        📥 Download PDF
                    </a>
                     {/* AdSense Ad - Above the PDF Viewer */}
                                     <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="3936951010" />
                </div>
                
            )}

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

            {/* Display File Metadata */}
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
