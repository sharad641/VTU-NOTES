import React from 'react';
import { useParams } from 'react-router-dom';
import './PdfViewer.css';

const PdfViewer = () => {
    const { pdfUrl } = useParams();
    const directPdfUrl = decodeURIComponent(pdfUrl); // Decode the URL for safety

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
                <a href={`${directPdfUrl}?export=download`} download>
                    <button className="download-button">
                        Download PDF
                    </button>
                </a>
            </div>
        </div>
    );
};

export default PdfViewer;
