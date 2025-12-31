'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  Nav,
  NavItem,
  NavSubItem,
  Button,
} from '@fluentui/react-components'
import {
  Home24Regular,
  Video24Regular,
  Document24Regular,
  Briefcase24Regular,
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from '@fluentui/react-icons'

interface SidebarProps {
  isDark: boolean
  toggleTheme: () => void
}

export function Sidebar({ isDark, toggleTheme }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    {
      name: 'Home',
      icon: <Home24Regular />,
      href: '/',
    },
    {
      name: 'My Journey',
      icon: <Video24Regular />,
      href: '/journey',
    },
    {
      name: 'My Work',
      icon: <Briefcase24Regular />,
      href: '/work',
    },
    {
      name: 'My Writing',
      icon: <Document24Regular />,
      href: '/writing',
    },
  ]

  return (
    <aside className="w-64 h-screen border-r border-gray-200 dark:border-gray-800 flex flex-col bg-white dark:bg-gray-900">
      {/* Logo/Brand Area */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Portfolio
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <Nav
          defaultSelectedValue={pathname || '/'}
          onNavItemSelect={(_, data) => {
            if (data.value) {
              router.push(data.value as string)
            }
          }}
        >
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              value={item.href}
              icon={item.icon}
            >
              {item.name}
            </NavItem>
          ))}
        </Nav>
      </nav>

      {/* Theme Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Button
          appearance="subtle"
          icon={isDark ? <WeatherSunny24Regular /> : <WeatherMoon24Regular />}
          onClick={toggleTheme}
          className="w-full justify-start"
        >
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
    </aside>
  )
}

