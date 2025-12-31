# Quick Sanity Setup Guide

## Step 1: Login to Sanity

Open your terminal in this project directory and run:

```bash
npx sanity login
```

- Select your login method (Google, GitHub, or Email)
- Complete authentication in your browser
- You'll see a success message when logged in

## Step 2: Link Your Project

After logging in, run:

```bash
npx sanity link
```

- Select your existing project from the list
- This will create a `.sanity` folder with your project configuration

## Step 3: Get Your Project Details

Run this to see your project ID and datasets:

```bash
npx sanity projects list
```

Or check the `.sanity` folder that was created - it contains your project configuration.

## Step 4: Create Environment File

Create a `.env.local` file in the root of this project with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

Replace:
- `your_project_id_here` with your actual Project ID
- `production` with your dataset name (if different)

## Alternative: Manual Setup

If you prefer not to use the CLI, you can:

1. Go to https://sanity.io/manage
2. Click on your project
3. Go to Settings → API
4. Copy your Project ID
5. Note your Dataset name
6. Create `.env.local` with the values above

---

**That's it!** Once your `.env.local` is set up, restart your dev server and your app will connect to Sanity.

