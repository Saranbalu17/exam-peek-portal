import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BookOpen, FileText } from 'lucide-react';

interface ExamFiltersProps {
  subjects: { code: string; name: string }[];
  examTypes: { value: string; label: string }[];
  selectedSubject: string;
  selectedExamType: string;
  onSubjectChange: (value: string) => void;
  onExamTypeChange: (value: string) => void;
}

const ExamFilters = ({
  subjects,
  examTypes,
  selectedSubject,
  selectedExamType,
  onSubjectChange,
  onExamTypeChange,
}: ExamFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      {/* Subject Dropdown */}
      <div className="flex-1 min-w-[200px]">
        <div className="flex items-center gap-2 mb-1.5">
          <BookOpen className="w-4 h-4 text-primary" />
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Subject
          </label>
        </div>
        <Select value={selectedSubject} onValueChange={onSubjectChange}>
          <SelectTrigger className="w-full bg-background border-border">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {subjects.map((subject) => (
              <SelectItem key={subject.code} value={subject.code}>
                <span className="font-medium">{subject.code}</span>
                <span className="text-muted-foreground ml-2">- {subject.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Exam Type Dropdown */}
      <div className="flex-1 min-w-[200px]">
        <div className="flex items-center gap-2 mb-1.5">
          <FileText className="w-4 h-4 text-primary" />
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Exam Type
          </label>
        </div>
        <Select value={selectedExamType} onValueChange={onExamTypeChange}>
          <SelectTrigger className="w-full bg-background border-border">
            <SelectValue placeholder="Select Exam Type" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {examTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ExamFilters;
