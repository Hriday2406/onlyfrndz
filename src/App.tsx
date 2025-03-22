import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import { Header } from "./components/Header";
import Home from "./pages/Home";
import Membership from "./pages/Membership";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/membership" element={<Membership />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
