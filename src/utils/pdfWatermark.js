import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Configuration
const CONFIG = {
  MAX_SIZES: {
    DEVELOPMENT: 10 * 1024 * 1024, // 10MB
    PRODUCTION: 30 * 1024 * 1024,  // 30MB
  },
  WATERMARK: {
    TEXT: 'VTU Notes For All',
    FONT_SIZE: 28,
    OPACITY: 0.15,
    ROTATION: -35,
    COLOR: rgb(0.4, 0.4, 0.4),
    SPACING_X: 0.4,
    SPACING_Y: 0.3,
  },
  COVER_PAGE: {
    ENABLED: true,
    TITLE: 'VTU Notes For All',
    SUBTITLE: 'Downloaded from VTU Notes For All',
    BACKGROUND_COLOR: rgb(0.95, 0.95, 0.98),
    TITLE_COLOR: rgb(0.2, 0.4, 0.7),
    SUBTITLE_COLOR: rgb(0.5, 0.5, 0.5),
    LOGO_COLOR: rgb(0.2, 0.4, 0.7),
  },
  BATCH_SIZE: 5,
};

const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * Creates a modern progress UI
 */
const createProgressUI = (id) => {
  const progressId = `watermark-progress-${id}`;
  const progressHtml = `
    <div id="${progressId}" class="watermark-progress-container">
      <div class="watermark-progress-modal">
        <div class="progress-header">
          <div class="progress-logo">
            <svg viewBox="0 0 24 24" width="32" height="32">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3 class="progress-title">Processing Document</h3>
          <p class="progress-subtitle">Adding watermark and cover page</p>
        </div>
        
        <div class="progress-body">
          <div class="progress-steps">
            <div class="step active" data-step="1">
              <div class="step-icon">1</div>
              <span class="step-text">Downloading PDF</span>
            </div>
            <div class="step" data-step="2">
              <div class="step-icon">2</div>
              <span class="step-text">Processing Pages</span>
            </div>
            <div class="step" data-step="3">
              <div class="step-icon">3</div>
              <span class="step-text">Adding Watermark</span>
            </div>
            <div class="step" data-step="4">
              <div class="step-icon">4</div>
              <span class="step-text">Preparing Download</span>
            </div>
          </div>
          
          <div class="progress-bar-container">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 0%"></div>
            </div>
            <div class="progress-text">0%</div>
          </div>
          
          <div class="progress-details">
            <div class="detail-item">
              <span class="detail-label">Status:</span>
              <span class="detail-value">Initializing...</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Pages:</span>
              <span class="detail-value">--</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Size:</span>
              <span class="detail-value">--</span>
            </div>
          </div>
        </div>
        
        <div class="progress-footer">
          <div class="spinner-container">
            <div class="spinner"></div>
          </div>
          <p class="footer-note">This may take a moment for larger files</p>
        </div>
      </div>
    </div>
  `;
  
  const container = document.createElement('div');
  container.innerHTML = progressHtml;
  return container.firstElementChild;
};

/**
 * Updates progress UI
 */
const updateProgressUI = (step, percentage, details = {}) => {
  const progressEl = document.querySelector('.watermark-progress-container');
  if (!progressEl) return;
  
  // Update steps
  document.querySelectorAll('.step').forEach((el, i) => {
    const stepNum = parseInt(el.dataset.step);
    el.classList.toggle('active', stepNum <= step);
    el.classList.toggle('completed', stepNum < step);
  });
  
  // Update progress bar
  const fillEl = progressEl.querySelector('.progress-fill');
  const textEl = progressEl.querySelector('.progress-text');
  if (fillEl) fillEl.style.width = `${percentage}%`;
  if (textEl) textEl.textContent = `${Math.round(percentage)}%`;
  
  // Update details
  if (details.status) {
    const statusEl = progressEl.querySelector('.detail-value');
    if (statusEl) statusEl.textContent = details.status;
  }
  
  if (details.pages) {
    const pagesEl = progressEl.querySelectorAll('.detail-value')[1];
    if (pagesEl) pagesEl.textContent = details.pages;
  }
  
  if (details.size) {
    const sizeEl = progressEl.querySelectorAll('.detail-value')[2];
    if (sizeEl) sizeEl.textContent = details.size;
  }
};

