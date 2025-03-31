import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./pages/Login";
import { Header } from "./components/Header";
import Home from "./pages/Home";
import Membership from "./pages/Membership";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/membership" element={<Membership />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
