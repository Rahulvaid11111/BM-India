'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  variant?: 'slider' | 'grid' | 'inline';
}

export function ImageGallery({ images, variant = 'slider' }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<Record<number, { width: number; height: number }>>({});

  // Reset index when images change
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  if (!images || images.length === 0) return null;

  // Deduplicate images
  const uniqueImages = Array.from(new Set(images));

  if (variant === 'grid') {
    return (
      <div className="my-8 grid grid-cols-2 gap-4">
        {uniqueImages.map((image, index) => {
          const aspectRatio = imageDimensions[index] 
            ? imageDimensions[index].width / imageDimensions[index].height 
            : 4/3;
          
          return (
            <div 
              key={`${image}-${index}`} 
              className="relative overflow-hidden"
              style={{ aspectRatio: aspectRatio > 1.5 ? '16/9' : '4/3' }}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-contain"
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement;
                  setImageDimensions(prev => ({
                    ...prev,
                    [index]: { width: img.naturalWidth, height: img.naturalHeight }
                  }));
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="my-8 space-y-6">
        {uniqueImages.map((image, index) => {
          const aspectRatio = imageDimensions[index] 
            ? imageDimensions[index].width / imageDimensions[index].height 
            : 16/9;
          
          return (
            <div 
              key={`${image}-${index}`} 
              className="relative overflow-hidden"
              style={{ aspectRatio: aspectRatio > 1.5 ? '16/9' : '4/3' }}
            >
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                fill
                className="object-contain"
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement;
                  setImageDimensions(prev => ({
                    ...prev,
                    [index]: { width: img.naturalWidth, height: img.naturalHeight }
                  }));
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }

  // Slider variant (default)
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % uniqueImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + uniqueImages.length) % uniqueImages.length);
  };

  const currentImage = uniqueImages[currentIndex];
  const aspectRatio = imageDimensions[currentIndex] 
    ? imageDimensions[currentIndex].width / imageDimensions[currentIndex].height 
    : 16/9;

  return (
    <div className="my-8 relative group">
      <div 
        className="relative overflow-hidden"
        style={{ aspectRatio: aspectRatio > 1.5 ? '16/9' : '4/3' }}
      >
        <Image
          key={currentImage}
          src={currentImage}
          alt={`Slide ${currentIndex + 1} of ${uniqueImages.length}`}
          fill
          className="object-contain bg-gray-50"
          priority={currentIndex === 0}
          onLoad={(e) => {
            const img = e.target as HTMLImageElement;
            setImageDimensions(prev => ({
              ...prev,
              [currentIndex]: { width: img.naturalWidth, height: img.naturalHeight }
            }));
          }}
        />
      </div>

      {uniqueImages.length > 1 && (
        <>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {uniqueImages.map((img, index) => (
              <button
                key={`${img}-dot-${index}`}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full z-10">
            {currentIndex + 1} / {uniqueImages.length}
          </div>
        </>
      )}
    </div>
  );
}