/**
 * Creates a cover page for the PDF
 */
const createCoverPage = async (pdfDoc, watermarkText, metadata = {}) => {
  const page = pdfDoc.insertPage(0);
  const { width, height } = page.getSize();
  
  // Load fonts
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  // Background
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: CONFIG.COVER_PAGE.BACKGROUND_COLOR,
  });
  
  // Decorative elements
  for (let i = 0; i < 5; i++) {
    const size = 40 + i * 20;
    const opacity = 0.02 + i * 0.005;
    page.drawCircle({
      x: width * 0.2,
      y: height * 0.8 - i * 30,
      size,
      color: CONFIG.COVER_PAGE.TITLE_COLOR,
      opacity,
    });
  }
  
  // Logo/Icon
  page.drawText('📚', {
    x: width / 2 - 40,
    y: height * 0.7,
    size: 80,
    opacity: 0.1,
  });
  
  // Title
  page.drawText(CONFIG.COVER_PAGE.TITLE, {
    x: width / 2,
    y: height * 0.6,
    size: 42,
    font: fontBold,
    color: CONFIG.COVER_PAGE.TITLE_COLOR,
    opacity: 0.9,
    align: 'center',
  });
  
  // Subtitle
  page.drawText(CONFIG.COVER_PAGE.SUBTITLE, {
    x: width / 2,
    y: height * 0.5,
    size: 18,
    font: fontRegular,
    color: CONFIG.COVER_PAGE.SUBTITLE_COLOR,
    opacity: 0.7,
    align: 'center',
  });
  
  // Divider line
  page.drawLine({
    start: { x: width * 0.2, y: height * 0.45 },
    end: { x: width * 0.8, y: height * 0.45 },
    thickness: 1,
    color: rgb(0.7, 0.7, 0.7),
    opacity: 0.3,
  });
  
  // Document info
  if (metadata.title) {
    page.drawText(metadata.title, {
      x: width / 2,
      y: height * 0.35,
      size: 24,
      font: fontBold,
      color: rgb(0.3, 0.3, 0.3),
      opacity: 0.8,
      align: 'center',
      maxWidth: width * 0.8,
    });
  }
  
  // Watermark text
  page.drawText(`Watermarked: ${watermarkText}`, {
    x: width / 2,
    y: height * 0.25,
    size: 14,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
    opacity: 0.6,
    align: 'center',
  });
  
  // Download info
  const downloadDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  page.drawText(`Downloaded on: ${downloadDate}`, {
    x: width / 2,
    y: height * 0.2,
    size: 12,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
    opacity: 0.5,
    align: 'center',
  });
  
  // Footer
  page.drawText('This document is watermarked for identification purposes', {
    x: width / 2,
    y: 30,
    size: 10,
    font: fontRegular,
    color: rgb(0.6, 0.6, 0.6),
    opacity: 0.4,
    align: 'center',
  });
};

/**
 * Adds watermark to PDF with optimized memory usage
 */
