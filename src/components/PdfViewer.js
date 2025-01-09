import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import { QRCodeCanvas } from 'qrcode.react';
import './PdfViewer.css';
import CommentSection from './CommentSection';
import { CircularProgress } from '@mui/material';

const PdfViewer = () => {
    const { pdfUrl } = useParams();
    const directPdfUrl = decodeURIComponent(pdfUrl || '');
    const currentPageLink = `${window.location.origin}/pdf-viewer/${encodeURIComponent(pdfUrl || '')}`;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [fileName, setFileName] = useState('');
    const [showAd, setShowAd] = useState(false); // State to show ad
    const [adCompleted, setAdCompleted] = useState(false); // State to track ad completion
    const [copySuccess, setCopySuccess] = useState(false); // State for copy success message

    useEffect(() => {
        if (directPdfUrl) {
            const parsedFileName = decodeURIComponent(
                directPdfUrl.split('/').pop().split('?')[0]
            );
            setFileName(parsedFileName);
        }
    }, [directPdfUrl]);

    const getGoogleDriveDownloadLink = (url) => {
        const fileIdMatch = url.match(/[-\w]{25,}/);
        return fileIdMatch ? `https://drive.google.com/uc?export=download&id=${fileIdMatch[0]}` : null;
    };

    const downloadLink = getGoogleDriveDownloadLink(directPdfUrl);

    useEffect(() => {
        if (directPdfUrl) {
            logEvent(analytics, 'pdf_view', { pdf_url: directPdfUrl });
        } else {
            setError(true);
        }
    }, [directPdfUrl]);

    const handleDownload = () => {
        setShowAd(true); // Show ad before downloading
        setTimeout(() => {
            setShowAd(false);
            setAdCompleted(true);
            logEvent(analytics, 'pdf_download', { file_name: directPdfUrl });
        }, 5000); // Display ad for 5 seconds
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(currentPageLink).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 3000); // Clear success message after 3 seconds
        });
    };

    if (error) {
        return <p>Error: Unable to load the PDF. Please check the URL and try again.</p>;
    }

    return (
        <div className="pdf-viewer">
            <h2>📄 PDF Viewer</h2>

            {showAd && (
                <div className="ad-container">
                    {/* Google AdSense script */}
                    <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9499544849301534"
                        crossorigin="anonymous"
                    ></script>
                    <ins
                        className="adsbygoogle"
                        style={{ display: 'block' }}
                        data-ad-client="ca-pub-9499544849301534"
                        data-ad-slot="9737940592"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    ></ins>
                    <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>
                    <p>Ad is loading... Please wait.</p>
                </div>
            )}

            {!showAd && (
                <>
                    {loading && (
                        <div className="loading-spinner">
                            <CircularProgress />
                            <p>Loading PDF...</p>
                        </div>
                    )}

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

                    <div className="download-button-container">
                        {adCompleted && downloadLink ? (
                            <a
                                href={downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="download-button">📥 Download PDF</button>
                            </a>
                        ) : (
                            <button className="download-button" onClick={handleDownload}>
                                📥  Download
                            </button>
                        )}
                    </div>
                </>
            )}

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
                <div className="share-link-container">
                    <button className="copy-link-button" onClick={handleCopyLink}>
                        📋 Copy Share Link
                    </button>
                    {copySuccess && <p className="copy-success">Link Copied!</p>}
                </div>
            </div>

            {fileName && (
                <div className="file-info">
                    <p><strong>File Name:</strong> {fileName}</p>
                </div>
            )}

            <CommentSection />
        </div>
    );
};

export default PdfViewer;
