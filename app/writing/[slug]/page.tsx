'use client'

import { useParams } from 'next/navigation'

export default function PostPage() {
  const params = useParams()
  const slug = params.slug as string

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-800 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            The post "{slug}" could not be found.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Blog posts feature coming soon. This can be configured with Hygraph.
          </p>
        </div>
      </div>
    </div>
  )
}

