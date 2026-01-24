import * as pdfjsLib from "pdfjs-dist";

// Worker Setup
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export const extractTextFromPDF = async (url) => {
  try {
    // 1. Clean URL
    let fileId = null;
    // Extract ID for Drive links
    const driveMatch = url.match(/\/d\/(.*?)\//) || url.match(/id=(.*?)(&|$)/);
    if (driveMatch) fileId = driveMatch[1];

    // 2. Define Fetch Strategies (Try multiple proxies)
    const proxies = [
      // Strategy A: CodeTabs (Good for Drive)
      fileId 
        ? `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(`https://drive.google.com/uc?export=download&id=${fileId}`)}`
        : `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
      
      // Strategy B: CorsProxy.io (Backup)
      `https://corsproxy.io/?${encodeURIComponent(fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : url)}`
    ];

    let arrayBuffer = null;
    
    // 3. Try fetching
    for (const fetchUrl of proxies) {
      try {
        console.log("Attempting PDF fetch via:", fetchUrl);
        const response = await fetch(fetchUrl);
        if (response.ok) {
          arrayBuffer = await response.arrayBuffer();
          break; // Success! Stop looping.
        }
      } catch (e) {
        console.warn("Proxy failed, trying next...", e);
      }
    }

    if (!arrayBuffer) throw new Error("All proxies failed to fetch PDF.");

    // 4. Parse PDF Data
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = "";
    const maxPages = Math.min(pdf.numPages, 20); // First 20 pages

    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      fullText += pageText + "\n";
    }

    return { success: true, text: fullText };

  } catch (error) {
    console.error("PDF Extraction Failed:", error);
    return { success: false, error: error.message };
  }
};

export const extractTextFromLocalFile = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = "";
    for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) {
      const page = await pdf.getPage(i);
      const text = await page.getTextContent();
      fullText += text.items.map((item) => item.str).join(" ") + "\n";
    }
    return { success: true, text: fullText };
  } catch (error) {
    return { success: false, error: "Local file read error" };
  }
};