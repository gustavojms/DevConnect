import { fetchTasks, updateTaskStatus } from '@/app/services/ApiService';
import { TaskType } from '@/app/types/TaskType';
import { useEffect, useState } from 'react';
import TaskList from './TaskList';
import Modal from 'react-modal';

type KanbanBoardProps = {
  projectId: number;
};

export default function KanbanBoard(props: KanbanBoardProps) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [columns, setColumns] = useState<string[]>(['to-do', 'doing', 'done']);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editedColumn, setEditedColumn] = useState('');
  const [newColumnName, setNewColumnName] = useState('');

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const column = columns.find(
      (col) => e.currentTarget.innerHTML.indexOf(col) > -1,
    );
    const task = tasks.find((t) => t.taskId === parseInt(taskId));

    if (task && column) {
      task.status = column;
      await updateTaskStatus(task.taskId, task.status);
      setTasks([...tasks]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  async function getTasks() {
    const response = await fetchTasks(props.projectId);
    setTasks(response);
  }

  const openEditModal = (column: string) => {
    setEditedColumn(column);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setNewColumnName('');
  };

  const editColumn = () => {
    const updatedColumns = columns.map((col) =>
      col === editedColumn ? newColumnName : col,
    );
    setColumns(updatedColumns);
    // Update task statuses with the new column name
    tasks.forEach(async (task) => {
      if (task.status === editedColumn) {
        task.status = newColumnName;
        await updateTaskStatus(task.taskId, newColumnName);
      }
    });
    setTasks([...tasks]);
    closeEditModal();
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewColumnName('');
  };

  const addColumn = () => {
    if (newColumnName && !columns.includes(newColumnName)) {
      setColumns([...columns, newColumnName]);
      closeAddModal();
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex gap-10 relative z-10">
      {columns.map((column, index) => (
        <div
          key={index}
          className="border-r border-gray-700 p-2 flex flex-col"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div
            className="place-self-end cursor-pointer text-gray-400 hover:text-white transition duration-300 "
            onClick={() => openEditModal(column)}
          >
            Edit
          </div>
          <TaskList
            tasks={tasks.filter((task) => task.status === column)}
            column={column}
            projectId={props.projectId}
            onTaskCreated={getTasks}
          />
        </div>
      ))}
      <div
        className="border-r border-gray-700 p-2 cursor-pointer flex flex-col items-center"
        onClick={openAddModal}
      >
        <span className="text-gray-400">+ Add Column</span>
      </div>

      {/* Edit Column Modal */}
      <Modal
        isOpen={showEditModal}
        onRequestClose={closeEditModal}
        contentLabel="Edit Column"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md w-80 mx-auto">
          <h2 className="text-lg font-semibold mb-4">Edite a Coluna</h2>
          <form>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Noma da Coluna:
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500 text-black"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo"
                onClick={editColumn}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
                onClick={closeEditModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Add Column Modal */}
      <Modal
        isOpen={showAddModal}
        onRequestClose={closeAddModal}
        contentLabel="Add Column"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md w-80 mx-auto">
          <h2 className="text-lg font-semibold mb-4">
            Adicione uma nova coluna
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Nome da Coluna:
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500 text-black"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo"
                onClick={addColumn}
              >
                Add
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray ml-2"
                onClick={closeAddModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
