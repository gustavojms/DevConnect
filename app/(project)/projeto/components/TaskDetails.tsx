import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { updateTask } from '@/app/services/ApiService';

type TaskDetailsProps = {
  users: any;
  taskId: number;
  reporter: number;
  responsible: {
    userId: number;
    username: string;
  } | null;
};

export default function TaskDetails(props: TaskDetailsProps) {
  const form = useForm();

  if (props.responsible?.username != '') {
    console.log(props.responsible?.username + 'oi' + props.responsible?.userId);
  }

  async function onSubmit(data: any) {
    const response = await updateTask(props.taskId, data);
    console.log(response);
  }

  return (
    <details className="w-full p-4" open>
      <summary className="text-gray-ba font-bold p-2 rounded-t border border-gray-500">
        Detalhes
      </summary>
      <div className="p-4 rounded-b border-x border-b border-gray-500">
        <Form {...form}>
          <form>
            <div className="mb-2">
              <label>Responsável</label>
              <select className="w-56 max-w-full p-2 rounded-md bg-inherit hover:bg-gray-600">
                {props.responsible?.username != 'undefined' ? (
                  <option
                    value={props.responsible?.userId}
                    onClick={() =>
                      onSubmit({
                        responsibleId: props.responsible?.userId,
                      })
                    }
                    disabled
                  >
                    {props.responsible?.username}
                  </option>
                ) : (
                  <option value={props.responsible?.userId}>
                    Sem responsável
                  </option>
                )}
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
