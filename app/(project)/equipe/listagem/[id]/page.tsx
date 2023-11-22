'use client';

import { fetchTeamMembers } from '@/app/services/ApiService';
import { useEffect, useState } from 'react';

type TeamIdProps = {
  params: {
    id: any;
  };
};

export default function EditTeamForm({ params }: TeamIdProps) {
  const [team, setTeam] = useState([] as any);

  useEffect(() => {
    async function getTeamData() {
      try {
        const response = await fetchTeamMembers(params.id);
        setTeam(response);
      } catch (error) {
        console.error(error);
      }
    }
    getTeamData();
  }, [params.id]);

  return (
    <div>
      <h1 className="text-white">Cheguei aqui</h1>
      {team[0] === undefined ? (
        <h1 className="text-white">Carregando...</h1>
      ) : (
        team[0].team.members.map((member: any) => (
          <h1 className="text-white">{member.member.username}</h1>
        ))
      )}
    </div>
  );
}
