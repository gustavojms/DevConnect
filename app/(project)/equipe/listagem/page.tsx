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
    // <div className="">
    //   e<h1 className="text-center text-white">Equipes</h1>
    //   <div>
    //     <ul>
    //       {teams.map((team) => (
    //         <li key={team.id}>
    //           {' '}
    //           {/* Substitua 'id' pelo campo único de suass Equipes */}
    //           <div className="text-white bg-midnight-blue p-8 mt-4 rounded">
    //             <p>Criador: {team.leaderId}</p>
    //             <p>Nome da equipe: {team.teamName}</p>
    //             <p>Descrição: {team.description}</p>
    //             <p>Membros: {team.members}</p>
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
    <div className="mt-10 ml-6 border border-pale-blue-transparent rounded-md overflow-hidden">
      <table className="table-auto divide-y divide-pale-blue-transparent">
        <thead className="bg-gray-1000">
          <tr className=" text-blue-violet-500 text-lg">
            <th className=" px-4 py-4">Criador</th>
            <th className=" px-4 py-4">Nome da equipe</th>
            <th className=" px-4 py-4">Descrição</th>
            <th className=" px-4 py-4">Membros</th>
            {/* eslint-disable-next-line */} <th className=" px-4 py-4"> </th>
            {/* eslint-disable-next-line */} <th className=" px-4 py-4"> </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-pale-blue-transparent">
          {teams.map((team) => (
            <tr key={team.id} className="text-white">
              <td className=" px-6 py-2 ">{team.leaderId}</td>
              <td className=" px-6 py-2 ">{team.teamName}</td>
              <td className=" px-6 py-2 ">{team.description}</td>
              <td className=" px-6 py-2 ">{team.members}</td>
              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                <button
                  type="button"
                  className="inline-flex items-center gap-x-2 text-base font-semibold rounded-lg border border-transparent text-blue-violet-500 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                <button
                  type="button"
                  className="inline-flex items-center gap-x-2 text-base font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
