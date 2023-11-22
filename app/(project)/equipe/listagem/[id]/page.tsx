'use client';

import LoadingAnimation from '@/app/components/LoadingAnimation';
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
      {team[0] === undefined ? (
        <div className="mt-52">
          <LoadingAnimation />
        </div>
      ) : (
        team[0].team.members.map((member: any) => (
          <h1 className="text-white">{member.member.username}</h1>
        ))
      )}
    </div>
  );
}
