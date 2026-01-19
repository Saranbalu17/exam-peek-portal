import { Calendar, Clock, BookOpen, Award, User, FileText, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ExamDetails {
  studentName: string;
  rollNumber: string;
  semester: string;
  subjectCode: string;
  subjectName: string;
  examDate: string;
  examTime: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  status: 'pass' | 'fail';
  evaluatedBy?: string;
  evaluatedDate?: string;
}

interface ExamDetailsSidebarProps {
  details: ExamDetails;
}

const ExamDetailsSidebar = ({ details }: ExamDetailsSidebarProps) => {
  const percentage = Math.round((details.marksObtained / details.totalMarks) * 100);
  
  const getGradeColor = (grade: string) => {
    const gradeColors: Record<string, string> = {
      'A+': 'bg-success text-success-foreground',
      'A': 'bg-success text-success-foreground',
      'B+': 'bg-accent text-accent-foreground',
      'B': 'bg-accent text-accent-foreground',
      'C+': 'bg-warning text-warning-foreground',
      'C': 'bg-warning text-warning-foreground',
      'D': 'bg-destructive/80 text-destructive-foreground',
      'F': 'bg-destructive text-destructive-foreground',
    };
    return gradeColors[grade] || 'bg-muted text-muted-foreground';
  };

  return (
    <Card className="h-full p-6 bg-card shadow-lg">
      {/* Student Info */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{details.studentName}</h3>
            <p className="text-sm text-muted-foreground">Roll No: {details.rollNumber}</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          {details.semester}
        </Badge>
      </div>

      <Separator className="mb-6" />

      {/* Subject Info */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Exam Details
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">{details.subjectName}</p>
              <p className="text-sm text-muted-foreground">{details.subjectCode}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-foreground">{details.examDate}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-foreground">{details.examTime}</span>
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Results */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Results
        </h4>
        
        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Score</span>
            </div>
            <Badge className={getGradeColor(details.grade)}>
              Grade: {details.grade}
            </Badge>
          </div>
          
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-primary mb-1">
              {details.marksObtained}
              <span className="text-lg text-muted-foreground font-normal">
                /{details.totalMarks}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{percentage}% Scored</p>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                details.status === 'pass' ? 'bg-success' : 'bg-destructive'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-3">
            <CheckCircle2 className={`w-4 h-4 ${
              details.status === 'pass' ? 'text-success' : 'text-destructive'
            }`} />
            <span className={`text-sm font-medium ${
              details.status === 'pass' ? 'text-success' : 'text-destructive'
            }`}>
              {details.status === 'pass' ? 'Passed' : 'Failed'}
            </span>
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Evaluation Info */}
      {details.evaluatedBy && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Evaluation
          </h4>
          
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-foreground">Evaluated by</p>
              <p className="text-sm text-muted-foreground">{details.evaluatedBy}</p>
            </div>
          </div>
          
          {details.evaluatedDate && (
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-foreground">Evaluation Date</p>
                <p className="text-sm text-muted-foreground">{details.evaluatedDate}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default ExamDetailsSidebar;
