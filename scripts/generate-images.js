const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = {
  'icon': { width: 200, height: 200 },
  'logo': { width: 600, height: 600 },
  'hero': { width: 1000, height: 500 },
  'og': { width: 1200, height: 630 },
  'splash': { width: 1200, height: 1200 }
};

const outputDir = path.join(__dirname, '../public');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

Object.entries(sizes).forEach(([name, { width, height }]) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#4a6bff');
  gradient.addColorStop(1, '#6c5ce7');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${Math.min(width, height) / 10}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const text = `${name.toUpperCase()}\n${width}x${height}`;
  const lines = text.split('\n');
  const lineHeight = parseInt(ctx.font) * 1.2;
  const startY = (height - (lines.length * lineHeight)) / 2 + parseInt(ctx.font);
  
  lines.forEach((line, i) => {
    ctx.fillText(line, width / 2, startY + (i * lineHeight));
  });
  
  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, `${name}.png`), buffer);
  console.log(`Generated ${name}.png (${width}x${height})`);
});
