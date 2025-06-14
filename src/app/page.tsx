"use client";
import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { useMiniKit, useAddFrame, useNotification, useOpenUrl, useClose } from '@coinbase/onchainkit/minikit';
import UploadArea from "../components/UploadArea";
// import PremiumUploadArea from "../components/PremiumUploadArea";
import AncestryPieChart, { AncestryDatum } from "../components/AncestryPieChart";
import { FaFilePdf, FaTwitter, FaFacebook, FaShare, FaPlus } from "react-icons/fa";
import { chartToImage } from "../utils/chartToImage";
import {
  useWalletContext,
  Wallet,
  ConnectWallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
  ConnectWalletText,
} from '@coinbase/onchainkit/wallet';
import { Address, Avatar, Name, Identity, EthBalance } from '@coinbase/onchainkit/identity';
import { Checkout, CheckoutButton, CheckoutStatus } from '@coinbase/onchainkit/checkout';
import { motion } from 'framer-motion';
// Import useAccount from wagmi to properly detect wallet connection
import { useAccount } from 'wagmi';
import { FundButton, getOnrampBuyUrl } from '@coinbase/onchainkit/fund';

const PRODUCT_ID = process.env.NEXT_PUBLIC_PRODUCT_ID || 'ca407516-32fd-4113-8d1a-c997c1b1a7ec';
=======
import UploadArea from "../components/UploadArea";
import AncestryPieChart, { AncestryDatum } from "../components/AncestryPieChart";
import { FaFilePdf, FaTwitter, FaFacebook, FaShare, FaPlus } from "react-icons/fa";
import { chartToImage } from "../utils/chartToImage";
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
// MiniKit hooks
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  useClose,
  usePrimaryButton,
  useViewProfile,
  useNotification
} from '@coinbase/onchainkit/minikit';

const PRODUCT_ID = process.env.NEXT_PUBLIC_PRODUCT_ID || '';
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22

