const fs = require('fs');
const filePath = 'C:\\Users\\harsh\\orchids-projects\\ambient-frames\\public\\logo\\logo.svg';
const content = fs.readFileSync(filePath, 'utf8');

console.log(`File length: ${content.length}`);

const pathRegex = /d="([\s\S]*?)"/g;
let match;
let count = 0;

while ((match = pathRegex.exec(content)) !== null) {
    count++;
    const d = match[1];
    const numbers = d.replace(/[a-zA-Z]/g, ' ').trim().split(/[\s,]+/).map(Number);
    let localMinX = Infinity, localMaxX = -Infinity;

    for (let i = 0; i < numbers.length; i += 2) {
        if (!isNaN(numbers[i])) {
            if (numbers[i] < localMinX) localMinX = numbers[i];
            if (numbers[i] > localMaxX) localMaxX = numbers[i];
        }
    }

    // Check for suspicious bounds (near 0 or near 2816)
    if (localMinX < 100 || localMaxX > 2700) {
        console.log(`Path #${count} is wide! Range: ${localMinX.toFixed(0)} - ${localMaxX.toFixed(0)}`);
        // Print a snippet to identify it
        console.log(`Snippet: ${d.substring(0, 100)}...`);
    }
}
console.log(`Scanned ${count} paths.`);
