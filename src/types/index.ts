export interface Student {
  id: string;
  name: string;
  universityId: string;
  avatar?: string;
  totalPagesRead: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  coverUrl: string;
  genre: string;
}

export interface ReadingProgress {
  bookId: string;
  studentId: string;
  currentPage: number;
  lastUpdated: Date;
}

export interface StudentReading {
  student: Student;
  progress: ReadingProgress;
}
