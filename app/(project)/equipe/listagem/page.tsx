'use client';

import LoadingAnimation from '@/app/components/LoadingAnimation';
import {
  deleteTeam,
  findAllTeams,
  updateTeam,
} from '@/app/services/ApiService';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

export default function Listagem() {
  const [teams, setTeams] = useState<any[]>([]);
  const [teamData, setTeamData] = useState({
    teamId: 0,
    teamName: '',
    description: '',
  });

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

  const editTeamListener = async () => {
    await updateTeam(teamData.teamId, teamData);
    setTeamData({ ...teamData, teamId: 0, teamName: '', description: '' });
  };

  const deleteTeamListener = async (teamId: number) => {
    await deleteTeam(teamId);
    window.location.reload();
  };

  return (
    <div>
      {teams.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <LoadingAnimation />
        </div>
      )}
      <div className="mt-10 ml-56 border border-pale-blue-transparent rounded-md">
        <table className="table-auto divide-y bg-gray-1000 divide-pale-blue-transparent rounded-md">
          <thead className="bg-gray-1000">
            <tr className=" text-blue-violet-500 text-lg">
              <th className=" px-4 py-4 text-left">Nome da equipe</th>
              <th className=" px-4 py-4 text-left">Descrição</th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th className=" px-4 py-4 text-left" />
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th className=" px-4 py-4 text-left" />
            </tr>
          </thead>
          <tbody className="divide-y divide-pale-blue-transparent">
            {teams.map((team) => (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <tr key={team.teamId} className="text-white">
                <td className="px-6 py-2 ">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <input
                    className=" p-2 text-white bg-transparent rounded-sm border-transparent focus:outline-none focus:ring-1 focus:ring-slate-800 "
                    defaultValue={team.teamName}
                    onBlur={() => editTeamListener()}
                    onChange={(e) =>
                      setTeamData({
                        ...teamData,
                        teamId: team.teamId,
                        teamName: e.target.value,
                        description: team.description,
                      })
                    }
                  />
                </td>
                <td className="px-6 py-2 ">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <input
                    className=" p-2 text-white bg-transparent rounded-sm border-transparent focus:outline-none focus:ring-1 focus:ring-slate-800 "
                    defaultValue={team.description}
                    onBlur={() => editTeamListener()}
                    onChange={(e) =>
                      setTeamData({
                        ...teamData,
                        teamId: team.teamId,
                        teamName: team.teamName,
                        description: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                  <button
                    onClick={() => {
                      window.location.href = `/equipe/listagem/${team.teamId}`;
                    }}
                    type="button"
                    className="inline-flex items-center gap-x-2 text-base font-semibold rounded-lg border border-transparent text-blue-violet-500 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <PencilSquareIcon className=" h-5 w-5 text-white hover:text-blue-500" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                  <button
                    type="button"
                    className="inline-flex items-center gap-x-2 text-base font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    onClick={() => deleteTeamListener(team.teamId)}
                  >
                    <TrashIcon className=" h-5 w-5 text-white hover:text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