export const addWatermarkToPdf = async (pdfBytes, watermarkText = CONFIG.WATERMARK.TEXT) => {
  const startTime = performance.now();
  
  try {
    console.log('🚀 Starting enhanced watermark process...');
    updateProgressUI(1, 10, { status: 'Loading PDF...' });
    
    // Validate file size
    const maxSize = IS_DEV ? CONFIG.MAX_SIZES.DEVELOPMENT : CONFIG.MAX_SIZES.PRODUCTION;
    if (pdfBytes.byteLength > maxSize) {
      throw new Error(
        `PDF size (${(pdfBytes.byteLength / 1024 / 1024).toFixed(1)}MB) ` +
        `exceeds limit (${maxSize / 1024 / 1024}MB)`
      );
    }
    
    // Load PDF with performance monitoring
    updateProgressUI(2, 20, { status: 'Processing document...' });
    const pdfDoc = await PDFDocument.load(pdfBytes, {
      ignoreEncryption: true,
      updateMetadata: false,
    });
    
    // Extract metadata for cover page
    const metadata = {
      title: pdfDoc.getTitle() || 'Study Material',
      pages: pdfDoc.getPageCount(),
      author: pdfDoc.getAuthor(),
    };
    
    // Add cover page
    if (CONFIG.COVER_PAGE.ENABLED) {
      updateProgressUI(2, 30, { status: 'Creating cover page...' });
      await createCoverPage(pdfDoc, watermarkText, metadata);
    }
    
    const pages = pdfDoc.getPages();
    const totalPages = pages.length;
    
    updateProgressUI(2, 40, {
      status: `Processing ${totalPages} pages...`,
      pages: totalPages,
      size: `${(pdfBytes.byteLength / 1024 / 1024).toFixed(1)}MB`,
    });
    
    // Load fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // Process pages in batches
    const batchSize = Math.min(totalPages, CONFIG.BATCH_SIZE);
    let processedPages = 0;
    
    for (let i = 0; i < totalPages; i += batchSize) {
      const batchEnd = Math.min(i + batchSize, totalPages);
      
      for (let j = i; j < batchEnd; j++) {
        const page = pages[j];
        const { width, height } = page.getSize();
        
        // Add diagonal watermark grid
        const stepX = width * CONFIG.WATERMARK.SPACING_X;
        const stepY = height * CONFIG.WATERMARK.SPACING_Y;
        
        for (let x = width * 0.1; x < width; x += stepX) {
          for (let y = height * 0.1; y < height; y += stepY) {
            page.drawText(watermarkText, {
              x,
              y,
              size: CONFIG.WATERMARK.FONT_SIZE,
              font,
              color: CONFIG.WATERMARK.COLOR,
              opacity: CONFIG.WATERMARK.OPACITY,
              rotate: CONFIG.WATERMARK.ROTATION,
            });
          }
        }
        
        // Add footer watermark (only on non-cover pages)
        if (j > 0 || !CONFIG.COVER_PAGE.ENABLED) {
          page.drawText('Downloaded from VTU Notes For All', {
            x: 40,
            y: 25,
            size: 10,
            font,
            color: rgb(0.5, 0.5, 0.5),
            opacity: 0.6,
          });
        }
        
        processedPages++;
        
        // Update progress
        const progress = 40 + (processedPages / totalPages) * 40;
        updateProgressUI(3, progress, {
          status: `Watermarking page ${processedPages}/${totalPages}...`,
        });
      }
      
      // Yield to event loop
      if (batchEnd < totalPages) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }
    
    // Save with optimization
    updateProgressUI(4, 90, { status: 'Finalizing document...' });
    const watermarkedBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });
    
    const endTime = performance.now();
    console.log(`✅ Watermark completed in ${((endTime - startTime) / 1000).toFixed(2)}s`);
    
    updateProgressUI(4, 100, { status: 'Ready for download!' });
    return watermarkedBytes;
    
  } catch (error) {
    console.error('❌ Watermark error:', error);
    updateProgressUI(4, 0, { status: `Error: ${error.message}` });
    throw error;
  }
};

/**
 * Fetches PDF with size validation and progress tracking
 */
