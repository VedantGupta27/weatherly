import { useMemo } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import WeatherApp from "./WeatherApp"
// import './App.css'

function App() {
const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")

const theme = useMemo(
  () => createTheme({ palette: { mode: prefersDark ? "dark" : "light" } }),
  [prefersDark]
)
return (
  <ThemeProvider theme={theme}>
    <WeatherApp />
  </ThemeProvider>
)
}

export default App
