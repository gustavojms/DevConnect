'use client';

import { useEffect, useState } from 'react';
import { fetchProjects } from '@/app/services/ApiService';

export default function Project() {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    async function projects() {
      try {
        const response = await fetchProjects();
        setProjetos(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      const response = await fetchProjects();
      console.log(response);
    }

    projects();
  }, []);

  return (
    <div className="flex justify-center gap-10">
      <h1 className="text-white">Projetos:</h1>
      {projetos.map((projeto) => (
        <div key={projeto.id} className="flex flex-col">
          <h1 className="text-white">{projeto.title}</h1>
        </div>
      ))}
    </div>
  );
}
