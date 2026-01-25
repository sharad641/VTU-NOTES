
const fs = require('fs');

const extracted = JSON.parse(fs.readFileSync('extracted_papers.json', 'utf8'));

// Helper to determine category
function getCategory(paper) {
    const title = paper.title.toLowerCase();
    const branch = paper.branch;
    
    if (branch === 'first-year') {
        if (title.includes('program') || title.includes('python') || title.includes(' c')) return 'programming';
        return 'basic_science';
    }
    
    // CSE/Higher sem
    if (title.includes('lab')) return 'core'; // Lab
    if (title.includes('elective') || paper.code.includes('E')) return 'elective';
    
    // Common core subjects
    if (['mathematics', 'physics', 'chemistry', 'constitution', 'biology'].some(k => title.includes(k))) return 'basic_science';
    
    return 'core';
}

// Helper to determine popularity
function getPopularity(paper) {
    const title = paper.title.toLowerCase();
    if (['data structures', 'operating system', 'mathematics', 'java', 'python', 'dbms', 'computer networks'].some(k => title.includes(k))) return 'very-high';
    return 'medium';
}

const papers = extracted.map((paper, index) => {
    const entry = {
        id: index + 1,
        title: paper.title,
        code: paper.code,
        category: getCategory(paper),
        semester: paper.semester,
        year: '2024',
        modelPaperLink: null,
        solutionLink: null,
        oldPaperLink: null,
        popularity: getPopularity(paper)
    };
    
    // Map links
    // Priorities:
    // modelPaperLink: Look for 'model' in title or tag='pyq'
    // solutionLink: tag='solved-qp' or 'solutions' (or title contains 'solution')
    // oldPaperLink: tag='pyq' (distinct from model if possible)
    
    const links = paper.links;
    
    // Find solution
    const solution = links.find(l => l.tag === 'solved-qp' || l.type === 'solutions' || l.title.toLowerCase().includes('solution'));
    if (solution) entry.solutionLink = solution.url.includes('/preview') ? solution.url : solution.url + '/preview'; // Ensure preview URL if possible? Actually links in DB usually have /preview or /view.
    // Clean URL: some have /uc?export=download... ModelPapers.js uses /preview mostly.
    // If it is /uc?export=download&id=XYZ, convert to /file/d/XYZ/preview
    
    
    const cleanUrl = (url) => {
        if (!url) return null;
        if (url.includes('drive.google.com/file/d/')) {
            if (url.endsWith('/preview')) return url;
            if (url.endsWith('/view')) return url.replace('/view', '/preview');
             // if matches /file/d/ID, append /preview
             return url + '/preview';
        }
        const match = url.match(/id=([a-zA-Z0-9_-]+)/);
        if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
        return url;
    };
    
    if (solution) entry.solutionLink = cleanUrl(solution.url);
    
    // Find model/pyq
    // If we have multiple PYQs, assign one to model, one to oldPaper
    const pyqs = links.filter(l => l.tag === 'pyq' || l.type === 'questions' || l.tag === 'question-bank');
    
    // Prioritize 'question paper' (singular) or 'model' for modelPaperLink
    const model = pyqs.find(l => l.title.toLowerCase().includes('model')) || pyqs[0];
    if (model) {
        entry.modelPaperLink = cleanUrl(model.url);
        // Use mapping to remove employed link
        const remaining = pyqs.filter(l => l !== model && l.url !== model.url);
        if (remaining.length > 0) {
            entry.oldPaperLink = cleanUrl(remaining[0].url);
        } else if (entry.solutionLink && entry.solutionLink !== entry.modelPaperLink) {
            // If we have solution but no separate old paper, we are good.
        } else {
             // If we really have no other link, maybe duplicate for safety or leave null
        }
    }
    
    // If we still don't have modelPaperLink (e.g. only solution available? Unlikely based on logic)
    if (!entry.modelPaperLink && entry.solutionLink) {
        entry.modelPaperLink = entry.solutionLink; // Fallback
    }

    return entry;
});

// Output
const output = `const papers = ${JSON.stringify(papers, null, 2)};`;
fs.writeFileSync('generated_papers_array.js', output);
console.log('Generated papers array');
