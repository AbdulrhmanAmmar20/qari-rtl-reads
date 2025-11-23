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
      // Try to get user by ID first
      let response = await fetch(`https://raqeem-34ac.onrender.com`);
      if (response.ok) {
        // User exists, use their data
        const backendUser = await response.json();
        const newStudent: Student = {
          id: backendUser.id,
          name: backendUser.name,
          universityId: backendUser.id,
          totalPagesRead: backendUser.progress?.booksRead || 0,
          avatar: "/default-avatar.png",
        };
        setCurrentStudent(newStudent);
        return;
      }
      // If not found, create new user
      response = await fetch("https://raqeem-34ac.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, universityId }),
      });
      if (!response.ok) throw new Error("Failed to create user");
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
