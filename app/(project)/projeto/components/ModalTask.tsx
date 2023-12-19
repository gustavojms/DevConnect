import {
  fetchTask,
  fetchUsersOfProject,
  getAllTaskByUser,
  updateTask,
} from '@/app/services/ApiService';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

type ModalTaskProps = {
  taskId: number;
  showModal: any;
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

  const { toast } = useToast();
  const form = useForm({
    values: {
      title: task.title,
      priority: task.priority,
      description: task.description,
    },
  });

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

  async function onSubmit(data: any) {
    return await updateTask(props.taskId, data).then(() => {
      toast({
        className: 'bg-green-300 text-green-700 font-bold border-none',
        description: 'Tarefa atualizada com sucesso!',
      });
    });
  }

  useEffect(() => {
    getTask();
    fetchUsers();
  }, []);

  return (
    <div>
      <Dialog open={props.showModal} onOpenChange={handleChange} modal>
        <DialogContent className="grid grid-cols-2 gap-4 bg-midnight-blue text-white border-none">
          <DialogHeader className="flex flex-col justify-around">
            <DialogTitle>Editar Tarefa Nº {props.taskId}</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="h-full flex flex-col justify-around"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel className="text-gray-ba">Título</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="text-lg mb-2 bg-transparent hover:bg-pale-blue-card border-none text-gray-ba"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-ba">Prioridade</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-32 bg-pale-blue-card border-none">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-800 border-none text-white">
                          <SelectItem value="alta">Alta</SelectItem>
                          <SelectItem value="media">Média</SelectItem>
                          <SelectItem value="baixa">baixa</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel className="text-gray-ba">Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Adicione uma descrição..."
                          className="mb-2 bg-transparent hover:bg-pale-blue-card border-none text-gray-ba resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-pale-blue hover:bg-blue-violet-600"
                  >
                    Salvar
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogHeader>
          <DialogHeader>
            <TaskDetails
              users={users}
              task={task}
              taskId={props.taskId}
              reporter={task.userId}
              responsible={task.responsible}
              author={task.author}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
