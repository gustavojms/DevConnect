import React from 'react';

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
  question: string;
}

export function ConfirmDeleteDialog({
  open,
  onClose,
  onDelete,
  question,
  title,
}: ConfirmDeleteDialogProps) {
  const onConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90">
          <div className="bg-black opacity-50 absolute "></div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <div className="text-xl text-white font-bold mb-4">{title}</div>
            <div className="text-gray-200 mb-4">{question}</div>
            <div className="flex justify-end">
              <button
                className="bg-pale-blue hover:bg-blue-violet-500 px-4 py-2 text-white rounded mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
                onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
