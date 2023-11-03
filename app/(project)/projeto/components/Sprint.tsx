import ModalSprint from '@/app/components/ModalSprint';
import React, { useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

export default function Sprint() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative">
      <button>
        <span
          className="flex py-1 bg-inherit text-pale-blue font-semibold cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          Nova Sprint
          <MdAddCircleOutline className="ml-2 h-6 w-6" />
        </span>
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
          <ModalSprint isvisible={showModal} onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
}
