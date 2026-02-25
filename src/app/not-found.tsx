import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
          <h2 className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">
            404
          </h2>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Page Not Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
