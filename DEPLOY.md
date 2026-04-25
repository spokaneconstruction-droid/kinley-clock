# Kinley Construction Time Clock — Deployment Guide

## What you have
- `server.js` — the secure backend proxy (holds your JobTread credentials)
- `public/index.html` — the clock app the tablet runs
- `package.json` — Node.js project config

---

## Step 1 — Put the files on GitHub

GitHub is where Render pulls your code from. You need a free account.

1. Go to https://github.com and sign up (or log in)
2. Click the **+** in the top right → **New repository**
3. Name it `kinley-clock`
4. Set it to **Private**
5. Click **Create repository**
6. On the next screen, click **uploading an existing file**
7. Upload all three files — make sure `index.html` goes inside a folder called `public`
   - `server.js` (top level)
   - `package.json` (top level)
   - `public/index.html` (inside a folder named `public`)
8. Click **Commit changes**

---

## Step 2 — Deploy on Render

1. Go to https://render.com and sign up with your GitHub account
2. Click **New +** → **Web Service**
3. Connect your GitHub account if prompted
4. Select the `kinley-clock` repository
5. Fill in the settings:
   - **Name:** `kinley-clock` (this becomes your URL)
   - **Region:** Oregon (US West) — closest to Spokane
   - **Branch:** `main`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free
6. Scroll down to **Environment Variables** and add:
   - Key: `JOBTREAD_GRANT_KEY`
   - Value: `22TNNMMpHK5dpWvxunGCAGi5QAwRmi6LSc`
7. Click **Create Web Service**

Render will build and deploy automatically. Takes about 2 minutes.

---

## Step 3 — Get your URL

Once deployed, Render shows you a URL like:

    https://kinley-clock.onrender.com

That's your app. Open it in a browser to confirm it loads.

---

## Step 4 — Set up the tablet

### On iPad (Safari):
1. Open Safari and go to your Render URL
2. Tap the **Share** button (box with arrow)
3. Tap **Add to Home Screen**
4. Name it `KC Clock`
5. Tap **Add**

The app now appears on the home screen and launches full-screen like a native app.

### On Android (Chrome):
1. Open Chrome and go to your Render URL
2. Tap the three-dot menu (top right)
3. Tap **Add to Home screen**
4. Tap **Add**

---

## Step 5 — First launch

- The first time a crew member clocks in, the tablet will ask for location permission
- Tap **Allow While Using App** (or Allow)
- That's it — it remembers for future sessions

---

## Important notes

### Free tier sleep
Render's free tier spins down after 15 minutes of inactivity. The first clock-in of the day may take 30–60 seconds to load while it wakes up. After that it's fast.

**To avoid this:** upgrade to Render's Starter plan ($7/month) which keeps the server always on. Recommended for daily crew use.

### Your credentials
Your JobTread grant key is stored as an environment variable on Render's servers — it is never visible in the app code the tablet runs. Safe.

### Admin PIN
Default admin PIN is `1234`. Change it from inside the app:
- Enter `1234` on the keypad
- Go to Admin → Settings → Update Admin PIN

### Adding new crew members
From inside the app (admin panel), or ask Oliver to look up the JobTread User ID:
- Log into JobTread → Settings → Team
- Click the person's name
- The ID is in the URL: `jobtread.com/users/XXXXXXX`

---

## Making updates later

If you need to change anything (add a feature, update crew defaults, etc.):
1. Edit the file on GitHub directly (click the file → pencil icon)
2. Commit the change
3. Render automatically redeploys within ~1 minute

---

## Summary

| Item | Value |
|------|-------|
| App URL | https://kinley-clock.onrender.com |
| Admin PIN | 1234 (change in app settings) |
| JobTread Org | Kinley Construction |
| Hosting | Render.com (free tier) |
| Source code | GitHub — kinley-clock (private) |
