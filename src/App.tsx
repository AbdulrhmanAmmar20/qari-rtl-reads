import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import { Student } from "./types";

const queryClient = new QueryClient();

const App = () => {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  const handleLogin = async (name: string, universityId: string) => {
    try {
      const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL as string) ||
        (typeof window !== "undefined" && window.location.hostname === "localhost"
          ? "http://localhost:4000"
          : "");
      const loginUrl = BACKEND_URL ? `${BACKEND_URL}/login` : `/login`;
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, universityId }),
      });

      if (!response.ok) {
        let errMsg = "Login failed";
        try {
          const errData = await response.json();
          errMsg = errData.error || JSON.stringify(errData);
        } catch (e) {
          // response was not JSON (likely an HTML error page), use text
          const text = await response.text();
          errMsg = text || errMsg;
        }
        throw new Error(errMsg);
      }

      const backendUser = await response.json();
    const newStudent: Student = {
      id: backendUser.id,
      name: backendUser.name,
      universityId: backendUser.id,
      totalPagesRead: backendUser.progress?.booksRead || 0,
      avatar: "/default-avatar.png",
    };
    setCurrentStudent(newStudent);
  } catch (error) {
    alert("Login failed: " + (error as Error).message);
  }
};



  const handleLogout = () => {
    setCurrentStudent(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        {currentStudent ? (
          <Dashboard currentStudent={currentStudent} onLogout={handleLogout} />
        ) : (
          <Index onLogin={handleLogin} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
