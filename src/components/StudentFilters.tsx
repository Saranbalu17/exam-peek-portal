import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  GraduationCap, 
  FileText, 
  BookOpen, 
  CreditCard,
  Search,
  RotateCcw
} from 'lucide-react';

interface StudentFiltersProps {
  students: { id: string; name: string; rollNumber: string }[];
  semesters: { id: string; name: string }[];
  examNames: { id: string; name: string }[];
  subjects: { code: string; name: string }[];
  selectedStudent: string;
  selectedSemester: string;
  selectedExamName: string;
  selectedSubject: string;
  selectedFeeStatus: string;
  onStudentChange: (value: string) => void;
  onSemesterChange: (value: string) => void;
  onExamNameChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onFeeStatusChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
  isComplete: boolean;
}

const StudentFilters = ({
  students,
  semesters,
  examNames,
  subjects,
  selectedStudent,
  selectedSemester,
  selectedExamName,
  selectedSubject,
  selectedFeeStatus,
  onStudentChange,
  onSemesterChange,
  onExamNameChange,
  onSubjectChange,
  onFeeStatusChange,
  onSearch,
  onReset,
  isComplete,
}: StudentFiltersProps) => {
  const feeStatusOptions = [
    { value: 'with_fee', label: 'With Fee' },
    { value: 'without_fee', label: 'Without Fee' },
  ];

  return (
    <Card className="p-4 md:p-6 bg-card/80 backdrop-blur-sm border-border shadow-lg">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Search className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Search Answer Paper</h3>
          <p className="text-xs text-muted-foreground">Select all filters to view your answer paper</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Student ID Dropdown */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Student ID
            </label>
          </div>
          <Select value={selectedStudent} onValueChange={onStudentChange}>
            <SelectTrigger className="w-full bg-background border-input hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Select Student" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{student.rollNumber}</span>
                    <span className="text-xs text-muted-foreground">{student.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Semester Dropdown */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Semester
            </label>
          </div>
          <Select value={selectedSemester} onValueChange={onSemesterChange}>
            <SelectTrigger className="w-full bg-background border-input hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {semesters.map((sem) => (
                <SelectItem key={sem.id} value={sem.id}>
                  {sem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Exam Name Dropdown */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Exam Name
            </label>
          </div>
          <Select value={selectedExamName} onValueChange={onExamNameChange}>
            <SelectTrigger className="w-full bg-background border-input hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Select Exam" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {examNames.map((exam) => (
                <SelectItem key={exam.id} value={exam.id}>
                  {exam.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subject Dropdown */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Subject
            </label>
          </div>
          <Select value={selectedSubject} onValueChange={onSubjectChange}>
            <SelectTrigger className="w-full bg-background border-input hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {subjects.map((subject) => (
                <SelectItem key={subject.code} value={subject.code}>
                  <div className="flex flex-col">
                    <span className="font-medium">{subject.code}</span>
                    <span className="text-xs text-muted-foreground">{subject.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fee Status Dropdown */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary" />
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Fee Status
            </label>
          </div>
          <Select value={selectedFeeStatus} onValueChange={onFeeStatusChange}>
            <SelectTrigger className="w-full bg-background border-input hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Select Fee Status" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {feeStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${option.value === 'with_fee' ? 'bg-success' : 'bg-warning'}`} />
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 pt-4 border-t border-border">
        <Button 
          onClick={onSearch}
          disabled={!isComplete}
          className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all hover:shadow-lg"
        >
          <Search className="w-4 h-4" />
          View Answer Paper
        </Button>
        <Button 
          onClick={onReset}
          variant="outline"
          className="w-full sm:w-auto gap-2 border-border hover:bg-muted"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </Button>
        
        {!isComplete && (
          <p className="text-sm text-muted-foreground flex-1 text-center sm:text-right">
            <span className="text-destructive">*</span> Please select all filters to continue
          </p>
        )}
      </div>
    </Card>
  );
};

export default StudentFilters;
