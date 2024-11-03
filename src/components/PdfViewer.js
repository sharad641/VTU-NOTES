import React from 'react';
import { useParams } from 'react-router-dom';
import { analytics } from '../firebase'; // Import analytics
import { logEvent } from 'firebase/analytics'; // Import logEvent
import './PdfViewer.css';

const PdfViewer = () => {
    const { pdfUrl } = useParams();
    const directPdfUrl = decodeURIComponent(pdfUrl); // Decode the URL for safety

    // Function to construct Google Drive download link
    const getGoogleDriveDownloadLink = (url) => {
        const fileIdMatch = url.match(/[-\w]{25,}/); // Regex to find the file ID in the URL
        return fileIdMatch ? `https://drive.google.com/uc?export=download&id=${fileIdMatch[0]}` : null;
    };

    const downloadLink = getGoogleDriveDownloadLink(directPdfUrl);

    // Function to handle the download event
    const handleDownload = () => {
        if (downloadLink) {
            logEvent(analytics, 'pdf_download', { file_name: directPdfUrl }); // Log the event
        }
    };

    return (
        <div className="pdf-viewer">
            <h2>PDF Viewer</h2>
            <iframe
                className="pdf-frame"
                src={directPdfUrl}
                title="PDF Viewer"
                width="100%"
                height="600px"
                allow="autoplay"
            ></iframe>
            <div className="download-button-container">
                {downloadLink && (
                    <a 
                        href={downloadLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={handleDownload} // Track the download event
                    >
                        <button className="download-button">
                            Download PDF
                        </button>
                    </a>
                )}
            </div>
        </div>
    );
};

export default PdfViewer;
