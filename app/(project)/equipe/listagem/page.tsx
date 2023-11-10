'use client';

import {
  deleteTeam,
  findAllTeams,
  getUser,
  updateTeam,
} from '@/app/services/ApiService';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { usersOptions } from '../util';

export default function Listagem() {
  const [teams, setTeams] = useState<any[]>([]);
  const [teamData, setTeamData] = useState({
    teamId: 0,
    teamName: '',
    description: '',
  });

  const [users, setUsers] = useState([]);
  const [selectedUserOption, setSelectedUserOption] = useState([]);
  const userOptionListener = (selectedOption: any) => {
    setSelectedUserOption(selectedOption);
  };

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

      try {
        const response = await getUser();
        setUsers(usersOptions(response));
        // eslint-disable-next-line spaced-comment
        // console.log(response);
      } catch (error) {
        // console.log(error);
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
  };

  return (
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
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <tr key={team.teamId} className="text-white">
              <td className="px-6 py-2 ">{team.leaderId}</td>
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
              <td className=" px-6 py-2 ">
                <Select
                  options={users}
                  isMulti
                  className="basic-multi-select mb-2 text-black"
                  classNamePrefix="select"
                  value={selectedUserOption}
                  onChange={userOptionListener}
                >
                  {team.members}
                </Select>
              </td>
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
                  onClick={() => deleteTeamListener(team.teamId)}
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
