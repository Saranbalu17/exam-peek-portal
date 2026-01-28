import { useState, useMemo } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import ScrollablePDFViewer from '@/components/ScrollablePDFViewer';
import ExamDetailsSidebar from '@/components/ExamDetailsSidebar';
import StudentFilters from '@/components/StudentFilters';
import WelcomeHero from '@/components/WelcomeHero';
import EmptyState from '@/components/EmptyState';
import QueryDialog from '@/components/QueryDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, BarChart3, Settings, CheckCircle2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample data
const students = [
  { id: '1', name: 'Rahul Kumar', rollNumber: 'CS2021045' },
  { id: '2', name: 'Priya Sharma', rollNumber: 'CS2021046' },
  { id: '3', name: 'Amit Singh', rollNumber: 'CS2021047' },
];

const semesters = [
  { id: 'sem1', name: '1st Semester' },
  { id: 'sem2', name: '2nd Semester' },
  { id: 'sem3', name: '3rd Semester' },
  { id: 'sem4', name: '4th Semester' },
  { id: 'sem5', name: '5th Semester' },
  { id: 'sem6', name: '6th Semester' },
  { id: 'sem7', name: '7th Semester' },
  { id: 'sem8', name: '8th Semester' },
];

const examNames = [
  { id: 'end_sem', name: 'End Semester Examination' },
  { id: 'mid_sem', name: 'Mid Semester Examination' },
  { id: 'internal1', name: 'Internal Assessment 1' },
  { id: 'internal2', name: 'Internal Assessment 2' },
  { id: 'practical', name: 'Practical Examination' },
  { id: 'supplementary', name: 'Supplementary Examination' },
];

const subjects = [
  { code: 'CS601', name: 'Database Management Systems' },
  { code: 'CS602', name: 'Computer Networks' },
  { code: 'CS603', name: 'Operating Systems' },
  { code: 'CS604', name: 'Software Engineering' },
  { code: 'CS605', name: 'Machine Learning' },
];

