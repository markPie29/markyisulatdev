"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Download, FileText, X } from "lucide-react";
import { PROFILE } from "@/data/profile";

interface ResumeModalContextValue {
  isOpen: boolean;
  openResume: () => void;
  closeResume: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextValue | null>(null);

/**
 * Provides global trigger state and Swiss modal viewer for Marky's PDF resume.
 */
export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openResume = useCallback(() => setIsOpen(true), []);
  const closeResume = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openResume, closeResume }),
    [isOpen, openResume, closeResume],
  );

  const pdfViewerSrc = `${PROFILE.resume.pdfPath}#view=FitH`;

  return (
    <ResumeModalContext.Provider value={value}>
      {children}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80" />
          <Dialog.Content className="fixed inset-3 z-50 flex flex-col border border-line bg-bg text-fg focus:outline-none md:inset-8 lg:inset-12">
            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <FileText size={16} className="shrink-0 text-fg-muted" aria-hidden="true" />
                <div>
                  <Dialog.Title className="text-sm font-medium tracking-tight text-fg">
                    {PROFILE.resume.title}
                  </Dialog.Title>
                  <Dialog.Description className="text-mono-label text-fg-subtle">
                    UPDATED {PROFILE.resume.updatedYear} · PDF DOCUMENT
                  </Dialog.Description>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={PROFILE.resume.pdfPath}
                  download="Mark_Isulat_Developer_Resume.pdf"
                  className="inline-flex items-center gap-1.5 bg-invert-bg px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-invert-fg transition-opacity hover:opacity-90"
                >
                  <Download size={13} aria-hidden="true" />
                  <span>Download PDF ↓</span>
                </a>
                <a
                  href={PROFILE.resume.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-line bg-bg px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-fg"
                >
                  <span>Open in New Tab</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close resume viewer"
                    className="inline-flex cursor-pointer items-center justify-center border border-line bg-bg p-1.5 text-fg-muted transition-colors hover:border-fg hover:text-fg"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                </Dialog.Close>
              </div>
            </div>

            {/* Embedded PDF Preview */}
            <div className="relative flex-1 bg-surface">
              <iframe
                src={pdfViewerSrc}
                title={PROFILE.resume.title}
                className="h-full w-full border-0"
              />
            </div>

            {/* Fallback footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-bg px-4 py-2.5 text-xs text-fg-muted md:px-6">
              <span>
                If the inline PDF preview does not load in your browser, use Download PDF or Open in New Tab above.
              </span>
              <span className="text-mono-label text-fg-subtle">ESC TO CLOSE</span>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ResumeModalContext.Provider>
  );
}

/**
 * Hook for opening or closing the global Resume PDF modal from any client component.
 */
export function useResumeModal(): ResumeModalContextValue {
  const ctx = useContext(ResumeModalContext);
  if (!ctx) {
    throw new Error("useResumeModal must be used inside ResumeModalProvider.");
  }
  return ctx;
}
