import { Book } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { mockBooks } from "@/data/mockData";
import { Plus } from "lucide-react";

interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
  onAddBook: (book: Book) => void;
  currentBookIds: string[];
}

export const AddBookModal = ({
  open,
  onClose,
  onAddBook,
  currentBookIds,
}: AddBookModalProps) => {
  const availableBooks = mockBooks.filter(
    (book) => !currentBookIds.includes(book.id)
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">إضافة كتاب جديد</DialogTitle>
        </DialogHeader>

        {availableBooks.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            لقد أضفت جميع الكتب المتاحة!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableBooks.map((book) => (
              <div
                key={book.id}
                className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth bg-card"
              >
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded-md shadow"
                />
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {book.totalPages} صفحة • {book.genre}
                  </p>
                  <Button
                    onClick={() => {
                      onAddBook(book);
                      onClose();
                    }}
                    size="sm"
                    className="w-full gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة للمكتبة
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
