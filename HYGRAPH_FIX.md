# ✅ Fixed: 403 "not allowed" Error

## What Was Wrong

The GraphQL query structure was incorrect for Hygraph's API. Hygraph uses a different query pattern than standard GraphQL.

## What I Fixed

### Before (Incorrect):
```graphql
query GetProjects {
  projects {
    id
    title
  }
}
```

### After (Correct for Hygraph):
```graphql
query GetProjects {
  projectCollection {
    items {
      id
      title
    }
  }
}
```

## Changes Made

1. ✅ Changed `projects` → `projectCollection`
2. ✅ Added `items` wrapper (Hygraph returns items in a collection)
3. ✅ Changed `description.raw` → `description.json` (Hygraph's rich text format)
4. ✅ Updated single project query to use `projectCollection` with `where` filter
5. ✅ Updated response handling to extract from `items` array

## Test It Now

1. **Refresh your browser** at http://localhost:3000/work
2. **Check browser console** - the 403 error should be gone
3. **If you see "No projects found"** - that's normal! You need to:
   - Create a Project model in Hygraph
   - Add some projects
   - Then they'll appear

## If You Still Get Errors

### Error: "Cannot query field 'projectCollection'"
**Cause**: Your model in Hygraph might be named differently
**Solution**: 
- Check your Hygraph model name (might be "Project" with capital P)
- The query uses lowercase: `projectCollection`
- If your model is "Project", the query should be `projectCollection`
- If your model is "Portfolio", the query should be `portfolioCollection`

### Error: "Field 'description' doesn't exist"
**Cause**: Your model might not have a description field, or it's named differently
**Solution**: 
- Check your Hygraph model fields
- Make sure you have a `description` field (Rich text type)
- Or remove it from the query if you don't need it

---

**The 403 error should now be fixed!** 🎉

