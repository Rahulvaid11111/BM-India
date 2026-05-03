import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-5">
        <h1 className="text-6xl font-serif mb-4">404</h1>
        <h2 className="text-2xl font-serif mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-block px-8 py-3 border border-black text-[11px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
