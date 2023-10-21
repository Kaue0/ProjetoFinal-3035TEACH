import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessPage } from "./pages/AccessPage";
import { HomePage } from './pages/HomePage';
import { Routing } from "./routing/Routing";
import { ProfilePage } from "./pages/ProfilePage";
import { Settings } from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccessPage />} />
        <Route path="/feed" element={<Routing><HomePage /></Routing>} />
        <Route path="/settings" element={<Routing><Settings /></Routing>} />
        <Route path="/:username" element={<Routing><ProfilePage /></Routing>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;