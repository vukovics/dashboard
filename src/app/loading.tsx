export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-9 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="mt-2 h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="h-10 w-full sm:w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>

          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