const fetchPdfWithSizeCheck = async (url, progressCallback) => {
  console.log('📥 Fetching PDF from:', url);
  
  // Check file size via HEAD request
  try {
    const headResponse = await fetch(url, { method: 'HEAD' });
    const contentLength = headResponse.headers.get('content-length');
    
    if (contentLength) {
      const size = parseInt(contentLength, 10);
      const maxSize = IS_DEV ? CONFIG.MAX_SIZES.DEVELOPMENT : CONFIG.MAX_SIZES.PRODUCTION;
      
      if (size > maxSize) {
        throw new Error(
          `File size (${(size / 1024 / 1024).toFixed(1)}MB) ` +
          `exceeds maximum allowed size (${maxSize / 1024 / 1024}MB)`
        );
      }
      
      if (progressCallback) {
        progressCallback('size-check', size);
      }
    }
  } catch (error) {
    console.warn('⚠️ Could not check file size:', error.message);
  }
  
  // Fetch with progress tracking
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const reader = response.body.getReader();
  const contentLength = response.headers.get('content-length');
  let receivedLength = 0;
  const chunks = [];
  
  while (true) {
    const { done, value } = await reader.read();
    
    if (done) break;
    
    chunks.push(value);
    receivedLength += value.length;
    
    if (progressCallback && contentLength) {
      const percent = Math.round((receivedLength / contentLength) * 100);
      progressCallback('download', percent);
    }
  }
  
  const arrayBuffer = new Uint8Array(receivedLength);
  let position = 0;
  
  for (const chunk of chunks) {
    arrayBuffer.set(chunk, position);
    position += chunk.length;
  }
  
  return arrayBuffer.buffer;
};

/**
 * Main download function with enhanced UI
 */
export const downloadWatermarkedPdf = async (url, filename, watermarkText = CONFIG.WATERMARK.TEXT) => {
  let blobUrl = null;
  const processId = Date.now();
  
  try {
    // Show progress UI
    const progressEl = createProgressUI(processId);
    document.body.appendChild(progressEl);
    
    // Add CSS for progress UI if not already present
    if (!document.querySelector('#watermark-styles')) {
      const styles = document.createElement('style');
      styles.id = 'watermark-styles';
      styles.textContent = getWatermarkStyles();
      document.head.appendChild(styles);
    }
    
    // Download PDF with progress tracking
    updateProgressUI(1, 10, { status: 'Checking file...' });
    const pdfBytes = await fetchPdfWithSizeCheck(url, (type, value) => {
      if (type === 'download') {
        updateProgressUI(1, 10 + (value * 0.4), { status: 'Downloading PDF...' });
      }
    });
    
    // Add watermark
    updateProgressUI(2, 50, { status: 'Applying watermark...' });
    const watermarkedBytes = await addWatermarkToPdf(pdfBytes, watermarkText);
    
    // Create download
    updateProgressUI(4, 95, { status: 'Creating download...' });
    const blob = new Blob([watermarkedBytes], { type: 'application/pdf' });
    blobUrl = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || `VTU_Notes_${new Date().getTime()}.pdf`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    
    // Success feedback
    setTimeout(() => {
      progressEl.classList.add('success');
      updateProgressUI(4, 100, { status: 'Download started!' });
      
      setTimeout(() => {
        if (progressEl.parentNode) {
          document.body.removeChild(progressEl);
        }
      }, 1500);
    }, 500);
    
    // Cleanup
    setTimeout(() => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      if (link.parentNode) document.body.removeChild(link);
    }, 5000);
    
    return true;
    
  } catch (error) {
    // Error handling
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    
    const progressEl = document.querySelector('.watermark-progress-container');
    if (progressEl) {
      progressEl.classList.add('error');
      updateProgressUI(4, 0, { status: `Error: ${error.message}` });
      
      setTimeout(() => {
        if (progressEl.parentNode) {
          document.body.removeChild(progressEl);
        }
      }, 3000);
    }
    
    throw error;
  }
};

/**
 * Direct download without watermark
 */
export const downloadPdfDirect = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'document.pdf';
  link.target = '_blank';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    if (link.parentNode) {
      document.body.removeChild(link);
    }
  }, 100);
};

/**
 * URL validation utilities
 */
