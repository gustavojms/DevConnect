'use client';

import { findAllTeams } from '@/app/services/ApiService';
import { useEffect, useState } from 'react';

export default function Listagem() {
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await findAllTeams();
        // console.log(response);
        if (Array.isArray(response)) {
          setTeams(response);
        } else {
          // console.error('Resposta inesperada:', response);
        }
      } catch (error) {
        // console.error('Erro ao obter equipes:', error);
      }
    }

    fetchTeams();
  }, []);

  return (
    <div className="">
      e<h1 className="text-center text-white">Equipes</h1>
      <div>
        <ul>
          {teams.map((team) => (
            <li key={team.id}>
              {' '}
              {/* Substitua 'id' pelo campo único de suass Equipes */}
              <div className="text-white bg-midnight-blue p-8 mt-4 rounded">
                <p>Criador: {team.leaderId}</p>
                <p>Nome da equipe: {team.teamName}</p>
                <p>Projetos: {team.projectId}</p>
                <p>Descrição: {team.description}</p>
                <p>Membros: {team.members}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
