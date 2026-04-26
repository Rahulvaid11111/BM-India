'use client';

import { ImageGallery } from './ImageGallery';

interface ArticleContentProps {
  content: string;
  images?: string[];
}

export function ArticleContent({ content, images = [] }: ArticleContentProps) {
  // Split content into sections for image placement
  const splitContentIntoSections = (htmlContent: string) => {
    // Split by paragraph tags
    const paragraphs = htmlContent.split(/<\/p>|<\/h2>|<\/h3>/i).filter(p => p.trim());
    return paragraphs;
  };

  const sections = splitContentIntoSections(content);
  const totalSections = sections.length;
  
  // Determine image placement strategy based on number of images
  const getImagePlacement = () => {
    if (images.length === 0) return [];
    
    if (images.length === 1) {
      // Single image: place after first paragraph
      return [{ position: 1, images: images, variant: 'inline' as const }];
    }
    
    if (images.length === 2) {
      // Two images: place inline at different positions
      return [
        { position: 1, images: [images[0]], variant: 'inline' as const },
        { position: Math.floor(totalSections / 2), images: [images[1]], variant: 'inline' as const },
      ];
    }
    
    if (images.length <= 4) {
      // 3-4 images: grid after first section
      return [{ position: 1, images: images, variant: 'grid' as const }];
    }
    
    if (images.length <= 8) {
      // 5-8 images: slider after first section
      return [{ position: 1, images: images, variant: 'slider' as const }];
    }
    
    // 9-20 images: split into multiple galleries
    const midPoint = Math.floor(images.length / 2);
    const firstHalf = images.slice(0, midPoint);
    const secondHalf = images.slice(midPoint);
    
    return [
      { position: 1, images: firstHalf, variant: 'slider' as const },
      { position: Math.floor(totalSections / 2), images: secondHalf, variant: 'slider' as const },
    ];
  };

  const imagePlacements = getImagePlacement();

  return (
    <div className="space-y-5 text-[15px] leading-[1.8] font-light">
      {sections.map((section, index) => {
        // Find if there's an image placement after this section
        const placement = imagePlacements.find(p => p.position === index);
        
        return (
          <div key={index}>
            <div dangerouslySetInnerHTML={{ __html: section + (section.includes('<h') ? '' : '</p>') }} />
            {placement && (
              <ImageGallery images={placement.images} variant={placement.variant} />
            )}
          </div>
        );
      })}
    </div>
  );
}
