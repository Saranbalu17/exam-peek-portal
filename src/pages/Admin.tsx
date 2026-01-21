import { useState } from 'react';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Search, 
  Filter, 
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
  BarChart3,
  GraduationCap,
  ArrowLeft,
  Bell,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import ScrollablePDFViewer from '@/components/ScrollablePDFViewer';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

// Sample data
const students = [
  {
    id: 1,
    name: 'Rahul Kumar',
    rollNumber: 'CS2021045',
    subject: 'Database Management Systems',
    subjectCode: 'CS601',
    marksObtained: 78,
    totalMarks: 100,
    grade: 'A',
    status: 'pass',
    examType: 'End Semester',
    hasQuery: true,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    rollNumber: 'CS2021032',
    subject: 'Database Management Systems',
    subjectCode: 'CS601',
    marksObtained: 85,
    totalMarks: 100,
    grade: 'A+',
    status: 'pass',
    examType: 'End Semester',
    hasQuery: false,
  },
  {
    id: 3,
    name: 'Amit Singh',
    rollNumber: 'CS2021018',
    subject: 'Database Management Systems',
    subjectCode: 'CS601',
    marksObtained: 32,
    totalMarks: 100,
    grade: 'F',
    status: 'fail',
    examType: 'End Semester',
    hasQuery: true,
  },
  {
    id: 4,
    name: 'Sneha Patel',
    rollNumber: 'CS2021055',
    subject: 'Computer Networks',
    subjectCode: 'CS602',
    marksObtained: 72,
    totalMarks: 100,
    grade: 'B+',
    status: 'pass',
    examType: 'Mid Semester',
    hasQuery: false,
  },
];

const queries = [
  {
    id: 1,
    studentName: 'Rahul Kumar',
    rollNumber: 'CS2021045',
    subject: 'Database Management Systems',
    subjectCode: 'CS601',
    queryType: 'Marks Discrepancy',
    questionNo: 'Q5',
    pageNumber: '3',
    description: 'I believe my answer for Question 5 about normalization was correct. The solution I provided matches with the textbook definition and examples.',
    status: 'pending',
    submittedAt: '2024-03-25 10:30 AM',
  },
  {
    id: 2,
    studentName: 'Amit Singh',
    rollNumber: 'CS2021018',
    subject: 'Database Management Systems',
    subjectCode: 'CS601',
    queryType: 'Answer Not Evaluated',
    questionNo: 'Q7',
    pageNumber: '5',
    description: 'The last part of Question 7 regarding SQL joins seems to have been missed during evaluation. Please review page 5.',
    status: 'in_review',
    submittedAt: '2024-03-24 02:15 PM',
  },
  {
    id: 3,
    studentName: 'Neha Verma',
    rollNumber: 'CS2021029',
    subject: 'Computer Networks',
    subjectCode: 'CS602',
    queryType: 'Totaling Error',
    questionNo: 'All',
    pageNumber: '-',
    description: 'There seems to be an error in the total marks calculation. Individual question marks sum up to 75 but total shows 70.',
    status: 'resolved',
    submittedAt: '2024-03-23 11:00 AM',
    resolvedAt: '2024-03-24 09:00 AM',
    resolution: 'Total marks corrected from 70 to 75. Updated result has been published.',
  },
];

const questionWiseMarks = [
  { questionNo: 1, section: 'Section A', maxMarks: 10, obtainedMarks: 9 },
  { questionNo: 2, section: 'Section A', maxMarks: 10, obtainedMarks: 8 },
  { questionNo: 3, section: 'Section A', maxMarks: 10, obtainedMarks: 7 },
  { questionNo: 4, section: 'Section B', maxMarks: 15, obtainedMarks: 13 },
  { questionNo: 5, section: 'Section B', maxMarks: 15, obtainedMarks: 12 },
  { questionNo: 6, section: 'Section C', maxMarks: 20, obtainedMarks: 15 },
  { questionNo: 7, section: 'Section C', maxMarks: 20, obtainedMarks: 14 },
];

