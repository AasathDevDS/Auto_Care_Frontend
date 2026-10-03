import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  // 1. Storage-ல் token இருக்கிறதா என்று பார்க்கிறோம் (Pass check)
  const token = localStorage.getItem("authToken");

  // 2. Token இல்லை என்றால் Login பக்கத்திற்கு திருப்பி அனுப்புகிறோம்
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. Token இருந்தால், கேட்கப்பட்ட page-ஐ render செய்ய அனுமதிப்போம்
  return <Outlet />;
}

export default ProtectedRoute;