'use client';

// import { getAllTaskByUser } from '@/app/services/ApiService';
// import { useEffect, useState } from 'react';

export default function ListagemTask() {
  //   const [task, setTask] = useState<any[]>([]);

  //   useEffect(() => {
  //     async function fetchProjects() {
  //       try {
  //         let userId: number = 1;
  //         const response = await getAllTaskByUser();
  //         // console.log(response);
  //         if (Array.isArray(response)) {
  //           setTask(response)
  //         } else {
  //           // console.error('Resposta inesperada:', response);
  //         }
  //       } catch (error) {
  //         // console.error('Erro ao obter task:', error);
  //       }
  //     }

  //     fetchProjects();
  //   }, []);

  return (
    <div className="">
      <h1 className="text-center text-white">Tarefas Finalizadas</h1>
      {/* <div>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <div className="text-white bg-midnight-blue p-8 mt-4">
                <p>Criador: {project.projectOwner}</p>
                <p>Nome do Projeto: {project.title}</p>
                <p>Descrição: {project.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
