const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'src', 'components', 'ModuleDetail.js');
const targetPath = path.join(__dirname, 'src', 'data', 'moduleDetails.js');

try {
  const content = fs.readFileSync(sourcePath, 'utf8');
  const lines = content.split('\n');
  
  // Extract lines 39 (index 38) to 6807 (index 6806)
  // Line 39 in file is index 38.
  // Line 6807 in file is index 6806.
  
  // Verify start and end
  // Line 39: "  const moduleDetails = {"
  // Line 6807: "  };"
  
  const startLine = 39;
  const endLine = 6807;
  
  const extractedLines = lines.slice(startLine - 1, endLine);
  
  // Fix indentation (remove 2 spaces)
  const cleanedLines = extractedLines.map((line) => {
      if (line.startsWith('  ')) return line.substring(2);
      return line;
  });
  
  // Add export
  cleanedLines[0] = 'export const moduleDetails = {'; // Ensure correct start
  
  const newContent = cleanedLines.join('\n');
  
  fs.writeFileSync(targetPath, newContent, 'utf8');
  console.log('Successfully extracted moduleDetails to ' + targetPath);
  
} catch (error) {
  console.error('Error extracting data:', error);
  process.exit(1);
}
