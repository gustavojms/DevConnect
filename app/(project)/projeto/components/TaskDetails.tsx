import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { updateTask } from '@/app/services/ApiService';

type TaskDetailsProps = {
  users: any;
  taskId: number;
  reporter: number;
};

export default function TaskDetails(props: TaskDetailsProps) {
  const form = useForm();

  async function onSubmit(data: any) {
    const response = await updateTask(props.taskId, data);
    console.log(response);
  }

  return (
    <details className="w-full" open>
      <summary className="text-gray-ba font-bold p-2 rounded-t border border-gray-500">
        Detalhes
      </summary>
      <div className="p-4 rounded-b border-x border-b border-gray-500">
        <Form {...form}>
          <form>
            <div className="mb-2">
              <label className="text-gray-250 text-opacity-70 block mb-2">
                Titulo da tarefa
              </label>
              <select className="w-56 p-2 border rounded-md">
                <option value="" disabled selected hidden>
                  Responsável
                </option>
                {props.users?.flatMap((user: any) =>
                  user.members.map((member: any) => (
                    <option
                      key={member.userId}
                      value={member.userId}
                      onClick={() =>
                        onSubmit({
                          responsibleId: member.userId,
                        })
                      }
                    >
                      {member.username}
                    </option>
                  )),
                )}
              </select>
            </div>
          </form>
        </Form>
      </div>
    </details>
  );
}
