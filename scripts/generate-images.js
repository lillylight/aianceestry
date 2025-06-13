const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const { loadImage } = require('canvas');

const sizes = {
  'icon': { width: 200, height: 200 },
  'splash': { width: 1200, height: 1200 },
  'hero': { width: 1000, height: 500 },
  'og': { width: 1200, height: 630 }
};

const outputDir = path.join(__dirname, '../public');
const sourceImage = path.join(__dirname, '../ai_anc-removebg-preview (1) (1).png');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateImages() {
  // Load the source image
  const img = await loadImage(sourceImage);

  Object.entries(sizes).forEach(async ([name, { width, height }]) => {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Calculate scaling factor to maintain aspect ratio
    const scale = Math.min(width / img.width, height / img.height);
    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;
    
    // Calculate position to center the image
    const x = (width - scaledWidth) / 2;
    const y = (height - scaledHeight) / 2;
    
    // Draw the image
    ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
    
    // Save to file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, `${name}.png`), buffer);
    console.log(`Generated ${name}.png (${width}x${height})`);
  });
}

generateImages().catch(console.error);
