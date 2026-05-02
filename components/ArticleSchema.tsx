import { Article } from '@/lib/articles';

interface ArticleSchemaProps {
  article: Article;
}

export function ArticleSchema({ article }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BEST Magazine',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bestmagazine.ca/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://bestmagazine.ca/article/${article.id}`,
    },
    articleSection: article.category,
    keywords: article.category,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
