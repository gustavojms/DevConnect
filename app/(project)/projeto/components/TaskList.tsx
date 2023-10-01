import { MdAddCircle } from 'react-icons/md';
import Task from './Task';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { fetchTasks, submitTask } from '@/app/services/ApiService';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
  FormItem,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { getSession } from 'next-auth/react';
import { SessionInterface } from '@/app/types/SessionType';
import { TaskType } from '@/app/types/TaskType';

type TaskListProps = {
  projectId: number;
};

export default function TaskList(props: TaskListProps) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState<boolean>(false);
  const form = useForm();
  const handleNewTask = () => {
    setNewTask(!newTask);
  };

  async function getTasks() {
    const response = await fetchTasks(props.projectId);
    setTasks(response.data);
  }

  useEffect(() => {
    getTasks();
  }, []);

  async function onSubmit(data: any) {
    const session = (await getSession()) as SessionInterface;
    const response = await submitTask(props.projectId, {
      title: data.title,
      userId: session.payload.sub,
      projectId: +props.projectId,
    }).then(() => {
      form.reset();
      handleNewTask();
    });
    getTasks();
    return response;
  }

  return (
    <div className="flex flex-col items-start p-4 rounded-lg mr-4 gap-5">
      <div className="flex justify-center items-center">
        <h2 className="text-lg text-white font-bold">To Do</h2>
        <Button
          onClick={handleNewTask}
          className="bg-transparent text-pale-blue text-opacity-40"
        >
          <MdAddCircle className="h-6 w-6" />
        </Button>
      </div>
      {newTask && (
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-center items-center"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="text-gray-250 text-opacity-70">
                      Titulo da tarefa
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" className="w-56" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      )}

      {tasks.map((task: any) => (
        <Task
          taskId={task.taskId}
          title={task.title}
          description={task.description}
          priority={task.priority}
        />
      ))}
    </div>
  );
}
