import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { submitProject } from '@/app/services/ApiService';
import React from 'react';

interface ModalProps {
  isvisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isvisible, onClose }) => {
  const [projectData, setProject] = useState({
    title: '',
    description: '',
    projectOwner: 1,
  });

  const handleChangeProject = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProject({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmitProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitProject(projectData);
    console.log(projectData);
  };

  if (!isvisible) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <span
          className="text-white text-xl place-self-end cursor-pointer"
          onClick={onClose}
        >
          X
        </span>
        <div className="bg-slate-950 p-2 rounded text-white">
          <form onSubmit={handleSubmitProject}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-ba font-semibold mb-2"
              >
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full text-black p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                onChange={handleChangeProject}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-ba font-semibold mb-2"
              >
                Descrição
              </label>
              <textarea
                name="description"
                id="description"
                className="w-full text-black p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="O que a sua equipe faz?"
                onChange={handleChangeProject}
              />
              <label
                htmlFor="Time"
                className="block text-gray-ba font-semibold mb-2"
              >
                Time
              </label>
              <select
                name="time"
                id="time"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="" className="bg-slate-950 border rounder-md">
                  Time 1
                </option>
                <option value="" className="bg-slate-950 border rounder-md">
                  Time 2
                </option>
                <option value="" className="bg-slate-950 border rounder-md">
                  Time 3
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="mx-auto w-full bg-gradient-to-r from-blue-violet-500 to-lilac hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Criar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
