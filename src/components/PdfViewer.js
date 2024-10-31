// src/components/PdfViewer.js
import React from 'react';
import './PdfViewer.css';

const PdfViewer = () => {
    const directPdfUrl = "https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/preview";

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
                <a href="https://drive.google.com/uc?export=download&id=1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs" download>
                    <button className="download-button">
                        Download PDF
                    </button>
                </a>
            </div>
        </div>
    );
};

export default PdfViewer;
