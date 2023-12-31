import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { updateTask } from '@/app/services/ApiService';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
  task: any;
};

export default function TaskDetails(props: TaskDetailsProps) {
  const form = useForm();

  async function onSubmit(data: any) {
    const response = await updateTask(props.taskId, data);
    console.log(response);
  }

  return (
    <div>
      <details className="w-full p-4" open>
        <summary className="text-gray-ba font-bold p-2 rounded-t border border-gray-500">
          Detalhes
        </summary>
        <div className="p-4 gap-5 flex flex-col rounded-b border-x border-b border-gray-500">
          <Form {...form}>
            <form>
              <div className="mb-5">
                <label className="">Responsável</label>
                <select className="w-full max-w-full p-2 rounded-md bg-inherit hover:bg-gray-600">
                  {props.responsible !== null ? (
                    <option value={props.responsible?.userId}>
                      {props.responsible?.username}
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
              <Label className="text-gray-ba">Data de início</Label>
              <Input
                type="date"
                value={props.task.startedAt?.toString().split('T')[0]}
                className="text-gray-ba w-52 bg-pale-blue-card border-none"
                placeholder="Data de início"
              />
              <Label className="text-gray-ba">Data de término</Label>
              <Input
                type="date"
                value={props.task.endedAt?.toString().split('T')[0]}
                className="text-gray-ba w-52 bg-pale-blue-card border-none"
                placeholder="Data de término"
              />
            </form>
          </Form>
          <div>
            <label>Criador</label>
            <p className="capitalize text-gray-ba">{props.author?.username}</p>
          </div>
        </div>
      </details>

      <details className="w-full p-4" open>
        <summary className="text-gray-ba font-bold p-2 rounded-t border border-gray-500">
          Comentários
        </summary>
        <div className="p-4 gap-5 flex flex-col rounded-b border-x border-b border-gray-500">
          {props.task.comments ? (
            props.task.comments.map((comment: any) => (
              <div key={comment.id} className="mb-4">
                <p className="text-gray-ba font-bold">
                  {comment.author.username}
                </p>
                <p className="text-gray-ba">{comment.text}</p>
              </div>
            ))
          ) : (
            <p>No comments available.</p>
          )}
          <form onSubmit={(e) => e.preventDefault()}>
            <Label className="text-gray-ba">Novo Comentário</Label>
            <Input
              type="text"
              {...form.register('commentText')}
              className="text-gray-ba w-full bg-pale-blue-card border-none"
              placeholder="Digite seu comentário"
            />
            <button
              type="button"
              className="mt-2 bg-pale-blue hover:bg-blue-violet-500 text-white p-2 rounded"
              onClick={() => {
                const commentText = form.getValues('commentText');
              }}
            >
              Adicionar Comentário
            </button>
          </form>
        </div>
      </details>
    </div>
  );
}
