'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getProjectBySlug, type HygraphProject } from '@/lib/hygraph'
import Image from 'next/image'

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const [project, setProject] = useState<HygraphProject | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectBySlug(slug)
        setProject(data)
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }
    if (slug) {
      fetchProject()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading project...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600 dark:text-gray-400">Project not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <article className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-800">
          {project.thumbnail?.url && (
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
              <Image
                src={project.thumbnail.url}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {project.title}
          </h1>
          
          {project.description && (
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}

