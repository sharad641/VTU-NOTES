const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'src', 'components', 'ModuleDetail.js');
const targetDataPath = path.join(__dirname, 'src', 'data', 'moduleDetails.js');

try {
  const content = fs.readFileSync(sourcePath, 'utf8');
  const lines = content.split('\n');
  
  // 1. Extract Data
  const startLine = 39; // 1-based
  const endLine = 6807; // 1-based
  
  const extractedLines = lines.slice(startLine - 1, endLine);
  
  // Fix indentation and add export
  const cleanedDataLines = extractedLines.map((line) => {
      // Remove 2 spaces indentation if present
      if (line.startsWith('  ')) return line.substring(2);
      if (line.startsWith('    ')) return line.substring(2); // In case of deep indentation, but base is 2
      // Actually, standard indentation in the file was 2 spaces for the object.
      return line;
  });
  
  cleanedDataLines[0] = 'export const moduleDetails = {'; 
  
  const newDataContent = cleanedDataLines.join('\n');
  fs.writeFileSync(targetDataPath, newDataContent, 'utf8');
  console.log('Created ' + targetDataPath);
  
  // 2. Update Component File
  // We want to keep lines before startLine and lines after endLine.
  // indices: 0 to startLine-2 (keep)
  // indices: endLine to end (keep)
  
  const beforeLines = lines.slice(0, startLine - 1);
  const afterLines = lines.slice(endLine); // index 6807 is line 6808
  
  // Inject import
  // Find last import
  let importIndex = 0;
  for(let i=0; i<beforeLines.length; i++) {
      if(beforeLines[i].trim().startsWith('import')) {
          importIndex = i;
      }
  }
  
  // Insert import after last import
  beforeLines.splice(importIndex + 1, 0, 'import { moduleDetails } from "../data/moduleDetails";');
  
  const newComponentContent = [
      ...beforeLines,
      '  // moduleDetails data extracted to src/data/moduleDetails.js',
      ...afterLines
  ].join('\n');
  
  fs.writeFileSync(sourcePath, newComponentContent, 'utf8');
  console.log('Updated ' + sourcePath);
  
} catch (error) {
  console.error('Error migrating data:', error);
  process.exit(1);
}