// Utility: Clean and format the result for better readability
function cleanAndFormatResult(raw: string): string {
  // Remove any previous disclaimers or boilerplate before 'YOUR PREDICTED ROOTS ARE:'
  const idx = raw.indexOf('YOUR PREDICTED ROOTS ARE:');
  let cleaned = idx !== -1 ? raw.slice(idx) : raw;

  // Remove any explicit 'SUMMARY TABLE' heading or similar on card 1/2
  cleaned = cleaned.replace(/\n?-?\s*SUMMARY TABLE\s*-?\n?/gi, '\n');

  // Replace markdown headings with styled equivalents
  cleaned = cleaned.replace(/###?\s*/g, '\n\n');
<<<<<<< HEAD
  
  // Bold important terms
  cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>');
  
  // Remove any standalone numbers that might appear in the text (like 1. 2. 3.)
  cleaned = cleaned.replace(/^(\d+\.\s)$/gm, '');
  cleaned = cleaned.replace(/\n(\d+\.\s)\n/g, '\n\n');
  
  // Numbered headings for sections - only keep those with text after the number
  cleaned = cleaned.replace(/(\d+\.\s)([A-Za-z])/g, '<br/><span class="text-blue-500 font-bold">$1</span>$2');
  
  // Replace - bullets with •
  cleaned = cleaned.replace(/\n- /g, '\n• ');
  
  // Remove standalone dash symbols that aren't part of words
  cleaned = cleaned.replace(/([^\w-])-(\ |$)/g, '$1$2');
  cleaned = cleaned.replace(/(^|\s)-([^\w-])/g, '$1$2');
  
=======
  // Bold important terms
  cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>');
  // Numbered headings for sections
  cleaned = cleaned.replace(/(\d+\.\s)/g, '<br/><span class="text-blue-500 font-bold">$1</span>');
  // Replace - bullets with •
  cleaned = cleaned.replace(/\n- /g, '\n• ');
  // Remove standalone dash symbols that aren't part of words
  cleaned = cleaned.replace(/([^\w-])-(\s|$)/g, '$1$2');
  cleaned = cleaned.replace(/(^|\s)-([^\w-])/g, '$1$2');
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
  // Remove excessive line breaks
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // Add blank lines before bullets
  cleaned = cleaned.replace(/([^.])\n• /g, '$1\n\n• ');
  cleaned = cleaned.replace(/^• /gm, '\n• ');
  cleaned = cleaned.replace(/\n\n\n+/g, '\n\n');
  cleaned = cleaned.replace(/^\n+/, '');

  // Ensure there is always a blank line before any bolded section heading (even at start of line)
  cleaned = cleaned.replace(/([^\n])\n(<span class=\"font-bold\">[^<]+<\/span>)/g, '$1\n\n$2'); // after any char except \n
  // Also, if a bolded heading is immediately after a bullet (• ...\n<span...), ensure a blank line
  cleaned = cleaned.replace(/(• [^\n]+)\n(<span class=\"font-bold\">)/g, '$1\n\n$2');

  return cleaned;
}

function splitResultCards(text: string): string[] {
  const paras = text.split(/\n\s*\n|\n/).filter(Boolean);
  const chunkSize = Math.ceil(paras.length / 3);
  return [
    paras.slice(0, chunkSize).join('\n'),
    paras.slice(chunkSize, chunkSize * 2).join('\n'),
    paras.slice(chunkSize * 2).join('\n'),
  ];
}

export default function Home() {
<<<<<<< HEAD
  // MiniKit integration
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const addFrame = useAddFrame();
  const sendNotification = useNotification();
  const openUrl = useOpenUrl();
  const close = useClose();
  
  // Use wagmi's useAccount hook for reliable wallet connection detection
  const { isConnected, address } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [frameAdded, setFrameAdded] = useState(false);
  const [notificationToken, setNotificationToken] = useState<string | null>(null);
  
  // MiniKit frame ready setup
=======
  // MiniKit hooks
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const close = useClose();
  const viewProfile = useViewProfile();
  const sendNotification = useNotification();

  // Frame ready effect
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);
<<<<<<< HEAD
  
  // Set global user name for PDF generation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).aiAncestryUserName = address || '';
=======

  // AddFrame handler
  const handleAddFrame = async () => {
    const result = await addFrame();
    if (result) {
      console.log('Frame added:', result.url, result.token);
      // In production, save these to DB for notifications
    }
  };

  // Profile handler
  const handleViewProfile = () => {
    viewProfile();
  };

  // Notification handler
  const [notificationSent, setNotificationSent] = useState(false);
  const handleSendNotification = async () => {
    try {
      await sendNotification({
        title: 'New High Score! 🎉',
        body: 'Congratulations on achieving a new high score!'
      });
      setNotificationSent(true);
      setTimeout(() => setNotificationSent(false), 30000);
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  };

  // Use wagmi's useAccount hook for reliable wallet connection detection
  const { isConnected, address } = useAccount();
  const [mounted, setMounted] = useState(false);
  // Set global user info for PDF generation
  useEffect(() => {
    if (typeof window !== 'undefined' && address) {
      // Store wallet address
      (window as any).userWalletAddress = address;
      (window as any).walletAddress = address;
      
      // Try to get the displayed name from the Name component
      // Check for basename or ENS name in the DOM
      setTimeout(() => {
        const nameElement = document.querySelector('[data-testid="ockIdentity_Text"]');
        const displayName = nameElement?.textContent || address;
        
        (window as any).aiAncestryUserName = displayName;
        (window as any).userBasename = displayName;
        (window as any).userName = displayName;
      }, 1000);
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
    }
  }, [address]);
  
  // Keep the OnchainKit wallet context for other wallet features
  const walletCtx = useWalletContext();
  
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<'upload' | 'processing' | 'result'>('upload');
<<<<<<< HEAD
=======

  // MiniKit usePrimaryButton integration: Use for main action (Reveal/Upload)
  usePrimaryButton(
    {
      text: step === 'upload' ? 'REVEAL ANCESTRY' : step === 'processing' ? 'PROCESSING...' : 'NEW READING',
      disabled: step === 'processing',
    },
    () => {
      if (step === 'upload' && image) {
        setStep('processing');
        triggerAnalysis(image);
      } else if (step === 'result') {
        setStep('upload');
        setImage(null);
        setResult("");
        setFadeOut(false);
      }
    }
  );
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [ancestryData, setAncestryData] = useState<AncestryDatum[]>([]);
<<<<<<< HEAD
=======
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const analysisInProgressRef = React.useRef(false);
  const paymentDetectedRef = React.useRef(false);
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22

  // Add mounted state to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync step on wallet connect/disconnect
  useEffect(() => {
    if (!isConnected) {
      setStep('upload');
      setImage(null);
      setResult("");
      setError("");
      setFadeOut(false);
      setAncestryData([]);
      setCarouselIndex(0);
      setShowShareModal(false);
    }
  }, [isConnected]);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl(null);
    }
  }, [image]);

  const handleDrop = (files: File[]) => {
    const file = files[0];
    setImage(file);
    setResult("");
    setError("");
  };

  const handleReveal = () => {
    if (!image) return;
<<<<<<< HEAD
    safeTriggerAnalysis(image);
  };

  const triggerAnalysis = (file: File) => {
=======
    setStep('processing');
    triggerAnalysis(image);
  };

  const triggerAnalysis = (file: File) => {
    // Prevent multiple simultaneous analyses
    if (analysisInProgressRef.current) {
      console.log('[ANALYSIS] Analysis already in progress, skipping...');
      return;
    }
    
    analysisInProgressRef.current = true;
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
    setLoading(true);
    setProgress(10);
    const formData = new FormData();
    formData.append("file", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/analyze-face", true);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        // Upload progress from 0-40%
        setProgress(Math.round((event.loaded / event.total) * 40));
      }
    };

    // Simulate analysis progress from 40-95%
    let analysisProgress = 40;
    const progressInterval = setInterval(() => {
      if (analysisProgress < 95) {
        analysisProgress += 1;
        setProgress(analysisProgress);
      } else {
        clearInterval(progressInterval);
      }
    }, 100);
    xhr.onload = () => {
      clearInterval(progressInterval);
      setProgress(100);
      setLoading(false);
<<<<<<< HEAD
=======
      analysisInProgressRef.current = false;
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        setResult(res.analysis);
        setAncestryData(res.ancestryData || []); 
        setStep('result');
        setCarouselIndex(0);
<<<<<<< HEAD
        // Send notification if frame was added
        sendAnalysisNotification();
=======
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
      } else {
        setError("Failed to analyze image. Please try again.");
        setStep('upload');
      }
    };
    xhr.onerror = () => {
      setLoading(false);
<<<<<<< HEAD
=======
      analysisInProgressRef.current = false;
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
      setError("Failed to analyze image. Please try again.");
      setStep('upload');
    };
    xhr.send(formData);
  };

  // PDF download handler using premium PDF utility and pie chart image
  const handleDownloadPDF = async () => {
<<<<<<< HEAD
    console.log('Starting PDF download process');
    
    // Try to get the pie chart image as PNG
    let pieChartDataUrl: string | undefined = undefined;
    
    // Wait a bit to ensure the chart is fully rendered
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const chartEl = document.querySelector(".ancestry-pie-chart-capture") as HTMLElement;
    if (chartEl) {
      console.log('Found chart element, attempting to capture');
      try {
        pieChartDataUrl = await chartToImage(chartEl);
        console.log('Chart captured successfully, data URL length:', pieChartDataUrl?.length);
      } catch (e) {
        console.error('Failed to capture chart:', e);
        // fallback: no chart image
      }
    } else {
      console.warn('Chart element not found');
    }
    
    // Import and call the PDF generation function
    const { downloadAnalysisAsPDF } = await import('../utils/pdfUtils');
    downloadAnalysisAsPDF(result, ancestryData, pieChartDataUrl);
=======
    // Try to get the pie chart image as PNG
    let pieChartDataUrl: string | undefined = undefined;
    
    // Parse ancestry data for the chart
    let chartData: AncestryDatum[] = [];
    
    // First try to get data from the summary table
    const tableMatch = result.match(/\| *Region\/Group *\| *Estimated Percentage *\| *Key Traits.*\|[\s\S]*?(\|.*\|.*\|.*\|\n?)+/);
    if (tableMatch) {
      const rows = tableMatch[0].trim().split(/\n/).filter(Boolean);
      if (rows.length >= 3) {
        chartData = rows.slice(2).map(row => {
          const cells = row.split('|').slice(1,-1).map(cell => cell.trim());
          const region = cells[0];
          const percent = parseInt(cells[1].replace(/[^\d]/g, ''), 10);
          return region && !isNaN(percent) ? { region, percent } : null;
        }).filter((item): item is { region: string; percent: number } => item !== null);
      }
    }
    
    // Fallback to ancestryData if no table data
    if (!chartData.length && ancestryData && ancestryData.length) {
      chartData = ancestryData;
    }
    
    // If we have data, create a temporary chart for capture
    if (chartData.length > 0) {
      try {
        console.log('Creating temporary chart for PDF with data:', chartData);
        
        // Create a temporary container with proper dimensions
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'fixed';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '-9999px';
        tempContainer.style.width = '400px';
        tempContainer.style.height = '500px';
        tempContainer.style.background = 'white'; // White background
        tempContainer.style.padding = '0'; // No padding to avoid gray area
        tempContainer.style.display = 'flex';
        tempContainer.style.alignItems = 'center';
        tempContainer.style.justifyContent = 'center';
        document.body.appendChild(tempContainer);
        
        // Import React DOM for rendering
        const ReactDOM = (await import('react-dom/client')).default;
        const root = ReactDOM.createRoot(tempContainer);
        
        // Render the chart without the title (title will be in PDF page heading)
        await new Promise<void>((resolve) => {
          root.render(
            <div style={{ 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'white',
              padding: '20px'
            }}>
              <AncestryPieChart data={chartData} />
            </div>
          );
          
          // Wait for chart to render
          setTimeout(resolve, 1500);
        });
        
        // Capture the chart
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(tempContainer, {
          backgroundColor: '#ffffff',
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true
        });
        
        pieChartDataUrl = canvas.toDataURL('image/png');
        console.log('Chart captured successfully, data URL length:', pieChartDataUrl?.length);
        
        // Clean up
        root.unmount();
        document.body.removeChild(tempContainer);
      } catch (e) {
        console.error('Failed to create and capture chart:', e);
      }
    } else {
      console.log('No chart data available for PDF');
    }
    
    // Import and call the PDF function
    const { downloadAnalysisAsPDF } = await import('../utils/pdfUtils');
    await downloadAnalysisAsPDF(result, chartData.length > 0 ? chartData : ancestryData, pieChartDataUrl);
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
  };

  const handleShare = (platform: 'twitter' | 'facebook' | 'copy') => {
    const url = encodeURIComponent(window.location.href);
    const message = encodeURIComponent("I just discovered my ancestry using this new AI app!");
    if (platform === 'twitter') {
<<<<<<< HEAD
      openUrl(`https://twitter.com/intent/tweet?url=${url}&text=${message}`);
    } else if (platform === 'facebook') {
      openUrl(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`);
=======
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${message}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`, '_blank');
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href);
      setShowShareModal(false);
      alert('Link copied!');
    }
  };

