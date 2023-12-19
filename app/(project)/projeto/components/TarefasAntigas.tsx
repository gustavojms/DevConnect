'use client';

import ModalTarefasAntigas from '@/app/components/ModalTarefasAntigas';
import { getAllTaskByUser } from '@/app/services/ApiService';
import { SessionInterface } from '@/app/types/SessionType';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

type TaskParams = {
  projectId: number;
};

export default function TarefasAntigas({ projectId }: TaskParams) {
  const [task, setTask] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  console.log(projectId, 'veio id');

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
    <div className="relative">
      <button>
        <span
          className="flex py-1 bg-inherit text-pale-blue font-semibold cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          Tarefas antigas
          <MdAddCircleOutline className="ml-2 h-6 w-6" />
        </span>
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
          <ModalTarefasAntigas
            isvisible={showModal}
            onClose={handleCloseModal}
            projectId={projectId}
          />
        </div>
      )}
    </div>
  );
}
