import { Student } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StudentAvatarProps {
  student: Student;
  size?: "sm" | "md" | "lg";
}

export const StudentAvatar = ({ student, size = "md" }: StudentAvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base"
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts.map(p => p[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={student.avatar} alt={student.name} />
      <AvatarFallback className="bg-primary/10 text-primary font-medium">
        {getInitials(student.name)}
      </AvatarFallback>
    </Avatar>
  );
};
