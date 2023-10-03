import { fetchTasks } from '@/app/services/ApiService';
import { TaskType } from '@/app/types/TaskType';
import { useEffect, useState } from 'react';
import TaskList from './TaskList';

type KanbanBoardProps = {
  projectId: number;
};

export default function KanbanBoard(props: KanbanBoardProps) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  useEffect(() => {
    async function getTasks() {
      const response = await fetchTasks(props.projectId);
      setTasks(response.data);
    }
    getTasks();
  }, [props.projectId, tasks]);

  const columns = ['to-do', 'doing', 'done'];

  return (
    <div className="flex justify-evenly">
      {columns.map((column, index) => (
        <div key={index}>
          <TaskList tasks={tasks} column={column} projectId={props.projectId} />
        </div>
      ))}
    </div>
  );
}
