import { useRoutes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProfiePage from "./pages/profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedRouteToLogin from "./routes/ProtectedRouteToLogin";

const routes = [
  {
    path: "/login",
    element: (
      <ProtectedRouteToLogin>
        <LoginPage />
      </ProtectedRouteToLogin>
    ),
  },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfiePage />
      </ProtectedRoute>
    ),
  },
];

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;
