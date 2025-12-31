'use client'

import {
  Button,
  Checkbox,
} from '@fluentui/react-components'
import {
  PlayCircle24Regular,
  CheckmarkCircle24Filled,
} from '@fluentui/react-icons'

interface VideoModule {
  id: string
  title: string
  duration: string
  videoUrl: string
  completed: boolean
}

interface ModuleNavigationProps {
  modules: VideoModule[]
  selectedModule: VideoModule
  onModuleSelect: (module: VideoModule) => void
}

export function ModuleNavigation({
  modules,
  selectedModule,
  onModuleSelect,
}: ModuleNavigationProps) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Course Modules
      </h3>
      <div className="space-y-2">
        {modules.map((module, index) => (
          <Button
            key={module.id}
            appearance={selectedModule.id === module.id ? 'primary' : 'subtle'}
            className="w-full justify-start h-auto p-4"
            onClick={() => onModuleSelect(module)}
          >
            <div className="flex items-start gap-3 w-full">
              <div className="flex-shrink-0 mt-1">
                {module.completed ? (
                  <CheckmarkCircle24Filled className="text-green-600 dark:text-green-400" />
                ) : (
                  <PlayCircle24Regular />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {index + 1}. {module.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {module.duration}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}

