
const fs = require('fs');
const path = require('path');

const generatedPath = 'generated_papers_array.js';
const targetPath = path.join('src', 'components', 'ModelPapers.js');

let newPapersContent = fs.readFileSync(generatedPath, 'utf8');

// Fix typo
newPapersContent = newPapersContent.replace('Khttps://', 'https://');

let targetContent = fs.readFileSync(targetPath, 'utf8');

// Find start and end of papers array
// It starts with 'const papers = ['
// We need to match the closing '];'
// Since we have the new content which is "const papers = [ ... ];", we can just find where it starts in the target and where the next block (const categories) starts.

const startMarker = 'const papers = [';
const endMarker = 'const categories = [';

const startIndex = targetContent.indexOf(startMarker);
const endIndex = targetContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find markers in ModelPapers.js');
    process.exit(1);
}

// We need to find the last semicolon before 'const categories' to be clean, or just replace everything in between.
// The orginal file has:
// ];
//
// const categories = ...

// The new content ends with "];"
// So we can replace from startIndex up to endIndex (exclusive) with newPapersContent + "\n\n"

const newContent = targetContent.substring(0, startIndex) +
                   newPapersContent + "\n\n" +
                   targetContent.substring(endIndex);

fs.writeFileSync(targetPath, newContent);
console.log('Successfully updated ModelPapers.js');
