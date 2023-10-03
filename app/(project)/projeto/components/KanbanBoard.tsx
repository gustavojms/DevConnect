import { fetchTasks, updateTask } from '@/app/services/ApiService';
import { TaskType } from '@/app/types/TaskType';
import { useEffect, useState } from 'react';
import TaskList from './TaskList';

type KanbanBoardProps = {
  projectId: number;
};

export default function KanbanBoard(props: KanbanBoardProps) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const columns = ['to-do', 'doing', 'done'];
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const column = columns.find(
      (column) => e.currentTarget.innerHTML.indexOf(column) > -1,
    );
    const task = tasks.find((task) => task.taskId === parseInt(taskId));
    if (task && column) {
      task.status = column;
      await updateTask(task.taskId, task);
      setTasks([...tasks]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    async function getTasks() {
      const response = await fetchTasks(props.projectId);
      setTasks(response.data);
    }
    getTasks();
  }, [props.projectId, tasks]);

  return (
    <div className="flex gap-20">
      {columns.map((column, index) => (
        <div
          key={index}
          className=""
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <TaskList tasks={tasks} column={column} projectId={props.projectId} />
        </div>
      ))}
    </div>
  );
}
