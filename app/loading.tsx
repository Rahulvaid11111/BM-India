export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
        <p className="mt-4 text-sm uppercase tracking-wider text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