const samplePdfUrl = 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [selectedQuery, setSelectedQuery] = useState<typeof queries[0] | null>(null);
  const [viewPaperDialogOpen, setViewPaperDialogOpen] = useState(false);
  const [queryDialogOpen, setQueryDialogOpen] = useState(false);
  const [responseText, setResponseText] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="gap-1 text-warning border-warning"><Clock className="w-3 h-3" />Pending</Badge>;
      case 'in_review':
        return <Badge variant="outline" className="gap-1 text-primary border-primary"><Eye className="w-3 h-3" />In Review</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="gap-1 text-success border-success"><CheckCircle2 className="w-3 h-3" />Resolved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="gap-1 text-destructive border-destructive"><XCircle className="w-3 h-3" />Rejected</Badge>;
      default:
        return null;
    }
  };

  const handleViewPaper = (student: typeof students[0]) => {
    setSelectedStudent(student);
    setViewPaperDialogOpen(true);
  };

  const handleViewQuery = (query: typeof queries[0]) => {
    setSelectedQuery(query);
    setQueryDialogOpen(true);
  };

  const handleResolveQuery = (action: 'resolve' | 'reject') => {
    if (!responseText.trim()) {
      toast.error('Please provide a response');
      return;
    }
    
    toast.success(`Query ${action === 'resolve' ? 'resolved' : 'rejected'} successfully`);
    setQueryDialogOpen(false);
    setResponseText('');
    setSelectedQuery(null);
  };

  const filteredQueries = queries.filter(q => {
    const matchesSearch = q.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalStudents: students.length,
    totalQueries: queries.length,
    pendingQueries: queries.filter(q => q.status === 'pending').length,
    resolvedQueries: queries.filter(q => q.status === 'resolved').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/15 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-base font-bold">Admin Dashboard</h1>
                  <p className="text-xs text-primary-foreground/70">Examination Portal</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10 relative"
              >
                <Bell className="h-5 w-5" />
                {stats.pendingQueries > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    {stats.pendingQueries}
                  </span>
                )}
              </Button>
              
              <div className="flex items-center gap-3 pl-3 border-l border-primary-foreground/20">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-accent text-accent-foreground text-xs">AD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:inline">Admin</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalStudents}</p>
                <p className="text-xs text-muted-foreground">Total Students</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalQueries}</p>
                <p className="text-xs text-muted-foreground">Total Queries</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.pendingQueries}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.resolvedQueries}</p>
                <p className="text-xs text-muted-foreground">Resolved</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-border px-4 pt-4">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="students" className="gap-2">
                  <Users className="w-4 h-4" />
                  Students
                </TabsTrigger>
                <TabsTrigger value="queries" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Queries
                  {stats.pendingQueries > 0 && (
                    <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-[10px]">
                      {stats.pendingQueries}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Students Tab */}
            <TabsContent value="students" className="p-4 pt-0 mt-0">
              <div className="flex flex-col sm:flex-row gap-3 py-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name or roll number..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="pass">Passed</SelectItem>
                    <SelectItem value="fail">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Student</TableHead>
                      <TableHead className="hidden md:table-cell">Subject</TableHead>
                      <TableHead className="text-center">Marks</TableHead>
                      <TableHead className="text-center hidden sm:table-cell">Grade</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.filter(s => 
                      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{student.name}</p>
                              <p className="text-xs text-muted-foreground">{student.rollNumber}</p>
                            </div>
                            {student.hasQuery && (
                              <Badge variant="outline" className="text-warning border-warning text-xs hidden lg:flex">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                Query
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div>
                            <p className="font-medium text-foreground">{student.subjectCode}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">{student.subject}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="font-semibold text-foreground">{student.marksObtained}</span>
                          <span className="text-muted-foreground">/{student.totalMarks}</span>
                        </TableCell>
                        <TableCell className="text-center hidden sm:table-cell">
                          <Badge className={`${
                            student.grade.startsWith('A') ? 'bg-success/10 text-success border-success/30' :
                            student.grade.startsWith('B') ? 'bg-accent/10 text-accent border-accent/30' :
                            student.grade === 'F' ? 'bg-destructive/10 text-destructive border-destructive/30' :
                            'bg-warning/10 text-warning border-warning/30'
                          } border`}>
                            {student.grade}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={student.status === 'pass' ? 'default' : 'destructive'} className={
                            student.status === 'pass' 
                              ? 'bg-success/10 text-success border-success/30 border' 
                              : 'bg-destructive/10 text-destructive border-destructive/30 border'
                          }>
                            {student.status === 'pass' ? 'Pass' : 'Fail'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewPaper(student)}
                            className="gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Queries Tab */}
            <TabsContent value="queries" className="p-4 pt-0 mt-0">
              <div className="flex flex-col sm:flex-row gap-3 py-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search queries..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_review">In Review</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {filteredQueries.map((query) => (
                  <Card key={query.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          query.status === 'pending' ? 'bg-warning/10' :
                          query.status === 'in_review' ? 'bg-primary/10' :
                          query.status === 'resolved' ? 'bg-success/10' :
                          'bg-destructive/10'
                        }`}>
                          <MessageSquare className={`w-5 h-5 ${
                            query.status === 'pending' ? 'text-warning' :
                            query.status === 'in_review' ? 'text-primary' :
                            query.status === 'resolved' ? 'text-success' :
                            'text-destructive'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <p className="font-semibold text-foreground">{query.studentName}</p>
                            <span className="text-xs text-muted-foreground">({query.rollNumber})</span>
                            {getStatusBadge(query.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {query.subjectCode} - {query.subject}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">{query.queryType}</Badge>
                            <Badge variant="outline" className="text-xs">Question: {query.questionNo}</Badge>
                            {query.pageNumber !== '-' && (
                              <Badge variant="outline" className="text-xs">Page: {query.pageNumber}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-foreground line-clamp-2">{query.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">Submitted: {query.submittedAt}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewQuery(query)}
                        className="gap-1 flex-shrink-0"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
                
                {filteredQueries.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-lg font-medium text-foreground">No queries found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>

      {/* View Paper Dialog */}
      <Dialog open={viewPaperDialogOpen} onOpenChange={setViewPaperDialogOpen}>
        <DialogContent className="max-w-6xl h-[90vh] p-0 overflow-hidden">
          <div className="flex flex-col h-full">
            <DialogHeader className="px-6 py-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedStudent?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-lg">{selectedStudent?.name}</DialogTitle>
                  <DialogDescription>
                    {selectedStudent?.rollNumber} • {selectedStudent?.subjectCode} - {selectedStudent?.subject}
                  </DialogDescription>
                </div>
                <Badge className={`ml-auto ${
                  selectedStudent?.status === 'pass' 
                    ? 'bg-success/10 text-success border-success/30' 
                    : 'bg-destructive/10 text-destructive border-destructive/30'
                } border`}>
                  {selectedStudent?.marksObtained}/{selectedStudent?.totalMarks} • Grade: {selectedStudent?.grade}
                </Badge>
              </div>
            </DialogHeader>
            
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-hidden">
              {/* PDF Viewer */}
              <div className="lg:col-span-2 h-full overflow-hidden border-r border-border">
                <ScrollablePDFViewer 
                  pdfUrl={samplePdfUrl}
                  title={`${selectedStudent?.subjectCode}_${selectedStudent?.name}_AnswerPaper.pdf`}
                />
              </div>
              
              {/* Marks Details */}
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  <h4 className="font-semibold text-foreground">Question-wise Marks</h4>
                  
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="text-xs">Q.No</TableHead>
                          <TableHead className="text-xs text-center">Max</TableHead>
                          <TableHead className="text-xs text-center">Scored</TableHead>
                          <TableHead className="text-xs text-right">%</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {questionWiseMarks.map((q) => {
                          const pct = Math.round((q.obtainedMarks / q.maxMarks) * 100);
                          return (
                            <TableRow key={q.questionNo}>
                              <TableCell className="font-medium py-2">Q{q.questionNo}</TableCell>
                              <TableCell className="text-center text-muted-foreground py-2">{q.maxMarks}</TableCell>
                              <TableCell className={`text-center py-2 font-medium ${
                                pct >= 80 ? 'text-success' : pct >= 50 ? 'text-foreground' : 'text-destructive'
                              }`}>
                                {q.obtainedMarks}
                              </TableCell>
                              <TableCell className={`text-right py-2 text-xs ${
                                pct >= 80 ? 'text-success' : pct >= 50 ? 'text-muted-foreground' : 'text-destructive'
                              }`}>
                                {pct}%
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Total Score</span>
                      <span className="text-2xl font-bold text-foreground">
                        {selectedStudent?.marksObtained}
                        <span className="text-base font-normal text-muted-foreground">/{selectedStudent?.totalMarks}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Query Detail Dialog */}
      <Dialog open={queryDialogOpen} onOpenChange={setQueryDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedQuery?.status === 'pending' ? 'bg-warning/10' :
                selectedQuery?.status === 'in_review' ? 'bg-primary/10' :
                selectedQuery?.status === 'resolved' ? 'bg-success/10' :
                'bg-destructive/10'
              }`}>
                <MessageSquare className={`w-5 h-5 ${
                  selectedQuery?.status === 'pending' ? 'text-warning' :
                  selectedQuery?.status === 'in_review' ? 'text-primary' :
                  selectedQuery?.status === 'resolved' ? 'text-success' :
                  'text-destructive'
                }`} />
              </div>
              <div>
                <DialogTitle>Query Details</DialogTitle>
                <DialogDescription>Review and respond to student query</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {selectedQuery && (
            <div className="space-y-4 py-4">
              {/* Student Info */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Student</p>
                    <p className="font-medium text-foreground">{selectedQuery.studentName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Roll Number</p>
                    <p className="font-medium text-foreground">{selectedQuery.rollNumber}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Subject</p>
                    <p className="font-medium text-foreground">{selectedQuery.subjectCode} - {selectedQuery.subject}</p>
                  </div>
                </div>
              </div>

              {/* Query Details */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(selectedQuery.status)}
                  <Badge variant="secondary">{selectedQuery.queryType}</Badge>
                  <Badge variant="outline">Question: {selectedQuery.questionNo}</Badge>
                  {selectedQuery.pageNumber !== '-' && (
                    <Badge variant="outline">Page: {selectedQuery.pageNumber}</Badge>
                  )}
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
                  <p className="text-sm text-foreground bg-muted/30 p-3 rounded-lg">{selectedQuery.description}</p>
                </div>
                
                <p className="text-xs text-muted-foreground">Submitted: {selectedQuery.submittedAt}</p>
              </div>

              {selectedQuery.status !== 'resolved' && selectedQuery.status !== 'rejected' && (
                <>
                  <Separator />
                  
                  {/* Response Section */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">Admin Response</p>
                    <Textarea
                      placeholder="Enter your response to the student's query..."
                      rows={4}
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                    />
                    
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => handleResolveQuery('reject')}
                        className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                      <Button
                        onClick={() => handleResolveQuery('resolve')}
                        className="gap-2 bg-success hover:bg-success/90"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Resolve
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {selectedQuery.status === 'resolved' && selectedQuery.resolution && (
                <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <p className="font-medium text-success">Resolution</p>
                  </div>
                  <p className="text-sm text-foreground">{selectedQuery.resolution}</p>
                  <p className="text-xs text-muted-foreground mt-2">Resolved on: {selectedQuery.resolvedAt}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
