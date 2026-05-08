import { pdf } from 'pdf-to-img';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pdfPath = 'C:/Users/Thien Thien/Downloads/Rulebook (1).pdf';
const outputDir = path.join(__dirname, '..', 'public', 'images', 'rules');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Loading PDF:', pdfPath);

let pageNum = 1;
for await (const image of await pdf(pdfPath, { scale: 2.5 })) {
  const outputPath = path.join(outputDir, `page-${String(pageNum).padStart(3, '0')}.png`);
  fs.writeFileSync(outputPath, image);
  console.log(`Saved page ${pageNum}: ${outputPath}`);
  pageNum++;
}

console.log(`\nDone! ${pageNum - 1} pages extracted to: ${outputDir}`);
