import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageSquare, Send, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface QueryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  rollNumber: string;
  subjectName: string;
  subjectCode: string;
  questions: { questionNo: number; section: string }[];
}

interface QueryFormData {
  queryType: string;
  questionNo: string;
  pageNumber: string;
  subject: string;
  description: string;
}

const QueryDialog = ({
  open,
  onOpenChange,
  studentName,
  rollNumber,
  subjectName,
  subjectCode,
  questions,
}: QueryDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<QueryFormData>({
    queryType: '',
    questionNo: '',
    pageNumber: '',
    subject: '',
    description: '',
  });

  const queryTypes = [
    { value: 'marks_discrepancy', label: 'Marks Discrepancy' },
    { value: 'answer_not_evaluated', label: 'Answer Not Evaluated' },
    { value: 'wrong_marking', label: 'Wrong Marking' },
    { value: 'totaling_error', label: 'Totaling Error' },
    { value: 'page_missing', label: 'Page Missing' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.queryType || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success('Query Submitted Successfully!', {
      description: 'Your query has been sent to the examination department. You will receive a response within 3-5 working days.',
    });
    
    setIsSubmitting(false);
    setFormData({
      queryType: '',
      questionNo: '',
      pageNumber: '',
      subject: '',
      description: '',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">Raise Query / Objection</DialogTitle>
              <DialogDescription className="text-sm">
                Submit your concern regarding the evaluation
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          {/* Student Info Card */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Student Name</p>
                <p className="font-medium text-foreground">{studentName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Roll Number</p>
                <p className="font-medium text-foreground">{rollNumber}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground">Subject</p>
                <p className="font-medium text-foreground">{subjectCode} - {subjectName}</p>
              </div>
            </div>
          </div>

          {/* Query Type */}
          <div className="space-y-2">
            <Label htmlFor="queryType" className="text-sm font-medium">
              Query Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.queryType}
              onValueChange={(value) => setFormData({ ...formData, queryType: value })}
            >
              <SelectTrigger id="queryType">
                <SelectValue placeholder="Select query type" />
              </SelectTrigger>
              <SelectContent>
                {queryTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Question & Page Reference */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="questionNo" className="text-sm font-medium">
                Question Number
              </Label>
              <Select
                value={formData.questionNo}
                onValueChange={(value) => setFormData({ ...formData, questionNo: value })}
              >
                <SelectTrigger id="questionNo">
                  <SelectValue placeholder="Select question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Questions</SelectItem>
                  {questions.map((q) => (
                    <SelectItem key={q.questionNo} value={q.questionNo.toString()}>
                      Q{q.questionNo} ({q.section})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pageNumber" className="text-sm font-medium">
                Page Number (if applicable)
              </Label>
              <Input
                id="pageNumber"
                type="number"
                min="1"
                placeholder="e.g., 3"
                value={formData.pageNumber}
                onChange={(e) => setFormData({ ...formData, pageNumber: e.target.value })}
              />
            </div>
          </div>

          {/* Subject Line */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium">
              Subject Line
            </Label>
            <Input
              id="subject"
              placeholder="Brief title for your query"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Detailed Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Please describe your concern in detail. Include specific information about the issue and what you believe should be the correct evaluation..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Be specific and provide clear justification for your query.
            </p>
          </div>

          {/* Notice */}
          <div className="flex gap-3 p-3 bg-warning/10 border border-warning/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Important Guidelines</p>
              <ul className="text-muted-foreground text-xs mt-1 space-y-1 list-disc list-inside">
                <li>Queries must be raised within 7 days of result declaration</li>
                <li>False or frivolous queries may attract penalties</li>
                <li>You will be notified via email about the query status</li>
              </ul>
            </div>
          </div>
        </form>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Query
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QueryDialog;
