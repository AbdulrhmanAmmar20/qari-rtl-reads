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

  const handleLogin = (name: string, universityId: string) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name,
      universityId,
      totalPagesRead: 0,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    };
    setCurrentStudent(newStudent);
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
