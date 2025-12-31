'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components'
import { Sidebar } from './Sidebar'
import { motion, AnimatePresence } from 'framer-motion'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check system preference on mount
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(prefersDark)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <FluentProvider theme={isDark ? webDarkTheme : webLightTheme}>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Fixed Left Sidebar */}
        <Sidebar isDark={isDark} toggleTheme={toggleTheme} />
        
        {/* Main Content Canvas */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </FluentProvider>
  )
}

