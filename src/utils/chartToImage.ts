import html2canvas from "html2canvas";

/**
 * Renders a DOM element (e.g., a chart) to a PNG data URL for PDF embedding.
 * @param element HTMLElement (e.g., chart container)
 * @returns Promise<string> PNG data URL
 */
export async function chartToImage(element: HTMLElement): Promise<string> {
  if (!element) {
    console.error('chartToImage: Element is null or undefined');
    return '';
  }
  
  try {
    console.log('chartToImage: Starting capture process');
    
    // Wait for any animations to complete
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Force a reflow to ensure the element is fully rendered
    element.offsetHeight;
    
    // Get the canvas element inside the chart container
    const canvas = element.querySelector('canvas');
    if (canvas) {
      console.log('chartToImage: Found canvas element, using direct canvas approach');
      // If we have a canvas element (from Chart.js), use it directly
      const dataUrl = canvas.toDataURL('image/png');
      console.log('chartToImage: Canvas data URL length:', dataUrl.length);
      return dataUrl;
    }
    
    console.log('chartToImage: No canvas found, using html2canvas');
    
    // Prepare the element for capture
    const originalDisplay = element.style.display;
    const originalVisibility = element.style.visibility;
    const originalPosition = element.style.position;
    const originalZIndex = element.style.zIndex;
    const originalOpacity = element.style.opacity;
    
    // Make sure the element is fully visible during capture
    element.style.visibility = 'visible';
    element.style.display = 'block';
    element.style.position = 'relative';
    element.style.zIndex = '9999';
    element.style.opacity = '1';
    
    // Get element bounds
    const rect = element.getBoundingClientRect();
    console.log('chartToImage: Element bounds:', { width: rect.width, height: rect.height });
    
    // Ensure all SVG elements have explicit dimensions
    const svgs = element.querySelectorAll('svg');
    svgs.forEach(svg => {
      const svgRect = svg.getBoundingClientRect();
      svg.setAttribute('width', svgRect.width.toString());
      svg.setAttribute('height', svgRect.height.toString());
      svg.style.overflow = 'visible';
    });
    
    // Capture the element
    const capturedCanvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2, // Good quality without being too large
      logging: true, // Enable logging for debugging
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
      imageTimeout: 0,
      width: rect.width,
      height: rect.height,
      windowWidth: rect.width,
      windowHeight: rect.height,
    });
    
    // Restore original styles
    element.style.display = originalDisplay;
    element.style.visibility = originalVisibility;
    element.style.position = originalPosition;
    element.style.zIndex = originalZIndex;
    element.style.opacity = originalOpacity;
    
    // Get data URL
    const dataUrl = capturedCanvas.toDataURL('image/png');
    console.log('chartToImage: Generated data URL length:', dataUrl.length);
    
    if (dataUrl.length < 100) {
      throw new Error('Generated image is too small, likely empty');
    }
    
    return dataUrl;
  } catch (error) {
    console.error('chartToImage: Error during capture:', error);
    return '';
  }
}
