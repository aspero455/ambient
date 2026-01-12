const fs = require('fs');
const path = require('path');

const filePath = path.join('C:\\Users\\harsh\\orchids-projects\\ambient-frames\\public\\logo\\logo.svg');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Improved regex to avoid matching 'enable-background="...'
    // minimal check for whitespace or start of string before d=
    const pathRegex = /(?:\s|^)d="([\s\S]*?)"/g;
    let match;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let count = 0;

    while ((match = pathRegex.exec(content)) !== null) {
        count++;
        let d = match[1];

        // Parse numbers
        const numbers = d.replace(/[a-zA-Z]/g, ' ').trim().split(/[\s,]+/).map(Number);

        for (let i = 0; i < numbers.length; i += 2) {
            if (!isNaN(numbers[i]) && !isNaN(numbers[i + 1])) {
                const x = numbers[i];
                const y = numbers[i + 1];
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    if (minX === Infinity) {
        console.log('No coordinates found (or parsing failed).');
        process.exit(0);
    }

    // Sanity check: if we somehow processed 0 paths, abort
    if (count === 0) {
        console.log('No d="..." attributes found.');
        process.exit(0);
    }

    console.log(`Found ${count} paths.`);
    console.log(`Computed BBox: x:[${minX}, ${maxX}] y:[${minY}, ${maxY}]`);

    // Add padding
    const padding = 10;
    const vX = Math.floor(minX - padding);
    const vY = Math.floor(minY - padding);
    const vW = Math.ceil(maxX - minX + (padding * 2));
    const vH = Math.ceil(maxY - minY + (padding * 2));

    console.log(`New ViewBox: ${vX} ${vY} ${vW} ${vH}`);

    // Update viewBox
    // We use a regex that is flexible about quotes
    const newContent = content.replace(/viewBox=["'][^"']*["']/, `viewBox="${vX} ${vY} ${vW} ${vH}"`);

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Successfully updated viewBox');

} catch (err) {
    console.error('Error processing SVG:', err);
}
