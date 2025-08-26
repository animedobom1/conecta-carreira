import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "@/lib/storage";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const session = getSession();

  useEffect(() => {
    const validRoles = ["company", "admin", "super-admin", "candidate"];
    if (!validRoles.includes(session.role)) {
      navigate("/auth");
    }
  }, [session.role, navigate]);

  const validRoles = ["company", "admin", "super-admin", "candidate"];
  if (!validRoles.includes(session.role)) {
    return null;
  }

  return <>{children}</>;
}
