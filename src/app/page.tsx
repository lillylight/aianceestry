"use client";
// If you see 'JSX element implicitly has type any' errors, ensure @types/react is installed and try restarting your IDE/TypeScript server.
import React, { useState, useEffect } from "react";
import type { FC, ReactNode, ReactElement } from "react";
import UploadArea from "../components/UploadArea";
// import PremiumUploadArea from "../components/PremiumUploadArea";
import AncestryPieChart, { AncestryDatum } from "../components/AncestryPieChart";
import { FaFilePdf, FaTwitter, FaFacebook, FaShare, FaPlus } from "react-icons/fa";
import { chartToImage } from "../utils/chartToImage";
import {
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

const PRODUCT_ID = process.env.NEXT_PUBLIC_PRODUCT_ID || '';

// Utility: Clean and format the result for better readability
function cleanAndFormatResult(raw: string): string {
  // Remove any previous disclaimers or boilerplate before 'YOUR PREDICTED ROOTS ARE:'
  const idx = raw.indexOf('YOUR PREDICTED ROOTS ARE:');
  let cleaned = idx !== -1 ? raw.slice(idx) : raw;

  // Remove any explicit 'SUMMARY TABLE' heading or similar on card 1/2
  cleaned = cleaned.replace(/\n?-?\s*SUMMARY TABLE\s*-?\n?/gi, '\n');

  // Replace markdown headings with styled equivalents
  cleaned = cleaned.replace(/###?\s*/g, '\n\n');
  
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



interface HomeProps {
  children?: ReactNode;
}

const Home: FC<HomeProps> = () => {
  // Use wagmi's useAccount hook for reliable wallet connection detection
  const { isConnected, address } = useAccount();
  const [mounted, setMounted] = useState(false);
  // Set global user name for PDF generation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).aiAncestryUserName = address || '';
    }
  }, [address]);
  
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<'upload' | 'processing' | 'result'>('upload');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [ancestryData, setAncestryData] = useState<AncestryDatum[]>([]);

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
    triggerAnalysis(image);
  };

  const triggerAnalysis = (file: File) => {
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
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        setResult(res.analysis);
        setAncestryData(res.ancestryData || []); 
        setStep('result');
        setCarouselIndex(0);
      } else {
        setError("Failed to analyze image. Please try again.");
        setStep('upload');
      }
    };
    xhr.onerror = () => {
      setLoading(false);
      setError("Failed to analyze image. Please try again.");
      setStep('upload');
    };
    xhr.send(formData);
  };

  // PDF download handler using premium PDF utility and pie chart image
  const handleDownloadPDF = async () => {
    // Try to get the pie chart image as PNG
    let pieChartDataUrl: string | undefined = undefined;
    const chartEl = document.querySelector(".ancestry-pie-chart-capture") as HTMLElement;
    if (chartEl) {
      try {
        pieChartDataUrl = await chartToImage(chartEl);
      } catch (e) {
        // fallback: no chart image
      }
    }
    import('../utils/pdfUtils').then(({ downloadAnalysisAsPDF }) => {
      downloadAnalysisAsPDF(result, ancestryData, pieChartDataUrl);
    });
  };

  const handleShare = (platform: 'twitter' | 'facebook' | 'copy') => {
    const url = encodeURIComponent(window.location.href);
    const message = encodeURIComponent("I just discovered my ancestry using this new AI app!");
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${message}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href);
      setShowShareModal(false);
      alert('Link copied!');
    }
  };

  const handleNewReading = () => {
    setStep('upload');
    setImage(null);
    setResult("");
    setFadeOut(false);
  };

  const formattedCards = splitResultCards(cleanAndFormatResult(result));

  const handleCardScroll = (e: React.UIEvent<HTMLDivElement>, idx: number) => {
    // Removed the check that prevented navigation on the 2nd card
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

  const carouselSlides: ReactElement[] = [
    <div key="reading1" className={`openai-card carousel-slide${fadeOut && carouselIndex === 0 ? ' fade-out' : ''} flex flex-col items-center justify-start min-h-[500px] py-12 bg-transparent shadow-none`}>
      <h2 className="text-xl font-bold text-blue-400 mb-3 w-full text-center" style={{position:'relative', top: '-0.75rem'}}>Your Ancestry Reading</h2>
      <div className="floating-result-text w-full max-w-2xl mx-auto text-base text-gray-800 font-mono bg-white/10 border-none shadow-none p-6 overflow-y-auto hide-scrollbar relative" style={{maxHeight:'420px', minHeight:'220px', boxShadow:'none'}} onScroll={(e: React.UIEvent<HTMLDivElement>) => handleCardScroll(e, 0)}>
        {/* Format the report with blank lines between bullets and paragraphs, and remove any summary table if present */}
        <div dangerouslySetInnerHTML={{__html: cleanAndFormatResult((formattedCards[0] || '').replace(/\| *Region\/Group *\| *Estimated Percentage *\| *Key Traits.*\|[\s\S]*?(\|.*\|.*\|.*\|\n?)+/, ''))}} />
      </div>
    </div>,
    <div key="reading2" className={`openai-card carousel-slide${fadeOut && carouselIndex === 1 ? ' fade-out' : ''} flex flex-col items-center justify-start min-h-[500px] py-12 bg-transparent shadow-none`}>
      <h2 className="text-xl font-bold text-blue-400 mb-3 w-full text-center" style={{position:'relative', top: '-0.75rem'}}>More Details</h2>
      <div className="floating-result-text w-full max-w-2xl mx-auto text-base text-gray-800 font-mono bg-white/10 border-none shadow-none p-6 overflow-y-auto hide-scrollbar relative" style={{maxHeight:'420px', minHeight:'220px', boxShadow:'none'}} onScroll={(e: React.UIEvent<HTMLDivElement>) => handleCardScroll(e, 1)}>
        {/* Format the report with blank lines between bullets and paragraphs, and remove any summary table if present */}
        <div dangerouslySetInnerHTML={{__html: cleanAndFormatResult((formattedCards[1] || '').replace(/\| *Region\/Group *\| *Estimated Percentage *\| *Key Traits.*\|[\s\S]*?(\|.*\|.*\|.*\|\n?)+/, ''))}} />
      </div>
    </div>,
    <div key="summary" className={`openai-card carousel-slide${fadeOut && carouselIndex === 2 ? ' fade-out' : ''} flex flex-col items-center justify-start min-h-[500px] py-12 bg-transparent shadow-none`}>
      <h2 className="text-xl font-bold text-blue-400 mb-3 w-full text-center" style={{position:'relative', top: '-0.75rem'}}>Summary Table</h2>
      <div className="floating-result-text w-full max-w-4xl mx-auto text-base text-gray-800 font-mono bg-white/10 border-none shadow-none p-8 overflow-y-auto hide-scrollbar relative" style={{maxWidth:'950px',maxHeight:'420px', minHeight:'220px', boxShadow:'none'}}>
        {(() => {
          const summaryTableMatch = result.match(/\| *Region\/Group *\| *Estimated Percentage *\| *Key Traits.*\|[\s\S]*?(\|.*\|.*\|.*\|\n?)+/);
          if (summaryTableMatch) {
            const tableMarkdown = summaryTableMatch[0];
            const rows = tableMarkdown.trim().split(/\n/).filter(Boolean);
            if (rows.length >= 2) {
              const headerCells = rows[0].split('|').slice(1,-1).map((cell: string) => cell.trim());
              const bodyRows = rows.slice(2).map((row: string) => row.split('|').slice(1,-1).map((cell: string) => cell.trim()));
              return (
                <table style={{width:'100%',fontFamily:'var(--font-mono)',fontSize:'1.08rem',marginTop:8,marginBottom:8, borderCollapse:'separate', borderSpacing:'0 0.75rem'}}>
                  <thead>
                    <tr>
                      {headerCells.map((cell: string, idx: number) => <th key={idx} style={{padding:'12px 18px',textAlign: idx===1?'right':'left', fontWeight:700, fontSize:'1.12rem', background:'#f5f6fa', borderBottom:'2px solid #e4e4e7', color:'#222'}}> {cell} </th>) }
                    </tr>
                  </thead>
                  <tbody>
                    {bodyRows.map((cells: string[], ridx: number) => (
                      <tr key={ridx} style={{background: ridx%2===0?'#f8fafc':'#fff', boxShadow:'0 1px 6px #e5e7eb33'}}>
                        {cells.map((cell: string, cidx: number) => (
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
          return <div className="text-gray-500 text-center mt-6">No summary table found in result.</div>;
        })()}
      </div>
    </div>
  ];

  return (
    <div>
      {/* Your app's main JSX markup goes here. Replace this with your actual page layout if needed. */}
      {/* Example: */}
      {/* <Header />
      <MainContent />
      <Footer /> */}
    </div>
  );
}
