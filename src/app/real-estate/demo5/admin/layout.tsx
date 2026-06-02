import type { Metadata } from "next";
import "./admin.css";
import { ToastProvider } from "./_components/ui";
import { AuthProvider } from "./_lib/auth-context";

export const metadata: Metadata = {
  title: "Villa Suite — Admin",
  description: "Luxury villa operations platform.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="villa-admin">
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </div>
  );
}
