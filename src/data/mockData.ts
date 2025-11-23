import { Book, Student, ReadingProgress } from "@/types";

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "الأيام",
    author: "طه حسين",
    totalPages: 280,
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    genre: "سيرة ذاتية"
  },
  {
    id: "2",
    title: "زقاق المدق",
    author: "نجيب محفوظ",
    totalPages: 320,
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    genre: "رواية"
  },
  {
    id: "3",
    title: "موسم الهجرة إلى الشمال",
    author: "الطيب صالح",
    totalPages: 240,
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    genre: "رواية"
  },
  {
    id: "4",
    title: "رجال في الشمس",
    author: "غسان كنفاني",
    totalPages: 180,
    coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    genre: "رواية"
  },
  {
    id: "5",
    title: "الخبز الحافي",
    author: "محمد شكري",
    totalPages: 200,
    coverUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    genre: "سيرة ذاتية"
  },
  {
    id: "6",
    title: "ساق البامبو",
    author: "سعود السنعوسي",
    totalPages: 360,
    coverUrl: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop",
    genre: "رواية"
  }
];

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "أحمد محمد",
    universityId: "2023001",
    totalPagesRead: 1240,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad"
  },
  {
    id: "2",
    name: "فاطمة علي",
    universityId: "2023002",
    totalPagesRead: 1580,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima"
  },
  {
    id: "3",
    name: "محمد خالد",
    universityId: "2023003",
    totalPagesRead: 980,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammad"
  },
  {
    id: "4",
    name: "سارة حسن",
    universityId: "2023004",
    totalPagesRead: 2100,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara"
  },
  {
    id: "5",
    name: "عمر عبدالله",
    universityId: "2023005",
    totalPagesRead: 1450,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar"
  },
  {
    id: "6",
    name: "نور الدين",
    universityId: "2023006",
    totalPagesRead: 760,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nour"
  },
  {
    id: "7",
    name: "ليلى أحمد",
    universityId: "2023007",
    totalPagesRead: 1320,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Layla"
  }
];

export const mockReadingProgress: ReadingProgress[] = [
  { bookId: "1", studentId: "2", currentPage: 180, lastUpdated: new Date() },
  { bookId: "1", studentId: "5", currentPage: 95, lastUpdated: new Date() },
  { bookId: "2", studentId: "1", currentPage: 240, lastUpdated: new Date() },
  { bookId: "2", studentId: "4", currentPage: 320, lastUpdated: new Date() },
  { bookId: "2", studentId: "3", currentPage: 150, lastUpdated: new Date() },
  { bookId: "3", studentId: "2", currentPage: 200, lastUpdated: new Date() },
  { bookId: "3", studentId: "7", currentPage: 120, lastUpdated: new Date() },
  { bookId: "4", studentId: "4", currentPage: 180, lastUpdated: new Date() },
  { bookId: "4", studentId: "6", currentPage: 80, lastUpdated: new Date() },
  { bookId: "5", studentId: "5", currentPage: 150, lastUpdated: new Date() },
  { bookId: "6", studentId: "3", currentPage: 100, lastUpdated: new Date() },
];
