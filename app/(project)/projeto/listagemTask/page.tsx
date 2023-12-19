'use client';

import { getAllTaskByUser } from '@/app/services/ApiService';
import { SessionInterface } from '@/app/types/SessionType';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ListagemTask() {
  const [task, setTask] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const userId = (await getSession()) as SessionInterface;
        const response = await getAllTaskByUser(userId.payload.sub);
        console.log(response);
        if (Array.isArray(response)) {
          setTask(response);
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

  return (
    <div className="">
      <h1 className="text-center text-white">Tarefas Finalizadas</h1>
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
  );
}
