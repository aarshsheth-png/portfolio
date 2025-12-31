'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { VideoPlayer } from '@/components/VideoPlayer'
import { ModuleNavigation } from '@/components/ModuleNavigation'
import { getProjects, type HygraphProject } from '@/lib/hygraph'

interface VideoModule {
  id: string
  title: string
  duration: string
  videoUrl: string
  completed: boolean
}

// Helper to convert Hygraph projects to video modules
function convertProjectsToModules(projects: HygraphProject[]): VideoModule[] {
  return projects
    .filter((project) => project.videoUrl) // Only include projects with video URLs
    .map((project, index) => ({
      id: project.id,
      title: project.title,
      duration: '0:00', // You can add duration field to Hygraph if needed
      videoUrl: project.videoUrl!,
      completed: false,
    }))
}

function JourneyContent() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug')
  
  const [projects, setProjects] = useState<HygraphProject[]>([])
  const [modules, setModules] = useState<VideoModule[]>([])
  const [selectedModule, setSelectedModule] = useState<VideoModule | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects()
        setProjects(data)
        const videoModules = convertProjectsToModules(data)
        setModules(videoModules)
        
        // If slug is provided, find and select that project
        if (slug && videoModules.length > 0) {
          const project = data.find((p) => p.slug === slug)
          if (project && project.videoUrl) {
            const module = videoModules.find((m) => m.id === project.id)
            if (module) {
              setSelectedModule(module)
            }
          }
        } else if (videoModules.length > 0) {
          // Otherwise, select the first module
          setSelectedModule(videoModules[0])
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [slug])

  const handleModuleSelect = (module: VideoModule) => {
    setSelectedModule(module)
  }

  const handleVideoComplete = (moduleId: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, completed: true } : m))
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading journey...</div>
      </div>
    )
  }

  if (!selectedModule || modules.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            No video content available
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Add projects with video URLs in Hygraph to see them here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-950">
      {/* Main Video Player Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <VideoPlayer
            videoUrl={selectedModule.videoUrl}
            title={selectedModule.title}
            onComplete={() => handleVideoComplete(selectedModule.id)}
          />
        </div>
      </div>

      {/* Module Navigation Sidebar */}
      <div className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto">
        <ModuleNavigation
          modules={modules}
          selectedModule={selectedModule}
          onModuleSelect={handleModuleSelect}
        />
      </div>
    </div>
  )
}

export default function JourneyPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading journey...</div>
      </div>
    }>
      <JourneyContent />
    </Suspense>
  )
}

