import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Sectors } from "./pages/Sectors";
import { SectorDetail } from "./pages/SectorDetail";
import { RiskMatrix } from "./pages/RiskMatrix";
import { Methodology } from "./pages/Methodology";
import { Sources } from "./pages/Sources";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sectors" element={<Sectors />} />
        <Route path="/sectors/:sectorId" element={<SectorDetail />} />
        <Route path="/risk-matrix" element={<RiskMatrix />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
