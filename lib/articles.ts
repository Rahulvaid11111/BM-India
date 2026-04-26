export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  featured?: boolean;
  trending?: boolean;
  content?: string;
  images?: string[];
}

export const categories = [
  "Fashion",
  "Beauty",
  "Luxury",
  "Culture",
  "Celebrity",
  "Business",
  "Shop",
  "Local"
];

export const subcategories: Record<string, string[]> = {
  Fashion: ["Trends", "Street Style", "Designers", "Runway", "Seasonal", "Sustainable"],
  Beauty: ["Makeup", "Skincare", "Hair", "Wellness", "Expert Tips"],
  Luxury: ["Watches", "Cars", "Hotels", "Experiences"],
  Culture: ["Film & TV", "Music", "Art", "Books", "Opinion"],
  Celebrity: ["Interviews", "Red Carpet", "Style"],
  Business: ["Industry News", "Brand Spotlights", "Marketing & PR", "Creator Economy"],
  Shop: ["Editor Picks", "Best Of", "Gift Guides"],
  Local: ["Toronto", "Vancouver", "Montreal"]
};

export const articles: Article[] = [
  {
    id: "fashion-1",
    title: "The Return of Minimalist Elegance: Spring's Most Coveted Looks",
    excerpt: "Discover how the world's top designers are reimagining simplicity for the modern wardrobe with clean lines and timeless silhouettes that transcend seasonal trends.",
    category: "Fashion",
    author: "Isabella Chen",
    date: "April 18, 2026",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=1600&h=1067&fit=crop&q=90",
    featured: true,
    trending: true
  },
  {
    id: "beauty-1",
    title: "Radiant Skin: The Science Behind This Season's Glow",
    excerpt: "Leading dermatologists reveal the breakthrough treatments and products transforming skincare routines worldwide, from peptide serums to advanced LED therapy.",
    category: "Beauty",
    author: "Dr. Sarah Mitchell",
    date: "April 17, 2026",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&h=1067&fit=crop&q=90",
    featured: true,
    trending: true
  },
  {
    id: "luxury-1",
    title: "Sustainable Luxury: The Future of Conscious Living",
    excerpt: "How the world's most discerning consumers are embracing eco-friendly choices without compromising on style, from zero-waste homes to ethical fashion.",
    category: "Luxury",
    author: "Emma Thompson",
    date: "April 16, 2026",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&h=1067&fit=crop&q=90",
    featured: true
  },
  {
    id: "culture-1",
    title: "The New Wave: Emerging Artists Reshaping Contemporary Culture",
    excerpt: "Meet the visionaries challenging conventions and redefining what it means to create in the 21st century, from digital installations to immersive experiences.",
    category: "Culture",
    author: "Amara Johnson",
    date: "April 15, 2026",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1600&h=1067&fit=crop&q=90",
    trending: true
  },
  {
    id: "celebrity-1",
    title: "Red Carpet Revelations: The Most Stunning Looks of the Season",
    excerpt: "From Hollywood premieres to international galas, these are the fashion moments that stopped us in our tracks and set new standards for glamour.",
    category: "Celebrity",
    author: "Victoria Ross",
    date: "April 14, 2026",
    image: "https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b?w=1600&h=1067&fit=crop&q=90",
    trending: true
  },
  {
    id: "luxury-2",
    title: "Inside the World's Most Exclusive Timepiece Collection",
    excerpt: "A rare glimpse into the private collection of horological masterpieces that define luxury and precision, featuring rare Patek Philippe and Audemars Piguet pieces.",
    category: "Luxury",
    author: "Marcus Laurent",
    date: "April 13, 2026",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "business-1",
    title: "The Creator Economy: How Influencers Are Building Empires",
    excerpt: "From brand partnerships to product lines, discover how digital creators are transforming social media presence into multi-million dollar businesses.",
    category: "Business",
    author: "Sophia Laurent",
    date: "April 12, 2026",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "shop-1",
    title: "Editor's Picks: The Best Luxury Finds This Month",
    excerpt: "Our curated selection of the most covetable pieces, from designer handbags to statement jewelry that defines this season's must-have list.",
    category: "Shop",
    author: "James Crawford",
    date: "April 11, 2026",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "local-1",
    title: "Toronto's Hidden Gems: The City's Best-Kept Secrets",
    excerpt: "Discover the boutiques, restaurants, and cultural hotspots that make Toronto a world-class destination for style and sophistication.",
    category: "Local",
    author: "Michael Chen",
    date: "April 10, 2026",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "fashion-2",
    title: "Street Style Chronicles: The New Rules of Dressing",
    excerpt: "From Milan to Tokyo, the streets are speaking a new fashion language that's redefining contemporary style.",
    category: "Fashion",
    author: "Isabella Chen",
    date: "April 9, 2026",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=1067&fit=crop&q=90",
    trending: true
  },
  {
    id: "fashion-3",
    title: "Sustainable Fashion: The Designers Leading the Green Revolution",
    excerpt: "Meet the visionaries proving that eco-conscious design and high fashion can coexist beautifully.",
    category: "Fashion",
    author: "Emma Laurent",
    date: "April 8, 2026",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "beauty-2",
    title: "The New Face of Beauty: Makeup Trends Defining 2026",
    excerpt: "Bold lips, dewy skin, and artistic expression—discover the looks dominating runways and red carpets.",
    category: "Beauty",
    author: "Dr. Sarah Mitchell",
    date: "April 7, 2026",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "beauty-3",
    title: "Hair Transformation: Expert Tips for Your Best Look Yet",
    excerpt: "Top stylists reveal the techniques and products that will revolutionize your hair care routine.",
    category: "Beauty",
    author: "Victoria Ross",
    date: "April 6, 2026",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "luxury-3",
    title: "The World's Most Exclusive Hotels: A Journey Through Opulence",
    excerpt: "From private islands to historic palaces, explore the accommodations that redefine luxury hospitality.",
    category: "Luxury",
    author: "Marcus Laurent",
    date: "April 5, 2026",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "luxury-4",
    title: "Automotive Excellence: The Future of Luxury Driving",
    excerpt: "Electric hypercars and bespoke classics—the vehicles defining the next era of automotive perfection.",
    category: "Luxury",
    author: "James Crawford",
    date: "April 4, 2026",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "culture-2",
    title: "Film & Television: The Stories Captivating Global Audiences",
    excerpt: "From indie darlings to blockbuster hits, explore the narratives shaping contemporary cinema.",
    category: "Culture",
    author: "Amara Johnson",
    date: "April 3, 2026",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "culture-3",
    title: "The Art of Sound: Music's Most Influential Voices",
    excerpt: "Discover the artists and albums defining this generation's sonic landscape.",
    category: "Culture",
    author: "Michael Chen",
    date: "April 2, 2026",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "celebrity-2",
    title: "Exclusive Interview: Inside the Mind of a Style Icon",
    excerpt: "A candid conversation about fashion, fame, and the future with one of Hollywood's most influential stars.",
    category: "Celebrity",
    author: "Victoria Ross",
    date: "April 1, 2026",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "celebrity-3",
    title: "Celebrity Style Evolution: The Looks That Changed Everything",
    excerpt: "From red carpet moments to street style, trace the fashion journeys of today's biggest stars.",
    category: "Celebrity",
    author: "Isabella Chen",
    date: "March 31, 2026",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "business-2",
    title: "Industry Insights: The Business of Fashion in 2026",
    excerpt: "Market trends, emerging brands, and the economic forces reshaping the luxury landscape.",
    category: "Business",
    author: "Sophia Laurent",
    date: "March 30, 2026",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "business-3",
    title: "Brand Spotlight: The Companies Redefining Luxury",
    excerpt: "Meet the innovative brands combining heritage craftsmanship with modern business strategies.",
    category: "Business",
    author: "James Crawford",
    date: "March 29, 2026",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "shop-2",
    title: "Best of the Season: Our Curated Shopping Guide",
    excerpt: "The must-have pieces that deserve a place in your wardrobe this season.",
    category: "Shop",
    author: "Emma Laurent",
    date: "March 28, 2026",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "shop-3",
    title: "Gift Guide: Luxury Presents for Every Occasion",
    excerpt: "From birthdays to anniversaries, find the perfect gift that speaks volumes.",
    category: "Shop",
    author: "Victoria Ross",
    date: "March 27, 2026",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "local-2",
    title: "Vancouver's Rising Scene: Where Style Meets Sustainability",
    excerpt: "Explore the Pacific Northwest's most exciting boutiques, galleries, and dining destinations.",
    category: "Local",
    author: "Michael Chen",
    date: "March 26, 2026",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "local-3",
    title: "Montreal's Cultural Renaissance: Art, Fashion, and Joie de Vivre",
    excerpt: "The city's creative energy is attracting global attention—discover why.",
    category: "Local",
    author: "Amara Johnson",
    date: "March 25, 2026",
    image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1600&h=1067&fit=crop&q=90"
  }
];

export function getFeaturedArticles(): Article[] {
  return articles.filter(article => article.featured);
}

export function getTrendingArticles(): Article[] {
  return articles.filter(article => article.trending);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(article => article.category === category);
}

export function getArticleById(id: string): Article | undefined {
  return articles.find(article => article.id === id);
}
