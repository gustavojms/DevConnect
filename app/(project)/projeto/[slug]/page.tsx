'use client';

import { fetchProject } from '@/app/services/ApiService';
import { useEffect, useState } from 'react';
import Task from '../components/Task';

type ProjectSlugProps = {
  params: {
    slug: string;
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
    <div className="bg-gray-1000 flex flex-col justify-center z-10 w-full mt-5">
      <h1 className="text-pale-blue text-3xl font-bold">{project.title}</h1>
      <p className="text-gray-ba capitalize font-bold">{project.description}</p>

      <Task />
    </div>
  );
}
