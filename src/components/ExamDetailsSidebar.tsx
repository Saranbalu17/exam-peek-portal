import { Calendar, Clock, BookOpen, Award, User, FileText, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

interface QuestionMark {
  questionNo: number;
  maxMarks: number;
  obtainedMarks: number;
  section?: string;
}

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
  questionWiseMarks: QuestionMark[];
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

  const getMarkColor = (obtained: number, max: number) => {
    const pct = (obtained / max) * 100;
    if (pct >= 80) return 'text-success font-semibold';
    if (pct >= 50) return 'text-warning font-semibold';
    return 'text-destructive font-semibold';
  };

  // Group questions by section if available
  const groupedQuestions = details.questionWiseMarks.reduce((acc, q) => {
    const section = q.section || 'All Questions';
    if (!acc[section]) acc[section] = [];
    acc[section].push(q);
    return acc;
  }, {} as Record<string, QuestionMark[]>);

  return (
    <ScrollArea className="h-full">
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

        {/* Total Score Summary */}
        <div className="space-y-4 mb-6">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Total Score
          </h4>
          
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Overall</span>
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

        {/* Question-wise Marks Table */}
        <div className="space-y-4 mb-6">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Question-wise Marks
          </h4>

          {Object.entries(groupedQuestions).map(([section, questions]) => (
            <div key={section} className="space-y-2">
              {Object.keys(groupedQuestions).length > 1 && (
                <p className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  {section}
                </p>
              )}
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableHead className="text-xs font-semibold text-foreground w-[80px]">Q.No</TableHead>
                      <TableHead className="text-xs font-semibold text-foreground text-center">Max</TableHead>
                      <TableHead className="text-xs font-semibold text-foreground text-center">Obtained</TableHead>
                      <TableHead className="text-xs font-semibold text-foreground text-right">%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {questions.map((q) => {
                      const qPct = Math.round((q.obtainedMarks / q.maxMarks) * 100);
                      return (
                        <TableRow key={q.questionNo} className="hover:bg-muted/30">
                          <TableCell className="font-medium text-foreground">Q{q.questionNo}</TableCell>
                          <TableCell className="text-center text-muted-foreground">{q.maxMarks}</TableCell>
                          <TableCell className={`text-center ${getMarkColor(q.obtainedMarks, q.maxMarks)}`}>
                            {q.obtainedMarks}
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              qPct >= 80 ? 'bg-success/20 text-success' :
                              qPct >= 50 ? 'bg-warning/20 text-warning' :
                              'bg-destructive/20 text-destructive'
                            }`}>
                              {qPct}%
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              {/* Section Summary */}
              <div className="flex justify-between items-center px-2 py-1.5 bg-muted/30 rounded text-sm">
                <span className="text-muted-foreground">Section Total:</span>
                <span className="font-semibold text-foreground">
                  {questions.reduce((sum, q) => sum + q.obtainedMarks, 0)}
                  <span className="text-muted-foreground font-normal">
                    /{questions.reduce((sum, q) => sum + q.maxMarks, 0)}
                  </span>
                </span>
              </div>
            </div>
          ))}
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
    </ScrollArea>
  );
};

export default ExamDetailsSidebar;
