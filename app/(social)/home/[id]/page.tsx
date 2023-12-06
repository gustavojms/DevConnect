'use client';

import getPostById from '@/app/services/ApiService';
import { useEffect, useState } from 'react';

type Props = {
  params: {
    id: number;
  };
};

export default function PostPage({ params }: Props) {
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const getpost = async () => {
      try {
        const response = await getPostById(params.id);
        console.log(response);
        setPost(response.data);
        console.log(post);
      } catch (error) {
        console.log(error);
      }
    };
    getpost();
  });

  return (
    <div>
      <div className="m-4 cursor-pointer">
        <h1 className="text-white">Usuario: aaaa</h1>
        <div className="bg-midnight-blue h-24 rounded-sm mt-4">
          <p className="text-white p-8">aaaaaaaaaaaaa</p>
        </div>
      </div>
    </div>
  );
}
