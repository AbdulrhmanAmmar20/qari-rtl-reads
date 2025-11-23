import { useState } from "react";
import { Student, Book, ReadingProgress } from "@/types";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/BookCard";
import { StudentAvatar } from "@/components/StudentAvatar";
import { BookDetailsModal } from "@/components/BookDetailsModal";
import { AddBookModal } from "@/components/AddBookModal";
import { Leaderboard } from "@/components/Leaderboard";
import { Plus, Library, Trophy, LogOut } from "lucide-react";
import { mockBooks, mockStudents, mockReadingProgress } from "@/data/mockData";
import { toast } from "sonner";

interface DashboardProps {
  currentStudent: Student;
  onLogout: () => void;
}

const Dashboard = ({ currentStudent, onLogout }: DashboardProps) => {
  const [view, setView] = useState<"library" | "leaderboard">("library");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showAddBook, setShowAddBook] = useState(false);
  const [myProgress, setMyProgress] = useState<ReadingProgress[]>(
    mockReadingProgress.filter((p) => p.studentId === currentStudent.id)
  );

  const myBooks = mockBooks.filter((book) =>
    myProgress.some((p) => p.bookId === book.id)
  );

  const handleUpdateProgress = (bookId: string, currentPage: number) => {
    setMyProgress((prev) =>
      prev.map((p) =>
        p.bookId === bookId
          ? { ...p, currentPage, lastUpdated: new Date() }
          : p
      )
    );
  };

  const handleAddBook = (book: Book) => {
    const newProgress: ReadingProgress = {
      bookId: book.id,
      studentId: currentStudent.id,
      currentPage: 0,
      lastUpdated: new Date(),
    };
    setMyProgress((prev) => [...prev, newProgress]);
    toast.success(`تمت إضافة "${book.title}" إلى مكتبتك!`);
  };

  const selectedProgress = myProgress.find((p) => p.bookId === selectedBook?.id) || null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <StudentAvatar student={currentStudent} size="lg" />
              <div>
                <h2 className="font-bold text-xl">{currentStudent.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {currentStudent.universityId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={view === "library" ? "default" : "outline"}
                onClick={() => setView("library")}
                className="gap-2"
              >
                <Library className="w-4 h-4" />
                <span className="hidden sm:inline">مكتبتي</span>
              </Button>
              <Button
                variant={view === "leaderboard" ? "default" : "outline"}
                onClick={() => setView("leaderboard")}
                className="gap-2"
              >
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">المتصدرين</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="text-destructive hover:text-destructive"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {view === "library" ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">مكتبتي</h1>
              <Button
                onClick={() => setShowAddBook(true)}
                className="gradient-primary gap-2"
              >
                <Plus className="w-5 h-5" />
                إضافة كتاب
              </Button>
            </div>

            {myBooks.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Library className="w-16 h-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">مكتبتك فارغة</h3>
                  <p className="text-muted-foreground mb-4">
                    ابدأ رحلتك في القراءة بإضافة كتابك الأول
                  </p>
                  <Button
                    onClick={() => setShowAddBook(true)}
                    className="gradient-primary"
                  >
                    <Plus className="ml-2 w-5 h-5" />
                    إضافة كتاب جديد
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {myBooks.map((book) => {
                  const progress = myProgress.find((p) => p.bookId === book.id);
                  return (
                    <BookCard
                      key={book.id}
                      book={book}
                      progress={progress}
                      onClick={() => setSelectedBook(book)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <Leaderboard students={mockStudents} />
        )}
      </main>

      {/* Modals */}
      <BookDetailsModal
        book={selectedBook}
        progress={selectedProgress}
        open={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        onUpdateProgress={handleUpdateProgress}
      />

      <AddBookModal
        open={showAddBook}
        onClose={() => setShowAddBook(false)}
        onAddBook={handleAddBook}
        currentBookIds={myBooks.map((b) => b.id)}
      />
    </div>
  );
};

export default Dashboard;
