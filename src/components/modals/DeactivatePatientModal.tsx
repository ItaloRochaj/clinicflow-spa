import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Patient {
  id: string;
  name: string;
  patientId: string;
  avatar?: string;
}

interface DeactivatePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onConfirm: (patientId: string, reason: string) => void;
}

export const DeactivatePatientModal: React.FC<DeactivatePatientModalProps> = ({
  isOpen,
  onClose,
  patient,
  onConfirm
}) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (patient && reason.trim()) {
      onConfirm(patient.id, reason);
      setReason('');
      onClose();
    }
  };

  const handleCancel = () => {
    setReason('');
    onClose();
  };

  if (!patient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-semibold">
              Deactivate Patient Profile
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to deactivate this patient's profile? 
            This action will prevent them from scheduling new appointments. 
            This action cannot be undone.
          </p>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={patient.avatar} />
                <AvatarFallback>
                  {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{patient.name}</p>
                <p className="text-sm text-muted-foreground">
                  Patient ID: {patient.patientId}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Deactivation</Label>
            <Textarea
              id="reason"
              placeholder="e.g., Patient moved, No longer requires care..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="mr-3"
            >
              Cancel Deactivation
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirm}
              disabled={!reason.trim()}
            >
              Deactivate Patient
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};