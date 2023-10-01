'use client';

import { useEffect, useState } from 'react';
import {
  fetchTeams,
  submitTeam,
  submitTeamMember,
} from '@/app/services/ApiService';

export default function Team() {
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    teamName: '',
    description: '',
    leaderId: 10,
  });

  const [formMember, setFormMember] = useState({
    memberId: 19,
    teamId: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitTeam(formData);
  };

  const handleChangeMember = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormMember({
      ...formMember,
      [name]: value,
    });
  };

  const handleSubmitMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitTeamMember(1, formMember);
  };

  useEffect(() => {
    async function fetchTeam() {
      const response = await fetchTeams();
      setTeams(response.data);
      return response;
    }
    fetchTeam();
  }, []);
  return (
    <div className="m-auto p-20 w-full static">
      <div className="bg-midnight-blue p-6 rounded-lg shadow-md w-1/2 mx-auto flex-col justify-items-center ">
        <div>
          <h1 className="text-bold mb-5 text-gray-ba ">
            Crie a sua equipe e melhore a comunicação entre os membros
          </h1>
        </div>
        <div className="flex-none">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="teamName"
                className="block text-gray-ba font-semibold mb-2"
              >
                Nome da equipe:
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  value={formData.teamName}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-ba font-semibold mb-2"
              >
                Descrição
                <textarea
                  name="description"
                  id="description"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="O que a sua equipe faz?"
                  value={formData.description}
                  onChange={handleChange}
                />
              </label>
            </div>

            <button
              type="submit"
              className="mx-auto w-full bg-gradient-to-r from-blue-violet-500 to-lilac hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Criar
            </button>
          </form>
          <div className="flex flex-col mt-10 justify-center text-white">
            <h1>Times existentes:</h1>
            {teams.map((item: any) => (
              <div key={item.id}>
                <h1>{item.teamName}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="m-auto p-20 w-full static">
        <div className="bg-midnight-blue p-6 rounded-lg shadow-md w-1/2 mx-auto flex-col justify-items-center ">
          <div>
            <h1 className="text-bold mb-5 text-gray-ba ">Adicionar membros</h1>
          </div>
          <div className="flex-none">
            <form onSubmit={handleSubmitMember}>
              <div className="mb-4">
                <label
                  htmlFor="teamId"
                  className="block text-gray-ba font-semibold mb-2"
                >
                  ID Membro:
                  <input
                    type="number"
                    id="teamId"
                    name="teamId"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    defaultValue={formMember.teamId}
                    onChange={handleChangeMember}
                  />
                </label>
                <button
                  type="submit"
                  className="mx-auto w-full bg-gradient-to-r from-blue-violet-500 to-lilac hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
