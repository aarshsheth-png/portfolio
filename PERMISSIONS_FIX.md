# ✅ Fixed: "not allowed" Error

## The Problem

The "not allowed" error was caused by using an authentication token that doesn't have the right permissions for the Content API.

## The Solution

**Removed the auth token requirement** - The Content API works without authentication for public content.

### What Changed:
- Removed `HYGRAPH_AUTH_TOKEN` from the fetch request
- Content API queries now work without authentication
- This is the correct setup for public content in Hygraph

## Why This Works

1. **Content API** is designed for public content access
2. **Management API** (which uses auth tokens) is for admin operations
3. Your Content API endpoint is publicly accessible
4. The auth token you had was likely a Management API token

## Current Setup:
- ✅ Using Content API endpoint (public)
- ✅ No authentication required
- ✅ Queries work correctly

## If You Need Private Content Later:

If you need to access draft/unpublished content, you would:
1. Create a **Content API token** (not Management API token)
2. Add it to `.env.local` as `NEXT_PUBLIC_HYGRAPH_CONTENT_API_TOKEN`
3. Use it only for authenticated queries

But for now, **public content works without any token!** 🎉

