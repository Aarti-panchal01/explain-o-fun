
import html2canvas from 'html2canvas';
import { MemeTemplate } from '../data/memeTemplates';

// Function to generate random background color gradient
export const getRandomGradient = (): string => {
  const gradients = [
    'from-blue-500 to-purple-500',
    'from-green-400 to-blue-500',
    'from-yellow-400 to-orange-500',
    'from-pink-500 to-red-500',
    'from-purple-500 to-indigo-500',
    'from-indigo-500 to-blue-400',
    'from-red-500 to-orange-400',
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

// Function to download meme as an image
export const downloadMeme = async (memeRef: HTMLDivElement | null, topic: string, onSuccess: () => void, onError: (error: any) => void): Promise<void> => {
  if (!memeRef) return;

  try {
    const canvas = await html2canvas(memeRef, {
      allowTaint: true,
      useCORS: true,
      backgroundColor: null,
      scale: 2,
    });
    
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${topic.replace(/\s+/g, '-')}-meme.png`;
    link.href = dataUrl;
    link.click();
    
    onSuccess();
  } catch (error) {
    console.error('Error downloading meme:', error);
    onError(error);
  }
};

// Function to share meme
export const shareMeme = async (memeRef: HTMLDivElement | null, topic: string, onSuccess: () => void, onClipboardSuccess: () => void, onDownloadFallback: () => void, onError: (error: any) => void): Promise<void> => {
  if (!memeRef) return;

  try {
    const canvas = await html2canvas(memeRef, {
      allowTaint: true,
      useCORS: true, 
      backgroundColor: null,
      scale: 2,
    });
    
    canvas.toBlob(async (blob) => {
      if (!blob) {
        throw new Error('Failed to create blob');
      }
      
      try {
        // Try to use the Web Share API if available
        if (navigator.share) {
          const file = new File([blob], `${topic.replace(/\s+/g, '-')}-meme.png`, { 
            type: 'image/png' 
          });
          
          await navigator.share({
            title: `${topic} Meme`,
            text: 'Check out this AI-generated meme!',
            files: [file]
          });
          
          onSuccess();
        } else {
          // Fallback to clipboard
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob
            })
          ]);
          
          onClipboardSuccess();
        }
      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback to downloading if sharing fails
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${topic.replace(/\s+/g, '-')}-meme.png`;
        link.href = dataUrl;
        link.click();
        
        onDownloadFallback();
      }
    }, 'image/png');
  } catch (error) {
    console.error('Error preparing to share meme:', error);
    onError(error);
  }
};
