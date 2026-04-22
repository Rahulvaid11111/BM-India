# Contributing to BEST Magazine

Thank you for your interest in contributing to BEST Magazine!

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/best-magazine.git
   cd best-magazine
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
best-magazine/
├── app/                    # Next.js App Router pages
│   ├── article/[id]/      # Dynamic article pages
│   ├── category/[slug]/   # Dynamic category pages
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Homepage
│   ├── error.tsx          # Error boundary
│   ├── loading.tsx        # Loading state
│   └── not-found.tsx      # 404 page
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── ArticleCard.tsx    # Article display component
├── lib/                   # Utilities and data
│   ├── articles.ts        # Article data and helpers
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Coding Standards

### TypeScript
- Use TypeScript for all new files
- Define proper interfaces for props and data
- Avoid `any` types

### React Components
- Use functional components with hooks
- Keep components small and focused
- Use proper prop typing

### Styling
- Use Tailwind CSS utility classes
- Follow existing design patterns
- Maintain responsive design

### Naming Conventions
- **Files:** kebab-case (e.g., `article-card.tsx`)
- **Components:** PascalCase (e.g., `ArticleCard`)
- **Functions:** camelCase (e.g., `getArticleById`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_ARTICLES`)

## Making Changes

1. **Create a branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Write clean, readable code
   - Follow existing patterns
   - Test your changes

3. **Test locally:**
   ```bash
   npm run build
   npm start
   ```

4. **Lint your code:**
   ```bash
   npm run lint
   ```

5. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to GitHub:**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request:**
   - Go to GitHub
   - Click "New Pull Request"
   - Describe your changes
   - Wait for review

## Commit Message Format

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add search functionality
fix: resolve mobile menu issue
docs: update README with deployment steps
```

## Adding New Articles

Edit `lib/articles.ts`:

```typescript
{
  id: "unique-id",
  title: "Article Title",
  excerpt: "Brief description...",
  category: "Fashion", // Must match existing category
  author: "Author Name",
  date: "Month Day, Year",
  image: "https://images.unsplash.com/...",
  featured: false, // Optional
  trending: false  // Optional
}
```

## Adding New Categories

1. Update `categories` array in `lib/articles.ts`
2. Add subcategories in `subcategories` object
3. Update navigation if needed

## Testing

Currently, the project doesn't have automated tests. When adding tests:

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e
```

## Code Review Process

1. All changes require a pull request
2. Code must pass linting
3. Build must succeed
4. At least one approval required
5. No merge conflicts

## Questions?

- Open an issue on GitHub
- Check existing documentation
- Review code examples in the codebase

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to BEST Magazine! 🎉
