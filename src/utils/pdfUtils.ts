import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface AncestryDatum {
  region: string;
  percent: number;
}

function renderMarkdownTable(doc: jsPDF, lines: string[], pageWidth: number, startY: number): number {
  const headerLineIdx = lines.findIndex(l => l.trim().startsWith('|') && l.includes('---'));
  if (headerLineIdx < 1) return startY;
  const headerTitles = lines[headerLineIdx-1].split('|').map(s => s.trim()).filter(Boolean);
  const bodyLines = lines.slice(headerLineIdx+1).filter(l => l.trim().startsWith('|'));
  const body = bodyLines.map(row => row.split('|').map(s => s.trim()).filter(Boolean));
  autoTable(doc, {
    startY,
<<<<<<< HEAD
    margin: { left: 60, right: 60 },
    head: [headerTitles],
    body,
    styles: { font: 'helvetica', fontSize: 14, cellPadding: 12, halign: 'center', valign: 'middle', textColor: '#111', fillColor: [255, 255, 255] },
    headStyles: { fillColor: [235, 238, 245], textColor: '#111', fontStyle: 'bold', fontSize: 15 },
    tableLineColor: [200, 200, 200],
    tableLineWidth: 0.8,
=======
    margin: { left: 40, right: 40 },
    head: [headerTitles],
    body,
    styles: { 
      font: 'helvetica', 
      fontSize: 12, 
      cellPadding: 10, 
      halign: 'center', 
      valign: 'middle', 
      textColor: '#111', 
      fillColor: [255, 255, 255]
    },
    headStyles: { 
      fillColor: [235, 238, 245], 
      textColor: '#111', 
      fontStyle: 'bold', 
      fontSize: 13 
    },
    tableLineColor: [200, 200, 200],
    tableLineWidth: 0.5,
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
    theme: 'grid',
  });
  return (doc as any).lastAutoTable?.finalY || (startY + 40);
}

