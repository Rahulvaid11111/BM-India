'use client'

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-5">
        <h2 className="text-4xl font-serif mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-6">We apologize for the inconvenience.</p>
        <button
          onClick={() => reset()}
          className="px-8 py-3 border border-black text-[11px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
