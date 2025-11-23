import { Student } from "@/types";
import { Card } from "@/components/ui/card";
import { StudentAvatar } from "./StudentAvatar";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardProps {
  students: Student[];
}

export const Leaderboard = ({ students }: LeaderboardProps) => {
  const sortedStudents = [...students].sort(
    (a, b) => b.totalPagesRead - a.totalPagesRead
  );

  const getBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-700" />;
      default:
        return null;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-slate-400/20 border-gray-400/50";
      case 3:
        return "bg-gradient-to-r from-amber-700/20 to-orange-600/20 border-amber-700/50";
      default:
        return "bg-card border-border";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        لوحة المتصدرين
      </h2>

      <div className="space-y-3">
        {sortedStudents.map((student, index) => {
          const rank = index + 1;
          return (
            <Card
              key={student.id}
              className={`p-4 transition-smooth hover:scale-102 ${getRankStyle(
                rank
              )}`}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 font-bold text-primary text-lg">
                  {rank <= 3 ? getBadge(rank) : rank}
                </div>

                <StudentAvatar student={student} size="lg" />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {student.universityId}
                  </p>
                </div>

                <div className="text-left">
                  <p className="text-2xl font-bold text-primary">
                    {student.totalPagesRead.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">صفحة مقروءة</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
