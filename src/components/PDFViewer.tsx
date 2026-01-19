import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Maximize2, 
  Minimize2,
  RotateCw,
  FileText,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  pdfUrl: string;
  title?: string;
}

const PDFViewer = ({ pdfUrl, title }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setIsLoading(false);
  }

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const rotate = () => setRotation((prev) => (prev + 90) % 360);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title || 'answer-paper.pdf';
    link.click();
  };

  const ToolbarButton = ({ onClick, disabled, icon: Icon, tooltip, className = '' }: {
    onClick: () => void;
    disabled?: boolean;
    icon: React.ElementType;
    tooltip: string;
    className?: string;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            disabled={disabled}
            className={`text-primary-foreground hover:bg-primary-foreground/15 disabled:opacity-40 h-8 w-8 md:h-9 md:w-9 transition-all ${className}`}
          >
            <Icon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className={`flex flex-col bg-card rounded-xl md:rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border border-border/50 ${isFullscreen ? 'fixed inset-2 md:inset-4 z-50' : 'h-full'}`}>
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-3 py-2 md:px-4 md:py-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground gap-2 md:gap-0">
        {/* Title & Page Info */}
        <div className="flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-2">
            <div className="hidden md:flex w-8 h-8 rounded-lg bg-primary-foreground/15 items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium truncate max-w-[150px] md:max-w-none">
                {title || 'Answer Paper'}
              </p>
              <p className="text-[10px] md:text-xs text-primary-foreground/70">
                Page {pageNumber} of {numPages || '...'}
              </p>
            </div>
          </div>
          
          {/* Mobile Page Navigation */}
          <div className="flex md:hidden items-center gap-1">
            <ToolbarButton onClick={goToPrevPage} disabled={pageNumber <= 1} icon={ChevronLeft} tooltip="Previous" />
            <ToolbarButton onClick={goToNextPage} disabled={pageNumber >= numPages} icon={ChevronRight} tooltip="Next" />
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between md:justify-end gap-1 md:gap-2">
          {/* Desktop Page Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <ToolbarButton onClick={goToPrevPage} disabled={pageNumber <= 1} icon={ChevronLeft} tooltip="Previous Page" />
            <ToolbarButton onClick={goToNextPage} disabled={pageNumber >= numPages} icon={ChevronRight} tooltip="Next Page" />
          </div>
          
          <div className="hidden md:block w-px h-6 bg-primary-foreground/30 mx-1" />
          
          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <ToolbarButton onClick={zoomOut} disabled={scale <= 0.5} icon={ZoomOut} tooltip="Zoom Out" />
            <span className="text-xs min-w-[45px] text-center font-medium hidden sm:inline">{Math.round(scale * 100)}%</span>
            <ToolbarButton onClick={zoomIn} disabled={scale >= 3} icon={ZoomIn} tooltip="Zoom In" />
          </div>
          
          <div className="w-px h-6 bg-primary-foreground/30 mx-1" />
          
          {/* Additional Controls */}
          <div className="flex items-center gap-1">
            <ToolbarButton onClick={rotate} icon={RotateCw} tooltip="Rotate" />
            <ToolbarButton onClick={toggleFullscreen} icon={isFullscreen ? Minimize2 : Maximize2} tooltip={isFullscreen ? "Exit Fullscreen" : "Fullscreen"} />
            <ToolbarButton onClick={handleDownload} icon={Download} tooltip="Download PDF" />
          </div>
        </div>
      </div>
      
      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-gradient-to-b from-muted/30 to-muted/60 flex items-start justify-center p-2 sm:p-4 md:p-6">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadStart={() => setIsLoading(true)}
          loading={
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20"></div>
                <Loader2 className="w-16 h-16 absolute top-0 left-0 animate-spin text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Loading document...</p>
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-3">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <FileText className="w-8 h-8 text-destructive" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-foreground">Failed to load PDF</p>
                <p className="text-sm">Please check your connection and try again</p>
              </div>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          }
          className="drop-shadow-2xl"
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            rotate={rotation}
            className="bg-card rounded-lg overflow-hidden shadow-lg"
            renderTextLayer={true}
            renderAnnotationLayer={true}
            width={typeof window !== 'undefined' && window.innerWidth < 640 ? window.innerWidth - 40 : undefined}
          />
        </Document>
      </div>
      
      {/* Bottom Pagination - Desktop */}
      <div className="hidden md:flex items-center justify-center gap-2 py-3 bg-card border-t border-border">
        {numPages > 0 && (
          <div className="flex items-center gap-1.5">
            {Array.from({ length: Math.min(numPages, 10) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setPageNumber(page)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                  page === pageNumber
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {page}
              </button>
            ))}
            {numPages > 10 && (
              <>
                <span className="px-2 text-muted-foreground">•••</span>
                <button
                  onClick={() => setPageNumber(numPages)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                    numPages === pageNumber
                      ? 'bg-primary text-primary-foreground shadow-md scale-105'
                      : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {numPages}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom Pagination - Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 bg-card border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {pageNumber} / {numPages}
          </span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          className="gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PDFViewer;
