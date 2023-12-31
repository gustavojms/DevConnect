'use client';

import { getAllProjectsPublic } from '@/app/services/ApiService';
import { useEffect, useState } from 'react';

export default function Listagem() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await getAllProjectsPublic();
        // console.log(response);
        if (Array.isArray(response)) {
          setProjects(response);
        } else {
          // console.error('Resposta inesperada:', response);
        }
      } catch (error) {
        // console.error('Erro ao obter projetos:', error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="">
      <h1 className="text-center text-white">Projetos</h1>
      <div>
        <ul>
          {projects.map((project) => (
            <li key={project.projectId}>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div
                className="text-white bg-midnight-blue p-8 mt-4 cursor-pointer"
                onClick={() => {
                  window.location.href = `/projeto/${project.projectId}`;
                }}
              >
                <p>Criador: {project.projectOwner}</p>
                <p>Nome do Projeto: {project.title}</p>
                <p>Descrição: {project.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
