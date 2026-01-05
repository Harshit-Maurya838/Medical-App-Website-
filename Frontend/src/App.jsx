import { Routes, Route, Navigate } from "react-router-dom";
import AuthFlow from "./pages/auth/AuthFlow";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<AuthFlow />} />

      {/* Future */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
