import { fetchTask, fetchUsersOfProject } from '@/app/services/ApiService';
import { TaskType } from '@/app/types/TaskType';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { HTMLAttributes, SetStateAction, useEffect, useState } from 'react';
import TaskDetails from './TaskDetails';
import { Label } from '@/components/ui/label';

type ModalTaskProps = {
  taskId: number;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  onClose: () => void;
  projectId: number;
  responsible: {
    userId: number;
    username: string;
  };
  author: {
    username: string;
  };
};

export type User = {
  userId: number;
  username: string;
};

export default function ModalTask(props: ModalTaskProps) {
  const [task, setTask] = useState<TaskType>({} as TaskType);
  const [users, setUsers] = useState<User[] | undefined>();

  function handleValueChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleChange(): void | undefined {
    props.setShowModal(false);
    props.onClose();
  }

  async function getTask() {
    const response = await fetchTask(props.taskId);
    setTask(response);
  }

  async function fetchUsers() {
    const response = await fetchUsersOfProject(props.projectId);
    setUsers(response);
  }

  useEffect(() => {
    getTask();
    fetchUsers();
  }, []);

  return (
    <Dialog open={props.showModal} onOpenChange={handleChange} modal>
      <DialogContent className="grid grid-cols-2 gap-4 bg-midnight-blue text-white border-none p-10">
        <DialogHeader>
          <DialogTitle className="mb-4">
            Editar Tarefa {props.taskId}
          </DialogTitle>
          <Input
            type="text"
            id="title"
            name="title"
            onChange={(e) => handleValueChange(e)}
            value={task.title}
            className="text-2xl p-0 mb-2 bg-transparent hover:bg-pale-blue-card border-none text-gray-ba"
          />
          <Label className="text-gray-ba">Descrição</Label>
          <Textarea
            id="description"
            name="description"
            value={task.description}
            onChange={(e) => handleValueChange(e)}
            placeholder="Adicione uma descrição..."
            className="p-0 resize-none bg-transparent hover:bg-pale-blue-card border-none text-gray-ba"
          />
        </DialogHeader>
        <TaskDetails
          users={users}
          taskId={props.taskId}
          reporter={task.userId}
          responsible={props.responsible}
          author={props.author}
        />
        <div className="flex flex-col gap-4">
          <Label className="text-gray-ba">Data de início</Label>
          <Input
            type="date"
            value={task.startedAt?.toString().split('T')[0]}
            className="text-black"
            placeholder="Data de início"
          />
          <Label className="text-gray-ba">Data de término</Label>
          <Input
            type="date"
            value={task.endedAt?.toString().split('T')[0]}
            className="text-black"
            placeholder="Data de término"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