<<<<<<< HEAD
function renderParagraphsWithBoldSpans(doc: jsPDF, paragraphs: string[], pageWidth: number, y: number, opts?: { fontSize?: number, color?: string, justify?: boolean }): number {
  const normalFontSize = opts?.fontSize || 15;
  const boldFontSize = normalFontSize - 2;
  const headingFontSize = normalFontSize - 1 + 1;
  const indent = 32;
  const marginBottom = 60;
  const pageBottom = 812 - marginBottom;
  
  for (let idx = 0; idx < paragraphs.length; idx++) {
    let para = paragraphs[idx].replace(/^[-•]\s*/, '');
    if (!para.trim()) { y += 18; continue; }
    
    // Clean up any special characters that might cause rendering issues
    para = para.replace(/[""]/g, '"').replace(/['']/g, "'").replace(/[–—]/g, '-');
    
    const isHeadingLine = isHeading(para);
    const genericBoldMatch = para.match(/^(\s*)([A-Za-z0-9&'()\/-\s]+:)(.*)$/);
    if (genericBoldMatch) {
      const boldPart = genericBoldMatch[2];
      let rest = genericBoldMatch[3] || '';
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(boldFontSize);
      doc.setTextColor(opts?.color || '#111');
      if (y > pageBottom) { doc.addPage(); y = marginBottom; }
      doc.text(boldPart, 60, y, { align: 'left' });
      y += 20;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(normalFontSize);
      doc.setTextColor(opts?.color || '#111');
      const restLines = doc.splitTextToSize(rest.trim(), pageWidth - 120 - indent);
      for (let i = 0; i < restLines.length; i++) {
        if (y > pageBottom) { doc.addPage(); y = marginBottom; }
        doc.text(restLines[i], 60 + indent, y, { align: 'justify', maxWidth: pageWidth - 120 - indent });
        y += 22;
      }
      y += 6;
      continue;
    }
    const structureMatch = para.match(/^(\s*)([A-Za-z0-9&'()\/-]+ Structure:)(.*)$/i);
    if (structureMatch) {
      const boldPart = structureMatch[2];
      let rest = structureMatch[3] || '';
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(boldFontSize);
      doc.setTextColor(opts?.color || '#111');
      if (y > pageBottom) { doc.addPage(); y = marginBottom; }
      doc.text(boldPart, 60, y, { align: 'left' });
      y += 20;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(normalFontSize);
      doc.setTextColor(opts?.color || '#111');
      const restLines = doc.splitTextToSize(rest.trim(), pageWidth - 120 - indent);
      for (let i = 0; i < restLines.length; i++) {
        if (y > pageBottom) { doc.addPage(); y = marginBottom; }
        doc.text(restLines[i], 60 + indent, y, { align: 'justify', maxWidth: pageWidth - 120 - indent });
        y += 22;
      }
      y += 6;
      continue;
    }
    const match = para.match(/^(\s*)([A-Za-z0-9\s'()\/-]+:)(.*)$/);
    if (match) {
      const boldPart = match[2];
      let rest = match[3] || '';
      if (isHeadingLine) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(headingFontSize);
        doc.setTextColor('#23252b');
        if (y > pageBottom) { doc.addPage(); y = marginBottom; }
        doc.text(boldPart, 60, y, { align: 'left' });
        y += 22;
        if (rest.trim()) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(normalFontSize);
          doc.setTextColor(opts?.color || '#111');
          const restLines = doc.splitTextToSize(rest.trim(), pageWidth - 120 - indent);
          for (let i = 0; i < restLines.length; i++) {
            if (y > pageBottom) { doc.addPage(); y = marginBottom; }
            doc.text(restLines[i], 60 + indent, y, { align: 'justify', maxWidth: pageWidth - 120 - indent });
            y += 22;
          }
        }
        y += 6;
        continue;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(boldFontSize);
      doc.setTextColor(opts?.color || '#111');
      if (y > pageBottom) { doc.addPage(); y = marginBottom; }
      doc.text(boldPart, 60, y, { align: 'left' });
      y += 20;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(normalFontSize);
      doc.setTextColor(opts?.color || '#111');
      const restLines = doc.splitTextToSize(rest.trim(), pageWidth - 120 - indent);
      for (let i = 0; i < restLines.length; i++) {
        if (y > pageBottom) { doc.addPage(); y = marginBottom; }
        doc.text(restLines[i], 60 + indent, y, { align: 'justify', maxWidth: pageWidth - 120 - indent });
        y += 22;
      }
      y += 6;
      continue;
    }
    const lines = doc.splitTextToSize(para, pageWidth - 120);
    for (let i = 0; i < lines.length; i++) {
      if (y > pageBottom) { doc.addPage(); y = marginBottom; }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(normalFontSize);
      doc.setTextColor(opts?.color || '#111');
      doc.text(lines[i], 60, y, { align: 'justify', maxWidth: pageWidth - 120 });
      y += 22;
    }
    y += 8;
  }
  return y;
}

function isHeading(line: string): boolean {
  return /:$/g.test(line) && !/^[-•]/.test(line.trim());
}

function renderComprehensiveSection(doc: jsPDF, compBlock: string[], pageWidth: number, boldLines: number[]): void {
  let y = 70;
  const marginBottom = 60;
  const pageBottom = 812 - marginBottom;
  for (let idx = 0; idx < compBlock.length; idx++) {
    let para = compBlock[idx].replace(/^[-•]\s*/, '');
    if (!para.trim()) { y += 18; continue; }
    para = para.replace(/([A-Za-z0-9\s\-()]+):\s*(\d{1,3}%)/g, '$1: $2');
    para = para.replace(/([A-Za-z0-9\s\-()]+)(\d{1,3}%)/g, '$1 $2');
    const percentMatch = para.match(/^(.+?)(\d{1,3}%)$/);
    if (percentMatch && percentMatch[1]) {
      let label = percentMatch[1].trim();
      let percent = percentMatch[2];
      if (!label.endsWith(' ')) label += ' ';
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(idx === 0 ? 19 : 14);
      doc.setTextColor(idx === 0 ? '#23252b' : '#111');
      if (y > pageBottom) { doc.addPage(); y = marginBottom; }
      doc.text(label, 60, y, { align: 'left' });
      doc.text(percent, pageWidth - 60, y, { align: 'right' });
      y += 22;
      continue;
    }
    const match = para.match(/^(\s*)([A-Za-z0-9\s'()\/-]+:)(.*)$/);
    if (match) {
      const boldPart = match[2];
      let rest = match[3] || '';
      const boldWidth = doc.getTextWidth(boldPart);
      const spaceWidth = doc.getTextWidth(' ');
      let restLines = doc.splitTextToSize(rest.trim(), pageWidth - 120 - boldWidth - spaceWidth);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(idx === 0 ? 19 : 14);
      doc.setTextColor(idx === 0 ? '#23252b' : '#111');
      if (y > pageBottom) { doc.addPage(); y = marginBottom; }
      doc.text(boldPart, 60, y, { align: 'left' });
      doc.setFont('helvetica', 'normal');
      let x = 60 + boldWidth + spaceWidth;
      if (restLines.length > 0) {
        doc.text(restLines[0], x, y, { align: 'left', maxWidth: pageWidth - x - 60 });
      }
      y += 22;
      for (let i = 1; i < restLines.length; i++) {
        if (y > pageBottom) { doc.addPage(); y = marginBottom; }
        doc.text(restLines[i], 60, y, { align: 'left', maxWidth: pageWidth - 120 });
        y += 22;
      }
      y += 8;
      continue;
    }
    const lines = doc.splitTextToSize(para, pageWidth - 120);
    for (let i = 0; i < lines.length; i++) {
      if (y > pageBottom) { doc.addPage(); y = marginBottom; }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(15);
      doc.setTextColor('#111');
      doc.text(lines[i], 60, y, { align: 'justify', maxWidth: pageWidth - 120 });
      y += 22;
    }
    y += 8;
  }
  doc.addPage();
}

function renderAncestryBreakdownBlocks(doc: jsPDF, ancestryBlocks: { region: string, percent: number, description: string }[], pageWidth: number, y: number): number {
  const normalFontSize = 15;
  const boldFontSize = 13;
  const indent = 32;
  const marginBottom = 60;
  const pageBottom = 812 - marginBottom;
  ancestryBlocks.forEach(block => {
    // Region (left, bold) + percent (right, bold)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(boldFontSize);
    doc.setTextColor('#23252b');
    if (y > pageBottom) { doc.addPage(); y = marginBottom; }
    doc.text(block.region + ':', 60, y, { align: 'left' });
    doc.text(block.percent + '%', pageWidth - 60, y, { align: 'right' });
    y += 20;
    // Description (indented, justified)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(normalFontSize);
    doc.setTextColor('#111');
    const descLines = doc.splitTextToSize(block.description, pageWidth - 120 - indent);
    for (let i = 0; i < descLines.length; i++) {
      if (y > pageBottom) { doc.addPage(); y = marginBottom; }
      doc.text(descLines[i], 60 + indent, y, { align: 'justify', maxWidth: pageWidth - 120 - indent });
      y += 22;
    }
    y += 12; // extra space between blocks
  });
  return y;
}

// Helper function to create a basic pie chart directly in the PDF
function createBasicPieChart(
  doc: jsPDF, 
  data: AncestryDatum[], 
  pageWidth: number, 
  y: number, 
  width: number, 
  height: number
) {
  try {
    if (!data || data.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(18);
      doc.setTextColor('#888');
      doc.text('Pie chart unavailable', pageWidth / 2, y + height/2, { align: 'center' });
      return;
    }
    
    // Set basic parameters
    const centerX = pageWidth / 2;
    const centerY = y + height / 2;
    const radius = Math.min(width, height) / 2.5;
    
    // Draw title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor('#23252b');
    doc.text('Ancestry Breakdown', centerX, y + 20, { align: 'center' });
    
    // Calculate total for percentages
    const total = data.reduce((sum, item) => sum + item.percent, 0);
    
    // Draw pie chart
    let startAngle = -Math.PI / 2; // Start from top
    const colors = ['#2f80ed','#f2994a','#27ae60','#eb5757','#9b51e0','#56ccf2','#f2c94c','#6fcf97','#bb6bd9'];
    
    data.forEach((item, i) => {
      const sliceAngle = (Math.PI * 2 * item.percent) / total;
      const endAngle = startAngle + sliceAngle;
      const color = colors[i % colors.length];
      
      // Convert hex color to RGB
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      
      // Draw pie slice
      doc.setFillColor(r, g, b);
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(2);
      
      // Create a path for the slice
      const segments = 20; // Number of line segments to use for the arc
      
      // Start from the center
      let pathX = centerX;
      let pathY = centerY;
      
      // Move to the start of the arc
      const startX = centerX + Math.cos(startAngle) * radius;
      const startY = centerY + Math.sin(startAngle) * radius;
      
      // Draw the slice
      doc.triangle(centerX, centerY, startX, startY, startX, startY, 'F');
      
      // Draw the arc using multiple triangles
      for (let j = 0; j < segments; j++) {
        const angle1 = startAngle + (j / segments) * sliceAngle;
        const angle2 = startAngle + ((j + 1) / segments) * sliceAngle;
        
        const x1 = centerX + Math.cos(angle1) * radius;
        const y1 = centerY + Math.sin(angle1) * radius;
        const x2 = centerX + Math.cos(angle2) * radius;
        const y2 = centerY + Math.sin(angle2) * radius;
        
        doc.triangle(centerX, centerY, x1, y1, x2, y2, 'F');
      }
      
      startAngle = endAngle;
    });
    
    // Add legend below the chart
    let legendY = y + height + 40;
    data.forEach((item, i) => {
      const color = colors[i % colors.length];
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      
      doc.setFillColor(r, g, b);
      doc.rect(centerX - 100, legendY - 5, 10, 10, 'F');
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor('#23252b');
      doc.text(`${item.region} (${item.percent}%)`, centerX - 85, legendY + 2);
      
      legendY += 20;
    });
    
  } catch (error) {
    console.error('Error creating basic pie chart:', error);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(18);
    doc.setTextColor('#888');
    doc.text('Pie chart unavailable', pageWidth / 2, y + height/2, { align: 'center' });
  }
}

export function downloadAnalysisAsPDF(
=======
function cleanText(text: string): string {
  // Remove markdown formatting
  text = text.replace(/\*\*/g, '');
  text = text.replace(/\*/g, '');
  text = text.replace(/^[-•]\s*/gm, '');
  text = text.replace(/^#+\s*/gm, '');
  
  // Fix common formatting issues
  text = text.replace(/\s+/g, ' '); // Multiple spaces to single space
  text = text.replace(/([.!?])\s*([A-Z])/g, '$1 $2'); // Ensure space after punctuation
  text = text.replace(/\s+([.,!?;:])/g, '$1'); // Remove space before punctuation
  
  return text.trim();
}

function renderParagraphsImproved(
  doc: jsPDF, 
  paragraphs: string[], 
  pageWidth: number, 
  startY: number, 
  opts?: { fontSize?: number, color?: string }
): number {
  const fontSize = opts?.fontSize || 13; // Regular text at 13pt
  const lineHeight = fontSize * 1.6; // Good line height for readability
  const paragraphSpacing = lineHeight * 1.0; // Reasonable space between paragraphs
  const marginLeft = 40;
  const marginRight = 40;
  const marginBottom = 40;
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageBottom = pageHeight - marginBottom;
  const textWidth = pageWidth - marginLeft - marginRight;
  
  let y = startY;
  
  for (let idx = 0; idx < paragraphs.length; idx++) {
    let para = cleanText(paragraphs[idx]);
    if (!para.trim()) { 
      y += paragraphSpacing / 2; 
      continue; 
    }
    
    // Check if this is a heading (only if it's a standalone line with colon at the end or all caps)
    const isHeading = /^[A-Z][^:]*:$/.test(para.trim()) && para.trim().length < 50 || 
                     /^[A-Z\s]+$/.test(para.trim()) && para.trim().length < 30;
    
    // Check for bold sections (text before colon)
    const colonIndex = para.indexOf(':');
    const hasBoldSection = colonIndex > 0 && colonIndex < para.length - 1;
    
    if (isHeading) {
      // Make headings bold at 15pt
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.setTextColor('#1a1a1a');
    }
    
    // Check if we need a new page before starting paragraph
    if (y + lineHeight * 2 > pageBottom) {
      doc.addPage();
      y = marginBottom;
    }
    
    if (hasBoldSection && !isHeading) {
      // IMPORTANT: Only text BEFORE the colon (including the colon) should be bold
      // Everything AFTER the colon must be normal (not bold)
      const boldPart = para.substring(0, colonIndex + 1); // Text before and including ":"
      const normalPart = para.substring(colonIndex + 1).trim(); // Text after ":" - NEVER BOLD
      
      // Render bold part at same size as normal text (13pt)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(fontSize); // Use same fontSize as normal text
      doc.setTextColor(opts?.color || '#000');
      
      // Measure the width of the bold part
      const boldWidth = doc.getTextWidth(boldPart + ' ');
      
      // Set normal font for measuring
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSize);
      
      // Check if we need to wrap
      if (boldWidth + doc.getTextWidth(normalPart) > textWidth) {
        // Need to wrap - render as a single paragraph with bold part inline
        const fullText = boldPart + ' ' + normalPart;
        const lines = doc.splitTextToSize(fullText, textWidth);
        
        for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
          const line = lines[lineIdx];
          if (y > pageBottom) {
            doc.addPage();
            y = marginBottom;
          }
          
          // For the first line, check if it contains the bold part
          if (lineIdx === 0 && line.includes(boldPart)) {
            // Render the bold part
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(fontSize);
            doc.text(boldPart + ' ', marginLeft, y);
            
            // Render the rest of the line - ALWAYS NORMAL (NOT BOLD)
            const restOfLine = line.substring(boldPart.length + 1);
            if (restOfLine) {
              doc.setFont('helvetica', 'normal'); // Ensure normal font
              doc.setFontSize(fontSize);
              doc.setTextColor(opts?.color || '#000');
              doc.text(restOfLine, marginLeft + boldWidth, y);
            }
          } else {
            // Render subsequent lines - ALWAYS NORMAL (NOT BOLD)
            doc.setFont('helvetica', 'normal'); // Ensure normal font
            doc.setFontSize(fontSize);
            doc.setTextColor(opts?.color || '#000');
            doc.text(line, marginLeft, y);
          }
          
          y += lineHeight;
        }
      } else {
        // Render both parts on the same line
        if (y > pageBottom) {
          doc.addPage();
          y = marginBottom;
        }
        
        // Bold part
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(fontSize);
        doc.setTextColor(opts?.color || '#000');
        doc.text(boldPart + ' ', marginLeft, y);
        
        // Normal part at same y position
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(fontSize);
        doc.setTextColor(opts?.color || '#000');
        doc.text(normalPart, marginLeft + boldWidth, y);
        
        y += lineHeight;
      }
    } else {
      // Regular rendering
      if (!isHeading) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(fontSize);
        doc.setTextColor(opts?.color || '#000');
      }
      
      // Split text into lines that fit within the width
      const lines = doc.splitTextToSize(para, textWidth);
      
      // Render each line
      for (const line of lines) {
        if (y > pageBottom) {
          doc.addPage();
          y = marginBottom;
        }
        
        doc.text(line, marginLeft, y);
        y += lineHeight;
      }
    }
    
    y += paragraphSpacing;
  }
  
  return y;
}

// Simple chart drawing function that actually works
function drawSimplePieChart(
  doc: jsPDF, 
  data: AncestryDatum[], 
  centerX: number,
  centerY: number,
  radius: number
) {
  if (!data || data.length === 0) return;
  
  const colors = [
    [47, 128, 237],   // #2f80ed
    [242, 153, 74],   // #f2994a
    [39, 174, 96],    // #27ae60
    [235, 87, 87],    // #eb5757
    [155, 81, 224],   // #9b51e0
    [86, 204, 242],   // #56ccf2
    [242, 201, 76],   // #f2c94c
    [111, 207, 151],  // #6fcf97
    [187, 107, 217]   // #bb6bd9
  ];
  
  // Calculate total
  const total = data.reduce((sum, item) => sum + item.percent, 0);
  
  // Draw slices
  let currentAngle = -Math.PI / 2; // Start from top
  
  data.forEach((item, index) => {
    const sliceAngle = (item.percent / total) * Math.PI * 2;
    const endAngle = currentAngle + sliceAngle;
    
    // Get color
    const color = colors[index % colors.length];
    doc.setFillColor(color[0], color[1], color[2]);
    
    // Draw slice using triangle fan from center
    const segments = Math.max(20, Math.floor(sliceAngle * 10));
    
    for (let i = 0; i < segments; i++) {
      const angle1 = currentAngle + (sliceAngle * i) / segments;
      const angle2 = currentAngle + (sliceAngle * (i + 1)) / segments;
      
      const x1 = centerX + Math.cos(angle1) * radius;
      const y1 = centerY + Math.sin(angle1) * radius;
      const x2 = centerX + Math.cos(angle2) * radius;
      const y2 = centerY + Math.sin(angle2) * radius;
      
      doc.triangle(centerX, centerY, x1, y1, x2, y2, 'F');
    }
    
    currentAngle = endAngle;
  });
  
  // Add white border between slices
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(2);
  currentAngle = -Math.PI / 2;
  
  data.forEach((item) => {
    const sliceAngle = (item.percent / total) * Math.PI * 2;
    const x = centerX + Math.cos(currentAngle) * radius;
    const y = centerY + Math.sin(currentAngle) * radius;
    
    doc.line(centerX, centerY, x, y);
    currentAngle += sliceAngle;
  });
}

// Get user info from window
function getUserInfo(): { name?: string, wallet?: string } {
  if (typeof window === 'undefined') return {};
  
  const win = window as any;
  return {
    name: win.aiAncestryUserName || win.userBasename || win.userName,
    wallet: win.userWalletAddress || win.walletAddress
  };
}

export async function downloadAnalysisAsPDF(
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
  result: string,
  ancestryData: AncestryDatum[],
  pieChartDataUrl?: string
) {
<<<<<<< HEAD
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Clean the result text to fix any encoding issues
  result = result.replace(/[""]/g, '"').replace(/['']/g, "'").replace(/[–—]/g, '-');

  doc.setFillColor(245, 246, 250);
  doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  doc.setTextColor('#23252b');
  doc.text('Ancestry Analysis Report', pageWidth / 2, 120, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(16);
  doc.setTextColor('#555');
  doc.text('Generated with AI Ancestry', pageWidth / 2, 155, { align: 'center' });
  doc.setFontSize(12);
  doc.setTextColor('#888');
  doc.text('Date: ' + new Date().toLocaleDateString(), pageWidth / 2, 185, { align: 'center' });
  // --- Add user name below the date if provided ---
  if (typeof window !== 'undefined' && (window as any).aiAncestryUserName) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor('#2f80ed');
    doc.text('Generated by: ' + (window as any).aiAncestryUserName, pageWidth / 2, 205, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor('#888');
  }
  
  const lines = result.split(/\n/);
  let i = 0;
  let summaryTableBlock: string[] = [];
  let summaryTableFound = false;
  let analysisParas: string[] = [];
  let analysisBoldLines: number[] = [];
  let conclusionParas: string[] = [];
  let afterConclusion: string[] = [];
  let compAncestryBlock: string[] = [];
  let compAncestryBoldLines: number[] = [];
  let inConclusion = false;
  let inAfterConclusion = false;
  let inCompAncestry = false;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (/^Comprehensive Ancestry Percentage/i.test(line)) {
      inCompAncestry = true;
      compAncestryBlock.push(line);
      compAncestryBoldLines.push(compAncestryBlock.length - 1);
      i++;
      continue;
    }
    
    if (inCompAncestry && line) {
      let fixedLine = line.replace(/([A-Za-z\s-]+):(\d{1,3}%)/g, '$1: $2');
      fixedLine = fixedLine.replace(/([A-Za-z\s-]+)(\d{1,3}%)/g, '$1 $2');
      
      if (/^[-*]/.test(fixedLine) || fixedLine.startsWith(' ') || isHeading(fixedLine)) {
        compAncestryBlock.push(fixedLine);
        if (isHeading(fixedLine)) compAncestryBoldLines.push(compAncestryBlock.length - 1);
        i++;
        continue;
      } else {
        inCompAncestry = false;
      }
    }
    
    if (/^#+\s?SUMMARY TABLE/i.test(line)) {
      summaryTableFound = true;
      i++;
      continue;
    }
    if (summaryTableFound && (line.startsWith('|') || line.includes('---'))) {
      summaryTableBlock.push(lines[i]);
      i++;
      continue;
    }
    if (/^Conclusion:?$/i.test(line) || /^\*\*?Conclusion:?\*\*?/i.test(line)) {
      inConclusion = true;
      inAfterConclusion = false;
      i++;
      continue;
    }
    if (inConclusion && !line) {
      inConclusion = false;
      inAfterConclusion = true;
      i++;
      continue;
    }
    if (inConclusion) {
      conclusionParas.push(line.replace(/\*\*/g, ''));
      i++;
      continue;
    }
    if (inAfterConclusion) {
      afterConclusion.push(line.replace(/\*\*/g, ''));
      i++;
      continue;
    }
    if (!summaryTableFound && !inCompAncestry) {
      analysisParas.push(line.replace(/\*\*/g, ''));
      if (isHeading(line)) analysisBoldLines.push(analysisParas.length - 1);
    } else if (!inConclusion && !inAfterConclusion && !inCompAncestry) {
      // skip summary table and comp ancestry lines
    }
    i++;
  }

  let y = 70;
  const marginBottom = 60;
  const pageBottom = 812 - marginBottom;
  
  doc.addPage();
  y = renderParagraphsWithBoldSpans(doc, analysisParas, pageWidth, y, { fontSize: 15, color: '#111', justify: true });
  
  if (compAncestryBlock.length > 0) {
    doc.addPage();
    doc.setFillColor(252, 252, 255);
    doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F');
    let yComp = 70;
    yComp = renderParagraphsWithBoldSpans(doc, compAncestryBlock, pageWidth, yComp, { fontSize: 15, color: '#111', justify: true });
  }

  if (summaryTableBlock.length > 0) {
    doc.addPage();
    doc.setFillColor(252, 252, 255);
    doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(21);
    doc.setTextColor('#888');
    doc.text('SUMMARY TABLE', 60, 70, { align: 'left' });
    renderMarkdownTable(doc, summaryTableBlock, pageWidth, 110);
  }

  if (conclusionParas.length > 0) {
    doc.addPage();
    let cy = 70;
    cy = renderParagraphsWithBoldSpans(doc, conclusionParas, pageWidth, cy, { fontSize: 15, color: '#111', justify: true });
  }

  if (ancestryData && ancestryData.length > 0) {
    doc.addPage();
    doc.setFillColor(252, 252, 255);
    doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor('#23252b');
    doc.text('Ancestry Breakdown', pageWidth / 2, 90, { align: 'center' });
    
    // Try to use the image-based pie chart if available
    if (pieChartDataUrl && pieChartDataUrl.startsWith('data:image/png;base64,')) {
      try {
        console.log('PDF: Attempting to render pie chart image');
        
        const chartWidth = 320;
        const chartHeight = 220;
        const chartX = (pageWidth - chartWidth) / 2;
        
        // Add the image to the PDF
        doc.addImage(pieChartDataUrl, 'PNG', chartX, 120, chartWidth, chartHeight);
        
        // Add legend below the chart
        let legendY = 360;
        const legendBlockWidth = 340;
        const legendX = (pageWidth - legendBlockWidth) / 2 + 24;
        ancestryData.forEach((item, i) => {
          const color = ['#2f80ed','#f2994a','#27ae60','#eb5757','#9b51e0','#56ccf2','#f2c94c','#6fcf97','#bb6bd9'][i%9];
          const r = parseInt(color.slice(1, 3), 16);
          const g = parseInt(color.slice(3, 5), 16);
          const b = parseInt(color.slice(5, 7), 16);
          doc.setFillColor(r, g, b);
          doc.circle(legendX, legendY, 6, 'F');
          doc.setFontSize(15);
          doc.setTextColor('#23252b');
          doc.text(`${item.region} (${item.percent}%)`, legendX + 15, legendY + 5);
          legendY += 28;
        });
        
        console.log('PDF: Pie chart rendered successfully from image');
      } catch (e) {
        console.error('Error rendering pie chart image in PDF:', e);
        // Fallback to basic chart
        createBasicPieChart(doc, ancestryData, pageWidth, 120, 320, 220);
      }
    } else {
      console.log('PDF: No valid pie chart image, creating basic chart');
      // Create a basic pie chart directly in the PDF
      createBasicPieChart(doc, ancestryData, pageWidth, 120, 320, 220);
    }
  }

=======
  console.log('Starting PDF generation...');
  console.log('Full result text:', result);
  console.log('Ancestry data:', ancestryData);
  console.log('Pie chart data URL available:', !!pieChartDataUrl);
  
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Cover page
  doc.setFillColor(245, 246, 250);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(42); // Increased from 32
  doc.setTextColor('#23252b');
  doc.text('Ancestry Analysis Report', pageWidth / 2, 120, { align: 'center' });
  
  // Date (moved up since subtitle is removed)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13); // Legend text at 13pt
  doc.setTextColor('#888');
  doc.text('Date: ' + new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }), pageWidth / 2, 170, { align: 'center' });
  
  // User info - only show name if available, skip wallet
  const userInfo = getUserInfo();
  let yOffset = 210; // Moved up since subtitle is removed
  
  if (userInfo.name) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14); // Smaller font size
    doc.setTextColor('#888888'); // Gray color
    doc.text(`Generated for: ${userInfo.name}`, pageWidth / 2, yOffset, { align: 'center' });
    yOffset += 30;
  }
  
  // Add logo in the middle section
  const logoWidth = 120;
  const logoHeight = 120;
  const logoX = (pageWidth - logoWidth) / 2;
  const logoY = 280;
  
  try {
    // Try to add the baobab tree logo
    // For now, we'll use a direct base64 approach or URL
    // In production, you'd want to import the image or use a base64 string
    if (typeof window !== 'undefined') {
      // Try to load the logo from public folder
      const img = new Image();
      img.src = '/logo.png';
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          try {
            // Create a canvas to convert image to base64
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              const dataUrl = canvas.toDataURL('image/png');
              doc.addImage(dataUrl, 'PNG', logoX, logoY, logoWidth, logoHeight);
            }
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        img.onerror = () => reject(new Error('Failed to load logo'));
      });
    }
  } catch (error) {
    console.log('Could not add logo to PDF:', error);
    // Fallback: draw a simple placeholder
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(2);
    doc.circle(pageWidth / 2, 330, 40);
    doc.setFontSize(12);
    doc.setTextColor('#999');
    doc.text('AI', pageWidth / 2, 335, { align: 'center' });
  }
  
  // Removed decorative line below logo
  
  // Add a note at the bottom of cover page
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(14);
  doc.setTextColor('#999');
  doc.text('This report contains AI-generated ancestry analysis based on facial features.', pageWidth / 2, pageHeight - 100, { align: 'center' });
  doc.text('Results are for entertainment purposes only.', pageWidth / 2, pageHeight - 80, { align: 'center' });
  
  // Parse ALL content sections
  const lines = result.split(/\n/);
  let analysisParas: string[] = [];
  let comprehensiveParas: string[] = [];
  let summaryTableLines: string[] = [];
  let conclusionParas: string[] = [];
  
  let currentSection = 'analysis';
  let currentPara = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Check for section markers
    if (trimmedLine.toLowerCase().includes('comprehensive ancestry percentage')) {
      if (currentPara) {
        if (currentSection === 'analysis') analysisParas.push(currentPara);
        currentPara = '';
      }
      currentSection = 'comprehensive';
      // Don't add this line as content - it's just a section marker
      continue;
    }
    
    if (trimmedLine.toLowerCase().includes('summary table') || trimmedLine === '## SUMMARY TABLE') {
      if (currentPara) {
        if (currentSection === 'comprehensive') comprehensiveParas.push(currentPara);
        currentPara = '';
      }
      currentSection = 'table';
      continue;
    }
    
    if (trimmedLine.toLowerCase().startsWith('conclusion')) {
      if (currentPara) {
        currentPara = '';
      }
      currentSection = 'conclusion';
      continue;
    }
    
    // Handle content based on current section
    if (currentSection === 'table' && (trimmedLine.startsWith('|') || trimmedLine.includes('---'))) {
      summaryTableLines.push(line);
    } else if (currentSection === 'conclusion') {
      if (trimmedLine) conclusionParas.push(trimmedLine);
    } else if (currentSection === 'comprehensive') {
      if (trimmedLine) comprehensiveParas.push(trimmedLine);
    } else if (currentSection === 'analysis') {
      if (trimmedLine) {
        currentPara = currentPara ? `${currentPara} ${trimmedLine}` : trimmedLine;
      } else if (currentPara) {
        analysisParas.push(currentPara);
        currentPara = '';
      }
    }
  }
  
  // Add any remaining paragraph
  if (currentPara) {
    if (currentSection === 'analysis') analysisParas.push(currentPara);
    else if (currentSection === 'comprehensive') comprehensiveParas.push(currentPara);
  }
  
  // Analysis section (Page 2)
  if (analysisParas.length > 0) {
    doc.addPage();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15); // Title at 15pt
    doc.setTextColor('#23252b');
    doc.text('Analysis', 40, 60);
    
    // Add a decorative line under the title
    doc.setDrawColor(47, 128, 237);
    doc.setLineWidth(2);
    doc.line(40, 70, 200, 70);
    
    renderParagraphsImproved(doc, analysisParas, pageWidth, 100, { 
      fontSize: 13, 
      color: '#333' 
    });
  }
  
  // Comprehensive Ancestry section (Page 3)
  if (comprehensiveParas.length > 0) {
    doc.addPage();
    doc.setFillColor(252, 252, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15); // Title at 15pt
    doc.setTextColor('#23252b');
    doc.text('Comprehensive Ancestry Breakdown', 40, 60);
    
    // Add a decorative line under the title
    doc.setDrawColor(47, 128, 237);
    doc.setLineWidth(2);
    doc.line(40, 70, 400, 70);
    
    renderParagraphsImproved(doc, comprehensiveParas, pageWidth, 100, { 
      fontSize: 13, 
      color: '#333' 
    });
  }
  
  // Summary Table (Page 4)
  if (summaryTableLines.length > 0) {
    doc.addPage();
    doc.setFillColor(252, 252, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15); // Title at 15pt
    doc.setTextColor('#23252b');
    doc.text('Summary Table', 40, 60);
    
    // Add a decorative line under the title
    doc.setDrawColor(47, 128, 237);
    doc.setLineWidth(2);
    doc.line(40, 70, 200, 70);
    
    renderMarkdownTable(doc, summaryTableLines, pageWidth, 100);
  }
  
  // Conclusion (Page 5)
  if (conclusionParas.length > 0) {
    doc.addPage();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15); // Title at 15pt
    doc.setTextColor('#23252b');
    doc.text('Conclusion', 40, 60);
    
    // Add a decorative line under the title
    doc.setDrawColor(47, 128, 237);
    doc.setLineWidth(2);
    doc.line(40, 70, 180, 70);
    
    renderParagraphsImproved(doc, conclusionParas, pageWidth, 100, { 
      fontSize: 13, 
      color: '#333' 
    });
  }
  
  // Ancestry Percentages Page (Page 6)
  if (ancestryData && ancestryData.length > 0) {
    doc.addPage();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15); // Title at 15pt
    doc.setTextColor('#23252b');
    doc.text('Ancestry Percentages', 40, 60);
    
    // Add a decorative line under the title
    doc.setDrawColor(47, 128, 237);
    doc.setLineWidth(2);
    doc.line(40, 70, 250, 70);
    
    let y = 110;
    ancestryData.forEach(item => {
      // Region name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14); // Region names slightly larger
      doc.text(item.region, 40, y);
      
      // Percentage
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(14); // Percentage same size
      doc.text(`${item.percent}%`, pageWidth - 40, y, { align: 'right' });
      
      // Add a light separator line
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.5);
      doc.line(40, y + 10, pageWidth - 40, y + 10);
      
      y += 30; // Reasonable spacing
    });
    
    // Add final note at bottom
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(14);
    doc.setTextColor('#666');
    doc.text('Note: Percentages are AI-generated estimates based on facial analysis.', pageWidth / 2, pageHeight - 60, { align: 'center' });
  }
  
  // Ancestry Chart Page (Last Page) - Always add this page if we have data
  if (ancestryData && ancestryData.length > 0) {
    doc.addPage();
    // No background color - keep it white
    
    // Add the title as a page heading
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15); // Title at 15pt
    doc.setTextColor('#23252b');
    doc.text('Ancestry Visualization', pageWidth / 2, 60, { align: 'center' });
    
    // Add a decorative line under the title
    doc.setDrawColor(47, 128, 237);
    doc.setLineWidth(2);
    doc.line((pageWidth - 250) / 2, 70, (pageWidth + 250) / 2, 70);
    
    // Try to add the pie chart image using the same method as the logo
    let chartAdded = false;
    // Use the requested width and proportional height
    const chartWidth = 375;
    const chartHeight = 450; // Adjusted height for just the chart and legend without title
    const chartX = (pageWidth - chartWidth) / 2;
    const chartY = 100; // Position below the page title
    
    // First try to use the provided chart image if available
    if (pieChartDataUrl) {
      console.log('Attempting to add pie chart from data URL...');
      try {
        if (typeof window !== 'undefined') {
          // Create an image element
          const img = new Image();
          img.src = pieChartDataUrl;
          
          await new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error('Image load timeout'));
            }, 5000);
            
            img.onload = () => {
              clearTimeout(timeout);
              try {
                console.log('Pie chart image loaded, adding to PDF...');
                // Add the image directly since it's already a data URL
                doc.addImage(pieChartDataUrl, 'PNG', chartX, chartY, chartWidth, chartHeight);
                chartAdded = true;
                console.log('Pie chart added successfully!');
                resolve();
              } catch (error) {
                console.error('Error adding pie chart to PDF:', error);
                reject(error);
              }
            };
            
            img.onerror = () => {
              clearTimeout(timeout);
              console.error('Failed to load pie chart image');
              reject(new Error('Failed to load chart image'));
            };
          });
        }
      } catch (error) {
        console.log('Could not add pie chart image to PDF:', error);
      }
    } else {
      console.log('No pie chart data URL provided');
    }
    
    // If image failed or wasn't provided, draw a simple chart as fallback
    if (!chartAdded) {
      console.log('Drawing fallback pie chart...');
      const chartCenterX = pageWidth / 2;
      const chartCenterY = 280;
      const chartRadius = 120;
      
      drawSimplePieChart(doc, ancestryData, chartCenterX, chartCenterY, chartRadius);
    }
    
    // Legend is already included in the captured chart image, no need to add it again
  }
  
  // Save the PDF
  console.log('Saving PDF...');
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
  doc.save('ancestry-analysis-report.pdf');
}
