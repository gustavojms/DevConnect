'use client';

import { getSession } from 'next-auth/react';
import getPostById, {
  createPostComment,
  deletePostComment,
  getPostComment,
} from '@/app/services/ApiService';
import { useEffect, useState } from 'react';
import LoadingAnimation from '@/app/components/LoadingAnimation';
import { SessionInterface } from '@/app/types/SessionType';
import { PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/solid';

type Props = {
  params: {
    id: number;
  };
};

export default function PostPage({ params }: Props) {
  const [userSession, setUserSession] = useState<SessionInterface | null>(null);
  const [post, setPost] = useState<any>(null);
  const [commentInput, setCommentInput] = useState('');
  const [allComments, setAllComments] = useState<any[]>([]);

  useEffect(() => {
    const getpost = async () => {
      try {
        const session = (await getSession()) as SessionInterface;
        setUserSession(session);
        const response = await getPostById(params.id);
        setPost(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const getAllComments = async () => {
      try {
        const response = await getPostComment(params.id);
        setAllComments(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (!post) getpost();
    getAllComments();
  });

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentInput) return;

    const data = {
      content: commentInput,
      postId: Number(params.id),
      authorId: userSession?.payload.sub,
    };
    console.log(data);

    try {
      await createPostComment(data);
      setCommentInput('');
    } catch (error) {
      console.error(error);
    }

    // window.location.reload();
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deletePostComment(params.id, commentId);
      allComments.filter((comment) => comment.commentId !== commentId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      {!post && (
        <div className="flex justify-center items-center h-screen">
          <LoadingAnimation />
        </div>
      )}
      {post && (
        <div className="flex flex-col items-center h-full w-full rounded-lg p-8">
          <div className="px-56 scroll-m-3 bg-gray-800 rounded-lg p-8  mb-8 text-left">
            <h1 className="text-white text-sm font-bold">
              {post.User.username}
            </h1>
            <p className="text-white text-lg">{post.content}</p>
          </div>
          <div className="w-full">
            <form
              onSubmit={handleSubmitComment}
              className="flex flex-row justify-center"
            >
              <input
                placeholder="Comente aqui..."
                value={commentInput}
                onChange={handleCommentChange}
                className="pl-4 w-1/2 text-white bg-gray-700 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />

              <button type="submit" className="">
                <PaperAirplaneIcon className="h-10 w-10 rounded p-2 text-white bg-violet-500 ml-2 mb-4" />
              </button>
            </form>
          </div>
          <div className="w-1/2 mt-2">
            <ul className="mb-4 flex-grow overflow-y-auto">
              {allComments.map((comment) => (
                <li
                  key={comment.commentId}
                  className=" justify-between items-center bg-gray-800 rounded-lg p-4 mb-4"
                >
                  <h1 className="w-full flex justify-start text-gray-500 capitalize text-xs font-bold">
                    {comment.User.username}
                  </h1>
                  <p className="text-white text-lg">{comment.content}</p>
                  <div className="justify-end text-end">
                    {userSession?.payload.sub === comment.authorId && (
                      <button
                        onClick={() => handleDeleteComment(comment.commentId)}
                        className=""
                        type="button"
                      >
                        <TrashIcon className="h-4 w-4 rounded text-red-500" />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
