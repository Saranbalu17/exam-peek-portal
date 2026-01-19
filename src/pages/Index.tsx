import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import PDFViewer from '@/components/PDFViewer';
import ExamDetailsSidebar from '@/components/ExamDetailsSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, BarChart3 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

// Sample exam data
const examDetails = {
  studentName: 'Rahul Kumar',
  rollNumber: 'CS2021045',
  semester: '6th Semester - Spring 2024',
  subjectCode: 'CS601',
  subjectName: 'Database Management Systems',
  examDate: 'March 15, 2024',
  examTime: '10:00 AM - 1:00 PM',
  marksObtained: 78,
  totalMarks: 100,
  grade: 'A',
  status: 'pass' as const,
  evaluatedBy: 'Dr. Sharma',
  evaluatedDate: 'March 28, 2024',
  questionWiseMarks: [
    { questionNo: 1, section: 'Section A', maxMarks: 10, obtainedMarks: 9 },
    { questionNo: 2, section: 'Section A', maxMarks: 10, obtainedMarks: 8 },
    { questionNo: 3, section: 'Section A', maxMarks: 10, obtainedMarks: 7 },
    { questionNo: 4, section: 'Section B', maxMarks: 15, obtainedMarks: 13 },
    { questionNo: 5, section: 'Section B', maxMarks: 15, obtainedMarks: 12 },
    { questionNo: 6, section: 'Section C', maxMarks: 20, obtainedMarks: 15 },
    { questionNo: 7, section: 'Section C', maxMarks: 20, obtainedMarks: 14 },
  ],
};

const samplePdfUrl = 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf';

const Index = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('paper');

  const handleRaiseQuery = () => {
    toast.info('Query feature coming soon!', {
      description: 'You will be able to raise objections about specific questions.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col">
      <DashboardHeader 
        studentName={examDetails.studentName}
        rollNumber={examDetails.rollNumber}
        collegeName="National Institute of Technology"
        onBack={() => console.log('Navigate back')}
      />
      
      <main className="flex-1 w-full">
        {/* Page Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">View Answer Paper</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {examDetails.subjectCode} - {examDetails.subjectName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                  examDetails.status === 'pass' 
                    ? 'bg-success/10 text-success border border-success/20' 
                    : 'bg-destructive/10 text-destructive border border-destructive/20'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${examDetails.status === 'pass' ? 'bg-success' : 'bg-destructive'}`} />
                  {examDetails.marksObtained}/{examDetails.totalMarks} Marks
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Tabs Layout */}
        {isMobile ? (
          <div className="p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 h-12">
                <TabsTrigger value="paper" className="gap-2 text-sm">
                  <FileText className="h-4 w-4" />
                  Answer Paper
                </TabsTrigger>
                <TabsTrigger value="details" className="gap-2 text-sm">
                  <BarChart3 className="h-4 w-4" />
                  Marks Details
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="paper" className="mt-0">
                <div className="h-[calc(100vh-240px)]">
                  <PDFViewer 
                    pdfUrl={samplePdfUrl}
                    title={`${examDetails.subjectCode}_${examDetails.studentName}_AnswerPaper.pdf`}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-0">
                <div className="h-[calc(100vh-240px)]">
                  <ExamDetailsSidebar 
                    details={examDetails} 
                    onRaiseQuery={handleRaiseQuery}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          /* Desktop: Side by Side Layout */
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
              {/* PDF Viewer - Takes more space */}
              <div className="lg:col-span-2 xl:col-span-3 h-full">
                <PDFViewer 
                  pdfUrl={samplePdfUrl}
                  title={`${examDetails.subjectCode}_${examDetails.studentName}_AnswerPaper.pdf`}
                />
              </div>
              
              {/* Sidebar - Fixed width */}
              <div className="lg:col-span-1 h-full overflow-hidden">
                <ExamDetailsSidebar 
                  details={examDetails}
                  onRaiseQuery={handleRaiseQuery}
                />
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="py-3 md:py-4 text-center text-xs md:text-sm text-muted-foreground border-t border-border bg-card/80 backdrop-blur-sm">
        <p>© 2024 National Institute of Technology. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
