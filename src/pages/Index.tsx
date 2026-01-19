import DashboardHeader from '@/components/DashboardHeader';
import PDFViewer from '@/components/PDFViewer';
import ExamDetailsSidebar from '@/components/ExamDetailsSidebar';

// Sample exam data - in a real app this would come from an API
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

// Sample PDF URL - using a public sample PDF
const samplePdfUrl = 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader 
        studentName={examDetails.studentName}
        collegeName="National Institute of Technology"
        onBack={() => console.log('Navigate back')}
      />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">View Answer Paper</h2>
          <p className="text-muted-foreground">
            Review your evaluated answer paper for {examDetails.subjectName}
          </p>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-220px)]">
          {/* PDF Viewer - Takes 3 columns on large screens */}
          <div className="lg:col-span-3 h-full">
            <PDFViewer 
              pdfUrl={samplePdfUrl}
              title={`${examDetails.subjectCode}_${examDetails.studentName}_AnswerPaper.pdf`}
            />
          </div>
          
          {/* Sidebar - Takes 1 column on large screens */}
          <div className="lg:col-span-1 h-full overflow-auto">
            <ExamDetailsSidebar details={examDetails} />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border bg-card">
        <p>© 2024 National Institute of Technology. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
