import { Book, ReadingProgress } from "@/types";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";

interface BookCardProps {
  book: Book;
  progress?: ReadingProgress;
  onClick: () => void;
}

export const BookCard = ({ book, progress, onClick }: BookCardProps) => {
  const progressPercentage = progress 
    ? Math.round((progress.currentPage / book.totalPages) * 100)
    : 0;

  return (
    <Card 
      className="glass-card overflow-hidden cursor-pointer transition-smooth hover:scale-105 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
        <img 
          src={book.coverUrl} 
          alt={book.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </div>
        
        {progress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">التقدم</span>
              <span className="font-medium text-primary">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <BookOpen className="w-3 h-3" />
              <span>{progress.currentPage} من {book.totalPages} صفحة</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
