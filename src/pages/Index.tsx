import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { BookOpen, LogIn } from "lucide-react";
import { toast } from "sonner";

interface IndexProps {
  onLogin: (name: string, universityId: string) => void;
}

const Index = ({ onLogin }: IndexProps) => {
  const [name, setName] = useState("");
  const [universityId, setUniversityId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !universityId.trim()) {
      toast.error("الرجاء ملء جميع الحقول");
      return;
    }
    onLogin(name, universityId);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Logo & Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">قارئ</h1>
            <p className="text-muted-foreground text-lg">
              تتبع رحلتك في عالم القراءة
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">
                اسم الطالب
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="أدخل اسمك الكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="universityId" className="text-base">
                الرقم الجامعي
              </Label>
              <Input
                id="universityId"
                type="text"
                placeholder="مثال: 2023001"
                value={universityId}
                onChange={(e) => setUniversityId(e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg gradient-primary hover:opacity-90 transition-smooth"
            >
              <LogIn className="ml-2 w-5 h-5" />
              ابدأ القراءة
            </Button>
          </form>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          انضم إلى مجتمع القراء وتتبع تقدمك في رحلة المعرفة
        </p>
      </div>
    </div>
  );
};

export default Index;
