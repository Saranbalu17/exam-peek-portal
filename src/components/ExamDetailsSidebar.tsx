import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Award, 
  User, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  MessageSquare,
  Printer,
  Share2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';

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
  onRaiseQuery?: () => void;
}

const ExamDetailsSidebar = ({ details, onRaiseQuery }: ExamDetailsSidebarProps) => {
  const [isMarksOpen, setIsMarksOpen] = useState(true);
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
    if (pct >= 50) return 'text-foreground';
    return 'text-destructive font-semibold';
  };

  const getTrendIcon = (obtained: number, max: number) => {
    const pct = (obtained / max) * 100;
    if (pct >= 80) return <TrendingUp className="h-3 w-3 text-success" />;
    if (pct >= 50) return <Minus className="h-3 w-3 text-muted-foreground" />;
    return <TrendingDown className="h-3 w-3 text-destructive" />;
  };

  const groupedQuestions = details.questionWiseMarks.reduce((acc, q) => {
    const section = q.section || 'All Questions';
    if (!acc[section]) acc[section] = [];
    acc[section].push(q);
    return acc;
  }, {} as Record<string, QuestionMark[]>);

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-1">
        {/* Score Card - Hero Section */}
        <Card className="overflow-hidden shadow-lg border-0">
          <div className={`p-4 md:p-5 ${details.status === 'pass' ? 'bg-gradient-to-br from-success/10 via-success/5 to-transparent' : 'bg-gradient-to-br from-destructive/10 via-destructive/5 to-transparent'}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${details.status === 'pass' ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}`}>
                  {details.status === 'pass' ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <AlertCircle className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${details.status === 'pass' ? 'text-success' : 'text-destructive'}`}>
                    {details.status === 'pass' ? 'PASSED' : 'FAILED'}
                  </p>
                  <p className="text-xs text-muted-foreground">Final Result</p>
                </div>
              </div>
              <Badge className={`${getGradeColor(details.grade)} text-lg px-3 py-1 font-bold shadow-sm`}>
                {details.grade}
              </Badge>
            </div>
            
            {/* Score Display */}
            <div className="text-center py-3">
              <div className="text-5xl md:text-6xl font-bold text-foreground mb-1">
                {details.marksObtained}
                <span className="text-2xl md:text-3xl text-muted-foreground font-normal">
                  /{details.totalMarks}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{percentage}% Overall Score</p>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-secondary/50 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  className={`h-full transition-all duration-1000 ease-out rounded-full ${
                    details.status === 'pass' ? 'bg-gradient-to-r from-success to-success/80' : 'bg-gradient-to-r from-destructive to-destructive/80'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
                <span>0</span>
                <span>Pass: 40%</span>
                <span>{details.totalMarks}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Student & Subject Info */}
        <Card className="p-4 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{details.studentName}</h3>
              <p className="text-xs text-muted-foreground">{details.rollNumber}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Subject</p>
              <p className="text-sm font-medium text-foreground truncate">{details.subjectName}</p>
              <p className="text-xs text-muted-foreground">{details.subjectCode}</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Semester</p>
              <p className="text-sm font-medium text-foreground">{details.semester.split(' ')[0]}</p>
              <p className="text-xs text-muted-foreground">{details.semester.split(' - ')[1] || ''}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium text-foreground">{details.examDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium text-foreground">{details.examTime}</span>
            </div>
          </div>
        </Card>

        {/* Question-wise Marks */}
        <Card className="shadow-md overflow-hidden">
          <Collapsible open={isMarksOpen} onOpenChange={setIsMarksOpen}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">Question-wise Marks</span>
                </div>
                {isMarksOpen ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-4">
                {Object.entries(groupedQuestions).map(([section, questions]) => (
                  <div key={section}>
                    {Object.keys(groupedQuestions).length > 1 && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {section}
                        </span>
                        <div className="h-px flex-1 bg-border" />
                      </div>
                    )}
                    
                    <div className="rounded-lg border border-border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead className="text-xs font-semibold text-foreground h-9">Q.No</TableHead>
                            <TableHead className="text-xs font-semibold text-foreground text-center h-9">Max</TableHead>
                            <TableHead className="text-xs font-semibold text-foreground text-center h-9">Scored</TableHead>
                            <TableHead className="text-xs font-semibold text-foreground text-right h-9 w-16"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {questions.map((q) => {
                            const qPct = Math.round((q.obtainedMarks / q.maxMarks) * 100);
                            return (
                              <TableRow key={q.questionNo} className="hover:bg-muted/20">
                                <TableCell className="font-medium text-foreground py-2">Q{q.questionNo}</TableCell>
                                <TableCell className="text-center text-muted-foreground py-2">{q.maxMarks}</TableCell>
                                <TableCell className={`text-center py-2 ${getMarkColor(q.obtainedMarks, q.maxMarks)}`}>
                                  {q.obtainedMarks}
                                </TableCell>
                                <TableCell className="text-right py-2">
                                  <div className="flex items-center justify-end gap-1">
                                    {getTrendIcon(q.obtainedMarks, q.maxMarks)}
                                    <span className={`text-xs font-medium ${
                                      qPct >= 80 ? 'text-success' :
                                      qPct >= 50 ? 'text-muted-foreground' :
                                      'text-destructive'
                                    }`}>
                                      {qPct}%
                                    </span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                    
                    {/* Section Total */}
                    <div className="flex justify-between items-center px-3 py-2 mt-2 bg-primary/5 rounded-lg text-sm border border-primary/10">
                      <span className="text-muted-foreground font-medium">Section Total</span>
                      <span className="font-bold text-foreground">
                        {questions.reduce((sum, q) => sum + q.obtainedMarks, 0)}
                        <span className="text-muted-foreground font-normal">
                          /{questions.reduce((sum, q) => sum + q.maxMarks, 0)}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Evaluation Info */}
        {details.evaluatedBy && (
          <Card className="p-4 shadow-md">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Evaluation Details
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Evaluated by</p>
                  <p className="text-sm font-medium text-foreground">{details.evaluatedBy}</p>
                </div>
              </div>
              
              {details.evaluatedDate && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Evaluation Date</p>
                    <p className="text-sm font-medium text-foreground">{details.evaluatedDate}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <Card className="p-4 shadow-md">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Quick Actions
          </h4>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="gap-2 h-10">
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2 h-10">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
          
          <Button 
            onClick={onRaiseQuery}
            variant="default" 
            className="w-full mt-3 gap-2 bg-primary hover:bg-primary/90"
          >
            <MessageSquare className="h-4 w-4" />
            Raise Query / Objection
          </Button>
        </Card>

        {/* Notice */}
        <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 text-sm">
          <p className="text-warning font-medium mb-1">Important Notice</p>
          <p className="text-xs text-muted-foreground">
            Objections must be raised within 7 days of result declaration. Contact your department for assistance.
          </p>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ExamDetailsSidebar;
