import html2canvas from "html2canvas";

/**
 * Renders a DOM element (e.g., a chart) to a PNG data URL for PDF embedding.
 * @param element HTMLElement (e.g., chart container)
 * @returns Promise<string> PNG data URL
 */
export async function chartToImage(element: HTMLElement): Promise<string> {
  if (!element) {
    console.error('Element is null or undefined');
    return '';
  }
  
  try {
    // Wait longer to ensure chart is fully rendered
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Prepare the element for capture
    const originalDisplay = element.style.display;
    const originalVisibility = element.style.visibility;
    const originalPosition = element.style.position;
    const originalZIndex = element.style.zIndex;
    
    // Make sure the element is fully visible during capture
    element.style.visibility = 'visible';
    element.style.display = 'block';
    element.style.position = 'relative';
    element.style.zIndex = '9999';
    
    // Ensure all SVG elements have explicit dimensions
    const svgs = element.querySelectorAll('svg');
    svgs.forEach(svg => {
      const rect = svg.getBoundingClientRect();
      svg.setAttribute('width', rect.width.toString());
      svg.setAttribute('height', rect.height.toString());
      svg.style.overflow = 'visible';
    });
    
    // Capture the element directly without cloning
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 3, // Higher scale for better quality
      logging: false,
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
      imageTimeout: 0, // No timeout for image loading
    });
    
    // Restore original styles
    element.style.display = originalDisplay;
    element.style.visibility = originalVisibility;
    element.style.position = originalPosition;
    element.style.zIndex = originalZIndex;
    
    // Get data URL but make sure it's properly formatted for jsPDF
    const dataUrl = canvas.toDataURL('image/png');
    console.log('Generated chart data URL length:', dataUrl.length);
    return dataUrl;
  } catch (error) {
    console.error('Error in chartToImage:', error);
    return '';
  }
}
