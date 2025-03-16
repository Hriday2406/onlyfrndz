import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1 className="font-writing absolute top-0 left-1/2 -translate-x-1/2 py-5 text-center text-3xl font-medium">
        FrndzOnly
      </h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
