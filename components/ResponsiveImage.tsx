'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export function ResponsiveImage({ src, alt, priority = false, className = '' }: ResponsiveImageProps) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  // Validate src prop
  if (!src || typeof src !== 'string' || src.trim() === '') {
    console.error('ResponsiveImage: Invalid or missing src prop');
    return null;
  }

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const ratio = img.naturalWidth / img.naturalHeight;
    setAspectRatio(ratio);
  };

  // Default to 3:2 until we know the actual ratio
  const displayRatio = aspectRatio || 3/2;
  
  // Determine if image is landscape, portrait, or square
  const isLandscape = displayRatio > 1.3;
  const isPortrait = displayRatio < 0.8;
  const isSquare = displayRatio >= 0.8 && displayRatio <= 1.3;

  // Set appropriate aspect ratio
  let finalRatio = '3/2'; // default landscape
  if (isPortrait) {
    finalRatio = '2/3';
  } else if (isSquare) {
    finalRatio = '1/1';
  } else if (displayRatio > 2) {
    finalRatio = '21/9'; // ultra-wide
  }

  return (
    <div 
      className={`relative mb-8 overflow-hidden ${className}`}
      style={{ aspectRatio: aspectRatio ? displayRatio : finalRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        className="object-contain"
        priority={priority}
        onLoad={handleImageLoad}
      />
    </div>
  );
}
