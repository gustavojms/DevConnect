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
  author: {
    username: string;
  };
};

export default function TaskDetails(props: TaskDetailsProps) {
  const form = useForm();

  console.log(props.users);

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
            <div className="mb-5">
              <label className="">Responsável</label>
              <select className="w-full max-w-full p-2 rounded-md bg-inherit hover:bg-gray-600">
                {props.responsible !== null ? (
                  <option value={props.responsible.userId}>
                    {props.responsible.username}
                  </option>
                ) : (
                  <>
                    <option selected disabled>
                      Sem responsável
                    </option>
                    {props.users?.flatMap((team: any) =>
                      team.members.map((member: any) => (
                        <option
                          key={member.userId}
                          value={member.userId}
                          onClick={() =>
                            onSubmit({ responsibleId: member.userId })
                          }
                        >
                          {member.username}
                        </option>
                      )),
                    )}
                  </>
                )}
              </select>
            </div>
          </form>
        </Form>
        <div className="gap-2 capitalize">
          <label>Criador</label>
          <p className="text-gray-ba">{props.author.username}</p>
        </div>
      </div>
    </details>
  );
}
