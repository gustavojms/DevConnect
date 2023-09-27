import ModalSprint from '@/app/components/ModalSprint';
import React, { useState } from 'react';

export default function Sprint() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button>
        <span
          className="flex py-1 bg-inherit text-pale-blue font-semibold cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          Nova Sprint
        </span>
      </button>
      <ModalSprint isvisible={showModal} onClose={handleCloseModal} />
    </div>
  );
}
