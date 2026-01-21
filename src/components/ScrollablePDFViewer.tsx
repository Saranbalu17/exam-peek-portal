import { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Maximize2, 
  Minimize2,
  RotateCw,
  FileText,
  Loader2,
  Columns,
  Rows
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ScrollablePDFViewerProps {
  pdfUrl: string;
  title?: string;
}

const ScrollablePDFViewer = ({ pdfUrl, title }: ScrollablePDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'single' | 'continuous'>('continuous');
  const containerRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setIsLoading(false);
  }

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const rotate = () => setRotation((prev) => (prev + 90) % 360);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const toggleViewMode = () => setViewMode(prev => prev === 'continuous' ? 'single' : 'continuous');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title || 'answer-paper.pdf';
    link.click();
  };

  const ToolbarButton = ({ onClick, disabled, icon: Icon, tooltip, active, className = '' }: {
    onClick: () => void;
    disabled?: boolean;
    icon: React.ElementType;
    tooltip: string;
    active?: boolean;
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
            className={`text-primary-foreground hover:bg-primary-foreground/15 disabled:opacity-40 h-8 w-8 md:h-9 md:w-9 transition-all ${active ? 'bg-primary-foreground/20' : ''} ${className}`}
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
    <div 
      ref={containerRef}
      className={`flex flex-col bg-card rounded-xl md:rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border border-border/50 ${isFullscreen ? 'fixed inset-2 md:inset-4 z-50' : 'h-full'}`}
    >
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
                {numPages ? `${numPages} page${numPages > 1 ? 's' : ''}` : 'Loading...'} • Scrollable View
              </p>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between md:justify-end gap-1 md:gap-2">
          {/* View Mode Toggle */}
          <ToolbarButton 
            onClick={toggleViewMode} 
            icon={viewMode === 'continuous' ? Columns : Rows} 
            tooltip={viewMode === 'continuous' ? 'Switch to Single Page' : 'Switch to Continuous Scroll'}
            active={viewMode === 'continuous'}
          />
          
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
      
      {/* PDF Content - Scrollable */}
      <ScrollArea className="flex-1 bg-gradient-to-b from-muted/30 to-muted/60">
        <div className="flex flex-col items-center p-4 md:p-6 gap-4 md:gap-6 min-h-full">
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
            className="flex flex-col items-center gap-4 md:gap-6"
          >
            {numPages > 0 && Array.from({ length: numPages }, (_, index) => (
              <div key={`page_${index + 1}`} className="relative">
                {/* Page Number Badge */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full shadow-md">
                    Page {index + 1} of {numPages}
                  </span>
                </div>
                
                <Page
                  pageNumber={index + 1}
                  scale={scale}
                  rotate={rotation}
                  className="bg-card rounded-lg overflow-hidden shadow-lg border border-border/50"
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  width={typeof window !== 'undefined' && window.innerWidth < 640 ? window.innerWidth - 48 : undefined}
                />
                
                {index < numPages - 1 && (
                  <Separator className="mt-4 md:mt-6 w-full max-w-md mx-auto opacity-50" />
                )}
              </div>
            ))}
          </Document>
        </div>
      </ScrollArea>
      
      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-card border-t border-border text-xs text-muted-foreground">
        <span>Scroll to navigate through pages</span>
        <span className="font-medium text-foreground">{numPages} total pages</span>
      </div>
    </div>
  );
};

export default ScrollablePDFViewer;
