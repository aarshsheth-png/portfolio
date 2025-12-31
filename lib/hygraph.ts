// Hygraph GraphQL client using native fetch API

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT || ''
const HYGRAPH_AUTH_TOKEN = process.env.NEXT_PUBLIC_HYGRAPH_AUTH_TOKEN

interface HygraphResponse<T> {
  data: T
  errors?: Array<{
    message: string
    locations?: Array<{ line: number; column: number }>
  }>
}

async function fetchHygraph<T>(query: string, variables?: Record<string, any>): Promise<T> {
  if (!HYGRAPH_ENDPOINT) {
    throw new Error('HYGRAPH_ENDPOINT is not configured. Please add it to .env.local')
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  // Add authorization header if token is provided
  if (HYGRAPH_AUTH_TOKEN) {
    headers['Authorization'] = `Bearer ${HYGRAPH_AUTH_TOKEN}`
  }

  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const result: HygraphResponse<T> = await response.json()

  if (result.errors) {
    throw new Error(`GraphQL errors: ${result.errors.map((e) => e.message).join(', ')}`)
  }

  return result.data
}

// GraphQL query to get all projects
const GET_PROJECTS_QUERY = `
  query GetProjects {
    projects {
      id
      title
      slug
      videoUrl
      description
      thumbnail {
        url
        width
        height
      }
    }
  }
`

// GraphQL query to get a single project by slug
const GET_PROJECT_BY_SLUG_QUERY = `
  query GetProjectBySlug($slug: String!) {
    projects(where: { slug: $slug }) {
      id
      title
      slug
      videoUrl
      description
      thumbnail {
        url
        width
        height
      }
    }
  }
`

export interface HygraphProject {
  id: string
  title: string
  slug: string
  videoUrl?: string
  thumbnail?: {
    url: string
    width?: number
    height?: number
  }
  description?: string
}

interface ProjectsResponse {
  projects: HygraphProject[]
}

interface ProjectResponse {
  projects: HygraphProject[]
}

/**
 * Fetch all projects from Hygraph
 */
export async function getProjects(): Promise<HygraphProject[]> {
  try {
    const data = await fetchHygraph<ProjectsResponse>(GET_PROJECTS_QUERY)
    return data.projects || []
  } catch (error) {
    console.error('Error fetching projects from Hygraph:', error)
    return []
  }
}

/**
 * Fetch a single project by slug from Hygraph
 */
export async function getProjectBySlug(slug: string): Promise<HygraphProject | null> {
  try {
    const data = await fetchHygraph<ProjectResponse>(GET_PROJECT_BY_SLUG_QUERY, { slug })
    return data.projects?.[0] || null
  } catch (error) {
    console.error('Error fetching project from Hygraph:', error)
    return null
  }
}

