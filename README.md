# Interactive Portfolio

A high-end, app-like portfolio built with Next.js, Fluent UI React v9, and Sanity.io.

## Features

- **App-like Layout**: Fixed left sidebar navigation with main content canvas
- **Dark/Light Mode**: Full theme support with Fluent UI design tokens
- **Smooth Animations**: Framer Motion for page transitions
- **3D Background**: React Three Fiber on the home page
- **Video Journey**: Coursera-inspired video player with module navigation
- **Content Management**: Sanity.io integration for projects and blog posts
- **Dynamic Routes**: Individual pages for each project and post

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity.io

1. Create a new Sanity project at [sanity.io](https://sanity.io)
2. Copy your Project ID and Dataset name
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Configure Sanity Schema

The schema files are located in `sanity/schema/`. To use them with Sanity Studio:

1. Install Sanity CLI: `npm install -g @sanity/cli`
2. Initialize Sanity Studio: `sanity init`
3. Import the schema files or manually create the content types in Sanity Studio

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the portfolio.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with R3F background
│   ├── journey/           # Video journey page
│   ├── work/              # Projects listing and detail pages
│   └── writing/           # Blog posts listing and detail pages
├── components/            # React components
│   ├── AppShell.tsx      # Main layout with sidebar
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── VideoPlayer.tsx   # Video.js player component
│   └── ModuleNavigation.tsx # Course module navigation
├── lib/                   # Utilities
│   └── sanity.ts         # Sanity client and queries
└── sanity/               # Sanity schema definitions
    └── schema/
```

## Tech Stack

- **Next.js 14** (App Router)
- **Fluent UI React v9**
- **Framer Motion**
- **React Three Fiber** & **Three.js**
- **Video.js**
- **Sanity.io**
- **TypeScript**
- **Tailwind CSS**

## Next Steps

1. Configure your Sanity project and add content
2. Customize the theme colors and styling
3. Add more video modules to the Journey section
4. Implement draft mode for live previews (see Next.js docs)
5. Deploy to Vercel or your preferred hosting platform

