# Hygraph Setup Guide

## Step 1: Get Your Hygraph Endpoint

1. Go to [Hygraph Dashboard](https://app.hygraph.com)
2. Select your project
3. Navigate to **Settings** → **API Access**
4. Copy your **Content API** endpoint URL
   - It should look like: `https://api-xxxxx.hygraph.com/v2/xxxxx/master`

## Step 2: Configure Environment Variables

Create or update your `.env.local` file in the root of this project:

```env
NEXT_PUBLIC_HYGRAPH_ENDPOINT=https://api-xxxxx.hygraph.com/v2/xxxxx/master
```

Replace the URL with your actual endpoint from Step 1.

## Step 3: Set Up Your Hygraph Schema

In your Hygraph project, create a **Project** model with the following fields:

### Project Model Fields:

- **title** (Single line text) - Required
- **slug** (Slug) - Required, unique
  - Source: `title`
- **videoUrl** (URL) - Optional, for "My Journey" page
- **thumbnail** (Asset) - Optional, image
- **description** (Rich text) - Optional
- **tags** (Text list) - Optional

### GraphQL Query Structure

The app expects this structure:

```graphql
query GetProjects {
  projects {
    id
    title
    slug
    videoUrl
    thumbnail {
      url
      width
      height
    }
    description {
      raw
    }
    tags
  }
}
```

## Step 4: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000/work
   - If you see "No projects found", add a project in Hygraph
   - If you see projects, you're all set!

## Step 5: Using the Journey Page

The "My Journey" page will automatically show all projects that have a `videoUrl` field filled in.

- Projects with `videoUrl` appear in the module navigation
- Click any module to play its video
- You can also link directly: `/journey?slug=your-project-slug`

## Troubleshooting

**"HYGRAPH_ENDPOINT is not configured" error:**
- Make sure `.env.local` exists in the project root
- Check that the endpoint URL is correct
- Restart your dev server after adding/updating `.env.local`

**"GraphQL errors" in console:**
- Verify your Hygraph schema matches the expected structure
- Check that field names match exactly (case-sensitive)
- Ensure you've published your schema in Hygraph

**No projects showing:**
- Make sure you've created and published projects in Hygraph
- Check that the GraphQL query in `lib/hygraph.ts` matches your schema
- Verify your endpoint has the correct permissions

