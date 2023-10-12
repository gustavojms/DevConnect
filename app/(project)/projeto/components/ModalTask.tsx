import { fetchTask } from '@/app/services/ApiService';
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
import { HTMLAttributes, useEffect, useState } from 'react';
import TaskDetails from './TaskDetails';

type ModalTaskProps = {
  taskId: number;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  onClose: () => void;
};

export default function ModalTask(props: ModalTaskProps) {
  const [task, setTask] = useState<TaskType>({} as TaskType);

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
    setTask(response.data);
  }

  useEffect(() => {
    getTask();
  }, []);

  return (
    <Dialog open={props.showModal} onOpenChange={handleChange}>
      <DialogContent className="bg-midnight-blue text-white border-none">
        <DialogHeader>
          <DialogTitle className="mb-4">
            Editar Tarefa {props.taskId}
          </DialogTitle>
          <DialogDescription>
            <Input
              type="text"
              id="title"
              name="title"
              onChange={(e) => handleValueChange(e)}
              value={task.title}
              className="mb-2 bg-transparent hover:bg-pale-blue-card border-none text-gray-ba"
            />
            <Textarea
              id="description"
              name="description"
              value={task.description}
              onChange={(e) => handleValueChange(e)}
              placeholder="Adicione uma descrição..."
              className="resize-none bg-transparent hover:bg-pale-blue-card border-none text-gray-ba"
            />
            <TaskDetails />
          </DialogDescription>
          <DialogFooter>
            <Button>Salvar</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
