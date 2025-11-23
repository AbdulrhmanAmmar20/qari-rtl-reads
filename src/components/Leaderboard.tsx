import { useEffect, useState } from "react";
// Restored original imports for external components/types:
import { Student } from "@/types"; 
import { Card } from "@/components/ui/card";
import { Trophy, Medal, Award, User, Loader2 } from "lucide-react"; 

// Use the deployed backend URL
const API_URL = "https://raqeem-34ac.onrender.com/users"; 

// --- START: StudentAvatar Component (Embedded to fix the original relative import error) ---
// Define interface for props, relying on the imported 'Student' type
interface StudentAvatarProps {
    student: Student;
    size?: "sm" | "md" | "lg";
}

// Embedded StudentAvatar component
const StudentAvatar = ({ student, size = "md" }: StudentAvatarProps) => {
    const sizeClasses = {
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
    };
    
    const avatarUrl = student.avatar; 

    return (
        <div 
            className={`flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold shrink-0 overflow-hidden ${sizeClasses[size]}`}
        >
            {avatarUrl ? (
                <img 
                    src={avatarUrl} 
                    alt={student.name || "Student"} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                       // Fallback to hide broken image
                       (e.target as HTMLImageElement).onerror = null; 
                       (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
            ) : (
                <User className="w-6 h-6 text-gray-500" />
            )}
        </div>
    );
};
// --- END: StudentAvatar Component ---


export const Leaderboard = () => {
    // Relying on the imported Student type
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(API_URL);
                if (res.ok) {
                    const users = await res.json();
                    
                    // Calculate totalPagesRead and map to Student interface
                    const leaderboard: Student[] = users.map((u: any) => {
                        let totalPagesRead = 0;
                        if (u.progress && u.progress.details) {
                            for (const bookId in u.progress.details) {
                                totalPagesRead += u.progress.details[bookId].currentPage || 0;
                            }
                        }
                        return {
                            id: u.id,
                            name: u.name,
                            universityId: u.id,
                            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`,
                            totalPagesRead,
                        } as Student; // Ensure the mapped object conforms to the Student interface
                    });
                    setStudents(leaderboard);
                } else {
                     console.error("Failed to fetch leaderboard. Status:", res.status);
                }
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    const sortedStudents = [...students].sort(
        (a, b) => b.totalPagesRead - a.totalPagesRead
    );

    const getBadge = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="w-6 h-6 text-yellow-500 fill-yellow-500" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-400 fill-gray-400" />;
            case 3:
                return <Award className="w-6 h-6 text-amber-700 fill-amber-700" />;
            default:
                return null;
        }
    };

    const getRankStyle = (rank: number) => {
        switch (rank) {
            case 1:
                return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-r-4 border-yellow-500 shadow-lg";
            case 2:
                return "bg-gradient-to-r from-gray-400/20 to-slate-400/20 border-r-4 border-gray-400 shadow-md";
            case 3:
                return "bg-gradient-to-r from-amber-700/20 to-orange-600/20 border-r-4 border-amber-700 shadow-sm";
            default:
                return "bg-card border-l border-r border-border";
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center mb-6 text-primary">
                لوحة المتصدرين
            </h2>
            
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-muted-foreground mr-2">جاري تحميل البيانات...</p>
                </div>
            ) : sortedStudents.length === 0 ? (
                <p className="text-center text-muted-foreground py-16 border rounded-lg p-6 bg-card">
                    لا يوجد مستخدمون لعرضهم بعد في لوحة المتصدرين.
                </p>
            ) : (
                <div className="space-y-3">
                    {sortedStudents.map((student, index) => {
                        const rank = index + 1;
                        return (
                            <Card
                                key={student.id}
                                className={`p-4 transition-all duration-300 hover:scale-[1.01] border ${getRankStyle(
                                    rank
                                )}`}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Rank Display with Badge */}
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg shrink-0 ${
                                        rank === 1 ? 'bg-yellow-500 text-white shadow-xl' :
                                        rank === 2 ? 'bg-gray-400 text-white shadow-lg' :
                                        rank === 3 ? 'bg-amber-700 text-white shadow-md' :
                                        'bg-primary/10 text-primary'
                                    }`}>
                                        {rank <= 3 ? getBadge(rank) : rank}
                                    </div>

                                    {/* Student Avatar (Embedded component) */}
                                    <StudentAvatar student={student} size="lg" />

                                    {/* Name and ID */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-lg truncate">{student.name}</h3>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {student.universityId}
                                        </p>
                                    </div>

                                    {/* Pages Read */}
                                    <div className="text-right flex flex-col items-end">
                                        <p className="text-2xl font-extrabold text-primary">
                                            {student.totalPagesRead.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-muted-foreground whitespace-nowrap">صفحة مقروءة</p>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
