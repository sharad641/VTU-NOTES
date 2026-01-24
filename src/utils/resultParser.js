import * as pdfjsLib from 'pdfjs-dist';
// Import worker from the specific build entry to avoid Webpack 5 errors
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const parseResultPDF = async (file, currentSubjects) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    // 1. Extract text from all pages
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      fullText += " " + pageText;
    }

    // 2. Clean up text (Normalize spaces)
    const cleanText = fullText.replace(/\s+/g, " ").trim();
    
    // Debug: Check this in Console to see what the PDF actually looks like
    console.log("PDF Text Preview:", cleanText.substring(0, 200));

    let extractedMarks = {};
    let count = 0;

    // 3. Find Marks
    currentSubjects.forEach(sub => {
      const code = sub.code; // e.g., "22MATS11"
      
      // REGEX EXPLANATION:
      // 1. match the Code
      // 2. .*? match any text (Subject Name, Internal Marks, etc)
      // 3. (\d{1,3}) match the TOTAL marks (1 to 3 digits)
      // 4. (?=\s+[A-Z]) lookahead for a Grade Letter (P, F, A, B, O, etc) following the number
      
      const regex = new RegExp(`${code}.*?(\\d{1,3})(?=\\s+[A-Z])`, "i");
      const match = cleanText.match(regex);

      if (match && match[1]) {
        const marks = parseInt(match[1]);
        
        // Safety check: Marks should be realistic (0-100)
        if (!isNaN(marks) && marks <= 100) {
          extractedMarks[code] = marks;
          count++;
        }
      }
    });

    return { success: true, count, marks: extractedMarks };

  } catch (error) {
    console.error("PDF Parsing Error:", error);
    return { success: false, error: error.message };
  }
};