<<<<<<< HEAD
  // Handle adding frame for notifications
  const handleAddFrame = async () => {
    try {
      const result = await addFrame();
      if (result) {
        setFrameAdded(true);
        setNotificationToken(result.token);
        console.log('Frame added successfully:', result.url);
      }
    } catch (error) {
      console.error('Failed to add frame:', error);
    }
  };

  // Send notification when analysis is complete
  const sendAnalysisNotification = () => {
    if (notificationToken && sendNotification) {
      sendNotification({
        title: 'AI Ancestry Analysis Complete!',
        body: 'Your ancestry reading is ready. Check out your results!'
      });
    }
  };

=======
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
  const handleNewReading = () => {
    setStep('upload');
    setImage(null);
    setResult("");
    setFadeOut(false);
  };

  const formattedCards = splitResultCards(cleanAndFormatResult(result));

  const handleCardScroll = (e: React.UIEvent<HTMLDivElement>, idx: number) => {
<<<<<<< HEAD
    // Removed the check that prevented navigation on the 2nd card
=======
    if (idx === 1) return; // Don't auto-advance on the 2nd card
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
    const el = e.target as HTMLDivElement;
    // Scroll down for next
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) {
      setTimeout(() => {
        if (carouselIndex === idx && idx < carouselSlides.length - 1) {
          setFadeOut(true);
          setTimeout(() => {
            setFadeOut(false);
            setCarouselIndex(idx + 1);
          }, 380);
        }
      }, 120);
    }
    // Scroll up for previous
    if (el.scrollTop === 0 && idx > 0) {
      setTimeout(() => {
        if (carouselIndex === idx) {
          setFadeOut(true);
          setTimeout(() => {
            setFadeOut(false);
            setCarouselIndex(idx - 1);
          }, 380);
        }
      }, 120);
    }
  };

  const carouselSlides = [
    <div key="reading1" className={`openai-card carousel-slide${fadeOut && carouselIndex === 0 ? ' fade-out' : ''} flex flex-col items-center justify-start min-h-[500px] py-12 bg-transparent shadow-none`}>
      <h2 className="text-xl font-bold text-blue-400 mb-3 w-full text-center" style={{position:'relative', top: '-0.75rem'}}>Your Ancestry Reading</h2>
      <div className="floating-result-text w-full max-w-2xl mx-auto text-base text-gray-800 font-mono bg-white/10 border-none shadow-none p-6 overflow-y-auto hide-scrollbar relative" style={{maxHeight:'420px', minHeight:'220px', boxShadow:'none'}} onScroll={e => handleCardScroll(e, 0)}>
        {/* Format the report with blank lines between bullets and paragraphs, and remove any summary table if present */}
        <div dangerouslySetInnerHTML={{__html: cleanAndFormatResult((formattedCards[0] || '').replace(/\| *Region\/Group *\| *Estimated Percentage *\| *Key Traits.*\|[\s\S]*?(\|.*\|.*\|.*\|\n?)+/, ''))}} />
      </div>
    </div>,
    <div key="reading2" className={`openai-card carousel-slide${fadeOut && carouselIndex === 1 ? ' fade-out' : ''} flex flex-col items-center justify-start min-h-[500px] py-12 bg-transparent shadow-none`}>
      <h2 className="text-xl font-bold text-blue-400 mb-3 w-full text-center" style={{position:'relative', top: '-0.75rem'}}>More Details</h2>
      <div className="floating-result-text w-full max-w-2xl mx-auto text-base text-gray-800 font-mono bg-white/10 border-none shadow-none p-6 overflow-y-auto hide-scrollbar relative" style={{maxHeight:'420px', minHeight:'220px', boxShadow:'none'}} onScroll={e => handleCardScroll(e, 1)}>
        {/* Format the report with blank lines between bullets and paragraphs, and remove any summary table if present */}
        <div dangerouslySetInnerHTML={{__html: cleanAndFormatResult((formattedCards[1] || '').replace(/\| *Region\/Group *\| *Estimated Percentage *\| *Key Traits.*\|[\s\S]*?(\|.*\|.*\|.*\|\n?)+/, ''))}} />
      </div>
    </div>,
    <div key="summary" className={`openai-card carousel-slide${fadeOut && carouselIndex === 2 ? ' fade-out' : ''} flex flex-col items-center justify-start min-h-[500px] py-12 bg-transparent shadow-none`}>
      <h2 className="text-xl font-bold text-blue-400 mb-3 w-full text-center" style={{position:'relative', top: '-0.75rem'}}>Summary Table</h2>
<<<<<<< HEAD
      <div className="floating-result-text w-full max-w-7xl mx-auto text-base text-gray-800 font-mono bg-white/10 border-none shadow-none p-8 overflow-y-auto hide-scrollbar relative" style={{maxWidth:'1200px',maxHeight:'420px', minHeight:'220px', boxShadow:'none'}}>
=======
      <div className="floating-result-text w-full max-w-4xl mx-auto text-base text-gray-800 font-mono bg-white/10 border-none shadow-none p-8 overflow-y-auto hide-scrollbar relative" style={{maxWidth:'950px',maxHeight:'420px', minHeight:'220px', boxShadow:'none'}}>
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
        {(() => {
          const summaryTableMatch = result.match(/\| *Region\/Group *\| *Estimated Percentage *\| *Key Traits.*\|[\s\S]*?(\|.*\|.*\|.*\|\n?)+/);
          if (summaryTableMatch) {
            const tableMarkdown = summaryTableMatch[0];
            const rows = tableMarkdown.trim().split(/\n/).filter(Boolean);
            if (rows.length >= 2) {
              const headerCells = rows[0].split('|').slice(1,-1).map(cell => cell.trim());
              const bodyRows = rows.slice(2).map(row => row.split('|').slice(1,-1).map(cell => cell.trim()));
              return (
                <table style={{width:'100%',fontFamily:'var(--font-mono)',fontSize:'1.08rem',marginTop:8,marginBottom:8, borderCollapse:'separate', borderSpacing:'0 0.75rem'}}>
                  <thead>
                    <tr>
                      {headerCells.map((cell, idx) => <th key={idx} style={{padding:'12px 18px',textAlign: idx===1?'right':'left', fontWeight:700, fontSize:'1.12rem', background:'#f5f6fa', borderBottom:'2px solid #e4e4e7', color:'#222'}}> {cell} </th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {bodyRows.map((cells, ridx) => (
                      <tr key={ridx} style={{background: ridx%2===0?'#f8fafc':'#fff', boxShadow:'0 1px 6px #e5e7eb33'}}>
                        {cells.map((cell, cidx) => (
                          <td key={cidx} style={{
                            padding:'16px 18px',
                            textAlign: cidx===1?'right':'left',
                            fontWeight: cidx===1?600:400,
                            fontSize: cidx===1?'1.12rem':'1.08rem',
                            whiteSpace: 'pre-line',
                            borderRadius: cidx===0 ? '12px 0 0 12px' : cidx===2 ? '0 12px 12px 0' : undefined,
                            borderBottom: '1.5px solid #e4e4e7',
                            background: 'inherit'
                          }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            }
          }
          return null;
        })()}
      </div>
    </div>,
    <div key="piechart" className={`openai-card carousel-slide${fadeOut && carouselIndex === 3 ? ' fade-out' : ''} flex flex-col items-center justify-center min-h-[500px]`}>
      <h2 className="text-xl font-bold text-blue-400 mb-3 w-full text-center" style={{position:'relative', top: '-0.75rem'}}>Ancestry Pie Chart</h2>
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Parse ancestry data from summary table in result, fallback to ancestryData */}
        {(() => {
          // Extract summary table from result (markdown table)
          const tableMatch = result.match(/\| *Region\/Group *\| *Estimated Percentage *\| *Key Traits.*\|[\s\S]*?(\|.*\|.*\|.*\|\n?)+/);
          if (tableMatch) {
            const rows = tableMatch[0].trim().split(/\n/).filter(Boolean);
            if (rows.length >= 3) {
              // Parse rows to get regions and percentages
              const data = rows.slice(2).map(row => {
                const cells = row.split('|').slice(1,-1).map(cell => cell.trim());
                const region = cells[0];
                const percent = parseInt(cells[1].replace(/[^\d]/g, ''), 10);
                return region && !isNaN(percent) ? { region, percent } : null;
              }).filter((item): item is { region: string; percent: number } => item !== null);
              if (data.length) {
                return <AncestryPieChart data={data} />;
              }
            }
          }
          // Fallback to ancestryData if no table found
          if (ancestryData && ancestryData.length) {
            return <AncestryPieChart data={ancestryData} />;
          }
          return <div className="text-gray-500 text-center mt-6">No ancestry data available for visualization.</div>;
        })()}
      </div>
    </div>,
  ];

<<<<<<< HEAD
  // Create a ref to track if analysis has been triggered to prevent multiple triggers
  const analysisTriggeredRef = React.useRef(false);
  
  // Safe trigger function that prevents multiple analysis calls
  const safeTriggerAnalysis = React.useCallback((file: File) => {
    if (analysisTriggeredRef.current) {
      console.log('[PAYMENT DEBUG] Analysis already triggered, ignoring duplicate call');
      return;
    }
    
    analysisTriggeredRef.current = true;
    setStep('processing');
    triggerAnalysis(file);
  }, []);
  
  // Reset the analysis triggered flag when returning to upload step
  useEffect(() => {
    if (step === 'upload') {
      analysisTriggeredRef.current = false;
    }
  }, [step]);

  // We've removed all other payment detection methods and will rely solely on
  // the onStatus handler from the Checkout component
=======
  useEffect(() => {
    // This effect should only run on the client side
    if (typeof window === 'undefined') return;
    
    // Reset payment detection when image changes
    if (!image) {
      paymentDetectedRef.current = false;
    }

    const logState = (msg: string) => {
      console.log(`[PAYMENT DEBUG] ${msg}`, { image, step });
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data) {
        // Check for payment processing status
        if (event.data.type === 'checkout-status-change' && event.data.status === 'pending') {
          setPaymentProcessing(true);
          logState('Payment processing started');
        }
        
        if (
          (event.data.type === 'checkout-status-change' && event.data.status === 'success') ||
          event.data.event_type === 'charge:confirmed' ||
          event.data.event_type === 'charge:resolved' ||
          event.data.event_type === 'charge:completed'
        ) {
          if (paymentDetectedRef.current) return;
          paymentDetectedRef.current = true;
          logState('Payment detected via postMessage');
          setPaymentProcessing(false);
          setTimeout(() => {
            logState('Calling triggerAnalysis after payment (postMessage)');
            if (image && step === 'upload' && !analysisInProgressRef.current) {
              setStep('processing');
              triggerAnalysis(image);
            }
          }, 2000);
        }
      }
    };
    window.addEventListener('message', handleMessage);

    const checkForPaymentSuccess = () => {
      if (paymentDetectedRef.current) return;
      
      // Check for payment in progress
      const processingElements = document.querySelectorAll('.ock-text-body-color');
      processingElements.forEach(element => {
        if (element.textContent?.includes('Payment in progress')) {
          setPaymentProcessing(true);
        }
      });
      
      const successElements = document.querySelectorAll('.ock-text-success, .ock-success-message');
      if (successElements.length > 0) {
        paymentDetectedRef.current = true;
        logState('Payment detected via DOM class');
        setPaymentProcessing(false);
        setTimeout(() => {
          logState('Calling triggerAnalysis after payment (DOM class)');
          if (image && step === 'upload' && !analysisInProgressRef.current) {
            setStep('processing');
            triggerAnalysis(image);
          }
        }, 2000);
        return;
      }
      const allElements = document.querySelectorAll('*');
      Array.from(allElements).forEach(element => {
        if (
          element.textContent?.includes('Payment successful') ||
          element.textContent?.includes('Payment completed') ||
          element.textContent?.includes('Transaction complete') ||
          element.textContent?.includes('Payment confirmed') ||
          element.textContent?.includes('View payment details')
        ) {
          paymentDetectedRef.current = true;
          logState('Payment detected via DOM text');
          setPaymentProcessing(false);
          setTimeout(() => {
            logState('Calling triggerAnalysis after payment (DOM text)');
            if (image && step === 'upload' && !analysisInProgressRef.current) {
              setStep('processing');
              triggerAnalysis(image);
            }
          }, 2000);
          return;
        }
      });
    };

    const observer = new MutationObserver((mutations) => {
      if (paymentDetectedRef.current) return;
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              // Check for payment processing
              if (element.textContent?.includes('Payment in progress')) {
                setPaymentProcessing(true);
                logState('Payment processing detected via MutationObserver');
              }
              
              const successElements = document.querySelectorAll('.ock-text-success, .ock-success-message');
              if (successElements.length > 0) {
                if (paymentDetectedRef.current) return;
                paymentDetectedRef.current = true;
                logState('Payment detected via MutationObserver class');
                setPaymentProcessing(false);
                setTimeout(() => {
                  logState('Calling triggerAnalysis after payment (MutationObserver class)');
                  if (image && step === 'upload' && !analysisInProgressRef.current) {
                    setStep('processing');
                    triggerAnalysis(image);
                  }
                }, 2000);
              }
              if (
                element.textContent?.includes('Payment successful') ||
                element.textContent?.includes('Payment completed') ||
                element.textContent?.includes('Transaction complete') ||
                element.textContent?.includes('Payment confirmed') ||
                element.textContent?.includes('View payment details')
              ) {
                if (paymentDetectedRef.current) return;
                paymentDetectedRef.current = true;
                logState('Payment detected via MutationObserver text');
                setTimeout(() => {
                  logState('Calling triggerAnalysis after payment (MutationObserver text)');
                  if (image && step === 'upload' && !analysisInProgressRef.current) {
                    setStep('processing');
                    triggerAnalysis(image);
                  }
                }, 3000);
              }
            }
          });
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const interval = setInterval(checkForPaymentSuccess, 1500);

    return () => {
      window.removeEventListener('message', handleMessage);
      observer.disconnect();
      clearInterval(interval);
    };
  }, [image, step, triggerAnalysis]);
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f8f9fa] to-[#e5e7eb] py-12 relative">
        {/* Wallet connect button top right, round border, full dropdown */}
<<<<<<< HEAD
        <div className="absolute top-4 right-4 md:top-6 md:right-8 z-50">
          <Wallet>
            <ConnectWallet
              className={`ock-connect-glass px-4 py-2 rounded-full font-bold text-white text-base shadow-lg border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-700/80 backdrop-blur-lg bg-opacity-70 hover:bg-gray-900/80 transition-all duration-200 focus:outline-none ${isConnected ? 'from-green-600 to-indigo-600 border-green-400/30' : 'from-indigo-600 to-green-600 border-indigo-500/30'}`}
              disconnectedLabel="Connect Wallet"
            >
              {isConnected && (
                <div className="mr-2 relative">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute w-2 h-2 bg-green-400 rounded-full right-0 top-0 opacity-70"
                  ></motion.div>
                  <div className="absolute w-2 h-2 bg-green-500 rounded-full right-0 top-0"></div>
                </div>
              )}
              <Avatar className="h-6 w-6" />
              <ConnectWalletText>
                {isConnected ? '' : 'Connect Wallet'}
              </ConnectWalletText>
              <Name className="font-medium" />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar className="h-8 w-8" />
                <Name className="font-bold ml-2" />
                <Address className="text-gray-400 ml-2" />
              </Identity>
              <WalletDropdownLink
                className="py-3 rounded-xl flex items-center bg-white/10 hover:bg-white/20 text-black font-medium pl-4 pr-2 my-1 transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]"
                icon="wallet"
                href="https://keys.coinbase.com"
              >
                Wallet
              </WalletDropdownLink>
              {(() => {
  const projectId = process.env.NEXT_PUBLIC_CDP_PROJECT_ID || '';
  const { address } = useAccount();
  if (!address) return null; // Only show FundButton if address is present
  const onrampBuyUrl = getOnrampBuyUrl({
    projectId,
    addresses: { [address]: ['base'] },
    assets: ['USDC'],
    presetFiatAmount: 20,
    fiatCurrency: 'USD',
    // Optionally, set redirectUrl: window.location.origin
  });
  return (
    <button
      type="button"
      className="w-full py-3 rounded-xl flex items-center justify-start bg-white/10 hover:bg-white/20 text-black font-medium transition-all duration-200 my-1 pl-4 pr-2 hover:shadow-lg hover:translate-y-[-2px]"
      onClick={() => window.open(onrampBuyUrl, '_blank', 'noopener,noreferrer')}
    >
      <FaPlus className="mr-3 text-xl" />
      <span>Funds</span>
    </button>
  );
})()}
              <div className="pt-2 pb-2">
                <WalletDropdownDisconnect className="w-full bg-white/10 hover:bg-white/20 text-black font-medium py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]" />
              </div>
            </WalletDropdown>
          </Wallet>
        </div>
=======
        <div className="absolute top-6 right-8 z-50 flex flex-row items-center space-x-2">
  <Wallet>
    <ConnectWallet
      className={`ock-connect-glass px-4 py-2 rounded-full font-bold text-white text-base shadow-lg border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-700/80 backdrop-blur-lg bg-opacity-70 hover:bg-gray-900/80 transition-all duration-200 focus:outline-none ${isConnected ? 'from-green-600 to-indigo-600 border-green-400/30' : 'from-indigo-600 to-green-600 border-indigo-500/30'}`}
      disconnectedLabel="Connect Wallet"
    >
      {isConnected && (
        <div className="mr-2 relative">
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute w-2 h-2 bg-green-400 rounded-full right-0 top-0 opacity-70"
          ></motion.div>
          <div className="absolute w-2 h-2 bg-green-500 rounded-full right-0 top-0"></div>
        </div>
      )}
      <Avatar className="h-6 w-6" />
      <ConnectWalletText>
        {isConnected ? '' : 'Connect Wallet'}
      </ConnectWalletText>
      <Name className="font-medium" />
    </ConnectWallet>
    <WalletDropdown>
      <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
        <Avatar className="h-8 w-8" />
        <Name className="font-bold ml-2" />
        <Address className="text-gray-400 ml-2" />
      </Identity>
      <WalletDropdownLink
        className="py-3 rounded-xl flex items-center bg-white/10 hover:bg-white/20 text-black font-medium pl-4 pr-2 my-1 transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]"
        icon="wallet"
        href="https://keys.coinbase.com"
      >
        Wallet
      </WalletDropdownLink>
      {(() => {
        const projectId = process.env.NEXT_PUBLIC_CDP_PROJECT_ID || '';
        const { address } = useAccount();
        if (!address) return null; // Only show FundButton if address is present
        const onrampBuyUrl = getOnrampBuyUrl({
          projectId,
          addresses: { [address]: ['base'] },
          assets: ['USDC'],
          presetFiatAmount: 20,
          fiatCurrency: 'USD',
        });
        return (
          <button
            type="button"
            className="w-full py-3 rounded-xl flex items-center justify-start bg-white/10 hover:bg-white/20 text-black font-medium transition-all duration-200 my-1 pl-4 pr-2 hover:shadow-lg hover:translate-y-[-2px]"
            onClick={() => window.open(onrampBuyUrl, '_blank', 'noopener,noreferrer')}
          >
            <FaPlus className="mr-3 text-xl" />
            <span>Funds</span>
          </button>
        );
      })()}
      <div className="pt-2 pb-2">
        <WalletDropdownDisconnect className="w-full bg-white/10 hover:bg-white/20 text-black font-medium py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]" />
      </div>
    </WalletDropdown>
  </Wallet>

  {/* MiniKit Save Frame, Close, Profile, Send Notification buttons */}
  <div className="flex flex-row items-center space-x-1 pr-1">
    <button
      type="button"
      className="cursor-pointer bg-transparent font-semibold text-sm px-2 py-1 border border-blue-400 rounded-xl text-blue-700 hover:bg-blue-50 ml-2"
      onClick={handleAddFrame}
    >
      SAVE FRAME
    </button>
    <button
      type="button"
      className="cursor-pointer bg-transparent font-semibold text-sm px-2 py-1 border border-gray-400 rounded-xl text-gray-700 hover:bg-gray-100"
      onClick={close}
    >
      CLOSE
    </button>
    <button
      type="button"
      onClick={handleViewProfile}
      className="cursor-pointer bg-transparent font-semibold text-sm px-2 py-1 border border-purple-400 rounded-xl text-purple-700 hover:bg-purple-50"
    >
      PROFILE
    </button>
    {context?.client?.added && (
      <button
        type="button"
        onClick={handleSendNotification}
        className="cursor-pointer bg-transparent font-semibold text-sm px-2 py-1 border border-green-400 rounded-xl text-green-700 hover:bg-green-50 disabled:opacity-50"
        disabled={notificationSent}
      >
        {notificationSent ? 'SENT!' : 'SEND NOTIFICATION'}
      </button>
    )}
  </div>
</div>

>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22

        {/* Wallet connection overlay - only shown when wallet is not connected AND component is mounted */}
        {mounted && !isConnected && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="max-w-md mx-auto bg-[#23252b]/90 p-8 rounded-3xl shadow-2xl border border-indigo-500/30 text-center">
              <div className="flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-indigo-400 mr-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2m0-10v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4m0-5h7v2a3 3 0 01.105 2.967l-1.178 9a2 2 0 01-2 1.846V11a2 2 0 012-2h6a2 2 0 012 2v3" />
                </svg>
                <h2 className="text-2xl font-bold text-white">Connect Your Wallet</h2>
              </div>
              <p className="text-gray-300 mb-8">
                Please connect your wallet using the button in the top right corner to access AI Ancestry and reveal your roots.
              </p>
              {/* <div className="animate-bounce bg-indigo-600 p-2 w-10 h-10 ring-1 ring-indigo-400/50 shadow-lg rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div> */}
<<<<<<< HEAD
              {/* <div className="flex justify-center">
                <div className="animate-bounce bg-indigo-600 p-2 w-10 h-10 ring-1 ring-indigo-400/50 shadow-lg rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              </div> */}
=======
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
            </div>
          </div>
        )}

        {/* Only show content when mounted and wallet is connected */}
        {mounted && (
          <>
            {/* Only show upload/pay card if step is 'upload' and wallet is connected */}
            {isConnected && step === 'upload' && (
              <div className="w-full max-w-2xl mx-auto flex justify-center">
                <div className="openai-card flex flex-col items-center animate-fade-in text-center w-full max-w-lg mx-auto p-4 md:p-6 bg-[#23252b]/80 rounded-[2.5rem]">
                  <div className="flex flex-col items-center w-full justify-center">
                    <div
                      className="relative w-full flex justify-center items-center"
                      style={{ minHeight: '320px' }}
                    >
                      {/* Frosted glass dark blur overlay when image is uploaded */}
                      <div
                        style={{
                          width: '100%',
                          height: '320px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          filter: image ? 'blur(3px) grayscale(0.7) opacity(0.7)' : 'none',
                          pointerEvents: image ? 'auto' : 'auto',
                          transition: 'filter 0.4s, opacity 0.4s',
                          position: 'relative',
                        }}
                        onClick={e => {
                          // Only reset if user clicks the overlay, NOT the pay button
                          if (image && !loading) {
                            // If the click is inside the pay button, do nothing
                            const payBtn = document.getElementById('pay-btn');
                            if (payBtn && payBtn.contains(e.target as Node)) return;
                            setImage(null);
                            setResult("");
                            setError("");
                          }
                        }}
                        title={image && !loading ? 'Click anywhere except the Pay button to upload a new image' : undefined}
                      >
                        {image && !loading && (
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              zIndex: 2,
                              background: 'rgba(34, 36, 40, 0.42)',
                              backdropFilter: 'blur(7px) saturate(1.2)',
                              WebkitBackdropFilter: 'blur(7px) saturate(1.2)',
                              borderRadius: '2.5rem',
                              pointerEvents: 'auto',
                            }}
                          />
                        )}
                        <UploadArea
                          onDrop={(files) => {
                            const file = files[0];
                            setImage(file);
                          }}
                          isUploading={loading}
                          hasFile={!!image}
                          imageUrl={imageUrl || undefined}
                        />
                      </div>
                      {/* Payment button overlays UploadArea as before */}
                      {image && !loading && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            pointerEvents: 'none', // let overlay handle pointer events except for button
                            zIndex: 3,
                          }}
                        >
                          <div style={{ pointerEvents: 'auto', zIndex: 4 }}>
<<<<<<< HEAD
                            <Checkout 
                              productId={PRODUCT_ID} 
                              onStatus={(status) => {
                                console.log('Checkout status:', status);
                                if (status.statusName === 'success') {
                                  safeTriggerAnalysis(image);
                                } else if (status.statusName === 'error') {
                                  console.error('Checkout error:', status.statusData);
                                  setError('Payment failed. Please try again.');
                                }
                              }}
                            >
=======
                            <Checkout productId={PRODUCT_ID} onStatus={(status) => {
                                    if (status.statusName === 'success') {
                                      setStep('processing');
                                      triggerAnalysis(image);
                                    }
                                  }}>
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
                              <div className="flex flex-col items-center w-full">
                                <div style={{ display: step === 'upload' ? 'block' : 'none' }}>
                                  <CheckoutButton
                                    coinbaseBranded
                                    className="openai-btn openai-btn-green px-4 py-2 text-base mx-auto mt-7 w-40"
                                  />

                                </div>
                                <div className="flex justify-center w-full mt-2">
                                  <CheckoutStatus />
                                </div>
                              </div>
                            </Checkout>
                          </div>
                        </div>
                      )}
                    </div>
                    {loading && (
                      <div className="flex flex-col items-center justify-center w-full mt-8 mb-8">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 mb-6"></div>
                        <span className="text-3xl font-bold text-blue-500 mb-2" style={{ letterSpacing: '-0.5px' }}>Uploading & Analyzing...</span>
                        <span className="text-lg text-gray-300">Please wait while we process your photo and generate your ancestry reading.</span>
                      </div>
                    )}
<<<<<<< HEAD
                    {error && (
                      <div className="w-full mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                        <p className="text-red-400 text-center">{error}</p>
                      </div>
                    )}
=======
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
                  </div>
                </div>
              </div>
            )}
            {step === 'processing' && (
              <div className="openai-card flex flex-col items-center justify-center min-h-[420px] animate-fade-in text-center">
                {/* Move h2 slightly higher */}
                <h2 className="text-2xl font-bold text-blue-500 mb-6 mt-2" style={{position:'relative', top: '-0.75rem'}}>Analyzing Image...</h2>
                <div className="w-full max-w-md px-4 mb-4 mt-2">
<<<<<<< HEAD
                  <div className="h-6 w-6 md:h-16 md:w-16 bg-blue-500 rounded-full transition-all duration-300 ease-out flex items-center justify-center mx-auto" style={{ width: 96, height: 96, minWidth: 48, minHeight: 48 }}>
                    <span className="text-white text-sm font-semibold">{progress}%</span>
                  </div>
                </div>
                <p className="text-gray-400 text-base mt-2">Please wait while we analyze your image for ancestry features.</p>
=======
                  <div className="relative">
                    <div 
                      className={`h-24 w-24 bg-blue-500 rounded-full transition-all duration-300 ease-out flex items-center justify-center mx-auto ${progress >= 95 ? 'animate-pulse' : ''}`}
                      style={{ width: 96, height: 96, minWidth: 48, minHeight: 48 }}
                    >
                      <span className="text-white text-sm font-semibold">{progress}%</span>
                    </div>
                    {progress >= 95 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-28 w-28 rounded-full border-4 border-blue-300 border-t-transparent animate-spin"></div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 text-base mt-2">
                  {progress >= 95 
                    ? "Finalizing your ancestry analysis..." 
                    : "Please wait while we analyze your image for ancestry features."}
                </p>
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
              </div>
            )}
            {/* Always render result panel, only show content if step is 'result' */}
            {step === 'result' && (
              <div className="relative">
                {/* Remove the 'Your Ancestry Reading' heading above the carousel */}
                {carouselSlides[carouselIndex]}
                {/* Carousel dots */}
                <div className="flex justify-center gap-2 mt-3">
                  {carouselSlides.map((_, idx) => (
                    <button
                      key={idx}
                      className={`carousel-dot-btn${carouselIndex === idx ? ' active' : ''}`}
                      onClick={() => setCarouselIndex(idx)}
                      aria-label={`Show Card ${idx+1}`}
                      type="button"
                    ></button>
                  ))}
                </div>
                {/* Download/Share/New Reading buttons at the bottom, OpenAI.fm style */}
                <div className="flex flex-wrap gap-6 justify-center items-center mt-8">
                  <button className="openai-btn openai-btn-light flex items-center gap-1 px-2 py-1 text-sm" onClick={handleDownloadPDF}>
                    <FaFilePdf className="text-sm" /> DOWNLOAD
                  </button>
                  <button className="openai-btn openai-btn-dark flex items-center gap-1 px-2 py-1 text-sm" onClick={()=>setShowShareModal(true)}>
                    <FaShare className="text-sm" /> SHARE
                  </button>
<<<<<<< HEAD
                  {!frameAdded && (
                    <button className="openai-btn openai-btn-green flex items-center gap-1 px-2 py-1 text-sm" onClick={handleAddFrame}>
                      <FaPlus className="text-sm" /> ADD TO WALLET
                    </button>
                  )}
=======
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
                  <button className="openai-btn openai-btn-light flex items-center gap-1 px-2 py-1 text-sm" onClick={handleNewReading}>
                    NEW READING
                  </button>
                </div>
              </div>
            )}
            {showShareModal && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center gap-6">
                  <h3 className="font-bold text-lg mb-2">Share your result</h3>
                  <div className="flex gap-4">
                    <button className="openai-btn openai-btn-dark flex items-center gap-2" onClick={()=>handleShare('twitter')}><FaTwitter /> Twitter</button>
                    <button className="openai-btn openai-btn-dark flex items-center gap-2" onClick={()=>handleShare('facebook')}><FaFacebook /> Facebook</button>
                    <button className="openai-btn openai-btn-light flex items-center gap-2" onClick={()=>handleShare('copy')}>Copy Link</button>
                  </div>
                  <button className="text-blue-400 mt-3 underline" onClick={()=>setShowShareModal(false)}>Cancel</button>
                </div>
              </div>
            )}
<<<<<<< HEAD
          </>
        )}
      </div>
  );
}
=======
            
            {/* Payment Processing Overlay */}
            {paymentProcessing && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 max-w-sm mx-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Processing Payment</h3>
                  <p className="text-gray-600 text-center">Please wait while we verify your payment...</p>
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-blue-600 text-sm font-medium">Verifying transaction</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {/* MiniKit openUrl footer button */}
        <footer className="absolute bottom-4 flex items-center w-screen max-w-[520px] justify-center">
          <button
            type="button"
            className="mt-4 px-2 py-1 flex justify-start rounded-2xl font-semibold opacity-40 border border-black text-xs"
            onClick={() => openUrl('https://base.org/builders/minikit')}
          >
            BUILT WITH MINIKIT
          </button>
        </footer>
      </div>
  );
}

>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
