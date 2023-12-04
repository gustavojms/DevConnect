import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import {
  findFinalizedTaskByProject,
  getAllTaskByUser,
  submitSprint,
} from '../services/ApiService';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { getSession } from 'next-auth/react';
import { SessionInterface } from '../types/SessionType';

interface ModalTarefasAntigas {
  isvisible: boolean;
  onClose: () => void;
  projectId: number;
}

const ModalTarefasAntigas: React.FC<ModalTarefasAntigas> = ({
  isvisible,
  onClose,
  projectId,
}) => {
  console.log(projectId);

  const [task, setTask] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await findFinalizedTaskByProject(projectId);
        console.log(response);
        if (Array.isArray(response)) {
          setTask(response);
          console.log(response);
        } else {
          // console.error('Resposta inesperada:', response);
        }
      } catch (error) {
        // console.error('Erro ao obter task:', error);
      }
    }

    fetchProjects();
  }, []);

  function formatarData(dataIso: any) {
    const data = new Date(dataIso);
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // O mês é base 0, então adicionamos 1
    const dia = data.getDate().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano}`;
  }

  if (!isvisible) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="w-[600px] h-[600px] flex flex-col">
        <Button
          className="text-white text-xl place-self-end cursor-pointer bg-transparent"
          onClick={onClose}
        >
          x
        </Button>
        <div className="bg-midnight-blue p-6 rounded-lg shadow-md w-[600px] h-[600px] mx-auto flex-col overflow-auto">
          <h1 className="text-center mb-5 justify-center items-center flex bg-inherit text-pale-blue font-semibold">
            <span>Tarefas Finalizadas no projeto</span>
          </h1>
          <div>
            <ul>
              {task
                .slice()
                .reverse()
                .map((tasks) => (
                  <li key={tasks.id}>
                    <div className="text-white bg-midnight-blue p-8 mt-4">
                      <p>Titulo: {tasks.title}</p>
                      <p>Descrição: {tasks.description}</p>
                      <p>Finalizada em: {formatarData(tasks.endedAt)}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTarefasAntigas;
