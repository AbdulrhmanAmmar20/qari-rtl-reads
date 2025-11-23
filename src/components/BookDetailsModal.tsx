import { useState } from "react";
import { Book, ReadingProgress, Student } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Users, MessageCircle } from "lucide-react";
import { StudentAvatar } from "./StudentAvatar";
import { mockStudents, mockReadingProgress } from "@/data/mockData";
import { toast } from "sonner";

interface BookDetailsModalProps {
  book: Book | null;
  progress: ReadingProgress | null;
  open: boolean;
  onClose: () => void;
  onUpdateProgress: (bookId: string, currentPage: number) => void;
}

export const BookDetailsModal = ({
  book,
  progress,
  open,
  onClose,
  onUpdateProgress,
}: BookDetailsModalProps) => {
  const [currentPage, setCurrentPage] = useState(progress?.currentPage || 0);

  if (!book) return null;

  const progressPercentage = progress
    ? Math.round((progress.currentPage / book.totalPages) * 100)
    : 0;

  const studentsReadingThisBook = mockReadingProgress
    .filter((p) => p.bookId === book.id && p.studentId !== progress?.studentId)
    .map((p) => ({
      student: mockStudents.find((s) => s.id === p.studentId)!,
      progress: p,
    }))
    .filter((item) => item.student);

  const handleUpdateProgress = () => {
    if (currentPage < 0 || currentPage > book.totalPages) {
      toast.error("رقم الصفحة غير صحيح");
      return;
    }
    onUpdateProgress(book.id, currentPage);
    toast.success("تم تحديث التقدم بنجاح!");
  };

  const handleContact = (studentName: string) => {
    toast.info(`التواصل مع ${studentName} قريباً!`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{book.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Book Info */}
          <div className="flex gap-4">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-lg shadow-lg"
            />
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">المؤلف</p>
                <p className="font-medium">{book.author}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">النوع</p>
                <p className="font-medium">{book.genre}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">عدد الصفحات</p>
                <p className="font-medium">{book.totalPages} صفحة</p>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          {progress && (
            <div className="space-y-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  تقدمك في القراءة
                </h3>
                <span className="text-2xl font-bold text-primary">
                  {progressPercentage}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              
              <div className="flex gap-3 items-end">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="currentPage">الصفحة الحالية</Label>
                  <Input
                    id="currentPage"
                    type="number"
                    min="0"
                    max={book.totalPages}
                    value={currentPage}
                    onChange={(e) => setCurrentPage(parseInt(e.target.value) || 0)}
                    className="text-lg"
                  />
                </div>
                <Button onClick={handleUpdateProgress} className="gradient-primary">
                  تحديث
                </Button>
              </div>
            </div>
          )}

          {/* Students Reading This Book */}
          {studentsReadingThisBook.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                زملاء يقرأون هذا الكتاب ({studentsReadingThisBook.length})
              </h3>
              
              <div className="space-y-3">
                {studentsReadingThisBook.map(({ student, progress: p }) => {
                  const studentProgress = Math.round(
                    (p.currentPage / book.totalPages) * 100
                  );
                  return (
                    <div
                      key={student.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-smooth"
                    >
                      <StudentAvatar student={student} />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{student.name}</p>
                          <span className="text-sm text-primary font-medium">
                            {studentProgress}%
                          </span>
                        </div>
                        <Progress value={studentProgress} className="h-1.5" />
                        <p className="text-xs text-muted-foreground">
                          {p.currentPage} من {book.totalPages} صفحة
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleContact(student.name)}
                        className="gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        تواصل
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
