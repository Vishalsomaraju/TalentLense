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

export default function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/candidate/:id" element={<CandidateDetail />} />
      <Route path="/analysis/new" element={<NewAnalysis />} />
      <Route path="/analysis/processing" element={<AnalysisProcessing />} />
      <Route path="/candidates" element={<Candidates />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
