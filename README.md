# 🌤️ WeatherLy – Weather Dashboard

A mini React project that lets you search any city and instantly see its live weather. The UI is built entirely with **Material UI (MUI)** built-in components, and the data comes from the **OpenWeatherMap API**.

🚀 **Live Demo:** [View WeatherLy](https://mini-project-react-material-60lwxhebf-no-team-0d25.vercel.app/)

💻 **GitHub Repository:** [View Source Code](https://github.com/VedantGupta27/weatherly)


---

## ✨ Features

- Search weather by city name
- Shows temperature, humidity, min/max temperature, weather description and "feels like"
- Background image and icon change with the weather (hot, cold, rainy, hazy)
- Error message when a city does not exist
- Animated colour-changing title
- Automatic light/dark mode: the MUI theme follows the browser/OS setting
- Responsive layout that works on phones, tablets and desktops

---

## 🧰 Tech Stack

| Tool | Purpose |
|------|---------|
| React (Vite) | UI library and build tool |
| Material UI (`@mui/material`) | Ready-made components |
| MUI Icons (`@mui/icons-material`) | Weather icons |
| OpenWeatherMap API | Live weather data |

---

## 🧩 Material UI Components Used

| Component | Where | What it does |
|-----------|-------|--------------|
| `TextField` | `SearchBox.jsx` | City name input (outlined, required) |
| `Button` | `SearchBox.jsx` | "Search" submit button (contained) |
| `Card` | `InfoBox.jsx` | Container for the weather result |
| `CardMedia` | `InfoBox.jsx` | Weather-based image on top of the card |
| `CardContent` | `InfoBox.jsx` | Holds the text details |
| `Typography` | `InfoBox.jsx` | Headings and body text with theme styling |
| `ThunderstormIcon`, `AcUnitIcon`, `SunnyIcon`, `GrainIcon` | `InfoBox.jsx` | Icons for rain, cold, sunny, haze |
| `ThemeProvider` + `createTheme` | `App.jsx` | Applies a light or dark MUI theme to every component inside it |
| `useMediaQuery` | `App.jsx` | Detects whether the browser is in dark mode |

---

## 📁 Project Structure

```
src/
├── App.jsx           # Root component, MUI light/dark ThemeProvider, renders <WeatherApp />
├── WeatherApp.jsx    # Holds weather state, combines SearchBox + InfoBox
├── SearchBox.jsx     # Input form + API call
├── SearchBox.css
├── InfoBox.jsx       # Weather card (MUI Card)
├── InfoBox.css
├── index.css         # Global styles and theme variables
└── main.jsx          # Entry point
```

### How it works

1. `WeatherApp` stores the weather data in state and passes `updateInfo` to `SearchBox`.
2. `SearchBox` fetches data from OpenWeatherMap on submit and calls `updateInfo(result)`.
3. `InfoBox` receives the data as props and renders it in an MUI `Card`, choosing the image and icon from temperature, humidity and description.
4. `App` wraps everything in a `ThemeProvider`, so all MUI components automatically use light or dark colours.

---

## 🌗 Dark Mode with MUI (Learning Notes)

**The problem:** `index.css` makes the page background dark in dark mode, but MUI components have their own theme and default to light colours (dark text, dark borders). The result: the "City Name" box was invisible on a dark page.

**The fix, in `src/App.jsx`:**

```jsx
import { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  // true when the browser/OS is in dark mode
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  // rebuild the theme only when the mode changes
  const theme = useMemo(
    () => createTheme({ palette: { mode: prefersDark ? "dark" : "light" } }),
    [prefersDark]
  );

  return (
    <ThemeProvider theme={theme}>
      <WeatherApp />
    </ThemeProvider>
  );
}
```

**Key ideas:**
- Your own CSS and the MUI theme are two separate systems, so keep them in sync.
- `ThemeProvider` must wrap the components you want themed.
- `palette.mode` switches text, border, label and card colours in one place.

**Other fixes made in `InfoBox.jsx`:**
- Added `component="div"` to the body `Typography` (it renders a `<p>` by default, and `<p>` inside `<p>` is invalid HTML).
- The last icon fallback now returns `<AcUnitIcon/>` instead of a URL string.
- `CardMedia` title changed from the leftover "green iguana" to "weather".

**Testing dark mode without changing your OS setting:** in Chrome DevTools press `Ctrl+Shift+P`, type "Rendering", then set *Emulate CSS prefers-color-scheme* to dark or light.

---

## 📱 Responsive Design

- `#root` in `index.css` uses `max-width: 100%`, so the page never overflows small screens.
- The weather `Card` uses `maxWidth: 345`, so it shrinks on narrow screens.
- Optional: make the search box fill the width on phones with MUI breakpoints:

  ```jsx
  <TextField sx={{ width: { xs: '90%', sm: 300 } }} ... />
  ```

  `xs` means phones (0px and up) and `sm` means 600px and up.
- Test it with `Ctrl+Shift+M` (device toolbar) in Chrome DevTools.

---

## 🚀 Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or newer
- A free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Install Material UI (if not already installed)
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

# 3. Start the dev server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

---

## 🔐 Keep Your API Key Safe (Recommended)

Do **not** hard-code your API key in `SearchBox.jsx`: anything pushed to GitHub is public, and bots scan for leaked keys.

1. Create a file named `.env` in the project root:

   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

2. In `SearchBox.jsx`, replace the hard-coded key with:

   ```js
   const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
   ```

3. Make sure `.env` is listed in `.gitignore` (Vite projects include `*.local` by default, but add `.env` to be safe):

   ```
   .env
   ```

> Vite only exposes variables that start with `VITE_`. Note that this keeps the key out of your repository, but it is still visible in the browser bundle; for a hobby project this is acceptable, and you can restrict or regenerate the key from your OpenWeatherMap dashboard at any time.
>
> If a real key was already committed or shared, **regenerate it** in your OpenWeatherMap account.

---

## ▲ Step 1: Deploy to Vercel

You can deploy directly from your computer, before touching GitHub.

### Option A: Vercel CLI (no GitHub needed)

```bash
# 1. Install the CLI
npm install -g vercel

# 2. Log in (opens browser)
vercel login

# 3. From the project folder, deploy a preview
vercel

# 4. Deploy to production
vercel --prod
```

Answer the prompts:

| Prompt | Answer |
|--------|--------|
| Set up and deploy? | `Y` |
| Link to existing project? | `N` |
| Project name | `weatherly` (or any name) |
| Directory | `./` |
| Framework | Vite (auto-detected) |
| Build command | `npm run build` |
| Output directory | `dist` |

Add your API key to Vercel so the deployed app works:

```bash
vercel env add VITE_WEATHER_API_KEY
```

Select Production, Preview and Development, paste your key, then redeploy with `vercel --prod`.

### Option B: Vercel dashboard (after Step 2 below)

Skip ahead to "Connect GitHub to Vercel" for automatic deployments.

Your live URL will look like `https://weatherly.vercel.app`.

---

## 🐙 Step 2: Push the Project to GitHub

### 1. Create an empty repository
Go to [github.com/new](https://github.com/new), enter a name (e.g. `weatherly`), leave **README / .gitignore / licence unchecked**, and click **Create repository**.

### 2. Initialise Git and commit locally

Run these in the project folder:

```bash
git init
git add .
git commit -m "Initial commit: WeatherLy weather dashboard"
git branch -M main
```

Before `git add .`, confirm `.env` and `node_modules` are in `.gitignore`.

### 3. Connect and push

```bash
git remote add origin https://github.com/<your-username>/weatherly.git
git push -u origin main
```

If prompted for a password, use a **Personal Access Token** (GitHub → Settings → Developer settings → Personal access tokens), not your account password.

### 4. Later updates

```bash
git add .
git commit -m "Describe your change"
git push
```

---

## 🔗 Step 3 (Optional): Connect GitHub to Vercel for Auto-Deploy

1. Open [vercel.com/new](https://vercel.com/new) and click **Import** next to your GitHub repo (authorise GitHub if asked).
2. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
3. Under **Environment Variables**, add `VITE_WEATHER_API_KEY` with your key.
4. Click **Deploy**.

From now on, every `git push` to `main` triggers a new production deployment automatically, and other branches get preview URLs.

---

## 🛠️ Troubleshooting

| Problem | Fix |
|---------|-----|
| "No such place exists!" for valid cities | Check the API key, and wait up to a couple of hours after creating a new key for it to activate |
| Blank page on Vercel | Confirm the output directory is `dist` and the build succeeded |
| API works locally but not on Vercel | Add `VITE_WEATHER_API_KEY` in Vercel settings, then redeploy |
| `Module not found: @mui/...` | Run the MUI install command above |
| Search box invisible in dark mode | Make sure `App.jsx` wraps `<WeatherApp />` in the `ThemeProvider` shown above |
| Console warning: `<p>` cannot be a descendant of `<p>` | Add `component="div"` to the `Typography` that contains your `<p>` tags |

---

## 📸 Possible Improvements

- Add a loading spinner (`CircularProgress` from MUI)
- Show a 5-day forecast
- Use MUI `Snackbar` or `Alert` for errors instead of plain text
- Add a unit toggle (°C / °F)

---

## 👤 Author

Weather Dashboard by **~Vedant**

> Live API data may not always be fully accurate.