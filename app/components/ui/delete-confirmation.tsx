import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  resumeTitle?: string;
  title?: string;
  description?: string;
  confirmText?: string;
  isDeleting?: boolean;
}

export function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  resumeTitle,
  title = "Delete Resume",
  description = "Are you sure you want to delete this resume analysis?",
  confirmText = "Delete",
  isDeleting = false,
}: DeleteConfirmationProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {resumeTitle && (
          <div className="space-y-4">
            <div className="bg-muted p-3 rounded-md">
              <p className="font-medium text-sm">{resumeTitle}</p>
            </div>
            <p className="text-xs text-destructive">
              This action cannot be undone. All analysis data and files will be
              permanently removed.
            </p>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Processing..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
