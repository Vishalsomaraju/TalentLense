import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CandidateDetail from "./pages/CandidateDetail";
import NewAnalysis from "./pages/NewAnalysis";
import AnalysisProcessing from "./pages/AnalysisProcessing";
import Candidates from "./pages/Candidates";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import NotFound from "./pages/NotFound";
import { ROUTES } from "@/constants";
import { AnalysisProvider } from "./context/AnalysisContext";

export default function App(): React.JSX.Element {
  return (
    <AnalysisProvider>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.JOBS} element={<Jobs />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.CANDIDATE_DETAIL} element={<CandidateDetail />} />
        <Route path={ROUTES.ANALYSIS_NEW} element={<NewAnalysis />} />
        <Route path={ROUTES.ANALYSIS_PROCESSING} element={<AnalysisProcessing />} />
        <Route path={ROUTES.CANDIDATES} element={<Candidates />} />
        <Route path={ROUTES.REPORTS} element={<Reports />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnalysisProvider>
  );
}