export const isUrlWatermarkable = (url) => {
  try {
    const urlObj = new URL(url);
    
    const allowedDomains = [
      'drive.google.com',
      'docs.google.com',
      'github.com',
      'gitlab.com',
      'dropbox.com',
      'onedrive.live.com',
      'sharepoint.com',
    ];
    
    const isAllowedDomain = allowedDomains.some(domain => 
      urlObj.hostname.includes(domain)
    );
    
    const isDirectPdf = /\.pdf($|\?|#)/i.test(url) || 
                       /\/pdf(\/|$)/i.test(url);
    
    return isAllowedDomain || isDirectPdf;
  } catch {
    return false;
  }
};

export const shouldUseWatermark = async (url) => {
  if (!isUrlWatermarkable(url)) return false;
  
  try {
    const response = await fetch(url, { method: 'HEAD', cache: 'no-cache' });
    const contentLength = response.headers.get('content-length');
    
    if (contentLength) {
      const size = parseInt(contentLength, 10);
      const maxSize = IS_DEV ? CONFIG.MAX_SIZES.DEVELOPMENT : CONFIG.MAX_SIZES.PRODUCTION;
      return size <= maxSize;
    }
    
    return true;
  } catch {
    return false;
  }
};

/**
 * CSS styles for progress UI
 */
const getWatermarkStyles = () => `
  .watermark-progress-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.3s ease;
  }
  
  .watermark-progress-modal {
    background: white;
    border-radius: 20px;
    padding: 32px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.4s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .progress-header {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .progress-logo {
    color: #4f46e5;
    margin-bottom: 16px;
  }
  
  .progress-title {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 8px 0;
  }
  
  .progress-subtitle {
    font-size: 14px;
    color: #6b7280;
    margin: 0;
  }
  
  .progress-steps {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
    position: relative;
  }
  
  .progress-steps::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 10%;
    right: 10%;
    height: 2px;
    background: #e5e7eb;
    z-index: 1;
  }
  
  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
  }
  
  .step-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 8px;
    transition: all 0.3s ease;
  }
  
  .step.active .step-icon {
    background: #4f46e5;
    color: white;
    transform: scale(1.1);
  }
  
  .step.completed .step-icon {
    background: #10b981;
    color: white;
  }
  
  .step-text {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 500;
    text-align: center;
    max-width: 80px;
  }
  
  .step.active .step-text {
    color: #4f46e5;
  }
  
  .progress-bar-container {
    margin-bottom: 24px;
  }
  
  .progress-bar {
    height: 8px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 8px;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4f46e5, #7c3aed);
    border-radius: 4px;
    transition: width 0.3s ease;
  }
  
  .progress-text {
    text-align: right;
    font-size: 14px;
    font-weight: 600;
    color: #4f46e5;
  }
  
  .progress-details {
    background: #f9fafb;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;
  }
  
  .detail-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  
  .detail-item:last-child {
    margin-bottom: 0;
  }
  
  .detail-label {
    font-size: 14px;
    color: #6b7280;
  }
  
  .detail-value {
    font-size: 14px;
    font-weight: 600;
    color: #1f2937;
  }
  
  .progress-footer {
    text-align: center;
  }
  
  .spinner-container {
    margin-bottom: 16px;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e5e7eb;
    border-top-color: #4f46e5;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }
  
  .footer-note {
    font-size: 12px;
    color: #9ca3af;
    margin: 0;
  }
  
  .watermark-progress-container.success .spinner {
    border-top-color: #10b981;
    animation: none;
  }
  
  .watermark-progress-container.error .spinner {
    border-top-color: #ef4444;
    animation: none;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 640px) {
    .watermark-progress-modal {
      padding: 24px;
      margin: 16px;
      width: calc(100% - 32px);
    }
    
    .progress-title {
      font-size: 20px;
    }
    
    .step-icon {
      width: 32px;
      height: 32px;
      font-size: 14px;
    }
    
    .step-text {
      font-size: 11px;
      max-width: 60px;
    }
  }
`;