# How Your Portfolio Works - Simple Explanation

## 🎯 The Big Picture

```
┌─────────────────┐         ┌──────────────┐         ┌─────────────┐
│   Your Browser  │  ←→    │  Next.js App │  ←→    │   Hygraph   │
│  (localhost:3000)│         │  (Your Computer) │         │  (Cloud)     │
└─────────────────┘         └──────────────┘         └─────────────┘
     You see this              Runs on your PC          Stores your data
```

## 📍 Where Things Run

### 1. **Your Computer (Local)**
   - **Next.js App** runs here
   - **Port 3000**: Your portfolio website

### 2. **Hygraph (Cloud/Internet)**
   - Your content (projects, posts) is stored here
   - You manage content through Hygraph's web interface
   - Your Next.js app fetches data from here

### 3. **Your Browser**
   - Shows your portfolio at `http://localhost:3000`
   - This is what visitors would see (after you deploy)

---

## 🚀 How to Start Everything

### Step 1: Open Terminal
- On Mac: Press `Cmd + Space`, type "Terminal", press Enter
- Or use VS Code's integrated terminal (View → Terminal)

### Step 2: Navigate to Your Project
```bash
cd "/Users/aarshsheth/Desktop/Personal/Cursor/Interactive Folio"
```

### Step 3: Start the Development Server
```bash
npm run dev
```

You should see:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in 2.3s
```

### Step 4: Open Your Browser
- Go to: **http://localhost:3000**
- You'll see your portfolio!

---

## 🔄 How Data Flows

### When You Visit a Page:

1. **You click** "My Work" in the sidebar
2. **Next.js** (running on your computer) makes a request to **Hygraph**
3. **Hygraph** sends back your project data
4. **Next.js** displays it on the page
5. **You see** your projects in the browser

```
Browser → Next.js → Hygraph → Next.js → Browser
  (click)  (fetch)   (data)    (render)  (display)
```

---

## 📂 What Each Part Does

### **Next.js App** (`npm run dev`)
- **Location**: Runs on your computer
- **What it does**: 
  - Creates the website pages
  - Fetches data from Hygraph
  - Shows everything in your browser
- **Where you see it**: http://localhost:3000

### **Hygraph** (Cloud Service)
- **Location**: On the internet (Hygraph's servers)
- **What it does**:
  - Stores your projects, images, content
  - Provides an API to fetch data
- **Where you manage it**: https://app.hygraph.com

### **Your Browser**
- **Location**: On your computer
- **What it does**: Displays the website
- **Where you see it**: http://localhost:3000

---

## 🛠️ Common Commands

### Start the Development Server
```bash
npm run dev
```
**What happens**: Your portfolio starts running at http://localhost:3000

### Stop the Server
- Press `Ctrl + C` in the terminal where it's running

### Install Dependencies (if needed)
```bash
npm install
```
**When to use**: If you get "module not found" errors

---

## 🎨 Where to Edit Things

### To Change the Website Design:
- Edit files in `/app` folder
- Edit components in `/components` folder
- Styles are in `app/globals.css`

### To Add/Edit Content (Projects):
1. Go to https://app.hygraph.com
2. Log in to your project
3. Add/edit projects there
4. Refresh your browser at http://localhost:3000
5. Your changes appear!

### To Change Data Fetching:
- Edit `/lib/hygraph.ts`

---

## ❓ Troubleshooting

### "Port 3000 is already in use"
**Solution**: Something else is using port 3000. Either:
- Stop the other app using that port
- Or change Next.js port: `npm run dev -- -p 3001`

### "Cannot connect to Hygraph"
**Check**:
1. Is `.env.local` file in the project root?
2. Does it have `NEXT_PUBLIC_HYGRAPH_ENDPOINT=...`?
3. Restart the dev server after changing `.env.local`

### "No projects showing"
**Check**:
1. Have you created projects in Hygraph?
2. Is your Project model set up correctly?
3. Check browser console (F12) for errors

---

## 📍 Quick Reference

| What | Where | How to Access |
|------|-------|---------------|
| Your Portfolio | Your Computer | `npm run dev` then http://localhost:3000 |
| Content Management | Hygraph Cloud | https://app.hygraph.com |
| Code Files | Your Computer | `/Users/aarshsheth/Desktop/Personal/Cursor/Interactive Folio` |
| Configuration | `.env.local` file | In project root |

---

## 🎯 Simple Workflow

1. **Start**: Run `npm run dev` in terminal
2. **View**: Open http://localhost:3000 in browser
3. **Edit Content**: Go to Hygraph website, add projects
4. **See Changes**: Refresh browser
5. **Edit Code**: Change files, save, see changes automatically

That's it! 🎉

