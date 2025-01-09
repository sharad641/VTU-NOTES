import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { analytics } from '../firebase'; // Firebase Analytics
import { logEvent } from 'firebase/analytics'; // Firebase event logging
import { QRCodeCanvas } from 'qrcode.react'; // QR code generator
import './PdfViewer.css';
import CommentSection from './CommentSection';
import { CircularProgress, Dialog, DialogContent, Button } from '@mui/material'; // Modern loading spinner and dialog

const PdfViewer = () => {
    const { pdfUrl } = useParams(); // Get PDF URL from route params
    const directPdfUrl = decodeURIComponent(pdfUrl || ''); // Decode the URL
    const currentPageLink = `${window.location.origin}/pdf-viewer/${encodeURIComponent(pdfUrl || '')}`; // Construct QR code link

    const [loading, setLoading] = useState(true); // State for loading spinner
    const [error, setError] = useState(false); // State for error handling
    const [fileName, setFileName] = useState(''); // Extracted file name
    const [isAdVisible, setIsAdVisible] = useState(false); // State to control ad modal visibility

    // Extract file name from URL
    useEffect(() => {
        if (directPdfUrl) {
            const parsedFileName = decodeURIComponent(
                directPdfUrl.split('/').pop().split('?')[0]
            );
            setFileName(parsedFileName);
        }
    }, [directPdfUrl]);

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
            setError(true);
        }
    }, [directPdfUrl]);

    // Show ad modal when "Download" is clicked
    const handleDownloadClick = () => {
        setIsAdVisible(true); // Show the ad modal
    };

    // Proceed with download after ad is closed
    const proceedToDownload = () => {
        setIsAdVisible(false); // Hide the ad modal
        if (downloadLink) {
            logEvent(analytics, 'pdf_download', { file_name: directPdfUrl });
            window.open(downloadLink, '_blank'); // Trigger the download
        }
    };

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

            {/* Show a loading spinner while the PDF loads */}
            {loading && (
                <div className="loading-spinner">
                    <CircularProgress />
                    <p>Loading PDF...</p>
                </div>
            )}

            {/* Embed the PDF in an iframe */}
            <iframe
                className="pdf-frame"
                src={directPdfUrl}
                title="PDF Viewer"
                width="100%"
                height="600px"
                onLoad={() => setLoading(false)}
                onError={() => {
                    setError(true);
                    setLoading(false);
                }}
            ></iframe>

            {/* Download Button */}
            <div className="download-button-container">
                <button className="download-button" onClick={handleDownloadClick}>
                    📥 Download PDF
                </button>
            </div>

            {/* Advertisement Modal */}
            <Dialog open={isAdVisible} onClose={() => setIsAdVisible(false)}>
                <DialogContent>
                    <h3>📢 Advertisement</h3>
                    <p>Your download will start after closing this ad.</p>
                    <Button variant="contained" color="primary" onClick={proceedToDownload}>
                        Close Ad & Proceed to Download
                    </Button>
                </DialogContent>
            </Dialog>

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
                <button className="qr-code-download" onClick={handleQrCodeDownload}>
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
