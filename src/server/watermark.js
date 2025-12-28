const express = require('express');
const router = express.Router();
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const axios = require('axios');
const stream = require('stream');

router.post('/watermark', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Fetch the PDF
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'arraybuffer',
      timeout: 30000,
    });

    // Load PDF
    const pdfDoc = await PDFDocument.load(response.data);
    const pages = pdfDoc.getPages();
    
    // Load font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Add watermark to each page
    pages.forEach((page) => {
      const { width, height } = page.getSize();
      
      // Diagonal watermark
      page.drawText('vtunotesforall', {
        x: width / 2 - 100,
        y: height / 2,
        size: 40,
        font,
        color: rgb(0.5, 0.5, 0.5),
        opacity: 0.3,
        rotate: -45,
      });
      
      // Footer watermark
      page.drawText('Downloaded from VTU Notes For All', {
        x: 40,
        y: 30,
        size: 12,
        font,
        color: rgb(0.3, 0.3, 0.3),
        opacity: 0.5,
      });
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    
    // Send the PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="vtunotesforall.pdf"');
    res.send(pdfBytes);
    
  } catch (error) {
    console.error('Watermark error:', error);
    res.status(500).json({ error: 'Failed to add watermark' });
  }
});

module.exports = router;