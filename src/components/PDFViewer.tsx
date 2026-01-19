import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker
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

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title || 'answer-paper.pdf';
    link.click();
  };

  return (
    <div className={`flex flex-col bg-card rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50' : 'h-full'}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            Page {pageNumber} of {numPages || '...'}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="text-primary-foreground hover:bg-primary/80 disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="text-primary-foreground hover:bg-primary/80 disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          
          <div className="w-px h-6 bg-primary-foreground/30 mx-2" />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="text-primary-foreground hover:bg-primary/80 disabled:opacity-40"
          >
            <ZoomOut className="h-5 w-5" />
          </Button>
          <span className="text-sm min-w-[60px] text-center">{Math.round(scale * 100)}%</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomIn}
            disabled={scale >= 3}
            className="text-primary-foreground hover:bg-primary/80 disabled:opacity-40"
          >
            <ZoomIn className="h-5 w-5" />
          </Button>
          
          <div className="w-px h-6 bg-primary-foreground/30 mx-2" />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-primary-foreground hover:bg-primary/80"
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownload}
            className="text-primary-foreground hover:bg-primary/80"
          >
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-muted/50 flex items-start justify-center p-6">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <p className="text-lg font-medium">Failed to load PDF</p>
              <p className="text-sm">Please try again later</p>
            </div>
          }
          className="drop-shadow-xl"
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            className="bg-card"
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>
      
      {/* Bottom pagination */}
      <div className="flex items-center justify-center gap-2 py-3 bg-card border-t border-border">
        {numPages > 0 && (
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(numPages, 10) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setPageNumber(page)}
                className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                  page === pageNumber
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                }`}
              >
                {page}
              </button>
            ))}
            {numPages > 10 && (
              <>
                <span className="px-2 text-muted-foreground">...</span>
                <button
                  onClick={() => setPageNumber(numPages)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                    numPages === pageNumber
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                >
                  {numPages}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
