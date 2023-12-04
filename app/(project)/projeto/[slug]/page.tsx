'use client';

import {
  fetchProject,
  findAllTeams,
  updateTeam,
} from '@/app/services/ApiService';
import { useEffect, useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import KanbanBoard from '../components/KanbanBoard';
import Sprint from '../components/Sprint';
import TarefasAntigas from '../components/TarefasAntigas';

type ProjectSlugProps = {
  params: {
    slug: any;
  };
};

export default function SlugProject({ params }: ProjectSlugProps) {
  const [project, setProject] = useState({} as any);
  const [teams, setTeams] = useState([] as any);

  const form = useForm();

  const handleTeamSelect = async () => {
    const team = await findAllTeams();
    setTeams(team);
  };

  async function updateTeamProject(data: any) {
    const response = await updateTeam(data.teamId, {
      projectId: params.slug,
    });
    return response;
  }

  useEffect(() => {
    async function getProject() {
      const response = await fetchProject(params.slug);
      setProject(response);
    }
    getProject();
  }, [params.slug]);

  return (
    <div className="bg-gray-1000 flex flex-col justify-center z-10 w-full mt-5 ml-64 p-8">
      <h1 className="text-pale-blue capitalize text-3xl font-bold">
        {project.title}
      </h1>
      <p className="text-gray-ba capitalize font-bold ml-1">
        {project.description}
      </p>
      {project.sprint && project.sprint.length > 0 ? (
        project.sprint.map((sprint: any) => (
          <div key={sprint.sprintId}>
            <p>{sprint.title}</p>
          </div>
        ))
      ) : (
        <Sprint projectId={params.slug} />
      )}
      {project.sprint && project.sprint.length > 0 ? (
        project.sprint.map((sprint: any) => (
          <div key={sprint.sprintId}>
            <p>{sprint.title}</p>
          </div>
        ))
      ) : (
        <TarefasAntigas projectId={params.slug} />
      )}
      <Button
        onClick={handleTeamSelect}
        className="bg-transparent text-pale-blue text-opacity-40 w-max"
      >
        Equipe
        <MdAddCircle className="h-6 w-6" />
      </Button>
      {teams.length > 0 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(updateTeamProject)}>
            <select>
              <option disabled selected>
                Selecione
              </option>
              {teams.map((team: any) => (
                <option
                  key={team.teamId}
                  value={team.teamId}
                  onClick={() => updateTeamProject({ teamId: team.teamId })}
                >
                  {team.teamName}
                </option>
              ))}
            </select>
          </form>
        </Form>
      )}

      <KanbanBoard projectId={params.slug} />
    </div>
  );
}
