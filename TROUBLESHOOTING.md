# Troubleshooting: Why You Can't See Content

## Quick Checks

### 1. Is the Dev Server Running?
```bash
npm run dev
```
- Should see: `✓ Ready in X.Xs`
- Open: http://localhost:3000

### 2. Check Browser Console
- Press `F12` or `Cmd+Option+I` (Mac)
- Look for errors in the Console tab
- Check the Network tab for failed requests

### 3. Verify Hygraph Connection
Your endpoint is configured:
- ✅ `NEXT_PUBLIC_HYGRAPH_ENDPOINT` is set in `.env.local`

### 4. Common Issues

#### Issue: "No projects found" message
**Cause**: No projects exist in Hygraph yet
**Solution**: 
1. Go to https://app.hygraph.com
2. Create a Project model
3. Add some projects
4. Refresh your browser

#### Issue: GraphQL errors in console
**Cause**: Schema doesn't match the query
**Solution**: 
- Check that your Hygraph Project model has these fields:
  - `id` (ID)
  - `title` (String)
  - `slug` (String, unique)
  - `videoUrl` (URL, optional)
  - `thumbnail` (Asset, optional)
  - `description` (Rich text, optional)
  - `tags` (String list, optional)

#### Issue: Blank page / nothing showing
**Possible causes**:
1. JavaScript errors - check browser console
2. CSS not loading - check Network tab
3. Component errors - check terminal where `npm run dev` is running

### 5. Test the Connection

Open browser console and run:
```javascript
fetch('https://api-ap-south-1.hygraph.com/v2/cmjscx4rm00me07utqspc8b90/master', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: '{ projects { id title } }'
  })
})
.then(r => r.json())
.then(console.log)
```

This will show you:
- If the connection works
- What data structure Hygraph returns
- Any errors from Hygraph

### 6. Verify UI Components

The UI should show:
- ✅ Left sidebar with navigation
- ✅ Home page with 3D background
- ✅ "My Work" page (even if empty)
- ✅ "My Journey" page
- ✅ "My Writing" page

If you don't see the sidebar, there's a UI issue.

---

## Step-by-Step Debugging

1. **Check Terminal**: Are there any errors in the `npm run dev` output?
2. **Check Browser Console**: Press F12, look for red errors
3. **Check Network Tab**: Are requests to Hygraph failing?
4. **Check Hygraph**: Do you have projects in your Hygraph project?
5. **Check Schema**: Does your Project model match the expected structure?

---

## Expected Behavior

### If Everything Works:
- Home page shows 3D stars background
- Sidebar navigation works
- "My Work" shows projects OR "No projects found" message
- No errors in console

### If Something's Wrong:
- Blank page = Check console for errors
- "No projects found" = Add projects in Hygraph
- GraphQL errors = Check schema matches query
- Sidebar missing = Check component imports

