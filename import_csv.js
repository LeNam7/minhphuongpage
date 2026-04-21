const fs = require('fs');

// The CSV content exported earlier
const content = fs.readFileSync('C:\\Users\\PC\\.gemini\\antigravity\\brain\\19b90bb7-5a3b-424b-9b23-84cb8daad001\\.system_generated\\steps\\148\\content.md', 'utf8');

const lines = content.split('\n');
let products = [];

// A robust CSV line parser for basic use-cases
function parseCSVLine(str) {
  let result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '"' && str[i+1] === '"' && inQuotes) {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

let startIndex = 0;
for (let i = 0; i < lines.length; i++) {
   if (lines[i].startsWith('TK001')) {
      startIndex = i;
      break;
   }
}

for (let i = startIndex; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.match(/^TK\d{3}/)) {
    const cols = parseCSVLine(line);
    if (cols.length >= 6) {
      const id = cols[0];
      const nameEn = cols[1];
      const nameVi = cols[2];
      const notes = cols[4] || '';
      const packing = cols[5] || '';
      products.push({ id, nameEn, nameVi, notes, packing });
    }
  }
}

fs.writeFileSync('c:\\Users\\PC\\.gemini\\antigravity\\scratch\\minh-phuong-next\\src\\data\\products.json', JSON.stringify(products, null, 2));
console.log(`Successfully parsed ${products.length} products.`);