// Sample exam data
const getExamDetails = (studentId: string, subjectCode: string) => {
  const student = students.find(s => s.id === studentId);
  const subject = subjects.find(s => s.code === subjectCode);
  
  return {
    studentName: student?.name || 'Unknown Student',
    rollNumber: student?.rollNumber || 'Unknown',
    semester: '6th Semester - Spring 2024',
    subjectCode: subject?.code || 'Unknown',
    subjectName: subject?.name || 'Unknown Subject',
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
};

const samplePdfUrl = 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf';

const Index = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('paper');
  const [queryDialogOpen, setQueryDialogOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Filter states
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedExamName, setSelectedExamName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedFeeStatus, setSelectedFeeStatus] = useState('');

  // Check if all filters are selected
  const isFiltersComplete = useMemo(() => {
    return selectedStudent && selectedSemester && selectedExamName && selectedSubject && selectedFeeStatus;
  }, [selectedStudent, selectedSemester, selectedExamName, selectedSubject, selectedFeeStatus]);

  // Get exam details based on selections
  const examDetails = useMemo(() => {
    if (isFiltersComplete && showContent) {
      return getExamDetails(selectedStudent, selectedSubject);
    }
    return null;
  }, [isFiltersComplete, showContent, selectedStudent, selectedSubject]);

  const handleSearch = () => {
    if (isFiltersComplete) {
      setShowContent(true);
    }
  };

  const handleReset = () => {
    setSelectedStudent('');
    setSelectedSemester('');
    setSelectedExamName('');
    setSelectedSubject('');
    setSelectedFeeStatus('');
    setShowContent(false);
  };

  const handleRaiseQuery = () => {
    setQueryDialogOpen(true);
  };

  const currentStudent = students.find(s => s.id === selectedStudent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col">
      <DashboardHeader 
        studentName={currentStudent?.name || 'Student'}
        rollNumber={currentStudent?.rollNumber || ''}
        collegeName="National Institute of Technology"
        onBack={() => console.log('Navigate back')}
      />
      
      <main className="flex-1 w-full">
        {/* Welcome Hero - Only show when content is not displayed */}
        {!showContent && (
          <WelcomeHero 
            collegeName="National Institute of Technology"
            studentName={currentStudent?.name}
          />
        )}

        {/* Filters Section */}
        <div className="bg-muted/30 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            <StudentFilters
              students={students}
              semesters={semesters}
              examNames={examNames}
              subjects={subjects}
              selectedStudent={selectedStudent}
              selectedSemester={selectedSemester}
              selectedExamName={selectedExamName}
              selectedSubject={selectedSubject}
              selectedFeeStatus={selectedFeeStatus}
              onStudentChange={setSelectedStudent}
              onSemesterChange={setSelectedSemester}
              onExamNameChange={setSelectedExamName}
              onSubjectChange={setSelectedSubject}
              onFeeStatusChange={setSelectedFeeStatus}
              onSearch={handleSearch}
              onReset={handleReset}
              isComplete={!!isFiltersComplete}
            />
          </div>
        </div>

        {/* Content Section */}
        {!showContent ? (
          <EmptyState />
        ) : examDetails ? (
          <>
            {/* Content Header */}
            <div className="bg-card border-b border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-bold text-foreground">
                        Answer Paper Loaded
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        {examDetails.subjectCode} - {examDetails.subjectName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge 
                      variant="outline" 
                      className={`${
                        examDetails.status === 'pass' 
                          ? 'bg-success/10 text-success border-success/30' 
                          : 'bg-destructive/10 text-destructive border-destructive/30'
                      }`}
                    >
                      {examDetails.marksObtained}/{examDetails.totalMarks} Marks
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      Grade: {examDetails.grade}
                    </Badge>
                    <Link to="/admin">
                      <Button variant="outline" size="sm" className="gap-2 h-8">
                        <Settings className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Admin</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Tabs Layout */}
            {isMobile ? (
              <div className="p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4 h-12 bg-muted/50">
                    <TabsTrigger value="paper" className="gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <FileText className="h-4 w-4" />
                      Answer Paper
                    </TabsTrigger>
                    <TabsTrigger value="details" className="gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <BarChart3 className="h-4 w-4" />
                      Marks Details
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="paper" className="mt-0">
                    <div className="h-[calc(100vh-420px)] min-h-[400px]">
                      <ScrollablePDFViewer 
                        pdfUrl={samplePdfUrl}
                        title={`${examDetails.subjectCode}_${examDetails.rollNumber}_AnswerPaper.pdf`}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-0">
                    <div className="h-[calc(100vh-420px)] min-h-[400px]">
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
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-[calc(100vh-380px)] min-h-[500px]">
                  {/* PDF Viewer - Takes more space */}
                  <div className="lg:col-span-2 xl:col-span-3 h-full">
                    <ScrollablePDFViewer 
                      pdfUrl={samplePdfUrl}
                      title={`${examDetails.subjectCode}_${examDetails.rollNumber}_AnswerPaper.pdf`}
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
          </>
        ) : null}
      </main>
      
      {/* Footer */}
      <footer className="py-3 md:py-4 text-center text-xs md:text-sm text-muted-foreground border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2024 National Institute of Technology. All rights reserved.</p>
          <p className="text-xs mt-1 text-muted-foreground/70">
            Examination Portal v2.0 | For technical support, contact: support@nit.edu
          </p>
        </div>
      </footer>

      {/* Query Dialog */}
      {examDetails && (
        <QueryDialog
          open={queryDialogOpen}
          onOpenChange={setQueryDialogOpen}
          studentName={examDetails.studentName}
          rollNumber={examDetails.rollNumber}
          subjectName={examDetails.subjectName}
          subjectCode={examDetails.subjectCode}
          questions={examDetails.questionWiseMarks.map(q => ({
            questionNo: q.questionNo,
            section: q.section || 'General'
          }))}
        />
      )}
    </div>
  );
};

export default Index;
