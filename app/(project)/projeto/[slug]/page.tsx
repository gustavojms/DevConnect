'use client';

import { fetchProject } from '@/app/services/ApiService';
import { useEffect, useState } from 'react';
import Sprint from '../components/Sprint';
import KanbanBoard from '../components/KanbanBoard';

type ProjectSlugProps = {
  params: {
    slug: any;
  };
};

export default function SlugProject({ params }: ProjectSlugProps) {
  const [project, setProject] = useState({} as any);

  useEffect(() => {
    async function getProject() {
      const response = await fetchProject(params.slug);
      setProject(response.data);
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

      <Sprint />
      <KanbanBoard projectId={params.slug} />
    </div>
  );
}
