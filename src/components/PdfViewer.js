import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { analytics } from '../firebase'; // Firebase Analytics
import { logEvent } from 'firebase/analytics'; // Firebase event logging
import { QRCodeCanvas } from 'qrcode.react'; // QR code generator
import './PdfViewer.css';
import CommentSection from './CommentSection';

const PdfViewer = () => {
    const { pdfUrl } = useParams(); // Get PDF URL from route params
    const directPdfUrl = decodeURIComponent(pdfUrl || ''); // Decode the URL
    const currentPageLink = `${window.location.origin}/pdf-viewer/${encodeURIComponent(pdfUrl || '')}`; // Construct QR code link

    // Function to construct Google Drive download link from URL
    const getGoogleDriveDownloadLink = (url) => {
        const fileIdMatch = url.match(/[-\w]{25,}/); // Regex to extract file ID
        return fileIdMatch ? `https://drive.google.com/uc?export=download&id=${fileIdMatch[0]}` : null;
    };

    const downloadLink = getGoogleDriveDownloadLink(directPdfUrl); // Construct download link

    // Log PDF view event
    useEffect(() => {
        if (directPdfUrl) {
            logEvent(analytics, 'pdf_view', { pdf_url: directPdfUrl });
        } else {
            console.error('Invalid or missing PDF URL.');
        }
    }, [directPdfUrl]);

    // Handle download event
    const handleDownload = () => {
        if (downloadLink) {
            logEvent(analytics, 'pdf_download', { file_name: directPdfUrl });
        }
    };

    // Handle share event
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Check out this PDF!',
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

    if (!directPdfUrl) {
        return <p>Error: No PDF URL provided.</p>;
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
                allow="autoplay"
            ></iframe>

            {/* Download Button */}
            <div className="download-button-container">
                {downloadLink ? (
                    <a
                        href={downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleDownload}
                    >
                        <button className="download-button">📥 Download PDF</button>
                    </a>
                ) : (
                    <p>Download link unavailable.</p>
                )}
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
                    />
                </div>
                <p>Scan to open this PDF link on another device.</p>
                <button className="share-button" onClick={handleShare}>
                    📤 Share Link
                </button>
            </div>

            {/* Comment Section */}
            <CommentSection />
        </div>
    );
};

export default PdfViewer;
