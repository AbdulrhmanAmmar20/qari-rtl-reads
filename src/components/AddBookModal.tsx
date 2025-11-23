import { useState, useEffect } from "react";
import { Book } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// NOTE: We remove the dependency on mockBooks here and use the API instead.
// import { mockBooks } from "@/data/mockData"; 
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { mockBooks } from "@/data/mockData";

// Determine backend URL from Vite env. In production default to same-origin
const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL as string) ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "");
const BOOKS_API_URL = BACKEND_URL ? `${BACKEND_URL}/books` : `/books`;

interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
  onAddBook: (book: Book) => void;
  currentBookIds: string[];
}

const AddBookModal = ({ // Changed from export const
  open,
  onClose,
  onAddBook,
  currentBookIds,
}: AddBookModalProps) => {
  // State to hold the full list of books fetched from the backend
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Effect to fetch books when the modal opens
  useEffect(() => {
    if (!open) {
      // Clear data when closed for fresh fetch on next open
      setAllBooks([]); 
      return; 
    }

    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(BOOKS_API_URL);
        
        if (!response.ok) {
          throw new Error("Failed to fetch available books from the server.");
        }
        
        const booksData: Book[] = await response.json();
        setAllBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
        // Fallback to local mock data so the modal still works offline/local
        console.warn("Falling back to local mockBooks due to fetch error.");
        setAllBooks(mockBooks);
        toast.error("فشل تحميل قائمة الكتب من الخادم — إظهار الكتب المحلية.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [open]);

  // Filter the fetched books to determine what is available to add
  const availableBooks = allBooks.filter(
    (book) => !currentBookIds.includes(book.id)
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">إضافة كتاب جديد</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-primary space-y-2">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-muted-foreground">جاري تحميل الكتب المتاحة...</p>
          </div>
        ) : availableBooks.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            لقد أضفت جميع الكتب المتاحة!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableBooks.map((book) => (
              <div
                key={book.id}
                className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth bg-card shadow-lg"
              >
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null; 
                    (e.target as HTMLImageElement).src = `https://placehold.co/80x112/A0A0A0/ffffff?text=Book+Cover`;
                  }}
                  className="w-20 h-28 object-cover rounded-md shadow-xl"
                />
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
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
                    className="w-full gap-2 transition-all duration-300 hover:scale-[1.02]"
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

export default AddBookModal; // Added default export
