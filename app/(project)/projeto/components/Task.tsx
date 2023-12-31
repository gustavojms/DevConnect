import { useState } from 'react';
import ModalTask from './ModalTask';

type TaskProps = {
  taskId: number;
  title: string;
  description: string;
  priority: string;
  projectId: number;
  responsible: {
    userId: number;
    username: string;
  };
  author: {
    username: string;
  };
};

export default function Task(props: TaskProps) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('taskId', props.taskId.toString());
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div
      id="task"
      className="flex flex-col bg-pale-blue bg-opacity-[15%] w-56 h-40 rounded-lg p-3 cursor-pointer"
      draggable
      onDragStart={handleDragStart}
      onClick={handleOpenModal}
    >
      <div className="bg-red-500 bg-opacity-10 w-max px-4 rounded mt-2">
        <span className="text-red-500 font-bold uppercase">
          {props.priority}
        </span>
      </div>
      <h1 className="text-white font-bold first-letter:capitalize">
        {props.title}
      </h1>
      <p className="text-gray-ba text-sm first-letter:capitalize">
        {props.description}
      </p>
      {showModal && (
        <ModalTask
          projectId={props.projectId}
          taskId={props.taskId}
          responsible={props.responsible}
          author={props.author}
          showModal={handleOpenModal}
          onClose={handleCloseModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
