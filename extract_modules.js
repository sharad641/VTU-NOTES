
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'ModuleDetail.js');
const fileContent = fs.readFileSync(filePath, 'utf8');

// simplified extraction: find "const moduleDetails = {" and count braces
let startIndex = fileContent.indexOf('const moduleDetails = {');
if (startIndex === -1) {
    console.error('Could not find moduleDetails start');
    process.exit(1);
}

startIndex += 'const moduleDetails = '.length; // start at {

let braceCount = 0;
let endIndex = -1;
let foundStart = false;

for (let i = startIndex; i < fileContent.length; i++) {
    if (fileContent[i] === '{') {
        braceCount++;
        foundStart = true;
    } else if (fileContent[i] === '}') {
        braceCount--;
    }

    if (foundStart && braceCount === 0) {
        endIndex = i + 1;
        break;
    }
}

if (endIndex === -1) {
    console.error('Could not find moduleDetails end');
    process.exit(1);
}

let objectString = fileContent.substring(startIndex, endIndex);

// Sanitize the object string to make it evaluatable JSON-like JS
// The file uses simple keys and string values, but we need to be careful
// We'll try to eval it.
// We need to make sure we don't execute malicious code, but this is a local file.

try {
    const moduleDetails = eval('(' + objectString + ')');
    
    const allPapers = [];
    
    // Iterate through all branches/years
    for (const branchKey in moduleDetails) {
        const semesterData = moduleDetails[branchKey];
        for (const semKey in semesterData) {
            const subjects = semesterData[semKey];
            subjects.forEach(subject => {
                const paperEntry = {
                    title: subject.title,
                    code: subject.code,
                    semester: semKey,
                    branch: branchKey, // 'first-year' or 'cs' etc
                    links: []
                };

                // Find relevant modules
                subject.modules.forEach(mod => {
                   if (mod.category === 'pyq' || mod.category === 'solved-qp' || mod.category === 'question-bank' || mod.type === 'questions' || mod.type === 'solutions') {
                       paperEntry.links.push({
                           title: mod.title,
                           url: mod.fileUrl || mod.previewUrl,
                           type: mod.type,
                           tag: mod.category
                       });
                   }
                });
                
                // Only add if we found some question papers/solutions
                if (paperEntry.links.length > 0) {
                    allPapers.push(paperEntry);
                }
            });
        }
    }

    fs.writeFileSync('extracted_papers.json', JSON.stringify(allPapers, null, 2));
    console.log('done');

} catch (e) {
    console.error('Error parsing object:', e);
    // Fallback?
    // Maybe just print the extracted string to debug
}
