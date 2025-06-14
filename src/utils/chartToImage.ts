import html2canvas from "html2canvas";

/**
 * Renders a DOM element (e.g., a chart) to a PNG data URL for PDF embedding.
 * @param element HTMLElement (e.g., chart container)
 * @returns Promise<string> PNG data URL
 */
export async function chartToImage(element: HTMLElement): Promise<string> {
  if (!element) {
<<<<<<< HEAD
    console.error('chartToImage: Element is null or undefined');
=======
    console.error('Element is null or undefined');
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
    return '';
  }
  
  try {
<<<<<<< HEAD
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
=======
    // Wait for Chart.js animations to complete (default animation duration is 1000ms)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if there's a canvas element (for Chart.js)
    const chartCanvas = element.querySelector('canvas');
    if (chartCanvas) {
      // Force Chart.js to finish rendering
      const ctx = chartCanvas.getContext('2d');
      if (ctx) {
        // Trigger a render by saving and restoring context
        ctx.save();
        ctx.restore();
      }
      
      // Additional wait for Chart.js
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Use html2canvas directly on the element with optimized settings
    const capturedCanvas = await html2canvas(element, {
      backgroundColor: '#ffffff', // Ensure white background
      scale: 2, // Good balance between quality and performance
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
      logging: true, // Enable logging for debugging
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
<<<<<<< HEAD
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
=======
      imageTimeout: 15000, // Increase timeout
      onclone: (clonedDoc, clonedElement) => {
        // Ensure the cloned element is visible and properly styled
        clonedElement.style.display = 'block';
        clonedElement.style.visibility = 'visible';
        clonedElement.style.opacity = '1';
        clonedElement.style.background = '#ffffff';
        
        // Find and ensure canvas elements are rendered
        const canvases = clonedElement.querySelectorAll('canvas');
        canvases.forEach((canvas: any) => {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Force canvas to render
            ctx.save();
            ctx.restore();
          }
        });
        
        // Ensure all text is black
        const textElements = clonedElement.querySelectorAll('span, div, p');
        textElements.forEach((el: any) => {
          if (el.style) {
            el.style.color = '#000000';
          }
        });
      }
    });
    
    // Get data URL
    const dataUrl = capturedCanvas.toDataURL('image/png', 1.0);
    console.log('Generated chart data URL length:', dataUrl.length);
    
    // Validate the data URL
    if (!dataUrl || dataUrl === 'data:,' || dataUrl.length < 100) {
      throw new Error('Invalid data URL generated');
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
    }
    
    return dataUrl;
  } catch (error) {
<<<<<<< HEAD
    console.error('chartToImage: Error during capture:', error);
    return '';
=======
    console.error('Error in chartToImage:', error);
    
    // Fallback: Try to capture with a simpler method
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 1,
        logging: false
      });
      return canvas.toDataURL('image/png');
    } catch (fallbackError) {
      console.error('Fallback capture also failed:', fallbackError);
      return '';
    }
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
  }
}
