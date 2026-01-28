import { FileSearch, ArrowUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState = ({ 
  title = "Select Filters to View Answer Paper",
  description = "Please select all the required filters above (Student ID, Semester, Exam Name, Subject, and Fee Status) to view your evaluated answer paper."
}: EmptyStateProps) => {
  return (
    <div className="flex items-center justify-center py-12 md:py-20">
      <Card className="max-w-md w-full mx-4 p-8 text-center bg-card/60 backdrop-blur-sm border-dashed border-2 border-border">
        {/* Animated Arrow */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/5 animate-ping" />
          </div>
          <div className="relative w-20 h-20 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center">
            <FileSearch className="w-10 h-10 text-muted-foreground" />
          </div>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <ArrowUp className="w-6 h-6 text-primary animate-bounce" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

        {/* Visual Steps */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Steps to view your answer paper
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Student ID', 'Semester', 'Exam', 'Subject', 'Fee Status'].map((step, index) => (
              <span 
                key={step}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground"
              >
                <span className="w-4 h-4 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                {step}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmptyState;
